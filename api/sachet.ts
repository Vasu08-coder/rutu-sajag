// Serverless Proxy for NDMA SACHET Maharashtra Feed (Vercel / Node serverless format)
// Fetches the official feed from https://sachet.ndma.gov.in/cap_public_website/rss/rss_maharashtra.xml,
// processes ALL items (no .slice limit), filters relevant ones, fetches CAP XML with concurrency limit
// and per-item timeout, caching by CAP identifier.

import type { IncomingMessage, ServerResponse } from 'http';

interface CachedAlertItem {
  identifier: string;
  capUrl: string;
  rssTitle: string;
  pubDate: string;
  rawCapXml: string;
  cachedAt: number;
}

// Global in-memory cache for CAP XML documents by identifier
const capItemCache = new Map<string, CachedAlertItem>();
const CAP_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour per CAP XML (official alerts are immutable once published)

let feedRssCache: { rawRss: string; fetchedAt: number } | null = null;
const RSS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes for RSS list

async function fetchWithTimeout(url: string, timeoutMs: number = 7000): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'RutuSajag-App/1.0 (Disaster-Alert-Reader)' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

/**
 * Concurrency helper to fetch in batches
 */
async function mapConcurrent<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  const executing: Promise<any>[] = [];

  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    results.push(p as any);

    if (limit <= items.length) {
      const e: Promise<any> = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}

export default async function handler(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (_req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const now = Date.now();

  try {
    const rssUrl = 'https://sachet.ndma.gov.in/cap_public_website/rss/rss_maharashtra.xml';
    let rssXml = '';

    if (feedRssCache && now - feedRssCache.fetchedAt < RSS_CACHE_TTL_MS) {
      rssXml = feedRssCache.rawRss;
    } else {
      rssXml = await fetchWithTimeout(rssUrl, 8000);
      feedRssCache = { rawRss: rssXml, fetchedAt: now };
    }

    const itemMatches = rssXml.match(/<item>([\s\S]*?)<\/item>/gi) || [];

    // Parse ALL items from Maharashtra feed (remove previous .slice(0, 5) limit)
    interface ParsedRssItem {
      identifier: string;
      link: string;
      title: string;
      pubDate: string;
    }

    const parsedItems: ParsedRssItem[] = [];

    for (const item of itemMatches) {
      const linkMatch = item.match(/<link>(.*?)<\/link>/i);
      const titleMatch = item.match(/<title>(.*?)<\/title>/i);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/i);
      const guidMatch = item.match(/<guid[^>]*>(.*?)<\/guid>/i);

      if (linkMatch && linkMatch[1]) {
        const link = linkMatch[1].trim();
        const identifierMatch = link.match(/identifier=([^&]+)/i);
        const identifier = identifierMatch ? identifierMatch[1] : (guidMatch ? guidMatch[1] : link);

        parsedItems.push({
          identifier,
          link,
          title: titleMatch ? titleMatch[1].trim() : '',
          pubDate: pubDateMatch ? pubDateMatch[1].trim() : '',
        });
      }
    }

    const deadline = now + 7500; // 7.5s serverless time budget
    let isPartial = false;

    // Process items with concurrency limit of 5 and caching by CAP identifier
    const processedAlerts = await mapConcurrent(parsedItems, 5, async (item) => {
      // Check cache by identifier first
      const cached = capItemCache.get(item.identifier);
      if (cached && now - cached.cachedAt < CAP_CACHE_TTL_MS) {
        return cached;
      }

      // Check global time budget
      if (Date.now() > deadline) {
        isPartial = true;
        return null;
      }

      try {
        const remainingBudget = Math.max(1500, deadline - Date.now());
        const capXml = await fetchWithTimeout(item.link, Math.min(4000, remainingBudget));
        const record: CachedAlertItem = {
          identifier: item.identifier,
          capUrl: item.link,
          rssTitle: item.title,
          pubDate: item.pubDate,
          rawCapXml: capXml,
          cachedAt: now,
        };
        capItemCache.set(item.identifier, record);
        return record;
      } catch {
        return null;
      }
    });

    const validAlerts = processedAlerts.filter(Boolean);

    const payload = {
      source: 'NDMA SACHET Maharashtra',
      fetchedAt: new Date().toISOString(),
      totalRssItems: parsedItems.length,
      count: validAlerts.length,
      isPartial,
      alerts: validAlerts,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(payload));
  } catch (err: any) {
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'Failed to fetch NDMA SACHET feed', details: err?.message || String(err) }));
  }
}

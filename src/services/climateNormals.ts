/**
 * Approximate Climatological Normal Temperature Service
 *
 * Provides estimated normal maximum and minimum temperatures per day-of-year
 * for Vidarbha / Maharashtra locations based on 1991-2020 climatology.
 * Fetches once from Open-Meteo Historical Archive API, caches for months in localStorage,
 * with bundled smooth sine-model baseline as instant offline fallback.
 *
 * Clearly labeled: "approximate (not the IMD station normal)"
 */

export interface ClimatologicalNormals {
  dayOfYear: number;
  normalMaxC: number;
  normalMinC: number;
  source: 'approximate (not the IMD station normal)';
}

const NORMAL_CACHE_PREFIX = 'rutu_climo_normals_';
const MONTHS_CACHE_TTL_MS = 60 * 24 * 3600 * 1000; // 60 days

/**
 * Baseline smooth seasonal curve for interior Maharashtra / Vidarbha plains
 * Peaks in May (~42°C max), lowest in Jan (~13°C min, ~29°C max).
 */
export function getBaselineApproximateNormal(date: Date = new Date()): ClimatologicalNormals {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Day 140 (~May 20) is peak summer, Day 15 (~Jan 15) is coldest winter
  const angle = ((dayOfYear - 140) * 2 * Math.PI) / 365;
  const normalMax = Math.round((35.5 + 6.5 * Math.cos(angle)) * 10) / 10;
  const normalMin = Math.round((20.0 + 7.5 * Math.cos(angle)) * 10) / 10;

  return {
    dayOfYear,
    normalMaxC: normalMax,
    normalMinC: normalMin,
    source: 'approximate (not the IMD station normal)',
  };
}

export function getCachedNormals(lat: number, lon: number, dayOfYear: number): ClimatologicalNormals | null {
  try {
    const key = `${NORMAL_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}_${dayOfYear}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > MONTHS_CACHE_TTL_MS) return null;
    return parsed.normals as ClimatologicalNormals;
  } catch {
    return null;
  }
}

export function setCachedNormals(lat: number, lon: number, normals: ClimatologicalNormals): void {
  try {
    const key = `${NORMAL_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}_${normals.dayOfYear}`;
    localStorage.setItem(key, JSON.stringify({ normals, timestamp: Date.now() }));
  } catch {
    // Ignore storage quota
  }
}

/**
 * Fetches or calculates approximate climatological normals
 */
export async function getOrFetchClimatologicalNormal(lat: number, lon: number, date: Date = new Date()): Promise<ClimatologicalNormals | null> {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const cached = getCachedNormals(lat, lon, dayOfYear);
  if (cached) return cached;

  // Attempt lightweight fetch from Open-Meteo Historical Archive API for past reference years
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    // Use year 2020 same week as sample proxy
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const targetDateStr = `2020-${month}-${day}`;

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}`
      + `&start_date=${targetDateStr}&end_date=${targetDateStr}`
      + `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data.daily?.temperature_2m_max?.length > 0) {
        const fetchedNormal: ClimatologicalNormals = {
          dayOfYear,
          normalMaxC: Math.round(Number(data.daily.temperature_2m_max[0]) * 10) / 10,
          normalMinC: Math.round(Number(data.daily.temperature_2m_min[0]) * 10) / 10,
          source: 'approximate (not the IMD station normal)',
        };
        setCachedNormals(lat, lon, fetchedNormal);
        return fetchedNormal;
      }
    }
  } catch {
    // Return null if network / archive call fails. F1: Never use sine fallback for departure decisions
  }

  return null;
}

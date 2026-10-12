import { T, LN } from '../i18n';
import { ic } from '../data/icons';
import { GAZ, COASTAL_PLACES } from '../data/places';
import { S } from '../state/store';
import type { LocData } from '../state/store';

export const t = () => T[S.lang];

export function N(s: string | number): string {
  if (S.lang === 'en') return String(s);
  return String(s).replace(/\d/g, (d) => '०१२३४५६७८९'[parseInt(d)] ?? d);
}

export function locParts(L: LocData): { name: string; district: string; sub: string } {
  if (L.placeId) {
    const p = GAZ.places.find((x) => x.id === L.placeId) || COASTAL_PLACES.find((x) => x.id === L.placeId);
    return {
      name: p ? p.name[S.lang] : '',
      district: (p && p.district) ? p.district : GAZ.district[S.lang],
      sub: GAZ.state[S.lang],
    };
  }
  const name = L.village || L.taluka || '';
  const sub = [L.taluka && L.village ? L.taluka : '', L.district].filter(Boolean).join(' · ');
  return { name, district: L.district || (L.taluka && L.village ? L.taluka : '') || '', sub };
}

export function locLabel(): string {
  const p = S.loc ? locParts(S.loc) : null;
  return p ? [p.name, p.district].filter(Boolean).join(', ') : t().nl;
}

export function locDistrict(): string {
  const p = S.loc ? locParts(S.loc) : null;
  return p ? p.district : '';
}

export function header(): string {
  const demoBadge = S.isDemo
    ? '<span style="background:var(--amb);color:var(--ink);font-size:11px;font-weight:800;padding:2px 8px;border-radius:99px;margin-left:8px;vertical-align:middle">DEMO</span>'
    : '';

  return `<div class="hd">
    <div class="brand">${ic('sun', 34)}ऋतु सजग ${demoBadge}</div>
    <p>Rutu Sajag</p>
    <div class="chips">${(['mr', 'hi', 'en'] as const)
      .map((l) => `<button class="${S.lang === l ? 'on' : ''}" onclick="window.__app.setLang('${l}')">${LN[l]}</button>`)
      .join('')}</div>
  </div>`;
}

export function topbar(): string {
  const demoBadge = S.isDemo
    ? '<span style="background:var(--amb);color:var(--ink);font-size:11px;font-weight:800;padding:2px 8px;border-radius:99px;margin-left:6px;vertical-align:middle">DEMO</span>'
    : '';

  const alertCount = S.isDemo ? 2 : S.alerts.length;
  const badgeHtml = alertCount > 0 ? `<i>${N(alertCount)}</i>` : '';

  return `<div class="top">
    <div>
      <div class="loc">${ic('pin', 14)} ${locLabel()} ${demoBadge}</div>
      <h1>${t().hi}${t().r[S.role]}</h1>
    </div>
    <button class="bell" aria-label="${t().nt}" onclick="window.__app.nav('alerts')">
      ${ic('bell', 24)}${badgeHtml}
    </button>
  </div>`;
}

/**
 * Returns formatted 5-day labels ("Today", "Tomorrow", weekday) using Intl.DateTimeFormat
 */
export function get5DayLabels(dates?: string[]): string[] {
  const x = t();
  const langTag = S.lang === 'mr' ? 'mr-IN' : S.lang === 'hi' ? 'hi-IN' : 'en-IN';
  const formatter = new Intl.DateTimeFormat(langTag, { weekday: 'short' });

  const result: string[] = [];

  for (let i = 0; i < 5; i++) {
    if (i === 0) {
      result.push((x as any).today || 'आज');
    } else if (i === 1) {
      result.push((x as any).tomorrow || 'उद्या');
    } else if (dates && dates[i]) {
      try {
        const d = new Date(dates[i]);
        result.push(formatter.format(d));
      } catch {
        result.push(x.dy[i] || '');
      }
    } else {
      const d = new Date();
      d.setDate(d.getDate() + i);
      result.push(formatter.format(d));
    }
  }

  return result;
}

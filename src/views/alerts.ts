import { S } from '../state/store';
import { t } from './shared';
import { ic } from '../data/icons';
import { ALL_HAZARD_GUIDANCE } from '../data/allHazardsGuide';

export function renderAlerts(): string {
  const x = t() as any;

  // In demo mode (?demo=1), show original demo alerts
  if (S.isDemo) {
    const colors = ['var(--dred)', 'var(--red)', 'var(--g)'];
    const targets = ['live', 'guide', 'alerts'];
    return `<div class="top"><h1>${x.nt}</h1></div>`
      + x.n.map((n: any, i: number) => `
        <button class="nt" style="border-left-color:${colors[i]}" onclick="window.__app.nav('${targets[i]}')">
          <b>${n[0]}</b>
          <span>${n[1]}</span>
          <em>${n[2]}</em>
        </button>`).join('');
  }

  // Real alerts mode
  const alerts = S.alerts;

  if (alerts.length === 0) {
    return `<div class="top"><h1>${x.nt}</h1></div>
      <div class="card" style="background:#f3f8f6;border-color:var(--g);padding:18px;margin-top:12px;text-align:center;justify-content:center">
        <div>
          <b style="color:var(--g);font-size:16px">${x.no_active_alerts}</b>
        </div>
      </div>`;
  }

  const severityColor: Record<string, string> = {
    Extreme: 'var(--dred)',
    Severe: 'var(--red)',
    Moderate: 'var(--amb)',
    Minor: 'var(--g)',
  };

  return `<div class="top"><h1>${x.nt}</h1></div>`
    + alerts.map((a) => {
      const title = a.title[S.lang] || a.title['mr'] || a.title['en'] || '';
      const desc = a.description ? (a.description[S.lang] || a.description['mr'] || a.description['en'] || '') : '';
      const source = a.sender || 'NDMA SACHET / IMD';
      const color = severityColor[a.severity] || 'var(--amb)';
      const targetScreen = a.isUrgentLive ? 'live' : 'guide';

      const validityNote = a.validityNotGiven ? ` ${x.validity_not_given || '(वैधता नमूद नाही)'}` : '';
      const iconName = a.hazardId && ALL_HAZARD_GUIDANCE[a.hazardId] ? ALL_HAZARD_GUIDANCE[a.hazardId].icon : 'warn';

      return `
        <button class="nt" style="border-left-color:${color}" onclick="window.__app.openAlert('${a.id}', '${targetScreen}')">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="color:${color};flex-shrink:0">${ic(iconName, 22)}</span>
            <b>${title}</b>
          </div>
          <span>${desc}</span>
          <em>${x.source_prefix}${source}${validityNote}</em>
        </button>`;
    }).join('');
}

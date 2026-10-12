import { ic } from '../data/icons';
import { S } from '../state/store';
import { t, locDistrict, N } from './shared';
import { ALL_HAZARD_GUIDANCE, getHazardGuidance, type HazardId } from '../data/allHazardsGuide';

export function fmtTime(s: number): string {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return N(String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0'));
}

export function remaining(): number {
  if (!S.alertEnd) return 0;
  return Math.max(0, Math.floor((S.alertEnd - Date.now()) / 1000));
}

export function renderLive(): string {
  const x = t() as any;
  const activeAlert = S.activeLiveAlert;

  // Header pill: Demo pill only if in demo mode; otherwise show alert source + time
  let pillHtml = '';
  if (S.isDemo) {
    pillHtml = '<span class="pill"><s></s>DEMO ALERT</span>';
  } else {
    const srcName = activeAlert?.sender || 'Forecast Alert';
    pillHtml = `<span class="pill"><s></s>${srcName}</span>`;
  }

  // Headings & Text
  let title = x.lt;
  let heading = x.lh;
  let body = x.lb;

  if (activeAlert && !S.isDemo) {
    title = activeAlert.title[S.lang] || activeAlert.title['mr'] || x.lt;
    heading = activeAlert.title[S.lang] || activeAlert.title['mr'] || x.lh;
    body = activeAlert.description ? (activeAlert.description[S.lang] || activeAlert.description['mr'] || x.lb) : x.lb;
  }

  const footerDisclaimer = S.safe
    ? x.family_sms_simulated || x.fm2
    : x.family_sms_simulated || x.fm;

  const remSeconds = remaining();
  const timeDisplay = remSeconds > 0 ? fmtTime(remSeconds) : '--:--';

  // Determine hazard icon and guidance steps from alert
  const alertHazardId: HazardId = activeAlert?.hazardId || 'thunderstorm';
  const hazardMeta = ALL_HAZARD_GUIDANCE[alertHazardId] || ALL_HAZARD_GUIDANCE.thunderstorm;
  const liveIcon = hazardMeta.icon || 'bolt';
  const alertGuidance = getHazardGuidance(alertHazardId, S.role, S.lang);
  const whatToDoSteps = alertGuidance.g.map((g) => g[1]);

  const stepList = whatToDoSteps.length > 0 ? whatToDoSteps : x.ls;

  return `<div class="live">
    <div class="bar">
      ${pillHtml}
      <span>${locDistrict()}</span>
    </div>
    <div class="mid">
      <div class="ring">${ic(liveIcon, 46)}</div>
      <div style="font-size:14px;letter-spacing:.5px;color:#f3c9c1;font-weight:700">${title}</div>
      <h1>${heading}</h1>
      <p>${body}</p>
      <span class="tm" id="tm">${timeDisplay}</span>
    </div>
    <div class="sheet">
      <h4>${x.lw}</h4>
      <ul style="padding:0">
        ${stepList.map((s: string, i: number) => `<li><b>${N(i + 1)}</b>${s}</li>`).join('')}
      </ul>
      <button class="safe ${S.safe ? 'ok' : ''}" onclick="window.__app.markSafe()">
        ${S.safe ? x.sd : x.sf}
      </button>
      <div class="fam">${footerDisclaimer}</div>
    </div>
  </div>`;
}

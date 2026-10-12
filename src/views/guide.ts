import { ic } from '../data/icons';
import { S } from '../state/store';
import { t, N } from './shared';
import { computedView } from '../state/store';
import { ALL_HAZARD_GUIDANCE } from '../data/allHazardsGuide';

export function renderGuide(): string {
  const x = t() as any;
  const { w, risk, g } = computedView();
  const stepColors = ['var(--red)', 'var(--g)', 'var(--amb)'];

  const hazardMeta = ALL_HAZARD_GUIDANCE[risk.hazard] || ALL_HAZARD_GUIDANCE.normal;
  const hazardName = hazardMeta.name[S.lang] || hazardMeta.name['mr'] || hazardMeta.name['en'];
  const hazardIcon = hazardMeta.icon || 'sun';

  const tempDisplay = w ? N(w.tempC) : '--';
  const screenTitle = x.todays_care || x.gt;
  const subtitle = `${hazardName} · ${tempDisplay}°C · ${x.r[S.role]}`;

  return `
    <div class="gt">
      <button class="back" aria-label="Back" onclick="window.__app.nav('home')">${ic('back')}</button>
      <h1>${screenTitle}</h1>
    </div>
    <div class="card" style="margin-bottom:6px">
      <span class="ib" style="width:46px;height:46px;background:#fdecc8;color:#d99a14">${ic(hazardIcon, 28)}</span>
      <div><b>${subtitle}</b></div>
    </div>
    <div class="ai">${x.ai}</div>
    <h3 style="color:var(--mut)">${x.gn}</h3>
    ${g.g.map((s, i) => `
      <div class="step" style="border-left-color:${stepColors[i % 3]}">
        <span style="color:${stepColors[i % 3]}">${ic(s[0] in ic ? s[0] : 'shield', 28)}</span>
        <div><b>${s[1]}</b><span>${s[2]}</span></div>
      </div>`).join('')}
    <h3 style="color:var(--mut)">${x.sy}</h3>
    <div class="warn">${x.sb}<button onclick="window.__app.openHealthCentres()">${x.hcs}</button></div>`;
}


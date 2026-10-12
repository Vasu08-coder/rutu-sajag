import { ic, RI } from '../data/icons';
import { S } from '../state/store';
import { t, header } from './shared';

export function renderOnboarding(): string {
  return header() + `
    <h2>${t().q}</h2>
    <div class="sub">${t().qs}</div>
    <div class="grid">
      ${t().r.map((r, i) => `
        <button class="role ${S.role === i ? 'on' : ''}" onclick="window.__app.setRole(${i})">
          <span class="ib" style="width:58px;height:58px;background:${RI[i][1]};color:${RI[i][2]}">${ic(RI[i][0], 30)}</span>
          ${r}
        </button>`).join('')}
    </div>
    <button class="cta" onclick="window.__app.nav('loc')">${t().go}</button>
    <div class="note">${ic('shield', 16)} ${t().loc}</div>`;
}

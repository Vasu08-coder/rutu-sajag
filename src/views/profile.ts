import { LN } from '../i18n';
import { S } from '../state/store';
import { t, locLabel } from './shared';

export function renderProfile(): string {
  const x = t() as any;
  const fields = x.pf.map((f: string, i: number) => {
    const val = i === 0 ? locLabel() : i === 1 ? x.r[S.role] : i === 2 ? LN[S.lang] : x.pv[i];
    const inner = `<span style="color:var(--mut);font-size:14px">${f}</span><b>${val}</b>`;
    return i === 0
      ? `<button class="card" style="justify-content:space-between" onclick="window.__app.changeLocation()">${inner}</button>`
      : `<div class="card" style="justify-content:space-between">${inner}</div>`;
  });

  const marineCreditLink = (S.role === 5 || (S.marine && S.marine.isCoastal))
    ? `<div style="margin-top:8px;text-align:center;font-size:12px">
        <a href="https://open-meteo.com/en/docs/marine-weather-api" target="_blank" rel="noopener noreferrer" style="color:var(--mut);text-decoration:none">
          ${x.marine_meteo_credit || 'Wave data by Open-Meteo Marine'} ↗
        </a>
      </div>`
    : '';

  const creditLink = `
    <div style="margin-top:24px;text-align:center;font-size:13px">
      <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" style="color:var(--mut);text-decoration:none">
        ${x.open_meteo_credit} ↗
      </a>
      ${marineCreditLink}
    </div>`;

  return `<div class="top"><h1>${x.tb[3]}</h1></div>
    ${fields.join('')}
    <div class="chips" style="margin-top:6px">
      ${(['mr', 'hi', 'en'] as const).map((l) =>
        `<button style="background:${S.lang === l ? 'var(--g)' : 'var(--g2)'};color:${S.lang === l ? '#fff' : 'var(--g)'}" onclick="window.__app.setLang('${l}')">${LN[l]}</button>`
      ).join('')}
    </div>
    ${creditLink}`;
}

import { LN } from '../i18n';
import { S, FEATURE_SPECIES_V2 } from '../state/store';
import { t, locLabel } from './shared';
import { SPECIES_CATALOG } from '../config/speciesCatalog';

export function renderProfile(): string {
  const x = t() as any;
  const fields = x.pf.map((f: string, i: number) => {
    const val = i === 0 ? locLabel() : i === 1 ? x.r[S.role] : i === 2 ? LN[S.lang] : x.pv[i];
    const inner = `<span style="color:var(--mut);font-size:14px">${f}</span><b>${val}</b>`;
    return i === 0
      ? `<button class="card" style="justify-content:space-between" onclick="window.__app.changeLocation()">${inner}</button>`
      : `<div class="card" style="justify-content:space-between">${inner}</div>`;
  });

  // Livestock species management panel for Role 3 (Animals row)
  let animalsSectionHtml = '';
  if (FEATURE_SPECIES_V2 && S.role === 3) {
    const selectedCount = S.livestockProfile.length;
    const countDisplay = selectedCount > 0
      ? S.livestockProfile.map(item => {
          const sp = SPECIES_CATALOG.find(c => c.uiSpeciesId === item.uiSpeciesId);
          return sp ? (sp.labels[S.lang] || sp.labels.mr) : item.uiSpeciesId;
        }).join(', ')
      : (S.lang === 'en' ? 'None selected' : S.lang === 'hi' ? 'कोई नहीं' : 'काहीही नाही');

    const animalsRowInner = `
      <span style="color:var(--mut);font-size:14px">${x.profile_animals_row || 'Animals'}</span>
      <div style="display:flex;align-items:center;gap:8px">
        <b style="font-size:14.5px;max-width:180px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap">${countDisplay}</b>
        <span style="color:var(--g);font-size:13px;font-weight:700">${S.profileAnimalsExpanded ? '▲' : '▼'}</span>
      </div>`;

    let editPanelHtml = '';
    if (S.profileAnimalsExpanded) {
      const selectedIds = new Set(S.livestockProfile.map(item => item.uiSpeciesId));
      const chipsHtml = SPECIES_CATALOG.map(sp => {
        const isSelected = selectedIds.has(sp.uiSpeciesId);
        const label = sp.labels[S.lang] || sp.labels.mr;
        return `<button
          type="button"
          style="border:1.5px solid var(--line);border-radius:99px;padding:7px 12px;font-size:13.5px;font-weight:700;background:${isSelected ? 'var(--g)' : 'var(--cream)'};color:${isSelected ? '#fff' : 'var(--ink)'};cursor:pointer"
          onclick="window.__app.toggleSpecies('${sp.uiSpeciesId}')">
          ${label}
        </button>`;
      }).join('');

      const selectedFollowUps = S.livestockProfile.filter(item => item.uiSpeciesId === 'cow' || item.uiSpeciesId === 'bullock');
      let followUpHtml = '';
      if (selectedFollowUps.length > 0) {
        followUpHtml = selectedFollowUps.map(item => {
          const spEntry = SPECIES_CATALOG.find(s => s.uiSpeciesId === item.uiSpeciesId)!;
          const spName = spEntry.labels[S.lang] || spEntry.labels.mr;
          const currentBreed = item.breedType ?? 'crossbred';

          return `<div style="margin-top:8px;padding:8px 10px;background:var(--w);border:1px solid var(--line);border-radius:12px">
            <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:5px">${spName} — ${x.species_breed_title || 'Select breed'}:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button
                type="button"
                style="border:1px solid var(--line);border-radius:99px;padding:4px 10px;font-size:12.5px;font-weight:600;background:${currentBreed === 'indigenous' ? 'var(--g)' : 'var(--cream)'};color:${currentBreed === 'indigenous' ? '#fff' : 'var(--ink)'};cursor:pointer"
                onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'indigenous')">
                ${x.breed_indigenous || 'Indigenous'}
              </button>
              <button
                type="button"
                style="border:1px solid var(--line);border-radius:99px;padding:4px 10px;font-size:12.5px;font-weight:600;background:${currentBreed === 'crossbred' ? 'var(--g)' : 'var(--cream)'};color:${currentBreed === 'crossbred' ? '#fff' : 'var(--ink)'};cursor:pointer"
                onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'crossbred')">
                ${x.breed_crossbred || 'Crossbred'}
              </button>
              <button
                type="button"
                style="border:1px solid var(--line);border-radius:99px;padding:4px 10px;font-size:12.5px;font-weight:600;background:${item.breedType === undefined ? 'var(--g)' : 'var(--cream)'};color:${item.breedType === undefined ? '#fff' : 'var(--ink)'};cursor:pointer"
                onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'dont_know')">
                ${x.breed_dont_know || "Don't know"}
              </button>
            </div>
          </div>`;
        }).join('');
      }

      editPanelHtml = `
        <div style="margin:-4px 0 10px;padding:12px;background:var(--w);border:1.5px solid var(--line);border-radius:16px">
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${chipsHtml}
          </div>
          ${followUpHtml}
        </div>`;
    }

    animalsSectionHtml = `
      <button class="card" style="justify-content:space-between" onclick="window.__app.toggleAnimalsPanel()">
        ${animalsRowInner}
      </button>
      ${editPanelHtml}`;
  }

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
    ${animalsSectionHtml}
    <div class="chips" style="margin-top:6px">
      ${(['mr', 'hi', 'en'] as const).map((l) =>
        `<button style="background:${S.lang === l ? 'var(--g)' : 'var(--g2)'};color:${S.lang === l ? '#fff' : 'var(--g)'}" onclick="window.__app.setLang('${l}')">${LN[l]}</button>`
      ).join('')}
    </div>
    ${creditLink}`;
}

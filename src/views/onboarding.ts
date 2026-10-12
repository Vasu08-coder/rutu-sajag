import { ic, RI } from '../data/icons';
import { S, FEATURE_SPECIES_V2 } from '../state/store';
import { t, header } from './shared';
import { SPECIES_CATALOG } from '../config/speciesCatalog';

export function renderOnboarding(): string {
  const x = t() as any;

  // Species selection v2 (Only when FEATURE_SPECIES_V2 is true and role === 3)
  let speciesSectionHtml = '';
  if (FEATURE_SPECIES_V2 && S.role === 3) {
    const selectedIds = new Set(S.livestockProfile.map(item => item.uiSpeciesId));

    const chipsHtml = SPECIES_CATALOG.map(sp => {
      const isSelected = selectedIds.has(sp.uiSpeciesId);
      const label = sp.labels[S.lang] || sp.labels.mr;
      return `<button
        type="button"
        style="border:1.5px solid var(--line);border-radius:99px;padding:8px 14px;font-size:14px;font-weight:700;background:${isSelected ? 'var(--g)' : 'var(--w)'};color:${isSelected ? '#fff' : 'var(--ink)'};cursor:pointer"
        onclick="window.__app.toggleSpecies('${sp.uiSpeciesId}')">
        ${label}
      </button>`;
    }).join('');

    // Follow-up breed selection for cow and bullock if selected
    const selectedFollowUps = S.livestockProfile.filter(item => item.uiSpeciesId === 'cow' || item.uiSpeciesId === 'bullock');
    let followUpHtml = '';
    if (selectedFollowUps.length > 0) {
      followUpHtml = selectedFollowUps.map(item => {
        const spEntry = SPECIES_CATALOG.find(s => s.uiSpeciesId === item.uiSpeciesId)!;
        const spName = spEntry.labels[S.lang] || spEntry.labels.mr;
        const currentBreed = item.breedType ?? 'crossbred';

        return `<div style="margin-top:10px;padding:10px 12px;background:var(--w);border:1.5px solid var(--line);border-radius:14px">
          <div style="font-size:13.5px;font-weight:700;color:var(--ink);margin-bottom:6px">${spName} — ${x.species_breed_title || 'Select breed'}:</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button
              type="button"
              style="border:1.5px solid var(--line);border-radius:99px;padding:5px 11px;font-size:13px;font-weight:600;background:${currentBreed === 'indigenous' ? 'var(--g)' : 'var(--cream)'};color:${currentBreed === 'indigenous' ? '#fff' : 'var(--ink)'};cursor:pointer"
              onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'indigenous')">
              ${x.breed_indigenous || 'Indigenous'}
            </button>
            <button
              type="button"
              style="border:1.5px solid var(--line);border-radius:99px;padding:5px 11px;font-size:13px;font-weight:600;background:${currentBreed === 'crossbred' ? 'var(--g)' : 'var(--cream)'};color:${currentBreed === 'crossbred' ? '#fff' : 'var(--ink)'};cursor:pointer"
              onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'crossbred')">
              ${x.breed_crossbred || 'Crossbred'}
            </button>
            <button
              type="button"
              style="border:1.5px solid var(--line);border-radius:99px;padding:5px 11px;font-size:13px;font-weight:600;background:${item.breedType === undefined ? 'var(--g)' : 'var(--cream)'};color:${item.breedType === undefined ? '#fff' : 'var(--ink)'};cursor:pointer"
              onclick="window.__app.setSpeciesBreed('${item.uiSpeciesId}', 'dont_know')">
              ${x.breed_dont_know || "Don't know"}
            </button>
          </div>
        </div>`;
      }).join('');
    }

    speciesSectionHtml = `
      <div style="margin-top:16px;margin-bottom:16px">
        <h3 style="margin:0 0 4px;font-size:15px;font-weight:700;color:var(--ink)">${x.species_onb_title || 'Which animals do you keep?'}</h3>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
          ${chipsHtml}
        </div>
        ${followUpHtml}
      </div>`;
  }

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
    ${speciesSectionHtml}
    <button class="cta" onclick="window.__app.nav('loc')">${t().go}</button>
    <div class="note">${ic('shield', 16)} ${t().loc}</div>`;
}

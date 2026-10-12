import { ic } from '../data/icons';
import { GAZ, COASTAL_PLACES } from '../data/places';
import { S } from '../state/store';
import { t, header, locParts } from './shared';

export function renderLocation(): string {
  const x = t();
  const u = S.ui;
  let main = '';

  if (u.status === 'detected' && u.pending) {
    const p = locParts(u.pending);
    main = `<div class="card">
      <span class="ib" style="width:46px;height:46px;background:#e3eeea;color:#1f4f4b">${ic('pin', 26)}</span>
      <div><b>${p.name}</b><div style="font-size:14px;color:var(--mut)">${p.sub || p.district}</div></div>
    </div>
    <button class="cta" style="margin-top:0" onclick="window.__app.confirmLocation()">${x.lc}</button>`;
  } else {
    const busy = u.status === 'detecting';
    const errText = u.status === 'error' && u.msg ? (x as Record<string, any>)[u.msg] as string : '';
    main = `<button class="cta" style="margin-top:0" ${busy ? 'disabled aria-busy="true"' : ''} onclick="window.__app.useMyLocation()">${busy ? x.ld : x.lu}</button>`
      + (busy ? `<div class="sms">${ic('pin', 22)} ${x.lhint}</div>` : '')
      + (u.status === 'error' ? `<div class="warn" style="font-size:14.5px;margin-top:12px" role="alert">${errText}</div>` : '');
  }

  const coastalHeaderLabel = S.lang === 'mr'
    ? 'महाराष्ट्र › किनारपट्टी (कोकण बंदरे)'
    : S.lang === 'hi'
    ? 'महाराष्ट्र › तटीय क्षेत्र (कोंकण बंदरगाह)'
    : 'Maharashtra › Coast (Konkan Ports)';

  return header() + `
    <h2>${x.lq}</h2>
    <div class="sub">${x.lqs}</div>
    ${main}
    <h3>${x.lm}</h3>
    <div class="sub" style="margin-bottom:10px">${GAZ.state[S.lang]} › ${GAZ.district[S.lang]}</div>
    ${GAZ.places.map((p) => `<button class="card" onclick="window.__app.pickPlace('${p.id}')">
      <span class="ib" style="width:46px;height:46px;background:#e3eeea;color:#1f4f4b">${ic('pin', 24)}</span>
      ${p.name[S.lang]}
    </button>`).join('')}
    <div class="sub" style="margin:16px 0 10px">${coastalHeaderLabel}</div>
    ${COASTAL_PLACES.map((p) => `<button class="card" onclick="window.__app.pickPlace('${p.id}')">
      <span class="ib" style="width:46px;height:46px;background:#dcf1ef;color:#0e766e">${ic('boat', 24)}</span>
      ${p.name[S.lang]}
    </button>`).join('')}`;
}

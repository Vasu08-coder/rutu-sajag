import { ic } from '../data/icons';
import { S } from '../state/store';
import { t, topbar, N, get5DayLabels } from './shared';
import { computedView } from '../state/store';
import { ALL_HAZARD_GUIDANCE } from '../data/allHazardsGuide';

export function renderHome(): string {
  const x = t() as any;
  const { w, risk, g } = computedView();

  const isOfflineOrStale = w && (Date.now() - (w.timestampMs || 0) > 6 * 3600 * 1000);
  const formattedUpdate = w && w.timestampMs ? new Date(w.timestampMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Dynamic Hazard Card based on active top hazard
  let hazardCardHtml = '';

  const hazardMeta = ALL_HAZARD_GUIDANCE[risk.hazard] || ALL_HAZARD_GUIDANCE.normal;
  const hazardName = hazardMeta.name[S.lang] || hazardMeta.name['mr'] || hazardMeta.name['en'];
  const hazardIcon = hazardMeta.icon || 'sun';

  if (!w && S.weatherLoading) {
    hazardCardHtml = `
      <div class="dng" style="background:var(--mut)">
        <div class="t">${ic('warn', 24)} ${x.ld || 'लोड होत आहे...'}</div>
        <div class="big">--°C</div>
        <p>${x.ld || 'हवामान माहिती लोड होत आहे...'}</p>
      </div>`;
  } else if (!w && S.weatherError) {
    hazardCardHtml = `
      <div class="card" style="background:#fdefd9;border-color:var(--amb);padding:16px;flex-direction:column;align-items:flex-start">
        <div style="font-weight:700;font-size:16px;color:var(--ink)">${x.weather_unavailable}</div>
        <p style="font-size:14px;color:var(--mut);margin-top:6px">${g.adv}</p>
      </div>`;
  } else if (w) {
    const tempDisplay = N(w.tempC);
    const forecastMaxDisplay = N(risk.maxForecastTemp);
    
    let cardTitle = hazardName;
    if (risk.hazard === 'heat_wave') {
      cardTitle = risk.isSevereHeatWave ? x.severe_heat_wave_likely : x.heat_wave_likely;
    } else if (risk.levelIndex === 0) {
      cardTitle = x.card_normal_tag;
    }

    const cardBg = risk.levelIndex >= 3
      ? 'var(--red)'
      : risk.levelIndex === 2
      ? 'var(--amb)'
      : 'var(--g)';

    let cardText = risk.levelIndex >= 1 ? g.adv : x.card_normal_adv;
    if (risk.adviseTomorrow && risk.tomorrowMaxTemp && (risk.hazard === 'heat_wave' || risk.hazard === 'hot_day')) {
      const tomorrowNote = x.heat_wave_tomorrow_prefix.replace('{t}', N(risk.tomorrowMaxTemp));
      cardText = `${tomorrowNote}. ${cardText}`;
    }

    // Subtext for daily range or conditions
    let maxSubtext = '';
    if (risk.hazard === 'cold_wave' && risk.minForecastTemp != null) {
      maxSubtext = `<div style="font-size:14px;opacity:0.9;margin-top:-2px;margin-bottom:6px">आज किमान ${N(risk.minForecastTemp)}°C पर्यंत</div>`;
    } else if (risk.maxForecastTemp !== w.tempC) {
      maxSubtext = `<div style="font-size:14px;opacity:0.9;margin-top:-2px;margin-bottom:6px">आज कमाल ${forecastMaxDisplay}°C पर्यंत</div>`;
    }

    hazardCardHtml = `
      <div class="dng" style="background:${cardBg}">
        <div class="t">${ic(hazardIcon, 24)} ${cardTitle}</div>
        <div class="big">${x.now.replace('{t}', tempDisplay)}</div>
        ${maxSubtext}
        <p>${cardText}</p>
        <div class="row">
          <button onclick="window.__app.nav('guide')">${x.full}</button>
          <button class="v" aria-label="Read aloud" onclick="window.__app.sayWeather()">${ic('spk', 24)}</button>
        </div>
      </div>`;
  }

  // Stat tiles (For Role 5 Fisher when coastal wave data exists, replace humidity with wave height)
  let firstTileLabel = x.hum;
  let firstTileVal = w ? `${N(w.humidity)}%` : '--%';

  if (S.role === 5 && S.marine && S.marine.isCoastal) {
    firstTileLabel = x.wave || 'लाटा';
    const waveUnit = S.lang === 'en' ? 'm' : 'मी';
    firstTileVal = `${N(S.marine.waveHeightM)} ${waveUnit}`;
  }

  const windVal = w ? `${N(w.windKmh)} km/h` : '-- km/h';
  const rainVal = w ? `${N(w.rainPct)}%` : '--%';

  const statTilesHtml = `
    <div class="st">
      <div>${firstTileLabel}<b>${firstTileVal}</b></div>
      <div>${x.wnd}<b>${windVal}</b></div>
      <div>${x.rn}<b>${rainVal}</b></div>
    </div>`;

  // 5-day forecast
  let forecastHtml = '';
  if (w && w.daily && w.daily.length > 0) {
    const dayLabels = get5DayLabels(w.dailyDates);
    forecastHtml = `
      <h3>${x.n5}</h3>
      <div class="days">
        ${w.daily.map((v, i) => `<div class="d ${i === 0 ? 'on' : ''}">
          ${dayLabels[i] || ''}
          ${w.cloudy[i]
            ? `<span style="display:block;margin-top:4px;color:var(--mut)">${ic('cloud', 20)}</span>`
            : '<span class="dot"></span>'}
          <b>${N(v)}°</b>
        </div>`).join('')}
      </div>`;
  }

  // Stale or update banner if needed
  let freshnessHtml = '';
  if (w && w.source === 'open-meteo') {
    if (isOfflineOrStale) {
      freshnessHtml = `<div style="font-size:12px;color:var(--red);margin-top:6px;text-align:right">${x.old_data} · ${formattedUpdate}</div>`;
    } else if (formattedUpdate) {
      freshnessHtml = `<div style="font-size:12px;color:var(--mut);margin-top:6px;text-align:right">${x.last_updated} ${formattedUpdate}</div>`;
    }
  }

  // Role 5 Coast Guard SAR button or standard 108
  const emergencyButtonsHtml = S.role === 5
    ? `<div class="sos">
        <button style="background:var(--red);color:#fff" onclick="location.href='tel:1554'">${ic('phone', 20)} ${N(1554)} (SAR)</button>
        <button style="background:var(--g2);color:var(--g)" onclick="location.href='tel:112'">${ic('shield', 20)} ${N(112)}</button>
      </div>`
    : `<div class="sos">
        <button style="background:var(--red);color:#fff" onclick="location.href='tel:108'">${ic('phone', 20)} ${N(108)}</button>
        <button style="background:var(--g2);color:var(--g)" onclick="window.__app.openHealthCentres()">${ic('pin', 20)} ${x.hc}</button>
      </div>`;

  return topbar() +
    hazardCardHtml +
    freshnessHtml +
    statTilesHtml +
    forecastHtml +
    `<h3>${x.care}</h3>
    <div class="card">
      <span class="ib" style="width:46px;height:46px;background:#fdecc8;color:#d99a14">${ic(hazardIcon, 26)}</span>
      ${g.c1}
    </div>
    <div class="card">
      <span class="ib" style="width:46px;height:46px;background:#e3eeea;color:#1f4f4b">${ic('shield', 26)}</span>
      ${g.c2}
    </div>
    ${emergencyButtonsHtml}
    <div class="sms">${ic('msg', 22)} ${x.sms}</div>`;
}

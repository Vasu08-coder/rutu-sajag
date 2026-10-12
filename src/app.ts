import './styles/tokens.css';
import './styles/app.css';

import {
  S,
  setRenderer,
  render,
  computedView,
  refreshLiveWeatherAndAlerts,
} from './state/store';
import type { Screen } from './state/store';
import type { LangCode } from './i18n';
import { stopVoice, say } from './services/voice';
import { locationService, reverseGeocode } from './services/location';
import { GAZ, COASTAL_PLACES } from './data/places';
import { detectForecastAlerts } from './services/alertService';

import { renderOnboarding } from './views/onboarding';
import { renderLocation } from './views/location';
import { renderHome } from './views/home';
import { renderAlerts } from './views/alerts';
import { renderLive, fmtTime, remaining } from './views/live';
import { renderGuide } from './views/guide';
import { renderProfile } from './views/profile';
import { renderTabs } from './views/tabs';
import { t, locLabel } from './views/shared';

const VIEWS: Record<Screen, () => string> = {
  onb:    renderOnboarding,
  loc:    renderLocation,
  home:   renderHome,
  alerts: renderAlerts,
  live:   renderLive,
  guide:  renderGuide,
  prof:   renderProfile,
};

const DEV_SCREENS: [Screen, string][] = [
  ['onb', 'Onboarding'],
  ['loc', 'Location'],
  ['home', 'Home'],
  ['alerts', 'Notifications'],
  ['live', 'Live alert'],
  ['guide', 'Heat guide'],
  ['prof', 'Profile'],
];

const IS_DEV = import.meta.env.DEV;

let tick: ReturnType<typeof setInterval> | null = null;
let lastScr: Screen | null = null;

function draw(): void {
  const scr = document.getElementById('scr')!;
  scr.innerHTML = VIEWS[S.screen]();
  scr.style.paddingBottom = S.screen === 'live' ? '0' : '';

  if (S.screen !== lastScr) scr.scrollTop = 0;
  lastScr = S.screen;

  const tabEl = document.getElementById('tabs')!;
  const showTabs = !['onb', 'loc', 'live'].includes(S.screen);
  tabEl.style.display = showTabs ? 'flex' : 'none';
  tabEl.innerHTML = showTabs ? renderTabs() : '';

  const devEl = document.getElementById('dev')!;
  const urlParams = new URLSearchParams(window.location.search);
  const isDebugMode = urlParams.get('debug') === '1';

  if (IS_DEV || isDebugMode) {
    const screensHtml = DEV_SCREENS
      .map(([id, label]) => `<button class="${S.screen === id ? 'on' : ''}" onclick="window.__app.nav('${id}')">${label}</button>`)
      .join('');

    const debugSimHtml = isDebugMode
      ? `<div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-top:4px;font-size:11px">
          <span style="font-weight:700;color:var(--ink);align-self:center">DEBUG SIM:</span>
          <button style="border:1px solid #c1452d;color:#c1452d" onclick="window.__app.injectScenario('heat_wave')">🔥 Heat Wave (47°C)</button>
          <button style="border:1px solid #1f4f4b;color:#1f4f4b" onclick="window.__app.injectScenario('cold_wave')">❄️ Cold Wave (2°C)</button>
          <button style="border:1px solid #1f4f4b;color:#1f4f4b" onclick="window.__app.injectScenario('heavy_rain')">🌧️ Heavy Rain (120mm)</button>
          <button style="border:1px solid #7a1f15;color:#7a1f15" onclick="window.__app.injectScenario('hail')">⚡ Hailstorm (Code 96)</button>
          <button style="border:1px solid #e0a526;color:#e0a526" onclick="window.__app.injectScenario('strong_wind')">💨 Gale Wind (75km/h)</button>
          <button style="border:1px solid #7b7367;color:#7b7367" onclick="window.__app.injectScenario('dense_fog')">🌫️ Dense Fog (100m)</button>
          <button style="border:1px solid #7a5190;color:#7a5190" onclick="window.__app.injectScenario('dry_spell')">🏜️ Dry Spell (18d)</button>
          <button style="border:1px solid #1f4f4b;color:#1f4f4b;font-weight:700" onclick="window.__app.resetLiveWeather()">🔄 Live Real Mode</button>
        </div>`
      : '';

    devEl.innerHTML = screensHtml + debugSimHtml;
  } else {
    devEl.style.display = 'none';
  }

  // Countdown timer for live alert screen
  clearInterval(tick ?? 0);
  tick = null;
  if (S.screen === 'live' && !S.safe && S.alertEnd) {
    tick = setInterval(() => {
      const el = document.getElementById('tm');
      if (!el || S.screen !== 'live') {
        clearInterval(tick!);
        tick = null;
        return;
      }
      el.textContent = fmtTime(remaining());
    }, 1000);
  }
}

const app = {
  nav(screen: Screen): void {
    if (screen === 'live' && !S.alertEnd) {
      if (S.isDemo) {
        S.alertEnd = Date.now() + 45 * 60000;
      } else if (S.activeLiveAlert?.expires) {
        const expTime = new Date(S.activeLiveAlert.expires).getTime();
        S.alertEnd = !isNaN(expTime) && expTime > Date.now() ? expTime : Date.now() + 30 * 60000;
      } else {
        S.alertEnd = Date.now() + 30 * 60000;
      }
    }

    if (screen === 'loc') {
      S.ui.reqId++;
      S.ui = { status: 'idle', msg: null, pending: null, reqId: S.ui.reqId };
    }

    if (screen !== S.screen) stopVoice();
    S.screen = screen;
    render();
  },

  openAlert(alertId: string, targetScreen: Screen): void {
    const alert = S.alerts.find((a) => a.id === alertId);
    if (alert) {
      S.activeLiveAlert = alert;
      if (alert.expires) {
        const exp = new Date(alert.expires).getTime();
        if (!isNaN(exp)) S.alertEnd = exp;
      }
    }
    this.nav(targetScreen);
  },

  setLang(lang: LangCode): void {
    S.lang = lang;
    document.documentElement.lang = lang;
    render();
  },

  setRole(i: number): void {
    S.role = i;
    render();
  },

  async useMyLocation(): Promise<void> {
    if (S.ui.status === 'detecting') return;
    const id = ++S.ui.reqId;
    const live = () => S.ui.reqId === id;
    S.ui = { status: 'detecting', msg: null, pending: null, reqId: id };
    render();

    const wd = setTimeout(() => {
      if (live()) { S.ui.reqId++; S.ui = { ...S.ui, status: 'error', msg: 'e_timeout' }; render(); }
    }, 20000);

    try {
      const pos = await locationService();
      if (!live()) return;
      let place;
      try {
        place = await reverseGeocode(pos.lat, pos.lon, S.lang, S.online);
      } catch {
        if (live()) { S.ui = { ...S.ui, status: 'error', msg: 'e_name' }; render(); }
        return;
      }
      if (!live()) return;
      S.ui = {
        ...S.ui,
        status: 'detected',
        pending: { ...place, lat: pos.lat, lon: pos.lon, source: 'gps' },
      };
      render();
    } catch (e: unknown) {
      if (live()) {
        const code = (e as { code?: string })?.code;
        const msg = ({ denied: 'e_denied', unsupported: 'e_unsup', timeout: 'e_timeout' } as Record<string, string>)[code ?? ''] ?? 'e_unavail';
        S.ui = { ...S.ui, status: 'error', msg };
        render();
      }
    } finally {
      clearTimeout(wd);
    }
  },

  confirmLocation(): void {
    if (!S.ui.pending) return;
    S.loc = S.ui.pending;
    const to = S.locReturn || 'home';
    S.locReturn = 'home';
    refreshLiveWeatherAndAlerts(true);
    this.nav(to as Screen);
  },

  pickPlace(id: string): void {
    const p = GAZ.places.find((x) => x.id === id) || COASTAL_PLACES.find((x) => x.id === id);
    if (!p) return;
    S.loc = {
      placeId: id,
      lat: p.lat,
      lon: p.lon,
      source: 'manual',
      district: p.district || (GAZ.places.includes(p) ? 'Yavatmal' : undefined),
      coastal: p.coastal || false,
    };
    const to = S.locReturn || 'home';
    S.locReturn = 'home';
    refreshLiveWeatherAndAlerts(true);
    this.nav(to as Screen);
  },

  changeLocation(): void {
    S.locReturn = 'prof';
    this.nav('loc');
  },

  markSafe(): void {
    if (S.safe) return;
    S.safe = true;
    render();
  },

  sayWeather(): void {
    const { w, g } = computedView();
    const tempStr = w ? String(w.tempC) : '';
    const text = t().now.replace('{t}', tempStr) + '. ' + g.adv;
    say(text, S.lang);
  },

  openHealthCentres(): void {
    const lat = S.loc?.lat;
    const lon = S.loc?.lon;
    const q = 'primary health centre near ' + (lat != null ? lat + ',' + lon : locLabel());
    try {
      window.open('https://www.google.com/maps/search/' + encodeURIComponent(q), '_blank', 'noopener');
    } catch {
      // Fail silently
    }
  },

  injectScenario(scenario: string): void {
    const now = Date.now();
    let mockW: any = {
      source: 'sample',
      asOf: 'Debug Sim',
      timestampMs: now,
      tempC: 32,
      humidity: 50,
      windKmh: 15,
      rainPct: 0,
      localHour: 14,
      daily: [32, 33, 31, 30, 32],
      dailyMin: [20, 21, 19, 18, 20],
      dailyDates: ['2026-05-15', '2026-05-16', '2026-05-17', '2026-05-18', '2026-05-19'],
      cloudy: [false, false, false, false, false],
      dailyPrecipSum: [0, 0, 0, 0, 0],
      dailyApparentMax: [33, 34, 32, 31, 33],
      dailyApparentMin: [20, 21, 19, 18, 20],
      dailyWindGustsMax: [25, 20, 22, 18, 20],
      hourlyWeatherCode: [0, 0, 0, 0, 0, 0],
      hourlyTime: ['2026-05-15T14:00'],
      hourlyVisibility: [10000, 10000],
    };

    if (scenario === 'heat_wave') {
      mockW.tempC = 47;
      mockW.daily = [47, 46, 45, 43, 44];
      mockW.dailyApparentMax = [50, 49, 48, 45, 47];
    } else if (scenario === 'cold_wave') {
      mockW.tempC = 6;
      mockW.daily = [14, 15, 16, 17, 18];
      mockW.dailyMin = [2, 3, 4, 5, 5];
      mockW.dailyDates = ['2026-01-15', '2026-01-16', '2026-01-17', '2026-01-18', '2026-01-19'];
    } else if (scenario === 'heavy_rain') {
      mockW.tempC = 25;
      mockW.rainPct = 95;
      mockW.dailyPrecipSum = [120, 45, 10, 0, 0];
      mockW.cloudy = [true, true, false, false, false];
    } else if (scenario === 'hail') {
      mockW.tempC = 28;
      mockW.hourlyWeatherCode = [96, 96, 0, 0, 0, 0];
      mockW.cloudy = [true, true, false, false, false];
    } else if (scenario === 'strong_wind') {
      mockW.tempC = 34;
      mockW.windKmh = 45;
      mockW.dailyWindGustsMax = [75, 50, 40, 30, 25];
    } else if (scenario === 'dense_fog') {
      mockW.tempC = 11;
      mockW.dailyMin = [8, 9, 10, 11, 10];
      mockW.hourlyVisibility = [120, 100, 150, 400, 1000];
    } else if (scenario === 'dry_spell') {
      mockW.tempC = 36;
      mockW.historicalDailyPrecipSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    S.weather = mockW;
    S.alerts = detectForecastAlerts(mockW, S.loc?.district || 'Yavatmal');
    const urgent = S.alerts.find((a) => a.isUrgentLive);
    if (urgent) S.activeLiveAlert = urgent;
    render();
  },

  resetLiveWeather(): void {
    refreshLiveWeatherAndAlerts(true);
  },
};

(window as unknown as { __app: typeof app }).__app = app;

setRenderer(draw);

// Background / Lifecycle Refreshers: online and visibilitychange
window.addEventListener('online', () => {
  S.online = true;
  refreshLiveWeatherAndAlerts();
});

window.addEventListener('offline', () => {
  S.online = false;
  render();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    refreshLiveWeatherAndAlerts();
  }
});

// Periodic refresh check every 15 minutes
setInterval(() => {
  refreshLiveWeatherAndAlerts();
}, 15 * 60 * 1000);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

document.documentElement.lang = S.lang;
draw();

// Initial weather fetch if location is already set
if (S.loc?.lat != null && S.loc?.lon != null) {
  refreshLiveWeatherAndAlerts();
}

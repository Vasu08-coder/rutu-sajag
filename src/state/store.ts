import type { LangCode } from '../i18n';
import {
  fetchLiveWeather,
  getCachedWeather,
  SAMPLE_WEATHER,
  type WeatherData,
} from '../services/weather';
import { safetyEngine, type SafetyRisk } from '../services/safetyEngine';
import { guidanceService } from '../services/guidance';
import {
  detectForecastAlerts,
  parseCapXml,
  alertMatchesDistrict,
  consolidateAndSortAlerts,
  type AppAlert,
} from '../services/alertService';
import type { GuideData } from '../data/guide';

import type { MarineData } from '../services/marine';
import { fetchLiveMarineData, getCachedMarineData } from '../services/marine';
import { isCoastalLocation } from '../data/places';

export type Screen = 'onb' | 'loc' | 'home' | 'alerts' | 'live' | 'guide' | 'prof';
export type UiStatus = 'idle' | 'detecting' | 'detected' | 'error';

export interface LocData {
  placeId?: string;
  village?: string;
  taluka?: string;
  district?: string;
  state?: string;
  lat: number | null;
  lon: number | null;
  source: 'gps' | 'manual';
  coastal?: boolean;
}

export interface UiState {
  status: UiStatus;
  msg: string | null;
  pending: LocData | null;
  reqId: number;
}

export interface AppState {
  isDemo: boolean;
  lang: LangCode;
  role: number;
  screen: Screen;
  activity: string | null;
  loc: LocData | null;
  locReturn: Screen;
  ui: UiState;
  safe: boolean;
  alertEnd: number | null;
  online: boolean;

  // Real-time weather and alert state
  weather: WeatherData | null;
  weatherLoading: boolean;
  weatherError: string | null;
  lastWeatherFetchTime: number;

  marine: MarineData | null;

  alerts: AppAlert[];
  alertsLoading: boolean;
  activeLiveAlert: AppAlert | null;
}

const PERSIST_KEY = 'rutu_sajag_state';

function isDemoUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('demo') === '1';
}

function loadPersisted(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<AppState>;
  } catch {
    return {};
  }
}

function savePersisted(s: AppState): void {
  try {
    const data = { lang: s.lang, role: s.role, loc: s.loc };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

const persisted = loadPersisted();
const isDemoMode = isDemoUrl();

const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const urlLang = urlParams?.get('lang') as LangCode | null;
const urlScreen = urlParams?.get('screen') as Screen | null;

export const S: AppState = {
  isDemo: isDemoMode,
  lang: urlLang || (persisted.lang as LangCode) || 'mr',
  role: persisted.role ?? 0,
  screen: urlScreen || (persisted.loc ? 'home' : 'onb'),
  activity: null,
  loc: persisted.loc ?? { placeId: 'yavatmal', lat: 20.39, lon: 78.13, source: 'manual' },
  locReturn: 'home',
  ui: { status: 'idle', msg: null, pending: null, reqId: 0 },
  safe: false,
  alertEnd: null,
  online: typeof navigator !== 'undefined' && navigator.onLine !== false,

  weather: isDemoMode ? SAMPLE_WEATHER : null,
  weatherLoading: false,
  weatherError: null,
  lastWeatherFetchTime: 0,

  marine: null,

  alerts: [],
  alertsLoading: false,
  activeLiveAlert: null,
};

let _render: (() => void) | null = null;

export function setRenderer(fn: () => void): void {
  _render = fn;
}

export function render(): void {
  savePersisted(S);
  _render?.();
}

/**
 * Loads weather, marine data, and alerts for the selected location.
 * Checks cache first, refreshes if older than 30 mins, or fetches fresh.
 */
export async function refreshLiveWeatherAndAlerts(force: boolean = false): Promise<void> {
  if (S.isDemo) {
    S.weather = SAMPLE_WEATHER;
    S.weatherLoading = false;
    render();
    return;
  }

  const lat = S.loc?.lat;
  const lon = S.loc?.lon;
  const district = S.loc?.district || '';
  const isCoastal = isCoastalLocation(district, lat, lon);

  if (lat == null || lon == null) {
    S.weather = null;
    S.marine = null;
    S.weatherLoading = false;
    render();
    return;
  }

  const now = Date.now();
  const THIRTY_MINS = 30 * 60 * 1000;

  // Check cache immediately to populate instant UI
  if (!S.weather) {
    const cached = getCachedWeather(lat, lon);
    if (cached) {
      S.weather = cached.data;
      render();
    }
  }

  if (isCoastal && S.role === 5 && !S.marine) {
    const cachedMarine = getCachedMarineData(lat, lon);
    if (cachedMarine) {
      S.marine = cachedMarine.data;
      render();
    }
  }

  // If not forced and recently fetched, skip network
  if (!force && now - S.lastWeatherFetchTime < THIRTY_MINS && S.weather) {
    return;
  }

  S.weatherLoading = !S.weather;
  render();

  try {
    const [w, m] = await Promise.all([
      fetchLiveWeather(lat, lon),
      isCoastal ? fetchLiveMarineData(lat, lon, district) : Promise.resolve(null),
    ]);
    S.weather = w;
    S.marine = m;
    S.weatherLoading = false;
    S.weatherError = null;
    S.lastWeatherFetchTime = now;
  } catch (err: any) {
    S.weatherLoading = false;
    if (!S.weather) {
      // Check cache one more time
      const cached = getCachedWeather(lat, lon);
      if (cached) {
        S.weather = cached.data;
      } else {
        S.weatherError = 'weather_unavailable';
      }
    }
  }

  // Derive forecast alerts and fetch official NDMA SACHET alerts
  await refreshAlerts();
  render();
}

/**
 * Refreshes both forecast-derived alerts and official SACHET alerts
 */
export async function refreshAlerts(): Promise<void> {
  if (S.isDemo) {
    // In demo mode, provide demo alerts
    return;
  }

  const district = S.loc?.district || '';
  const lat = S.loc?.lat;
  const lon = S.loc?.lon;
  const isCoastal = isCoastalLocation(district, lat, lon);

  const forecastAlerts = S.weather
    ? detectForecastAlerts(
        S.weather,
        district || 'Yavatmal',
        S.role,
        isCoastal,
        S.marine?.waveHeightM ?? null
      )
    : [];
  let officialAlerts: AppAlert[] = [];

  // Fetch official NDMA SACHET alerts via proxy
  try {
    const proxyUrl = (import.meta.env.VITE_ALERTS_PROXY_URL as string) || '/api/sachet';
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.alerts)) {
        const userDistrict = S.loc?.district || '';
        for (const item of json.alerts) {
          if (item.rawCapXml) {
            const parsed = parseCapXml(item.rawCapXml);
            if (parsed && alertMatchesDistrict(parsed, userDistrict)) {
              officialAlerts.push(parsed as AppAlert);
            }
          }
        }
      }
    }
  } catch {
    // Official alert fetch error is non-fatal; forecast alerts still apply
  }

  // Combine alerts: official first, de-duplicated and consolidated with anti-fatigue cooldown
  S.alerts = consolidateAndSortAlerts(officialAlerts, forecastAlerts);

  // Check if any alert triggers live screen
  const urgent = S.alerts.find((a) => a.isUrgentLive);
  if (urgent) {
    S.activeLiveAlert = urgent;
  }
}

export function computedView(): {
  w: WeatherData | null;
  risk: SafetyRisk;
  g: GuideData;
} {
  const w = S.weather;
  const district = S.loc?.district || 'Yavatmal';
  const isCoastal = isCoastalLocation(district, S.loc?.lat, S.loc?.lon);

  // Run safety engine on live weather or fallback dummy
  const risk = safetyEngine({
    weather: w || {
      source: 'open-meteo',
      asOf: null,
      timestampMs: 0,
      tempC: 30,
      humidity: 40,
      windKmh: 10,
      rainPct: 0,
      localHour: 12,
      daily: [],
      dailyMin: [],
      dailyDates: [],
      cloudy: [],
      dailyPrecipSum: [],
      dailyApparentMax: [],
      dailyApparentMin: [],
    },
    role: S.role,
    activity: S.activity,
    userDistrict: district,
    marineWaveHeightM: S.marine?.waveHeightM ?? null,
    isCoastal,
  });

  const g = guidanceService(risk, S.role, S.lang);
  return { w, risk, g };
}

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

  // Livestock Species Selection v2 state
  livestockProfile: LivestockProfileItem[];
  profileAnimalsExpanded?: boolean;
}

export interface LivestockProfileItem {
  uiSpeciesId: string;
  breedType?: 'indigenous' | 'crossbred';
}

const env: any = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : ((globalThis as any).process?.env || {});

export function isDebugEnabled(envObj?: any): boolean {
  const e = envObj || env;
  return Boolean(e.DEV) || e.VITE_ENABLE_DEBUG === 'true';
}

export const DEBUG_ENABLED = isDebugEnabled(env);
export const FEATURE_SPECIES_V2 = env.VITE_FEATURE_SPECIES_V2 === 'true';
export const INCLUDE_DRAFT_CONTENT = Boolean(env.DEV) || env.VITE_INCLUDE_DRAFT_CONTENT === 'true';

const PERSIST_KEY = 'rutu_sajag_state';
const LIVESTOCK_PERSIST_KEY = 'livestockProfile.v2';

export function isDemoUrl(debugEnabled: boolean = DEBUG_ENABLED): boolean {
  if (!debugEnabled) return false;
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

export function loadPersistedLivestock(): LivestockProfileItem[] {
  try {
    const raw = localStorage.getItem(LIVESTOCK_PERSIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => item && typeof item.uiSpeciesId === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

export function savePersistedLivestock(profile: LivestockProfileItem[]): void {
  try {
    localStorage.setItem(LIVESTOCK_PERSIST_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage errors
  }
}

function savePersisted(s: AppState): void {
  try {
    // URL overrides are never written to localStorage in production
    const langToSave = (!DEBUG_ENABLED && hasUrlLangOverride) ? (persisted.lang || 'mr') : s.lang;
    const data = { lang: langToSave, role: s.role, loc: s.loc };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(data));
    if (FEATURE_SPECIES_V2) {
      savePersistedLivestock(s.livestockProfile);
    }
  } catch {
    // Ignore storage errors
  }
}

const persisted = loadPersisted();
const persistedLivestock = loadPersistedLivestock();

const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;

// ?lang is kept from original prototype as it is harmless display-only and does not affect safety calculations
const rawLang = urlParams?.get('lang');
const urlLang = (rawLang === 'mr' || rawLang === 'hi' || rawLang === 'en') ? (rawLang as LangCode) : null;
let hasUrlLangOverride = Boolean(urlLang && urlLang !== persisted.lang);

export function clearUrlLangOverride(): void {
  hasUrlLangOverride = false;
}

export function parseUrlAnimals(param: string | null | undefined): LivestockProfileItem[] | null {
  if (!param) return null;
  return param.split(',').map(part => {
    const [uiSpeciesId, breedType] = part.split(':');
    return {
      uiSpeciesId,
      breedType: (breedType === 'indigenous' || breedType === 'crossbred') ? breedType : (uiSpeciesId === 'cow' || uiSpeciesId === 'bullock' ? 'crossbred' : undefined)
    };
  });
}

export function resolveInitialStateFromUrl(
  search: string,
  persistedState: Partial<AppState>,
  persistedLivestockList: LivestockProfileItem[],
  debugEnabled: boolean = DEBUG_ENABLED
): {
  isDemo: boolean;
  screen: Screen;
  role: number;
  livestockProfile: LivestockProfileItem[];
  lang: LangCode;
  scenario: string | null;
  allowDebug: boolean;
} {
  const params = new URLSearchParams(search);
  const rLang = params.get('lang');
  const validLang = (rLang === 'mr' || rLang === 'hi' || rLang === 'en') ? (rLang as LangCode) : null;
  const lang = validLang || (persistedState.lang as LangCode) || 'mr';

  // In production (debugEnabled is false), all debug/testing/demo overrides are strictly ignored
  if (!debugEnabled) {
    return {
      isDemo: false,
      screen: (persistedState.loc ? 'home' : 'onb'),
      role: persistedState.role ?? 0,
      livestockProfile: persistedLivestockList,
      lang,
      scenario: null,
      allowDebug: false,
    };
  }

  const isDemo = params.get('demo') === '1';
  const isDebugMode = params.get('debug') === '1';
  const roleParam = params.get('role');
  const role = roleParam != null ? parseInt(roleParam, 10) : (persistedState.role ?? 0);
  const screenParam = params.get('screen') as Screen | null;
  const screen = screenParam || (persistedState.loc ? 'home' : 'onb');
  const animalsParam = params.get('animals');
  const parsedAnimals = parseUrlAnimals(animalsParam);
  const livestockProfile = parsedAnimals ?? persistedLivestockList;
  const scenario = params.get('scenario');

  return {
    isDemo,
    screen,
    role,
    livestockProfile,
    lang,
    scenario,
    allowDebug: isDebugMode,
  };
}

const resolvedInit = resolveInitialStateFromUrl(
  typeof window !== 'undefined' ? window.location.search : '',
  persisted,
  persistedLivestock,
  DEBUG_ENABLED
);

const isDemoMode = resolvedInit.isDemo;
const urlAnimalsExpanded = DEBUG_ENABLED && urlParams?.get('expandAnimals') === '1';

export const S: AppState = {
  isDemo: isDemoMode,
  lang: resolvedInit.lang,
  role: resolvedInit.role,
  screen: resolvedInit.screen,
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

  livestockProfile: resolvedInit.livestockProfile,
  profileAnimalsExpanded: urlAnimalsExpanded,
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
    const proxyUrl = (env.VITE_ALERTS_PROXY_URL as string) || '/api/sachet';
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

// Open-Meteo Weather Service with extended parameters, caching, and past_days support.

export interface WeatherData {
  source: 'open-meteo' | 'sample';
  asOf: string | null;     // ISO timestamp or formatted string
  timestampMs: number;     // for age calculation
  tempC: number;
  humidity: number;        // 0-100 %
  windKmh: number;
  rainPct: number;         // 0-100 %
  localHour: number;       // 0-23
  daily: number[];         // max temperatures
  dailyMin: number[];      // min temperatures
  dailyDates: string[];    // ISO date strings YYYY-MM-DD
  cloudy: boolean[];       // cloudiness booleans
  dailyPrecipSum: number[]; // mm/24h per day
  dailyApparentMax: number[]; // apparent max temp °C
  dailyApparentMin: number[]; // apparent min temp °C
  dailyWindGustsMax?: number[]; // km/h
  dailyWeatherCode?: number[];
  hourlyWeatherCode?: number[];
  hourlyPrecipProb?: number[];
  hourlyTime?: string[];
  hourlyVisibility?: number[]; // meters
  hourlyCape?: number[];       // J/kg
  pastRainSum21Days?: number[]; // past 21 days precipitation_sum in mm
  historicalDailyPrecipSum?: number[];
}

export interface CachedWeatherRecord {
  data: WeatherData;
  cachedAt: number;
}

export const SAMPLE_WEATHER: WeatherData = {
  source: 'sample',
  asOf: 'Demo',
  timestampMs: Date.now(),
  tempC: 45,
  humidity: 38,
  windKmh: 12,
  rainPct: 0,
  localHour: 14,
  daily: [45, 44, 39, 36, 41],
  dailyMin: [28, 27, 24, 22, 25],
  dailyDates: [],
  cloudy: [false, false, true, true, false],
  dailyPrecipSum: [0, 0, 5.2, 12.0, 0],
  dailyApparentMax: [48, 47, 42, 38, 43],
  dailyApparentMin: [27, 26, 23, 21, 24],
};

const WEATHER_CACHE_PREFIX = 'rutu_weather_cache_';

export function mapOpenMeteoResponse(json: any): WeatherData {
  const current = json.current || {};
  const daily = json.daily || {};
  const hourly = json.hourly || {};

  const tempC = Math.round(Number(current.temperature_2m ?? 0));
  const humidity = Math.round(Number(current.relative_humidity_2m ?? 0));
  const windKmh = Math.round(Number(current.wind_speed_10m ?? 0));

  const rainPct = Array.isArray(daily.precipitation_probability_max) && daily.precipitation_probability_max.length > 0
    ? Math.round(Number(daily.precipitation_probability_max[0] ?? 0))
    : 0;

  // Local hour extraction: current.time is e.g. "2026-10-11T19:30"
  let localHour = new Date().getHours();
  if (typeof current.time === 'string' && current.time.includes('T')) {
    const timePart = current.time.split('T')[1];
    const hourPart = parseInt(timePart.split(':')[0], 10);
    if (!isNaN(hourPart)) localHour = hourPart;
  }

  // 5 daily max & min temps
  const rawMaxTemps: number[] = Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max : [];
  const dailyTemps = rawMaxTemps.slice(0, 5).map((t: number) => Math.round(Number(t)));

  const rawMinTemps: number[] = Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min : [];
  const dailyMin = rawMinTemps.slice(0, 5).map((t: number) => Math.round(Number(t)));

  const dailyDates: string[] = Array.isArray(daily.time) ? daily.time.slice(0, 5) : [];

  // cloudy[i] = true for weather_code 2, 3, 45, 48 or >= 51
  const rawCodes: number[] = Array.isArray(daily.weather_code) ? daily.weather_code : [];
  const cloudy = rawCodes.slice(0, 5).map((c: number) => c === 2 || c === 3 || c === 45 || c === 48 || c >= 51);

  // Precipitation sum in mm
  const rawPrecip: number[] = Array.isArray(daily.precipitation_sum) ? daily.precipitation_sum : [];
  const dailyPrecipSum = rawPrecip.slice(0, 5).map((p: number) => Math.round(Number(p) * 10) / 10);

  // Apparent temperatures
  const rawApparentMax: number[] = Array.isArray(daily.apparent_temperature_max) ? daily.apparent_temperature_max : [];
  const dailyApparentMax = rawApparentMax.slice(0, 5).map((t: number) => Math.round(Number(t)));

  const rawApparentMin: number[] = Array.isArray(daily.apparent_temperature_min) ? daily.apparent_temperature_min : [];
  const dailyApparentMin = rawApparentMin.slice(0, 5).map((t: number) => Math.round(Number(t)));

  const rawWindGusts: number[] = Array.isArray(daily.wind_gusts_10m_max) ? daily.wind_gusts_10m_max : [];
  const dailyWindGustsMax = rawWindGusts.slice(0, 5).map((g: number) => Math.round(Number(g)));

  return {
    source: 'open-meteo',
    asOf: current.time || new Date().toISOString(),
    timestampMs: Date.now(),
    tempC,
    humidity,
    windKmh,
    rainPct,
    localHour,
    daily: dailyTemps,
    dailyMin,
    dailyDates,
    cloudy,
    dailyPrecipSum,
    dailyApparentMax,
    dailyApparentMin,
    dailyWindGustsMax,
    dailyWeatherCode: rawCodes.slice(0, 5),
    hourlyWeatherCode: Array.isArray(hourly.weather_code) ? hourly.weather_code : [],
    hourlyPrecipProb: Array.isArray(hourly.precipitation_probability) ? hourly.precipitation_probability : [],
    hourlyTime: Array.isArray(hourly.time) ? hourly.time : [],
    hourlyVisibility: Array.isArray(hourly.visibility) ? hourly.visibility : [],
    hourlyCape: Array.isArray(hourly.cape) ? hourly.cape : [],
    historicalDailyPrecipSum: rawPrecip.map((p: number) => Math.round(Number(p) * 10) / 10),
  };
}

export function getCachedWeather(lat: number, lon: number): CachedWeatherRecord | null {
  try {
    const key = `${WEATHER_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CachedWeatherRecord;
  } catch {
    return null;
  }
}

export function setCachedWeather(lat: number, lon: number, data: WeatherData): void {
  try {
    const key = `${WEATHER_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
    const record: CachedWeatherRecord = { data, cachedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(record));
  } catch {
    // Ignore storage quota errors
  }
}

export async function fetchLiveWeather(lat: number, lon: number): Promise<WeatherData> {
  const roundedLat = Number(lat.toFixed(2));
  const roundedLon = Number(lon.toFixed(2));

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLon}`
    + `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`
    + `&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,weather_code,wind_gusts_10m_max,uv_index_max`
    + `&hourly=weather_code,precipitation_probability,visibility,cape`
    + `&timezone=auto&forecast_days=5&past_days=21`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const json = await res.json();
    const weather = mapOpenMeteoResponse(json);

    // If past 21 days precipitation is returned, extract it
    if (json.daily?.precipitation_sum && json.daily.precipitation_sum.length > 21) {
      weather.pastRainSum21Days = json.daily.precipitation_sum.slice(0, 21);
    }

    setCachedWeather(roundedLat, roundedLon, weather);
    return weather;
  } finally {
    clearTimeout(timeoutId);
  }
}

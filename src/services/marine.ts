// Open-Meteo Marine API client for coastal wave forecasts, caching, and fallback.

import { snapToNearestSeaPoint, isCoastalLocation } from '../data/places';
import { HAZARD_THRESHOLDS } from '../config/hazards';

export interface MarineData {
  source: 'open-meteo-marine';
  asOf: string;
  timestampMs: number;
  waveHeightM: number;           // Current significant wave height in meters
  wavePeriodSec: number;         // Wave period in seconds
  waveDirectionDeg?: number;     // Degrees
  swellWaveHeightM?: number;     // Swell wave height in meters
  windWaveHeightM?: number;      // Wind wave height in meters
  dailyMaxWaveHeightM?: number[]; // Daily max wave heights
  isMonsoonBanActive: boolean;   // June 1 to July 31
  isCoastal: boolean;
}

const MARINE_CACHE_PREFIX = 'rutu_marine_cache_';

export function getCachedMarineData(lat: number, lon: number): { data: MarineData; cachedAt: number } | null {
  try {
    const key = `${MARINE_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCachedMarineData(lat: number, lon: number, data: MarineData): void {
  try {
    const key = `${MARINE_CACHE_PREFIX}${lat.toFixed(2)}_${lon.toFixed(2)}`;
    localStorage.setItem(key, JSON.stringify({ data, cachedAt: Date.now() }));
  } catch {
    // Ignore quota errors
  }
}

/**
 * Checks if current date falls within Maharashtra Dept of Fisheries Monsoon Fishing Ban
 * (June 1 through July 31)
 */
export function isMonsoonFishingBan(date: Date = new Date()): boolean {
  const m = date.getMonth() + 1; // 1-12
  const start = HAZARD_THRESHOLDS.monsoonFishingBanStartMonth.value; // 6
  const end = HAZARD_THRESHOLDS.monsoonFishingBanEndMonth.value;     // 7
  return m >= start && m <= end;
}

/**
 * Fetches marine wave forecast from Open-Meteo Marine API.
 * Uses 8s timeout, snaps nearshore/land coordinates offshore, and caches response.
 */
export async function fetchLiveMarineData(
  lat: number,
  lon: number,
  district: string = ''
): Promise<MarineData | null> {
  const isCoastal = isCoastalLocation(district, lat, lon);
  if (!isCoastal) {
    return null;
  }

  // Snap to nearest offshore point
  const seaPoint = snapToNearestSeaPoint(lat, lon);
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);

  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${seaPoint.lat}&longitude=${seaPoint.lon}&hourly=wave_height,wave_period,wave_direction,swell_wave_height,wind_wave_height&daily=wave_height_max&timezone=auto`;

  try {
    const res = await fetch(url, { signal: ctl.signal });
    if (!res.ok) {
      throw new Error(`Marine API HTTP ${res.status}`);
    }
    const json = await res.json();
    clearTimeout(timer);

    const hourly = json.hourly || {};
    const daily = json.daily || {};

    const waveHeights: number[] = Array.isArray(hourly.wave_height) ? hourly.wave_height.filter((x: any) => x != null) : [];
    const wavePeriods: number[] = Array.isArray(hourly.wave_period) ? hourly.wave_period.filter((x: any) => x != null) : [];
    const waveDirs: number[] = Array.isArray(hourly.wave_direction) ? hourly.wave_direction.filter((x: any) => x != null) : [];
    const swellHeights: number[] = Array.isArray(hourly.swell_wave_height) ? hourly.swell_wave_height.filter((x: any) => x != null) : [];
    const windWaveHeights: number[] = Array.isArray(hourly.wind_wave_height) ? hourly.wind_wave_height.filter((x: any) => x != null) : [];

    // If grid returns no valid wave height data (e.g. land grid), return null
    if (waveHeights.length === 0) {
      return null;
    }

    const currentWaveHeight = Number((waveHeights[0] ?? 0).toFixed(1));
    const currentWavePeriod = Number((wavePeriods[0] ?? 0).toFixed(1));
    const currentWaveDir = waveDirs[0] != null ? Math.round(waveDirs[0]) : undefined;
    const currentSwellHeight = swellHeights[0] != null ? Number(swellHeights[0].toFixed(1)) : undefined;
    const currentWindWaveHeight = windWaveHeights[0] != null ? Number(windWaveHeights[0].toFixed(1)) : undefined;

    const dailyMaxWaves: number[] = Array.isArray(daily.wave_height_max)
      ? daily.wave_height_max.slice(0, 5).map((w: number) => Number(Number(w).toFixed(1)))
      : [];

    const result: MarineData = {
      source: 'open-meteo-marine',
      asOf: new Date().toISOString(),
      timestampMs: Date.now(),
      waveHeightM: currentWaveHeight,
      wavePeriodSec: currentWavePeriod,
      waveDirectionDeg: currentWaveDir,
      swellWaveHeightM: currentSwellHeight,
      windWaveHeightM: currentWindWaveHeight,
      dailyMaxWaveHeightM: dailyMaxWaves,
      isMonsoonBanActive: isMonsoonFishingBan(),
      isCoastal: true,
    };

    setCachedMarineData(lat, lon, result);
    return result;
  } catch (err) {
    clearTimeout(timer);
    // Try cache
    const cached = getCachedMarineData(lat, lon);
    if (cached) {
      return cached.data;
    }
    return null;
  }
}

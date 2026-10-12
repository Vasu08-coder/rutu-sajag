import type { WeatherData } from './weather';
import { HAZARD_THRESHOLDS, getSeasonForDateAndDistrict } from '../config/hazards';
import type { HazardId } from '../data/allHazardsGuide';

export type HazardType = HazardId;
export type HazardLevel = 'low' | 'moderate' | 'high' | 'very_high' | 'extreme';

export interface SafetyRisk {
  hazard: HazardId;
  level: HazardLevel;
  levelIndex: number;          // 0 to 4
  reasons: string[];
  maxForecastTemp: number;
  minForecastTemp?: number;
  lookAheadHours: number;
  isForecastHeatWave: boolean;
  isSevereHeatWave: boolean;
  adviseTomorrow: boolean;
  tomorrowMaxTemp?: number;
  season: string;
}

export interface SafetyEngineInput {
  weather: WeatherData;
  role: number;                // 0=field laborer, 1=farmer, 2=household, 3=animal keeper, 4=commuter, 5=fisher
  activity: string | null;
  userDistrict?: string;
  normalMaxTemp?: number | null; // Climatological normal maximum for location & day-of-year (null if unavailable)
  normalMinTemp?: number | null; // Climatological normal minimum for location & day-of-year
  simulatedDate?: Date;        // Optional date override for testing seasons
  marineWaveHeightM?: number | null; // Role 5 coastal wave height in meters
  isCoastal?: boolean;
}

/**
 * All-Season Safety Engine
 * Evaluates weather against multi-hazard detectors across summer, monsoon, post-monsoon, and winter.
 * F1 compliant: strictly ignores departure-from-normal if real normal is null.
 */
export function safetyEngine({
  weather: w,
  role,
  activity,
  userDistrict = 'Yavatmal',
  normalMaxTemp = null,
  normalMinTemp = null,
  simulatedDate,
  marineWaveHeightM = null,
  isCoastal = false,
}: SafetyEngineInput): SafetyRisk {
  const reasons: string[] = [];
  const evalDate = simulatedDate || new Date();
  const season = getSeasonForDateAndDistrict(evalDate, userDistrict);

  // 1. Forecast look-ahead: Today's maximum and tomorrow's maximum
  const todayMax = Array.isArray(w.daily) && w.daily.length > 0 ? w.daily[0] : w.tempC;
  const tomorrowMax = Array.isArray(w.daily) && w.daily.length > 1 ? w.daily[1] : todayMax;
  const todayMin = Array.isArray(w.dailyMin) && w.dailyMin.length > 0 ? w.dailyMin[0] : null;
  const todayApparentMax = Array.isArray(w.dailyApparentMax) && w.dailyApparentMax.length > 0 ? w.dailyApparentMax[0] : todayMax;
  const todayPrecip = Array.isArray(w.dailyPrecipSum) && w.dailyPrecipSum.length > 0 ? w.dailyPrecipSum[0] : 0;
  const maxGust = Array.isArray(w.dailyWindGustsMax) && w.dailyWindGustsMax.length > 0 ? w.dailyWindGustsMax[0] : (w.windKmh || 0);

  // Effective max temp
  const effectiveMax = Math.max(todayMax, w.tempC);

  // Determine active hazard candidates
  let topHazard: HazardId = 'normal';
  let topLevelIndex = 0; // 0=low (normal), 1=moderate, 2=high, 3=very_high, 4=extreme

  // -------------------------------------------------------------------------
  // A. HEAT WAVE & HOT DAY ADVISORY
  // -------------------------------------------------------------------------
  const isPlainsQualifying = effectiveMax >= HAZARD_THRESHOLDS.heatWavePlainsMinMaxTemp.value;
  let isHeatWave = effectiveMax >= HAZARD_THRESHOLDS.heatWaveAbsoluteMax.value;
  let isSevereHeatWave = effectiveMax >= HAZARD_THRESHOLDS.severeHeatWaveAbsoluteMax.value;

  // F1 Compliance: Departure from normal evaluated ONLY if normal is a real number (not null)
  if (isPlainsQualifying && typeof normalMaxTemp === 'number') {
    const departure = effectiveMax - normalMaxTemp;
    if (departure > HAZARD_THRESHOLDS.severeHeatWaveDepartureNormal.value) {
      isHeatWave = true;
      isSevereHeatWave = true;
      reasons.push('imd_severe_heat_wave_departure');
    } else if (departure >= HAZARD_THRESHOLDS.heatWaveDepartureNormal.value) {
      isHeatWave = true;
      reasons.push('imd_heat_wave_departure');
    }
  }

  if (effectiveMax >= HAZARD_THRESHOLDS.severeHeatWaveAbsoluteMax.value) {
    reasons.push('imd_severe_heat_wave_absolute');
  } else if (effectiveMax >= HAZARD_THRESHOLDS.heatWaveAbsoluteMax.value) {
    reasons.push('imd_heat_wave_absolute');
  }

  let heatLv = 0;
  if (isSevereHeatWave) {
    heatLv = 4;
  } else if (isHeatWave) {
    heatLv = 4;
  } else if (effectiveMax >= HAZARD_THRESHOLDS.hotDayAdvisoryHigh.value) {
    heatLv = 3;
    reasons.push('high_forecast_temperature');
  } else if (effectiveMax >= HAZARD_THRESHOLDS.hotDayAdvisoryModerate.value) {
    heatLv = 2;
    reasons.push('moderate_forecast_temperature');
  } else if (effectiveMax >= HAZARD_THRESHOLDS.hotDayAdvisoryMild.value) {
    heatLv = 1;
    reasons.push('mild_forecast_temperature');
  }

  if (todayApparentMax >= HAZARD_THRESHOLDS.apparentTemperatureCaution.value && heatLv >= 1 && heatLv < 4) {
    heatLv = Math.min(4, heatLv + 1);
    reasons.push('high_apparent_temperature');
  }

  // Outdoor Escalation Logic per Role:
  // - Roles 0, 1, 3: full daytime outdoor workers. Escalation applies during midday 11-16.
  // - Role 4 (Commuter): outdoors ONLY during morning commute (06:30-09:30) or evening commute (16:00-19:00).
  // - Role 5 (Fisher): open water operations. Escalation applies if midday outdoors or on water.
  const midday = w.localHour >= 11 && w.localHour <= 16;
  const isCommuteHour = (w.localHour >= 6.5 && w.localHour <= 9.5) || (w.localHour >= 16 && w.localHour <= 19);

  let isWorkerExposed = false;
  if (role === 4) {
    // Role 4 commuter only exposed outdoors during commute hours
    isWorkerExposed = isCommuteHour || activity === 'travelling';
  } else if (role === 5) {
    isWorkerExposed = midday || ['fishing', 'travelling'].includes(activity ?? '');
  } else {
    // Roles 0, 1, 3 (or explicit manual activity)
    const outdoorBase = role === 0 || role === 1 || role === 3 ||
      ['field_work', 'irrigation', 'machinery', 'travelling', 'animal_care'].includes(activity ?? '');
    isWorkerExposed = midday && outdoorBase;
  }

  if (isWorkerExposed && heatLv >= 1 && heatLv < 4) {
    heatLv = Math.min(4, heatLv + 1);
    reasons.push(role === 4 ? 'commute_window_exposure' : 'midday_outdoor');
  }

  if (heatLv > topLevelIndex) {
    topLevelIndex = heatLv;
    topHazard = isHeatWave || isSevereHeatWave ? 'heat_wave' : 'hot_day';
  }

  // Warm night check
  if (effectiveMax >= 40 && todayMin !== null && todayMin >= HAZARD_THRESHOLDS.hotNightMinTemp.value) {
    if (topLevelIndex < 2) {
      topLevelIndex = 2;
      topHazard = 'hot_night';
      reasons.push('hot_night_warmth');
    }
  }

  // -------------------------------------------------------------------------
  // B. THUNDERSTORM & HAIL
  // -------------------------------------------------------------------------
  const hourlyCodes: number[] = w.hourlyWeatherCode || [];
  const checkWindow = hourlyCodes.slice(0, HAZARD_THRESHOLDS.thunderstormLookAheadHours.value);
  const hasHail = checkWindow.some((c: number) => HAZARD_THRESHOLDS.hailWmoCodes.value.includes(c));
  const hasThunder = checkWindow.some((c: number) => HAZARD_THRESHOLDS.thunderstormWmoCodes.value.includes(c));

  if (hasHail) {
    if (topLevelIndex < 4) {
      topLevelIndex = 4;
      topHazard = 'hail';
      reasons.push('hail_forecast');
    }
  } else if (hasThunder) {
    // For Role 5 (Fisher on water), open-water thunderstorm is elevated risk (Level 4 Extreme)
    const thunderLv = role === 5 ? 4 : 3;
    if (topLevelIndex < thunderLv) {
      topLevelIndex = thunderLv;
      topHazard = 'thunderstorm';
      reasons.push(role === 5 ? 'thunderstorm_open_water' : 'thunderstorm_forecast');
    }
  }

  // -------------------------------------------------------------------------
  // C. HEAVY RAIN
  // -------------------------------------------------------------------------
  if (todayPrecip >= HAZARD_THRESHOLDS.rainExtremelyHeavyMin.value) {
    if (topLevelIndex < 4) {
      topLevelIndex = 4;
      topHazard = 'heavy_rain';
      reasons.push('extremely_heavy_rain');
    }
  } else if (todayPrecip >= HAZARD_THRESHOLDS.rainVeryHeavyMin.value) {
    if (topLevelIndex < 3) {
      topLevelIndex = 3;
      topHazard = 'heavy_rain';
      reasons.push('very_heavy_rain');
    }
  } else if (todayPrecip >= HAZARD_THRESHOLDS.rainHeavyMin.value) {
    if (topLevelIndex < 2) {
      topLevelIndex = 2;
      topHazard = 'heavy_rain';
      reasons.push('heavy_rain');
    }
  }

  // -------------------------------------------------------------------------
  // D. COLD WAVE & GROUND FROST (Winter)
  // -------------------------------------------------------------------------
  if (todayMin !== null) {
    let isColdWave = todayMin <= HAZARD_THRESHOLDS.coldWaveAbsoluteMin.value;
    let isSevereColdWave = todayMin <= HAZARD_THRESHOLDS.severeColdWaveAbsoluteMin.value;

    // F1 Compliance: Departure from normal evaluated ONLY if normal is a real number
    if (todayMin <= HAZARD_THRESHOLDS.coldWavePlainsQualifyingMinTemp.value && typeof normalMinTemp === 'number') {
      const departure = todayMin - normalMinTemp;
      if (departure < HAZARD_THRESHOLDS.severeColdWaveDepartureNormal.value) {
        isSevereColdWave = true;
        reasons.push('imd_severe_cold_wave_departure');
      } else if (departure <= HAZARD_THRESHOLDS.coldWaveDepartureNormal.value) {
        isColdWave = true;
        reasons.push('imd_cold_wave_departure');
      }
    }

    if (isSevereColdWave) {
      if (topLevelIndex < 4) {
        topLevelIndex = 4;
        topHazard = 'cold_wave';
        reasons.push('severe_cold_wave');
      }
    } else if (isColdWave) {
      if (topLevelIndex < 3) {
        topLevelIndex = 3;
        topHazard = 'cold_wave';
        reasons.push('cold_wave');
      }
    }

    if (todayMin <= HAZARD_THRESHOLDS.frostMinTempCutoff.value && topLevelIndex < 3) {
      topLevelIndex = 3;
      topHazard = 'ground_frost';
      reasons.push('ground_frost_risk');
    }
  }

  // -------------------------------------------------------------------------
  // E. DENSE FOG & STRONG WIND
  // -------------------------------------------------------------------------
  const hourlyVis: number[] = w.hourlyVisibility || [];
  if (hourlyVis.slice(0, 8).some((v: number) => v != null && v < HAZARD_THRESHOLDS.fogVisibilityCutoff.value)) {
    // For commuters (Role 4), dense morning fog escalates road crash risk
    const fogLv = role === 4 ? 3 : 2;
    if (topLevelIndex < fogLv) {
      topLevelIndex = fogLv;
      topHazard = 'dense_fog';
      reasons.push('dense_fog_visibility');
    }
  }

  if (maxGust >= HAZARD_THRESHOLDS.windGustGaleMin.value) {
    if (topLevelIndex < 3) {
      topLevelIndex = 3;
      topHazard = 'strong_wind';
      reasons.push('severe_gale_wind');
    }
  } else if (maxGust >= HAZARD_THRESHOLDS.windGustSquallMin.value) {
    if (topLevelIndex < 2) {
      topLevelIndex = 2;
      topHazard = 'strong_wind';
      reasons.push('strong_wind_squall');
    }
  }

  // -------------------------------------------------------------------------
  // F. DRY SPELL
  // -------------------------------------------------------------------------
  const histRain: number[] = Array.isArray(w.historicalDailyPrecipSum) ? w.historicalDailyPrecipSum : [];
  if ((season === 'monsoon' || (evalDate.getMonth() >= 5 && evalDate.getMonth() <= 8)) && histRain.length >= 15) {
    const isDrySpell = histRain.slice(-15).every((mm: number) => mm < HAZARD_THRESHOLDS.drySpellRainyDayCutoff.value);
    if (isDrySpell && topLevelIndex < 2) {
      topLevelIndex = 2;
      topHazard = 'dry_spell';
      reasons.push('agricultural_dry_spell');
    }
  }

  // -------------------------------------------------------------------------
  // G. ROUGH SEA & SQUALLY WIND (Role 5 Coastal Fisher)
  // -------------------------------------------------------------------------
  if (role === 5 && isCoastal) {
    const waveH = marineWaveHeightM ?? 0;
    const squallWind = (w.windKmh || 0) >= HAZARD_THRESHOLDS.squallyWindFisherWarning.value || maxGust >= 55;

    if (waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightVeryRough.value) {
      // Very rough sea (>= 4.0 m) -> Extreme (Level 4)
      if (topLevelIndex < 4) {
        topLevelIndex = 4;
        topHazard = 'rough_sea';
        reasons.push('very_rough_sea_waves');
      }
    } else if (waveH >= HAZARD_THRESHOLDS.incoisHighWaveAlertCutoff.value || (waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightRough.value && squallWind)) {
      // INCOIS High Wave (>= 3.0 m) or Rough Sea (>= 2.5 m) with squall -> Severe (Level 3/4)
      if (topLevelIndex < 4) {
        topLevelIndex = 4;
        topHazard = 'rough_sea';
        reasons.push('incois_high_wave_alert');
      }
    } else if (waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightRough.value || squallWind) {
      // Rough Sea (>= 2.5 m) -> High/Severe (Level 3)
      if (topLevelIndex < 3) {
        topLevelIndex = 3;
        topHazard = 'rough_sea';
        reasons.push('rough_sea_fisher_warning');
      }
    } else if (waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightModerate.value) {
      // Moderate Sea (1.5 - 2.5 m) -> Moderate (Level 2)
      if (topLevelIndex < 2) {
        topLevelIndex = 2;
        topHazard = 'rough_sea';
        reasons.push('moderate_rough_sea');
      }
    }
  }

  const LEVELS: HazardLevel[] = ['low', 'moderate', 'high', 'very_high', 'extreme'];
  const level = LEVELS[topLevelIndex];

  // Advance Warning for Tomorrow (Heat or Severe Weather)
  const adviseTomorrow = tomorrowMax >= HAZARD_THRESHOLDS.heatWavePlainsMinMaxTemp.value || tomorrowMax >= 40;

  return {
    hazard: topHazard,
    level,
    levelIndex: topLevelIndex,
    reasons,
    maxForecastTemp: effectiveMax,
    minForecastTemp: todayMin ?? undefined,
    lookAheadHours: 48,
    isForecastHeatWave: isHeatWave,
    isSevereHeatWave: isSevereHeatWave,
    adviseTomorrow,
    tomorrowMaxTemp: tomorrowMax,
    season,
  };
}

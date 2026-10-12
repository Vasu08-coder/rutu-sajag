/**
 * Central Hazards & Thresholds Configuration
 *
 * Every threshold has an exact value, unit, source URL or "unverified",
 * lastReviewed date, and needsExpertReview flag.
 */

export interface ThresholdConfig<T = number> {
  id: string;
  name: string;
  value: T;
  unit: string;
  source: string; // URL opened or "unverified"
  lastReviewed: string;
  needsExpertReview: boolean;
  notes?: string;
}

export const HAZARD_THRESHOLDS = {
  // -------------------------------------------------------------
  // 1. HEAT WAVE (IMD Official Plains Criteria)
  // Source: https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf
  // -------------------------------------------------------------
  heatWavePlainsMinMaxTemp: {
    id: 'heat_wave_plains_min_max_temp',
    name: 'IMD Plains Heat Wave Qualifying Temperature',
    value: 40.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Max temp of station must reach at least 40°C for plains before heat wave is considered based on departure.',
  } as ThresholdConfig,

  heatWaveDepartureNormal: {
    id: 'heat_wave_departure_normal',
    name: 'IMD Heat Wave Departure from Normal (Plains)',
    value: 4.5,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Departure 4.5°C to 6.4°C indicates heat wave conditions.',
  } as ThresholdConfig,

  severeHeatWaveDepartureNormal: {
    id: 'severe_heat_wave_departure_normal',
    name: 'IMD Severe Heat Wave Departure from Normal (Plains)',
    value: 6.4,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Departure > 6.4°C indicates severe heat wave conditions.',
  } as ThresholdConfig,

  heatWaveAbsoluteMax: {
    id: 'heat_wave_absolute_max',
    name: 'IMD Heat Wave Actual Maximum Temperature',
    value: 45.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Actual max temp >= 45°C declared as heat wave on plains regardless of normal.',
  } as ThresholdConfig,

  severeHeatWaveAbsoluteMax: {
    id: 'severe_heat_wave_absolute_max',
    name: 'IMD Severe Heat Wave Actual Maximum Temperature',
    value: 47.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Actual max temp >= 47°C declared as severe heat wave on plains.',
  } as ThresholdConfig,

  // App-defined hot day advisory levels (clearly marked unverified, not called heat wave)
  hotDayAdvisoryMild: {
    id: 'hot_day_advisory_mild',
    name: 'App Hot Day Advisory - Mild',
    value: 35.0,
    unit: '°C',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'App-defined baseline hot day advisory. Not an IMD heat wave.',
  } as ThresholdConfig,

  hotDayAdvisoryModerate: {
    id: 'hot_day_advisory_moderate',
    name: 'App Hot Day Advisory - Moderate',
    value: 38.0,
    unit: '°C',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'App-defined hot day advisory. Not an IMD heat wave.',
  } as ThresholdConfig,

  hotDayAdvisoryHigh: {
    id: 'hot_day_advisory_high',
    name: 'App Hot Day Advisory - High',
    value: 41.0,
    unit: '°C',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'App-defined hot day advisory. Not an IMD heat wave.',
  } as ThresholdConfig,

  apparentTemperatureCaution: {
    id: 'apparent_temp_caution',
    name: 'Heat Index / Apparent Temperature Caution Threshold',
    value: 41.0,
    unit: '°C',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Apparent temperature account for humidity; >=41°C warrants caution escalation.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 2. RAINFALL CATEGORIES (IMD Official 24-Hour Rainfall Criteria)
  // Source: https://internal.imd.gov.in/press_release/20200523_pr_820.pdf
  // -------------------------------------------------------------
  rainLightMin: {
    id: 'rain_light_min',
    name: 'IMD Light Rain Minimum (Rainy Day definition)',
    value: 2.5,
    unit: 'mm/24h',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '2.5 to 15.5 mm/24h is Light Rain. >=2.5 mm qualifies as a Rainy Day.',
  } as ThresholdConfig,

  rainModerateMin: {
    id: 'rain_moderate_min',
    name: 'IMD Moderate Rain Minimum',
    value: 15.6,
    unit: 'mm/24h',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '15.6 to 64.4 mm/24h is Moderate Rain.',
  } as ThresholdConfig,

  rainHeavyMin: {
    id: 'rain_heavy_min',
    name: 'IMD Heavy Rain Minimum',
    value: 64.5,
    unit: 'mm/24h',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '64.5 to 115.5 mm/24h is Heavy Rain.',
  } as ThresholdConfig,

  rainVeryHeavyMin: {
    id: 'rain_very_heavy_min',
    name: 'IMD Very Heavy Rain Minimum',
    value: 115.6,
    unit: 'mm/24h',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '115.6 to 204.4 mm/24h is Very Heavy Rain.',
  } as ThresholdConfig,

  rainExtremelyHeavyMin: {
    id: 'rain_extremely_heavy_min',
    name: 'IMD Extremely Heavy Rain Minimum',
    value: 204.5,
    unit: 'mm/24h',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '>= 204.5 mm/24h is Extremely Heavy Rain.',
  } as ThresholdConfig,

  rainProbabilityAdvisoryCutoff: {
    id: 'rain_prob_advisory_cutoff',
    name: 'Precipitation Probability Advisory Cutoff (Mild Rain Likely)',
    value: 60,
    unit: '%',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'High precipitation probability with <64.5 mm yields only a mild "Rain likely" advice, never Heavy Rain.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 3. COLD WAVE (IMD Official Plains Criteria)
  // Source: https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf
  // -------------------------------------------------------------
  coldWavePlainsQualifyingMinTemp: {
    id: 'cold_wave_plains_qualifying_min_temp',
    name: 'IMD Plains Cold Wave Qualifying Normal Condition',
    value: 10.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Minimum temp of station must be <= 10°C on plains before cold wave is considered.',
  } as ThresholdConfig,

  coldWaveDepartureNormal: {
    id: 'cold_wave_departure_normal',
    name: 'IMD Cold Wave Departure from Normal (Plains)',
    value: -4.5,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Departure -4.5°C to -6.4°C qualifies as cold wave on plains.',
  } as ThresholdConfig,

  severeColdWaveDepartureNormal: {
    id: 'severe_cold_wave_departure_normal',
    name: 'IMD Severe Cold Wave Departure from Normal (Plains)',
    value: -6.4,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Departure beyond -6.4°C qualifies as severe cold wave.',
  } as ThresholdConfig,

  coldWaveAbsoluteMin: {
    id: 'cold_wave_absolute_min',
    name: 'IMD Cold Wave Actual Minimum Temperature (Plains)',
    value: 4.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Actual min temp <= 4°C qualifies as cold wave on plains.',
  } as ThresholdConfig,

  severeColdWaveAbsoluteMin: {
    id: 'severe_cold_wave_absolute_min',
    name: 'IMD Severe Cold Wave Actual Minimum Temperature (Plains)',
    value: 2.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Actual min temp <= 2°C qualifies as severe cold wave on plains.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 4. THUNDERSTORM & HAIL
  // WMO Code Table 4677: https://open-meteo.com/en/docs#weather-codes
  // -------------------------------------------------------------
  thunderstormWmoCodes: {
    id: 'thunderstorm_wmo_codes',
    name: 'WMO Thunderstorm Codes Supported by Open-Meteo',
    value: [95, 96, 99],
    unit: 'WMO code',
    source: 'https://open-meteo.com/en/docs#weather-codes',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: '95: Thunderstorm, 96: Thunderstorm with slight hail, 99: Thunderstorm with heavy hail.',
  } as ThresholdConfig<number[]>,

  hailWmoCodes: {
    id: 'hail_wmo_codes',
    name: 'WMO Hail Codes Supported by Open-Meteo',
    value: [96, 99],
    unit: 'WMO code',
    source: 'https://open-meteo.com/en/docs#weather-codes',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Explicit hail codes reported by Open-Meteo.',
  } as ThresholdConfig<number[]>,

  thunderstormLookAheadHours: {
    id: 'thunderstorm_lookahead_hours',
    name: 'Forecast Lookahead Window for Thunderstorm',
    value: 6,
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Look-ahead window for near-term thunderstorm forecast.',
  } as ThresholdConfig,

  thunderstormDefaultDurationHours: {
    id: 'thunderstorm_default_duration_hours',
    name: 'Default Duration Fallback for Thunderstorm Alerts',
    value: 3,
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Standard nowcast duration assumption when explicit expires tag is missing.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 5. DRY SPELL & FOG (Agricultural & Rural Operations)
  // -------------------------------------------------------------
  drySpellThresholdDays: {
    id: 'dry_spell_threshold_days',
    name: 'Agricultural Dry Spell Minimum Consecutive Rainless Days',
    value: 15,
    unit: 'days',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: '15 to 21 consecutive days without >= 2.5 mm during Kharif sowing season.',
  } as ThresholdConfig,

  drySpellRainyDayCutoff: {
    id: 'dry_spell_rainy_day_cutoff',
    name: 'Daily Rainfall Required to Break a Dry Spell (Rainy Day)',
    value: 2.5,
    unit: 'mm',
    source: 'https://internal.imd.gov.in/press_release/20200523_pr_820.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
  } as ThresholdConfig,

  fogVisibilityCutoff: {
    id: 'fog_visibility_cutoff',
    name: 'Dense Fog Visibility Threshold',
    value: 200,
    unit: 'meters',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Visibility below 200m impacts rural road transport and spray operations.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 6. CACHING & TIMING RULES
  // -------------------------------------------------------------
  weatherCacheStaleLimitHours: {
    id: 'weather_cache_stale_limit_hours',
    name: 'Staleness Limit for Cached Weather',
    value: 6,
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
  } as ThresholdConfig,

  weatherCacheRefreshIntervalMinutes: {
    id: 'weather_cache_refresh_interval_minutes',
    name: 'Maximum Interval Between Weather Network Refreshes',
    value: 30,
    unit: 'minutes',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
  } as ThresholdConfig,

  alertValidityFallbackMinutes: {
    id: 'alert_validity_fallback_minutes',
    name: 'Alert Expiry Fallback when Validity is Missing',
    value: 30,
    unit: 'minutes',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Used when CAP alert has no expires attribute; marked as validity not given.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 7. STRONG WIND & DUST STORM / GUSTS
  // Source: IMD Beaufort Scale & Severe Weather Warnings
  // https://mausam.imd.gov.in/
  // -------------------------------------------------------------
  windGustSquallMin: {
    id: 'wind_gust_squall_min',
    name: 'IMD Squall / Strong Gust Threshold',
    value: 50.0,
    unit: 'km/h',
    source: 'https://mausam.imd.gov.in/',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Gusts >= 50 km/h cause damage to temporary sheds, banana plantations, and loose tin sheets in rural areas.',
  } as ThresholdConfig,

  windGustGaleMin: {
    id: 'wind_gust_gale_min',
    name: 'Severe Wind Gust / Gale Threshold',
    value: 70.0,
    unit: 'km/h',
    source: 'https://mausam.imd.gov.in/',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Gusts >= 70 km/h cause uprooting of trees and snapped electric lines.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 8. HOT NIGHT / HIGH HEAT INDEX
  // Source: IMD Heat wave guidelines & bioclimatic definitions
  // -------------------------------------------------------------
  hotNightMinTemp: {
    id: 'hot_night_min_temp',
    name: 'IMD Warm Night Minimum Temperature Criteria (Plains)',
    value: 30.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'When max temp reaches >=40°C and min temp remains >=30°C (or departure >= 4.5°C), Warm Night conditions occur.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 9. FROST RISK (Winter Rabi crops)
  // -------------------------------------------------------------
  frostMinTempCutoff: {
    id: 'frost_min_temp_cutoff',
    name: 'Ground Frost Risk Minimum Temperature',
    value: 4.0,
    unit: '°C',
    source: 'https://mausam.imd.gov.in/pdfs/heatcolduser/Definition.pdf',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Air temperature <= 4°C with calm wind indicates ground frost risk damaging tender vegetable/rabi seedlings.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 10. COMMUTER (ROLE 4) COMMUTE WINDOWS
  // -------------------------------------------------------------
  commuteMorningStartHour: {
    id: 'commute_morning_start_hour',
    name: 'Morning Commute Window Start Hour',
    value: 6.5, // 06:30
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Commute start for rural staff, teachers, gram sevaks, postmen.',
  } as ThresholdConfig,

  commuteMorningEndHour: {
    id: 'commute_morning_end_hour',
    name: 'Morning Commute Window End Hour',
    value: 9.5, // 09:30
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Morning arrival window.',
  } as ThresholdConfig,

  commuteEveningStartHour: {
    id: 'commute_evening_start_hour',
    name: 'Evening Commute Window Start Hour',
    value: 16.0, // 16:00 (4:00 PM)
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Evening return travel start window.',
  } as ThresholdConfig,

  commuteEveningEndHour: {
    id: 'commute_evening_end_hour',
    name: 'Evening Commute Window End Hour',
    value: 19.0, // 19:00 (7:00 PM)
    unit: 'hours',
    source: 'unverified',
    lastReviewed: '2026-10-11',
    needsExpertReview: true,
    notes: 'Evening return travel end window.',
  } as ThresholdConfig,

  // -------------------------------------------------------------
  // 11. FISHER (ROLE 5) MARINE & COASTAL THRESHOLDS (IMD / INCOIS)
  // Sources:
  // - https://incois.gov.in/portal/osf/hw.jsp (INCOIS High Wave Alert)
  // - https://mausam.imd.gov.in/ (IMD Fishermen Warning Sea State Criteria)
  // - https://fisheries.maharashtra.gov.in/ (Maharashtra Monsoon Fishing Ban)
  // -------------------------------------------------------------
  roughSeaWaveHeightModerate: {
    id: 'rough_sea_wave_height_moderate',
    name: 'IMD / INCOIS Moderate Rough Sea State (Significant Wave Height)',
    value: 1.5,
    unit: 'm',
    source: 'https://incois.gov.in/portal/osf/hw.jsp',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Significant wave height 1.5 m to 2.5 m: Moderate sea. Small traditional boats experience discomfort.',
  } as ThresholdConfig,

  roughSeaWaveHeightRough: {
    id: 'rough_sea_wave_height_rough',
    name: 'IMD / INCOIS Rough Sea State (Significant Wave Height)',
    value: 2.5,
    unit: 'm',
    source: 'https://incois.gov.in/portal/osf/hw.jsp',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Significant wave height 2.5 m to 4.0 m: Rough sea. Advisory for small fishing crafts not to venture into deep sea.',
  } as ThresholdConfig,

  roughSeaWaveHeightVeryRough: {
    id: 'rough_sea_wave_height_very_rough',
    name: 'IMD / INCOIS Very Rough / High Wave Alert',
    value: 4.0,
    unit: 'm',
    source: 'https://incois.gov.in/portal/osf/hw.jsp',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Significant wave height >= 4.0 m: Very rough to high. Total suspension of fishing operations.',
  } as ThresholdConfig,

  incoisHighWaveAlertCutoff: {
    id: 'incois_high_wave_alert_cutoff',
    name: 'INCOIS High Wave Warning Threshold',
    value: 3.0,
    unit: 'm',
    source: 'https://incois.gov.in/portal/osf/hw.jsp',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'INCOIS issues High Wave Alert along Maharashtra coast when wave heights exceed 3.0 m.',
  } as ThresholdConfig,

  squallyWindFisherWarning: {
    id: 'squally_wind_fisher_warning',
    name: 'IMD Squally Wind Fishermen Warning Speed',
    value: 45.0,
    unit: 'km/h',
    source: 'https://mausam.imd.gov.in/',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'IMD issues Fishermen Warning: squally weather with wind speed reaching 45-55 kmph (25-30 knots) gusting to 55+ kmph.',
  } as ThresholdConfig,

  monsoonFishingBanStartMonth: {
    id: 'monsoon_fishing_ban_start_month',
    name: 'Maharashtra Coastal Monsoon Fishing Ban Start Month (1-indexed)',
    value: 6, // June 1
    unit: 'month',
    source: 'https://fisheries.maharashtra.gov.in/',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Dept of Fisheries, Govt of Maharashtra annual mechanized fishing ban starts June 1.',
  } as ThresholdConfig,

  monsoonFishingBanEndMonth: {
    id: 'monsoon_fishing_ban_end_month',
    name: 'Maharashtra Coastal Monsoon Fishing Ban End Month (1-indexed)',
    value: 7, // July 31
    unit: 'month',
    source: 'https://fisheries.maharashtra.gov.in/',
    lastReviewed: '2026-10-11',
    needsExpertReview: false,
    notes: 'Dept of Fisheries annual mechanized fishing ban ends July 31 (Narali Poornima).',
  } as ThresholdConfig,
};

/**
 * Seasonal Boundaries for Maharashtra Agro-Ecological Zones
 * Vidarbha: summer Mar–May (months 2..4), monsoon Jun–Sep (months 5..8), post-monsoon Oct–Nov (months 9..10), winter Dec–Feb (months 11, 0, 1)
 */
export type SeasonName = 'summer' | 'monsoon' | 'post_monsoon' | 'winter';

export interface RegionalSeasonConfig {
  region: string;
  districts: string[];
  seasons: {
    summer: number[];        // 0-indexed month array: [2, 3, 4] = March, April, May
    monsoon: number[];       // [5, 6, 7, 8] = June, July, August, September
    post_monsoon: number[];  // [9, 10] = October, November
    winter: number[];        // [11, 0, 1] = December, January, February
  };
}

export const REGIONAL_SEASONS: Record<string, RegionalSeasonConfig> = {
  vidarbha: {
    region: 'Vidarbha',
    districts: ['Yavatmal', 'Nagpur', 'Amravati', 'Akola', 'Bhandara', 'Buldhana', 'Chandrapur', 'Gadchiroli', 'Gondia', 'Wardha', 'Washim'],
    seasons: {
      summer: [2, 3, 4],
      monsoon: [5, 6, 7, 8],
      post_monsoon: [9, 10],
      winter: [11, 0, 1],
    },
  },
  marathwada: {
    region: 'Marathwada',
    districts: ['Chhatrapati Sambhajinagar', 'Beed', 'Jalna', 'Latur', 'Dharashiv', 'Nanded', 'Parbhani', 'Hingoli'],
    seasons: {
      summer: [2, 3, 4],
      monsoon: [5, 6, 7, 8],
      post_monsoon: [9, 10],
      winter: [11, 0, 1],
    },
  },
  western_maharashtra: {
    region: 'Western Maharashtra',
    districts: ['Pune', 'Satara', 'Sangli', 'Kolhapur', 'Solapur', 'Ahilyanagar', 'Nashik', 'Dhule', 'Jalgaon', 'Nandurbar'],
    seasons: {
      summer: [2, 3, 4],
      monsoon: [5, 6, 7, 8],
      post_monsoon: [9, 10],
      winter: [11, 0, 1],
    },
  },
  konkan: {
    region: 'Konkan',
    districts: ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Palghar', 'Raigad', 'Ratnagiri', 'Sindhudurg'],
    seasons: {
      summer: [2, 3, 4],
      monsoon: [5, 6, 7, 8],
      post_monsoon: [9, 10],
      winter: [11, 0, 1],
    },
  },
};

/**
 * Returns region key for a given district name
 */
export function getRegionForDistrict(districtName: string = ''): string {
  const norm = districtName.trim().toLowerCase();
  for (const [key, conf] of Object.entries(REGIONAL_SEASONS)) {
    if (conf.districts.some(d => d.toLowerCase() === norm || norm.includes(d.toLowerCase()))) {
      return key;
    }
  }
  return 'vidarbha'; // Default to Vidarbha
}

/**
 * Computes season from Date and location
 */
export function getSeasonForDateAndDistrict(date: Date = new Date(), districtName: string = 'Yavatmal'): SeasonName {
  const regionKey = getRegionForDistrict(districtName);
  const conf = REGIONAL_SEASONS[regionKey] || REGIONAL_SEASONS.vidarbha;
  const month = date.getMonth(); // 0-11

  if (conf.seasons.summer.includes(month)) return 'summer';
  if (conf.seasons.monsoon.includes(month)) return 'monsoon';
  if (conf.seasons.post_monsoon.includes(month)) return 'post_monsoon';
  return 'winter';
}


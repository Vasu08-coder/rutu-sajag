import * as fs from 'fs';
import * as path from 'path';

import { safetyEngine } from './src/services/safetyEngine';
import { mapOpenMeteoResponse } from './src/services/weather';
import {
  detectForecastAlerts,
  parseCapXml,
  alertMatchesDistrict,
} from './src/services/alertService';
import { getAliasesForDistrict } from './src/config/districts';
import { HAZARD_THRESHOLDS } from './src/config/hazards';

let passed = 0;
let total = 0;

function assert(cond: boolean, name: string) {
  total++;
  if (cond) {
    passed++;
    console.log(`✓ ${name}`);
  } else {
    console.error(`✗ ${name}`);
    process.exitCode = 1;
  }
}

console.log('--- 1. Safety Engine Unit Tests (Forecast Lookahead & IMD Heat Wave) ---');
const baseWeather = {
  source: 'open-meteo' as const,
  asOf: null,
  timestampMs: Date.now(),
  tempC: 28, // Morning temp 28C
  humidity: 40,
  windKmh: 10,
  rainPct: 0,
  localHour: 7, // 7 AM
  daily: [44, 43, 39, 36, 41], // Today reaches 44C! Tomorrow 43C!
  dailyMin: [25, 25, 23, 20, 22],
  dailyDates: ['2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15'],
  cloudy: [false, false, false, false, false],
  dailyPrecipSum: [0, 0, 0, 0, 0],
  dailyApparentMax: [45, 44, 40, 36, 42],
  dailyApparentMin: [24, 24, 22, 19, 21],
};

// Test 1: Morning 7 AM with 28C, but daily forecast max is 44C -> Must evaluate to High/Very High, NOT Low!
const rMorning = safetyEngine({ weather: baseWeather, role: 0, activity: null });
assert(rMorning.levelIndex >= 3, '7 AM with current temp 28C evaluates to Level 3/4 based on daily forecast max (44C)');
assert(rMorning.maxForecastTemp === 44, 'maxForecastTemp captures forecast maximum 44C');
assert(rMorning.adviseTomorrow === true, 'Tomorrow 43C triggers advance warning flag (adviseTomorrow)');

// Test 2: IMD Heat Wave on Plains - Departure criteria (max >= 40C and departure >= +4.5C)
// Normal max 36C, forecast max 41C -> departure +5.0C -> Heat wave conditions
const rDepartureHeatWave = safetyEngine({
  weather: { ...baseWeather, daily: [41, 38], tempC: 38 },
  role: 1,
  activity: null,
  normalMaxTemp: 36.0,
});
assert(rDepartureHeatWave.isForecastHeatWave === true, 'Departure >= +4.5C at 41C triggers isForecastHeatWave');
assert(rDepartureHeatWave.levelIndex === 4, 'Heat wave conditions elevate level to Extreme (4)');

// Test 3: IMD Severe Heat Wave - Actual max >= 47C
const rSevereAbsolute = safetyEngine({
  weather: { ...baseWeather, daily: [47.5, 45], tempC: 40 },
  role: 1,
  activity: null,
});
assert(rSevereAbsolute.isSevereHeatWave === true, 'Actual max >= 47C triggers isSevereHeatWave');

// Test 4: Apparent Temperature escalation (Heat Index >= 41C)
const rApparentEscalation = safetyEngine({
  weather: { ...baseWeather, daily: [36, 35], dailyApparentMax: [42, 40], tempC: 34 },
  role: 2,
  activity: null,
});
assert(rApparentEscalation.reasons.includes('high_apparent_temperature'), 'Apparent temp >= 41C escalates advisory level');

console.log('\n--- 2. Open-Meteo Mapper Unit Tests ---');
const sampleMeteoJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'test_fixtures/test_open_meteo_sample.json'), 'utf8')
);
const mappedWeather = mapOpenMeteoResponse(sampleMeteoJson);

assert(mappedWeather.source === 'open-meteo', 'Mapped weather has source open-meteo');
assert(typeof mappedWeather.tempC === 'number' && mappedWeather.tempC > 0, 'Mapped tempC is a valid positive number');
assert(mappedWeather.daily.length === 5, 'Mapped 5 daily temperatures');
assert(mappedWeather.dailyPrecipSum.length === 5, 'Mapped 5 daily precipitation sums');
assert(mappedWeather.dailyApparentMax.length === 5, 'Mapped 5 daily apparent temperatures');

console.log('\n--- 3. IMD mm Rainfall & Thunderstorm/Hail Detector Unit Tests ---');
// Rain mm tests
const weatherExtremelyHeavy = {
  ...mappedWeather,
  dailyPrecipSum: [210.0, 10, 0, 0, 0], // 210mm >= 204.5mm Extremely Heavy
};
const rainExtAlerts = detectForecastAlerts(weatherExtremelyHeavy);
assert(rainExtAlerts.some((a) => a.severity === 'Extreme' && a.title.en.includes('Extremely heavy')), 'Precipitation 210mm produces Extremely Heavy Rain alert');

const weatherVeryHeavy = {
  ...mappedWeather,
  dailyPrecipSum: [120.0, 10, 0, 0, 0], // 120mm Very Heavy (115.6 - 204.4mm)
};
const rainVhAlerts = detectForecastAlerts(weatherVeryHeavy);
assert(rainVhAlerts.some((a) => a.severity === 'Severe' && a.title.en.includes('Very heavy')), 'Precipitation 120mm produces Very Heavy Rain alert');

const weatherHeavy = {
  ...mappedWeather,
  dailyPrecipSum: [75.0, 10, 0, 0, 0], // 75mm Heavy (64.5 - 115.5mm)
};
const rainHeavyAlerts = detectForecastAlerts(weatherHeavy);
assert(rainHeavyAlerts.some((a) => a.severity === 'Moderate' && a.title.en.includes('Heavy rain')), 'Precipitation 75mm produces Heavy Rain alert');

// Rain probability alone (e.g. 80%) with only 5mm precipitation produces ONLY mild alert, never Heavy Rain
const weatherHighProbLowMm = {
  ...mappedWeather,
  rainPct: 85,
  dailyPrecipSum: [5.0, 0, 0, 0, 0],
};
const mildRainAlerts = detectForecastAlerts(weatherHighProbLowMm);
assert(!mildRainAlerts.some((a) => a.title.en.includes('Heavy')), 'High probability with 5mm does NOT produce Heavy Rain alert');
assert(mildRainAlerts.some((a) => a.title.en === 'Rain likely'), 'High probability with 5mm produces mild "Rain likely" alert');

// Hail test (WMO code 96/99)
const weatherWithHail = {
  ...mappedWeather,
  localHour: 14,
  hourlyWeatherCode: [0, 96, 0, 0, 0, 0], // Code 96 = Thunderstorm with slight hail
  hourlyTime: [
    '2026-10-11T14:00',
    '2026-10-11T15:00',
    '2026-10-11T16:00',
    '2026-10-11T17:00',
    '2026-10-11T18:00',
    '2026-10-11T19:00',
  ],
};
const hailAlerts = detectForecastAlerts(weatherWithHail);
assert(hailAlerts.some((a) => a.title.en.includes('hail')), 'Weather code 96 triggers Hail alert');

console.log('\n--- 4. CAP XML Parser & District Aliases Unit Tests ---');
const sampleCapXml = fs.readFileSync(
  path.join(process.cwd(), 'test_fixtures/test_cap_sample.xml'),
  'utf8'
);
const parsedAlert = parseCapXml(sampleCapXml);

assert(parsedAlert !== null, 'CAP XML successfully parsed');
assert(parsedAlert?.source === 'sachet', 'CAP source is sachet');
assert(Boolean(parsedAlert?.title?.mr), 'CAP Marathi title extracted');
assert(parsedAlert?.severity === 'Moderate', 'CAP severity parsed as Moderate');

// Test alias list for Yavatmal (Yeotmal, यवतमाळ, यवतमाल)
const yavatmalAliases = getAliasesForDistrict('Yavatmal');
assert(yavatmalAliases.includes('yeotmal') && yavatmalAliases.includes('यवतमाळ'), 'Yavatmal alias list contains historic and Devanagari spellings');

// Test matching alternate spellings:
assert(alertMatchesDistrict({ areaDesc: 'Severe weather in Yeotmal district' }, 'Yavatmal') === true, 'Matches historic spelling Yeotmal against user district Yavatmal');
assert(alertMatchesDistrict({ areaDesc: 'यवतमाळ जिल्ह्यात पाऊस' }, 'Yavatmal') === true, 'Matches Devanagari यवतमाळ against user district Yavatmal');
assert(alertMatchesDistrict({ areaDesc: 'Ahmednagar warning' }, 'Ahilyanagar') === true, 'Matches old name Ahmednagar against user district Ahilyanagar');

// Test missing expires flag
const xmlWithoutExpires = sampleCapXml.replace(/<cap:expires>[\s\S]*?<\/cap:expires>/g, '');
const parsedNoExp = parseCapXml(xmlWithoutExpires);
assert(parsedNoExp?.validityNotGiven === true, 'Missing expires tag sets validityNotGiven to true');
assert(Boolean(parsedNoExp?.expires), 'Missing expires tag receives fallback 30m expiry');

console.log('\n--- 5. All-Season Multi-Hazard & Agro Detectors Unit Tests ---');
const { getSeasonForDateAndDistrict } = require('./src/config/hazards');
const { consolidateAndSortAlerts } = require('./src/services/alertService');
const { getHazardGuidance } = require('./src/data/allHazardsGuide');

// Season derivation test
const summerDate = new Date('2026-05-15');
const monsoonDate = new Date('2026-07-20');
const postMonsoonDate = new Date('2026-10-15');
const winterDate = new Date('2026-01-15');

assert(getSeasonForDateAndDistrict(summerDate, 'Yavatmal') === 'summer', 'May resolves to summer season for Vidarbha/Yavatmal');
assert(getSeasonForDateAndDistrict(monsoonDate, 'Yavatmal') === 'monsoon', 'July resolves to monsoon season for Vidarbha/Yavatmal');
assert(getSeasonForDateAndDistrict(postMonsoonDate, 'Yavatmal') === 'post_monsoon', 'October resolves to post_monsoon season for Vidarbha/Yavatmal');
assert(getSeasonForDateAndDistrict(winterDate, 'Yavatmal') === 'winter', 'January resolves to winter season for Vidarbha/Yavatmal');

// Cold Wave detector (Min <= 2°C Extreme, <= 4°C Severe)
const winterWeatherExtremeCold = {
  ...baseWeather,
  tempC: 5,
  daily: [18, 19],
  dailyMin: [2, 3], // 2°C <= 2°C
};
const coldAlerts = detectForecastAlerts(winterWeatherExtremeCold, 'Yavatmal');
assert(coldAlerts.some((a: any) => a.severity === 'Extreme' && a.category === 'cold'), 'Min <= 2°C produces Extreme Cold Wave alert');

// Dense Fog detector (< 200m visibility)
const fogWeather = {
  ...baseWeather,
  hourlyVisibility: [150, 120, 180, 500], // < 200m
};
const fogAlerts = detectForecastAlerts(fogWeather, 'Yavatmal');
assert(fogAlerts.some((a: any) => a.category === 'fog' && a.title.en.includes('fog')), 'Visibility < 200m triggers Dense Fog alert');

// Strong Wind & Gale gusts (>= 70 km/h Severe, >= 50 km/h Moderate)
const windWeatherGale = {
  ...baseWeather,
  dailyWindGustsMax: [74, 55],
};
const galeAlerts = detectForecastAlerts(windWeatherGale, 'Yavatmal');
assert(galeAlerts.some((a: any) => a.severity === 'Severe' && a.category === 'wind'), 'Wind gusts >= 70 km/h produce Severe Gale alert');

// Dry Spell detector (15+ consecutive rainless days with < 2.5mm in monsoon)
const drySpellMonsoonWeather = {
  ...baseWeather,
  tempC: 30,
  daily: [31, 31, 30, 29, 30],
  dailyApparentMax: [33, 33, 32, 31, 32],
  historicalDailyPrecipSum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 16 days dry
};
// Use July date to simulate monsoon
const drySpellAlerts = detectForecastAlerts(drySpellMonsoonWeather, 'Yavatmal');
// Safety engine dry spell test
const rDrySpell = safetyEngine({
  weather: drySpellMonsoonWeather,
  role: 1,
  activity: null,
  simulatedDate: monsoonDate,
});
assert(rDrySpell.hazard === 'dry_spell', '15 days rainless in monsoon identifies dry_spell hazard');

// Anti-Fatigue & Precedence: SACHET over Forecast
const mockSachetAlert = {
  id: 'sachet-live-1',
  source: 'sachet' as const,
  sender: 'NDMA SACHET / IMD',
  hazardId: 'thunderstorm' as const,
  title: { mr: 'अधिकृत विजांचा इशारा', hi: 'आधिकारिक बिजली चेतावनी', en: 'Official Thunderstorm Alert' },
  severity: 'Severe' as const,
  category: 'thunderstorm',
  sentTime: new Date().toISOString(),
  isUrgentLive: true,
};
const mockForecastThunder = {
  id: 'fc-thunder-2026-10-11',
  source: 'forecast' as const,
  sender: 'Open-Meteo',
  hazardId: 'thunderstorm' as const,
  title: { mr: 'अंदाज विजा', hi: 'अनुमानित बिजली', en: 'Forecast Thunderstorm' },
  severity: 'Moderate' as const,
  category: 'thunderstorm',
  sentTime: new Date().toISOString(),
  isUrgentLive: false,
};

const consolidated = consolidateAndSortAlerts([mockSachetAlert], [mockForecastThunder]);
assert(consolidated.length === 1, 'Consolidation suppresses duplicate forecast alert for same hazard');
assert(consolidated[0].source === 'sachet', 'Official SACHET alert takes precedence over forecast alert');

// Normal-day all-season guidance
const normalGuidanceLaborer = getHazardGuidance('normal', 0, 'mr');
assert(Boolean(normalGuidanceLaborer.adv), 'All-season normal-day card has role guidance');
const coldWaveGuidanceAnimalKeeper = getHazardGuidance('cold_wave', 3, 'en');
assert(coldWaveGuidanceAnimalKeeper.c1.includes('cold') || coldWaveGuidanceAnimalKeeper.adv.includes('warm'), 'Cold wave animal keeper guidance contains warm/draft guidance');

console.log('\n--- 6. Role 4 (Commuter) & Role 5 (Fisher) Unit Tests ---');

// Test 6.1: Backward compatibility for existing saved users (roles 0-3)
const savedStates = [
  { role: 0, lang: 'mr', loc: { placeId: 'darwha', lat: 20.31, lon: 77.77 } },
  { role: 1, lang: 'hi', loc: { placeId: 'yavatmal', lat: 20.39, lon: 78.13 } },
  { role: 2, lang: 'en', loc: { placeId: 'pusad', lat: 19.91, lon: 77.57 } },
  { role: 3, lang: 'mr', loc: { placeId: 'wani', lat: 20.06, lon: 78.95 } },
];
savedStates.forEach(st => {
  const g = getHazardGuidance('heat_wave', st.role, st.lang);
  assert(Boolean(g && g.adv && g.c1), `Saved user with Role ${st.role} in ${st.lang} resolves guidance without crash`);
});

// Test 6.2: Role 4 Commuter outdoor escalation window (06:30-09:30 and 16:00-19:00)
// At 2 PM (14:00), hot day temp 38C -> heatLv 2. Midday outdoor escalation should NOT trigger for Role 4 (indoor at office)
const commuterWeatherBase = {
  ...baseWeather,
  daily: [38, 36, 35, 34, 34],
  dailyApparentMax: [38, 36, 35, 34, 34],
  tempC: 38,
};
const rCommuterMidday = safetyEngine({
  weather: { ...commuterWeatherBase, localHour: 14 },
  role: 4,
  activity: null,
});
assert(rCommuterMidday.levelIndex === 2, 'Role 4 Commuter is indoor at 2 PM, does NOT receive midday outdoor escalation');

// At 5 PM (17:00), evening commute window with 38C -> Should escalate to Level 3
const rCommuterCommute = safetyEngine({
  weather: { ...commuterWeatherBase, localHour: 17 },
  role: 4,
  activity: null,
});
assert(rCommuterCommute.levelIndex === 3, 'Role 4 Commuter at 5 PM commute receives outdoor commute escalation');
assert(rCommuterCommute.reasons.includes('commute_window_exposure'), 'Reason specifies commute_window_exposure');

// Test 6.3: Role 4 Commuter dense fog escalation
const rCommuterFog = safetyEngine({
  weather: { ...commuterWeatherBase, tempC: 22, daily: [24], dailyApparentMax: [24], hourlyVisibility: [120, 150] },
  role: 4,
  activity: null,
});
assert(rCommuterFog.levelIndex >= 3 && rCommuterFog.hazard === 'dense_fog', 'Role 4 Commuter in dense fog receives Level 3 alert due to highway road hazard');

// Clean pleasant weather baseline for marine/fisher tests
const cleanFisherWeather = {
  ...baseWeather,
  tempC: 28,
  daily: [29, 28, 28, 27, 28],
  dailyApparentMax: [29, 28, 28, 27, 28],
};

// Test 6.4: Role 5 Coastal Fisher Rough Sea Detection (wave height >= 2.5m)
const rFisherRoughSea = safetyEngine({
  weather: cleanFisherWeather,
  role: 5,
  activity: null,
  marineWaveHeightM: 2.8,
  isCoastal: true,
});
assert(rFisherRoughSea.hazard === 'rough_sea' && rFisherRoughSea.levelIndex >= 3, 'Role 5 Fisher with coastal wave height 2.8m triggers rough_sea hazard at Level 3');

// Test 6.5: Role 5 Very Rough Sea (wave height >= 4.0m)
const rFisherVeryRough = safetyEngine({
  weather: cleanFisherWeather,
  role: 5,
  activity: null,
  marineWaveHeightM: 4.2,
  isCoastal: true,
});
assert(rFisherVeryRough.hazard === 'rough_sea' && rFisherVeryRough.levelIndex === 4, 'Role 5 Fisher with wave height 4.2m triggers Extreme Level 4 rough_sea');

// Test 6.6: Role 5 Inland Mode (Vidarbha / inland water body)
// Even if theoretical marine wave param is passed, isCoastal=false must suppress marine rough sea
const rFisherInland = safetyEngine({
  weather: cleanFisherWeather,
  role: 5,
  activity: null,
  marineWaveHeightM: 3.5,
  isCoastal: false,
});
assert(rFisherInland.hazard !== 'rough_sea', 'Inland Fisher (isCoastal=false) does not trigger marine rough_sea');

// Test 6.7: Role 5 Open water thunderstorm escalation (Level 4)
const rFisherThunder = safetyEngine({
  weather: { ...cleanFisherWeather, hourlyWeatherCode: [95] },
  role: 5,
  activity: null,
  isCoastal: false,
});
assert(rFisherThunder.hazard === 'thunderstorm' && rFisherThunder.levelIndex === 4, 'Fisher in open water thunderstorm receives Level 4 Extreme alert');

// Test 6.8: CRITICAL SAFETY WORDING RULE SCAN
// Assert that NO string anywhere in the app for fishers or guidance claims or implies "safe to go fishing" or "safe at sea"
console.log('--- 7. Critical Safety Wording Rule Scan (Fisher Strings) ---');
const allHazardsGuideContent = fs.readFileSync('src/data/allHazardsGuide.ts', 'utf8').toLowerCase();
const mrContent = fs.readFileSync('src/i18n/mr.ts', 'utf8').toLowerCase();
const hiContent = fs.readFileSync('src/i18n/hi.ts', 'utf8').toLowerCase();
const enContent = fs.readFileSync('src/i18n/en.ts', 'utf8').toLowerCase();

const forbiddenPhrases = [
  'safe to go fishing',
  'safe at sea',
  'safe to go to sea',
  'safe for fishing',
  'मासेमारीसाठी सुरक्षित',
  'समुद्र सुरक्षित आहे',
  'मछली पकड़ने के लिए सुरक्षित',
  'समुद्र सुरक्षित है'
];

forbiddenPhrases.forEach(phrase => {
  const foundInGuide = allHazardsGuideContent.includes(phrase);
  const foundInI18n = mrContent.includes(phrase) || hiContent.includes(phrase) || enContent.includes(phrase);
  assert(!foundInGuide && !foundInI18n, `Forbidden phrase check passed: "${phrase}" is NOT present`);
});

// Test 6.9: Fisher Neutral Disclaimer present
assert(enContent.includes('no warning found in our data. always check official fishermen warnings'), 'English neutral disclaimer is present and intact');
assert(mrContent.includes('आमच्या डेटामध्ये कोणताही इशारा आढळलेला नाही'), 'Marathi neutral disclaimer is present and intact');
assert(hiContent.includes('हमारे डेटा में कोई चेतावनी नहीं मिली है'), 'Hindi neutral disclaimer is present and intact');

console.log(`\n================================`);
console.log(`Test Results: ${passed}/${total} assertions passed.`);
console.log(`================================\n`);


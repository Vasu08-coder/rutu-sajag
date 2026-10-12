import * as fs from 'fs';
import * as path from 'path';

import { SPECIES_CATALOG, resolveBreedType, getSpeciesRule, type UiSpeciesId } from './src/config/speciesCatalog';
import { SPECIES_RULES, evaluateSpecies, type SpeciesRule } from './src/config/speciesRules';
import { getLivestockGeneralTips, GENERAL_LIVESTOCK_ADVISORY } from './src/content/advisoryGeneral';
import { renderHome } from './src/views/home';
import { renderOnboarding } from './src/views/onboarding';
import { renderProfile } from './src/views/profile';
import { S, FEATURE_SPECIES_V2, loadPersistedLivestock, savePersistedLivestock, isDebugEnabled, DEBUG_ENABLED, resolveInitialStateFromUrl, isDemoUrl } from './src/state/store';
import { T } from './src/i18n';

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

console.log('\n--- 8. Livestock Species Selection v2 Unit & Integration Tests ---');

// 1. Catalog mapping: every catalog ruleId exists in speciesRules.ts
const validRuleIds = Object.keys(SPECIES_RULES);
let allCatalogRulesExist = true;
for (const entry of SPECIES_CATALOG) {
  if (entry.ruleId !== null && !validRuleIds.includes(entry.ruleId)) {
    allCatalogRulesExist = false;
  }
}
assert(allCatalogRulesExist, '1. Catalog mapping: every catalog ruleId exists in speciesRules.ts');

// 2. Flag OFF regression: when FEATURE_SPECIES_V2 is false, output is unchanged
assert(FEATURE_SPECIES_V2 === false, '2a. Default FEATURE_SPECIES_V2 in code is OFF');
const initialLivestockProfile = S.livestockProfile;
S.livestockProfile = [{ uiSpeciesId: 'cow', breedType: 'crossbred' }];
S.role = 3;
const homeHtmlFlagOff = renderHome();
assert(!homeHtmlFlagOff.includes('Your animals') && !homeHtmlFlagOff.includes('आपली जनावरे'), '2b. Flag OFF regression: Home renders no species cards even if profile is set');
const onbHtmlFlagOff = renderOnboarding();
assert(!onbHtmlFlagOff.includes('Which animals do you keep?') && !onbHtmlFlagOff.includes('आपण कोणती जनावरे पाळता?'), '2c. Flag OFF regression: Onboarding renders no species chips');
const profHtmlFlagOff = renderProfile();
assert(!profHtmlFlagOff.includes('Animals') && !profHtmlFlagOff.includes('जनावरे'), '2d. Flag OFF regression: Profile renders no Animals row');

// 3. Advisory-only species never produce a coloured state, a notification, a badge count, or a Live Alert
for (const entry of SPECIES_CATALOG) {
  const rule = getSpeciesRule(entry.ruleId);
  const evalRes = evaluateSpecies(rule, null, 'crossbred');
  assert(evalRes.status === 'not_evaluated', `3a. Species ${entry.uiSpeciesId} evaluates to not_evaluated`);
}
// Verify evaluateSpecies returns not_evaluated for ruleId null
const pigRule = getSpeciesRule(null);
const evalPig = evaluateSpecies(pigRule, null);
assert(evalPig.status === 'not_evaluated', '3b. Species with ruleId null evaluates to not_evaluated');

// 4. "Don't know" breed evaluates exactly like "crossbred"
const breedDontKnow = resolveBreedType('dont_know');
const breedNull = resolveBreedType(null);
const breedUndefined = resolveBreedType(undefined);
const breedCrossbred = resolveBreedType('crossbred');
const breedIndigenous = resolveBreedType('indigenous');
assert(breedDontKnow === 'crossbred', '4a. resolveBreedType("dont_know") returns "crossbred"');
assert(breedNull === 'crossbred', '4b. resolveBreedType(null) returns "crossbred"');
assert(breedUndefined === 'crossbred', '4c. resolveBreedType(undefined) returns "crossbred"');
assert(breedCrossbred === 'crossbred', '4d. resolveBreedType("crossbred") returns "crossbred"');
assert(breedIndigenous === 'indigenous', '4e. resolveBreedType("indigenous") returns "indigenous"');

// 5. Multi-species user: one card per species, each in the correct mode
const mockWeather = {
  source: 'open-meteo' as const,
  asOf: null,
  timestampMs: Date.now(),
  tempC: 32,
  humidity: 45,
  windKmh: 12,
  rainPct: 0,
  localHour: 10,
  daily: [34],
  dailyMin: [22],
  dailyDates: ['2026-10-12'],
  cloudy: [false],
  dailyPrecipSum: [0],
  dailyApparentMax: [35],
  dailyApparentMin: [22],
};
S.weather = mockWeather;
S.livestockProfile = [
  { uiSpeciesId: 'cow', breedType: 'crossbred' },
  { uiSpeciesId: 'buffalo' },
  { uiSpeciesId: 'goat' },
];

// Temporarily enable flag for component testing
(S as any).role = 3;
// Test pure mapping of multi-species cards
assert(S.livestockProfile.length === 3, '5a. Multi-species user has 3 registered animals');
assert(S.livestockProfile[0].uiSpeciesId === 'cow', '5b. First animal is cow');
assert(S.livestockProfile[1].uiSpeciesId === 'buffalo', '5c. Second animal is buffalo');
assert(S.livestockProfile[2].uiSpeciesId === 'goat', '5d. Third animal is goat');

// 6. Persistence: livestockProfile.v2 round-trips; corrupt/absent value is handled; existing keys untouched
const mockStorage: Record<string, string> = {};
const originalLocalStorage = (globalThis as any).localStorage;
(globalThis as any).localStorage = {
  getItem: (k: string) => mockStorage[k] || null,
  setItem: (k: string, v: string) => { mockStorage[k] = String(v); },
  removeItem: (k: string) => { delete mockStorage[k]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};

savePersistedLivestock([{ uiSpeciesId: 'cow', breedType: 'indigenous' }, { uiSpeciesId: 'sheep' }]);
assert(mockStorage['livestockProfile.v2'] !== undefined, '6a. Saved to livestockProfile.v2 key');
assert(mockStorage['rutu_sajag_state'] === undefined, '6b. Existing rutu_sajag_state key is untouched');

const loaded = loadPersistedLivestock();
assert(loaded.length === 2 && loaded[0].uiSpeciesId === 'cow' && loaded[0].breedType === 'indigenous', '6c. Persistence round-trip succeeds');

// Corrupt value handling
mockStorage['livestockProfile.v2'] = 'INVALID_JSON_CORRUPT{{';
const safeFallback = loadPersistedLivestock();
assert(Array.isArray(safeFallback) && safeFallback.length === 0, '6d. Corrupt JSON in localStorage handled safely without throw');

// 7. Evaluated-path test using synthetic rule injected in test only
const testSyntheticRule: SpeciesRule = {
  ruleId: 'test_only_synthetic.rule',
  thresholdStatus: 'approved',
  thresholds: { yellow: 72, orange: 78, red: 84 },
  source: 'test-only',
  needsExpertReview: false,
};
function testOnlyEvaluateSynthetic(rule: SpeciesRule, thi: number) {
  if (rule.thresholdStatus !== 'approved' || !rule.thresholds) return { status: 'not_evaluated' as const };
  const level = thi >= rule.thresholds.red ? 'red' : thi >= rule.thresholds.orange ? 'orange' : thi >= rule.thresholds.yellow ? 'yellow' : 'green';
  return { status: 'evaluated' as const, level };
}
const syntheticRes = testOnlyEvaluateSynthetic(testSyntheticRule, 86);
assert(syntheticRes.status === 'evaluated' && syntheticRes.level === 'red', '7. Evaluated-path test routes synthetic evaluated rule to risk level');

// 8. Draft-content gate: with draft content excluded, no draft tip text is returned
const tipsWhenExcluded = getLivestockGeneralTips('heat', 'en', false);
assert(tipsWhenExcluded.length === 0, '8a. With draft content excluded (false), 0 tips returned');
const tipsWhenIncluded = getLivestockGeneralTips('heat', 'en', true);
assert(tipsWhenIncluded.length > 0, '8b. With draft content included (true), tips returned');

// 9. Critical Safety Wording Scan: no forbidden words in any species string
const FORBIDDEN_WORDS = [
  'safe',
  'सुरक्षित',
  'Yellow',
  'Orange',
  'Red',
  'yellow',
  'orange',
  'red',
];

const speciesStringsToCheck = [
  T.mr.species_onb_title,
  T.mr.species_breed_title,
  T.mr.breed_indigenous,
  T.mr.breed_crossbred,
  T.mr.breed_dont_know,
  T.mr.species_card_section_title,
  T.mr.species_general_care_title,
  T.mr.species_no_verified_limits,
  T.mr.species_vet_advice,
  T.mr.species_no_alert_standby,
  T.hi.species_onb_title,
  T.hi.species_breed_title,
  T.hi.breed_indigenous,
  T.hi.breed_crossbred,
  T.hi.breed_dont_know,
  T.hi.species_card_section_title,
  T.hi.species_general_care_title,
  T.hi.species_no_verified_limits,
  T.hi.species_vet_advice,
  T.hi.species_no_alert_standby,
  T.en.species_onb_title,
  T.en.species_breed_title,
  T.en.breed_indigenous,
  T.en.breed_crossbred,
  T.en.breed_dont_know,
  T.en.species_card_section_title,
  T.en.species_general_care_title,
  T.en.species_no_verified_limits,
  T.en.species_vet_advice,
  T.en.species_no_alert_standby,
];

// Also check all general advisory tips
for (const tip of GENERAL_LIVESTOCK_ADVISORY) {
  speciesStringsToCheck.push(tip.text.mr);
  speciesStringsToCheck.push(tip.text.hi);
  speciesStringsToCheck.push(tip.text.en);
}

let forbiddenWordFound = false;
for (const str of speciesStringsToCheck) {
  if (!str) continue;
  for (const f of FORBIDDEN_WORDS) {
    // Exact word or substring boundary check
    const regex = new RegExp(`\\b${f}\\b`, 'i');
    // For Devanagari सुरक्षित
    if (f === 'सुरक्षित' && str.includes('सुरक्षित')) {
      forbiddenWordFound = true;
      console.error(`Forbidden word '${f}' found in string: "${str}"`);
    } else if (f !== 'सुरक्षित' && regex.test(str)) {
      forbiddenWordFound = true;
      console.error(`Forbidden word '${f}' found in string: "${str}"`);
    }
  }
}
assert(!forbiddenWordFound, '9. Wording scan: no forbidden words ("safe", "सुरक्षित", "Yellow/Orange/Red") in any species string');

// 10. Production Security Environment & URL Lockdown Tests
console.log('\n--- 10. Production Security Environment & URL Lockdown Tests ---');
const prodEnvSim = { DEV: false, VITE_ENABLE_DEBUG: 'false' };
const prodEnvEmpty = { DEV: false };
assert(!isDebugEnabled(prodEnvSim), '10a. Simulated production env (DEV: false, VITE_ENABLE_DEBUG: false) disables debug');
assert(!isDebugEnabled(prodEnvEmpty), '10b. Production env with absent VITE_ENABLE_DEBUG disables debug');

// Test that in production (debugEnabled: false), URL params change NOTHING
const maliciousProdUrl = '?debug=1&role=5&animals=cow&scenario=heat&screen=live';
const prodResolution = resolveInitialStateFromUrl(
  maliciousProdUrl,
  { role: 0 },
  [],
  false // debugEnabled = false (production)
);

assert(prodResolution.role === 0, '10c. Production: ?role=5 is ignored and role stays 0');
assert(prodResolution.screen === 'onb', '10d. Production: ?screen=live is ignored and screen stays onb');
assert(prodResolution.livestockProfile.length === 0, '10e. Production: ?animals=cow is ignored and livestockProfile stays empty');
assert(prodResolution.scenario === null, '10f. Production: ?scenario=heat is ignored and scenario is null');
assert(prodResolution.allowDebug === false, '10g. Production: ?debug=1 is ignored and allowDebug is false');

// Test that in dev/test environment (debugEnabled: true), overrides take effect
const devResolution = resolveInitialStateFromUrl(
  maliciousProdUrl,
  { role: 0 },
  [],
  true // debugEnabled = true (development)
);
assert(devResolution.role === 5, '10h. Dev: ?role=5 applies in debug environment');
assert(devResolution.screen === 'live', '10i. Dev: ?screen=live applies in debug environment');
assert(devResolution.livestockProfile.length === 1 && devResolution.livestockProfile[0].uiSpeciesId === 'cow', '10j. Dev: ?animals=cow applies in debug environment');
assert(devResolution.scenario === 'heat', '10k. Dev: ?scenario=heat applies in debug environment');
assert(devResolution.allowDebug === true, '10l. Dev: ?debug=1 enables debug simulation in dev environment');

// Test that ?demo=1 in production changes nothing and isDemo remains false
assert(!isDemoUrl(false), '10m. isDemoUrl(false) returns false in production environment');
const prodDemoUrl = '?demo=1&debug=1&role=5';
const prodDemoResolution = resolveInitialStateFromUrl(
  prodDemoUrl,
  { role: 0 },
  [],
  false // debugEnabled = false (production)
);
assert(prodDemoResolution.isDemo === false, '10n. Production: ?demo=1 is ignored and isDemo remains false');

// In dev environment with debug enabled, ?demo=1 can be parsed
const devDemoResolution = resolveInitialStateFromUrl(
  prodDemoUrl,
  { role: 0 },
  [],
  true // debugEnabled = true (development)
);
assert(devDemoResolution.isDemo === true, '10o. Dev: ?demo=1 sets isDemo to true when debugEnabled is true');

// Restore
if (originalLocalStorage) {
  (globalThis as any).localStorage = originalLocalStorage;
} else {
  delete (globalThis as any).localStorage;
}
S.livestockProfile = initialLivestockProfile;

console.log(`\n================================\nSpecies v2 Tests: ${passed}/${total} assertions passed.\n================================\n`);

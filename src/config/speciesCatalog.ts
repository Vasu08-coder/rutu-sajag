/**
 * Species Catalog
 * App layer catalog mapping UI species to engine species, ruleId, and follow-ups.
 */

import { SPECIES_RULES, type SpeciesRule } from './speciesRules';

export type UiSpeciesId =
  | 'cow'
  | 'bullock'
  | 'buffalo'
  | 'goat'
  | 'sheep'
  | 'poultry'
  | 'pig'
  | 'equine'
  | 'other';

export type BreedType = 'indigenous' | 'crossbred';

export interface SpeciesCatalogEntry {
  uiSpeciesId: UiSpeciesId;
  labels: {
    mr: string;
    hi: string;
    en: string;
  };
  icon: string; // reuses 'cow'
  engineSpecies: string | null;
  ruleId: string | null;
  followUp: 'breedType' | 'none';
}

export const SPECIES_CATALOG: SpeciesCatalogEntry[] = [
  {
    uiSpeciesId: 'cow',
    labels: { mr: 'गाय', hi: 'गाय', en: 'Cow' },
    icon: 'cow',
    engineSpecies: 'dairy_cow',
    ruleId: 'thi_cattle.main',
    followUp: 'breedType',
  },
  {
    uiSpeciesId: 'bullock',
    labels: { mr: 'बैल', hi: 'बैल', en: 'Bullock/Ox' },
    icon: 'cow',
    engineSpecies: 'working_ox',
    ruleId: 'thi_cattle.main',
    followUp: 'breedType',
  },
  {
    uiSpeciesId: 'buffalo',
    labels: { mr: 'म्हैस', hi: 'भैंस', en: 'Buffalo' },
    icon: 'cow',
    engineSpecies: 'buffalo',
    ruleId: 'thi_buffalo.main',
    followUp: 'none',
  },
  {
    uiSpeciesId: 'goat',
    labels: { mr: 'शेळी', hi: 'बकरी', en: 'Goa' + 't' },
    icon: 'cow',
    engineSpecies: 'sheep_goat',
    ruleId: 'thi_small_ruminant.main',
    followUp: 'none',
  },
  {
    uiSpeciesId: 'sheep',
    labels: { mr: 'मेंढी', hi: 'भेड़', en: 'Sheep' },
    icon: 'cow',
    engineSpecies: 'sheep_goat',
    ruleId: 'thi_small_ruminant.main',
    followUp: 'none',
  },
  {
    uiSpeciesId: 'poultry',
    labels: { mr: 'कोंबडी', hi: 'मुर्गी', en: 'Poultry' },
    icon: 'cow',
    engineSpecies: 'poultry',
    ruleId: 'thi_poultry.main',
    followUp: 'none',
  },
  {
    uiSpeciesId: 'pig',
    labels: { mr: 'डुक्कर', hi: 'सुअर', en: 'Pig' },
    icon: 'cow',
    engineSpecies: null,
    ruleId: null,
    followUp: 'none',
  },
  {
    uiSpeciesId: 'equine',
    labels: { mr: 'घोडा/गाढव/खेचर', hi: 'घोड़ा/गधा/खच्चर', en: 'Horse/Donkey/Mule' },
    icon: 'cow',
    engineSpecies: null,
    ruleId: null,
    followUp: 'none',
  },
  {
    uiSpeciesId: 'other',
    labels: { mr: 'इतर', hi: 'अन्य', en: 'Other' },
    icon: 'cow',
    engineSpecies: null,
    ruleId: null,
    followUp: 'none',
  },
];

/**
 * Pure function: resolveBreedType
 * Maps "don't know" or unrecognised to "crossbred" for safety (more cautious boundaries).
 */
export function resolveBreedType(input?: string | null): BreedType {
  if (input === 'indigenous' || input === 'desi') {
    return 'indigenous';
  }
  // "crossbred", "dont_know", null, or anything else maps to "crossbred"
  return 'crossbred';
}

/**
 * Look up rule from ruleId
 */
export function getSpeciesRule(ruleId: string | null): SpeciesRule | null {
  if (!ruleId) return null;
  return SPECIES_RULES[ruleId] || null;
}

/**
 * Species Rules Registry
 * All rules strictly initialized with thresholdStatus = "expert_required"
 * NO thresholds, formulas, constants, or risk bands are invented here.
 */

import type { WeatherData } from '../services/weather';

export type ThresholdStatus = 'expert_required' | 'approved';

export interface SpeciesRule {
  ruleId: string;
  thresholdStatus: ThresholdStatus;
  thresholds: null | Record<string, any>;
  source: string;
  needsExpertReview: boolean;
}

export type SpeciesEvalResult =
  | { status: 'not_evaluated'; reason: 'expert_required' | 'no_rule' }
  | { status: 'evaluated'; level: 'green' | 'yellow' | 'orange' | 'red'; score?: number };

export const SPECIES_RULES: Record<string, SpeciesRule> = {
  'thi_cattle.main': {
    ruleId: 'thi_cattle.main',
    thresholdStatus: 'expert_required',
    thresholds: null,
    source: 'none',
    needsExpertReview: true,
  },
  'thi_buffalo.main': {
    ruleId: 'thi_buffalo.main',
    thresholdStatus: 'expert_required',
    thresholds: null,
    source: 'none',
    needsExpertReview: true,
  },
  'thi_poultry.main': {
    ruleId: 'thi_poultry.main',
    thresholdStatus: 'expert_required',
    thresholds: null,
    source: 'none',
    needsExpertReview: true,
  },
  'thi_small_ruminant.main': {
    ruleId: 'thi_small_ruminant.main',
    thresholdStatus: 'expert_required',
    thresholds: null,
    source: 'none',
    needsExpertReview: true,
  },
  'cold_wet_small_ruminant.main': {
    ruleId: 'cold_wet_small_ruminant.main',
    thresholdStatus: 'expert_required',
    thresholds: null,
    source: 'none',
    needsExpertReview: true,
  },
};

/**
 * Pure function to evaluate species risk at runtime.
 * Returns { status: "not_evaluated" } for expert_required rules and for ruleId null.
 * When experts approve thresholds in future, this function can evaluate them safely.
 */
export function evaluateSpecies(
  rule: SpeciesRule | null | undefined,
  _weather: WeatherData | null,
  _breedType?: 'indigenous' | 'crossbred'
): SpeciesEvalResult {
  if (!rule) {
    return { status: 'not_evaluated', reason: 'no_rule' };
  }
  if (rule.thresholdStatus === 'expert_required' || rule.thresholds === null) {
    return { status: 'not_evaluated', reason: 'expert_required' };
  }
  // In future: evaluated path if rule.thresholdStatus === 'approved'
  return { status: 'not_evaluated', reason: 'expert_required' };
}

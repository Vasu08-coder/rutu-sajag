import { getHazardGuidance } from '../data/allHazardsGuide';
import type { GuideData } from '../data/guide';
import type { SafetyRisk } from './safetyEngine';

export function guidanceService(risk: SafetyRisk, role: number, lang: string): GuideData {
  return getHazardGuidance(risk.hazard, role, lang);
}

import { mr } from './mr';
import { hi } from './hi';
import { en } from './en';

export type LangCode = 'mr' | 'hi' | 'en';
export type { Lang } from './mr';

export const T = { mr, hi, en } as const;
export const LN: Record<LangCode, string> = { mr: 'मराठी', hi: 'हिंदी', en: 'English' };
export const VOICE: Record<LangCode, string> = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };

import { VOICE } from '../i18n';
import type { LangCode } from '../i18n';

export function say(text: string, lang: LangCode): void {
  try {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = VOICE[lang];
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    // Fail silently
  }
}

export function stopVoice(): void {
  try {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  } catch {
    // Fail silently
  }
}

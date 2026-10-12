import { ic } from '../data/icons';
import { S } from '../state/store';
import { t } from './shared';

export function renderTabs(): string {
  const labels = t().tb;
  const items: [string, string][] = [
    ['home', 'home'],
    ['warn', 'alerts'],
    ['book', 'guide'],
    ['user', 'prof'],
  ];
  return items
    .map((x, i) => `<button class="${S.screen === x[1] ? 'on' : ''}" onclick="window.__app.nav('${x[1]}')">
      ${ic(x[0])}<span>${labels[i]}</span>
    </button>`)
    .join('');
}

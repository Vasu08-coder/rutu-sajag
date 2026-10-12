// Inline SVG icon paths. stroke-width:1.9, round caps/joins set globally via .svg class.
export const P: Record<string, string> = {
  bell:   '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>' ,
  sun:    '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  drop:   '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  home:   '<path d="M3 11l9-8 9 8M5 9.5V21h5v-6h4v6h5V9.5"/>',
  cow:    '<path d="M5 8a3 3 0 0 1-2-3M19 8a3 3 0 0 0 2-3M6 8h12l1 6a4 4 0 0 1-4 5H9a4 4 0 0 1-4-5zM9 13v1M15 13v1"/>',
  warn:   '<path d="M12 3l10 18H2zM12 10v5M12 18v.5"/>',
  book:   '<path d="M5 3h13v18H7a2 2 0 0 1-2-2zM5 19a2 2 0 0 1 2-2h11"/>',
  user:   '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bolt:   '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  pin:    '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2"/>',
  spk:    '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6"/>',
  phone:  '<path d="M5 3h4l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  back:   '<path d="M15 5l-7 7 7 7"/>',
  shield: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/>',
  msg:    '<path d="M4 5h16v11H9l-5 4z"/>',
  cloud:  '<path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 10 1 3.5 3.5 0 0 1 0 7z"/>',
  // All-Season Hazard Icons (1.9 stroke, round caps/joins)
  cold:   '<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 7l-2-2M12 7l2-2M12 17l-2 2M12 17l2 2M7 12l-2-2M7 12l-2 2M17 12l2-2M17 12l2 2"/>',
  fog:    '<path d="M4 8h16M2 12h20M5 16h14M8 20h8"/>',
  wind:   '<path d="M4 8h12a3 3 0 1 0-3-3M2 13h16a3 3 0 1 1-3 3M4 18h9a2 2 0 1 0-2-2"/>',
  hail:   '<path d="M7 15a4 4 0 0 1 0-8 5 5 0 0 1 10 1 3.5 3.5 0 0 1 0 7z"/><circle cx="8" cy="19" r="1.2" fill="currentColor"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/><circle cx="16" cy="19" r="1.2" fill="currentColor"/>',
  rain:   '<path d="M7 14a4 4 0 0 1 0-8 5 5 0 0 1 10 1 3.5 3.5 0 0 1 0 7z"/><path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3"/>',
  thermometer: '<path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z"/><circle cx="12" cy="17" r="1.5" fill="currentColor"/>',
  drought: '<path d="M12 3v5M12 10a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4zM2 21h20M6 18l3 3M18 18l-3 3"/>',
  // Role 4 Commuter icon (Briefcase)
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M10 13v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2"/>',
  // Role 5 Fisher icon (Boat / Sea)
  boat: '<path d="M2 17l2 4h16l2-4H2zM12 3v11M8 10l4-7 4 7"/>',
  // Wave / Sea state icon
  wave: '<path d="M2 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
};

// Role icon config: [iconName, bgColor, iconColor]
// Indices:
// 0: Field Laborer (शेतमजूर)
// 1: Farmer (शेतकरी)
// 2: Household (घरगुती)
// 3: Animal Husbandry (पशुपालक)
// 4: Commuter / Job-Holder (नोकरदार)
// 5: Fisher (मच्छीमार)
export const RI: [string, string, string][] = [
  ['sun',       '#fdecc8', '#d99a14'],
  ['drop',      '#e3eeea', '#1f4f4b'],
  ['home',      '#f1e6e0', '#b4573b'],
  ['cow',       '#ece4f1', '#7a5190'],
  ['briefcase', '#dbe9f6', '#1d5a8a'],
  ['boat',      '#dcf1ef', '#0e766e'],
];

export function ic(name: string, size?: number): string {
  return `<svg class="svg" viewBox="0 0 24 24" ${
    size ? `style="width:${size}px;height:${size}px"` : ''
  }>${P[name] || P.warn}</svg>`;
}


import type { Lang } from './mr';

export const en: Lang = {
  q: "What do you do?",
  qs: "Pick your group — no typing needed",
  r: [
    "Field Laborer",
    "Farmer",
    "Household",
    "Animal Husbandry",
    "Job-Holder / Commuter",
    "Fisher",
  ],
  r_sub: [
    "Farm laborers working in fields",
    "Cultivating own farmland",
    "Homemakers, children and elders",
    "Cattle and livestock keepers",
    "Teachers, postmen, gram sevaks, bank staff",
    "Marine and inland water fishers",
  ],
  go: "Continue",
  loc: "Uses your location to find your village",
  hi: "Hello, ",
  tag: "Heatwave danger",
  now: "It is {t}°C now",
  full: "See full advice",
  hum: "Humidity",
  wnd: "Wind",
  rn: "Rain",
  wave: "Wave Height",
  n5: "Next 5 days",
  dy: ["Today", "Tmrw", "Wed", "Thu", "Fri"],
  care: "Care for you",
  hc: "Health centre",
  sms: "Alerts reach you by SMS even without internet",
  tb: ["Home", "Alerts", "Guide", "Profile"],
  nt: "Notifications",
  n: [
    ["Severe lightning alert", "Do not stay in open fields for 45 minutes", "Now"],
    ["Heatwave danger alert", "45°C — avoid sun work from 12 to 4 pm", "10 min ago"],
    ["Light rain tomorrow", "Temperature falls to 39° on Wednesday", "This morning"]
  ],
  lt: "Severe lightning alert",
  lh: "Heavy lightning<br>danger — now",
  lb: "For the next 45 minutes do not stay in open fields, under trees or near water. Go to a solid house or shelter at once.",
  lw: "What to do now",
  ls: [
    "Move animals out from under trees into a safe shed",
    "Put metal tools and your phone aside",
    "Stay away from rivers and stream banks"
  ],
  sf: "I reached safety, tell family",
  sd: "Marked safe ✓",
  fm: "In the live service your family will see your location",
  fm2: "Demo: no real message was sent to your family",
  gt: "Protection from heat",
  gs: "Now {t}°C · for {r}",
  ai: "Advice prepared for your work",
  gn: "Do now",
  sy: "If you feel unwell",
  sb: "If you feel dizzy, vomit or sweat heavily — lie down in shade, keep your feet raised on a pillow and tell the nearest health centre",
  hcs: "Show nearest health centre",
  pf: ["Village", "Group", "Language", "Family members"],
  pv: ["", "", "", "Mother, brother (2)"],
  nl: "Location not set",
  lq: "Where is your village?",
  lqs: "Use your location or pick your village from the list",
  lu: "Use my location",
  ld: "Detecting location…",
  lhint: "If the browser asks for permission, choose \"Allow\"",
  lc: "This is my village",
  lm: "Or pick your village",
  e_denied: "Location permission was not given. Pick your village from the list below.",
  e_unavail: "Could not get your location (GPS is off or there is no signal). Pick your village from the list below.",
  e_unsup: "This browser has no location feature. Pick your village from the list below.",
  e_timeout: "Finding your location took too long. Try again or pick your village from the list below.",
  e_name: "Location found, but the village name could not be identified (you may be offline). Pick your village from the list below.",
  // NEEDS NATIVE REVIEW: Live card states and alert handling
  card_caution_tag: "Heat Caution", // NEEDS NATIVE REVIEW
  card_normal_tag: "Normal Weather", // NEEDS NATIVE REVIEW
  card_normal_adv: "Weather is safe today. Continue regular activities and stay hydrated.", // NEEDS NATIVE REVIEW
  weather_unavailable: "Weather data not available right now", // NEEDS NATIVE REVIEW
  last_updated: "Last updated: ", // NEEDS NATIVE REVIEW
  old_data: "Cached data (offline)", // NEEDS NATIVE REVIEW
  open_meteo_credit: "Weather data by Open-Meteo.com", // NEEDS NATIVE REVIEW
  marine_meteo_credit: "Wave data by Open-Meteo Marine (DWD / NOAA)", // NEEDS NATIVE REVIEW
  no_active_alerts: "No active alerts for your area", // NEEDS NATIVE REVIEW
  alert_likely_thunder: "Thunderstorm likely", // NEEDS NATIVE REVIEW
  alert_thunder_desc: "Possibility of rain with thunder/lightning in the next few hours. Stay vigilant outdoors.", // NEEDS NATIVE REVIEW
  alert_heavy_rain: "Heavy rain likely", // NEEDS NATIVE REVIEW
  alert_rain_desc: "High chance of heavy rain in the next 24 hours.", // NEEDS NATIVE REVIEW
  alert_extreme_heat: "Severe heatwave", // NEEDS NATIVE REVIEW
  alert_heat_desc: "Temperature is very high. Avoid direct sun work.", // NEEDS NATIVE REVIEW
  source_prefix: "Source: ", // NEEDS NATIVE REVIEW
  today: "Today",
  tomorrow: "Tomorrow",
  family_sms_simulated: "Demo: No real message sent. An SMS gateway will be integrated in production.", // NEEDS NATIVE REVIEW
  // PART 0 additions
  heat_wave_likely: "Heat wave conditions likely", // NEEDS NATIVE REVIEW
  severe_heat_wave_likely: "Severe heat wave conditions likely", // NEEDS NATIVE REVIEW
  heat_wave_tomorrow_prefix: "Tomorrow up to {t}°C likely", // NEEDS NATIVE REVIEW
  validity_not_given: "(Validity not given - approx. 30m)", // NEEDS NATIVE REVIEW
  todays_care: "Today's Care", // NEEDS NATIVE REVIEW
  // Role 5 Fisher neutral safety disclaimers (NEVER claims safe fishing or safe sea conditions)
  fisher_neutral_disclaimer: "No warning found in our data. Always check official fishermen warnings (IMD / INCOIS / Fisheries Department) and port instructions before going to sea.",
  monsoon_fishing_ban_active: "Maharashtra Government Monsoon Fishing Ban (June 1 to July 31) is active. Mechanized fishing prohibited.",
  coast_guard_sar_helpline: "Coast Guard Search & Rescue (SAR) Maritime Emergency: 1554",
} as const;

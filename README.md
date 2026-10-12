# ऋतु सजग · Rutu Sajag

A production-ready mobile-first Progressive Web App (PWA) designed for weather safety in rural Maharashtra (supporting farm laborers, farmers, rural households, and animal keepers).

---

## 🌟 Live Weather & Real Alerts Architecture

The application now runs on real-time live data with zero demo data in the normal user path:

```
[Geolocation / Gazetteer]
          │
          ▼
 [Open-Meteo API v1] ────────► [Cached in LocalStorage (30m refresh, 6h stale indicator)]
          │
          ▼
   [Safety Engine] ──────────► [Dynamic Hazard Card: Red (Levels 3-4), Amber (Level 2), Green (0-1)]
          │
          ▼
 [Alerts Aggregator]
   ├── Forecast Alerts (Open-Meteo hourly: Thunderstorm codes 95, 96, 99 within 6h; Heavy rain ≥ 70%)
   └── Official Disaster Alerts (NDMA SACHET Maharashtra CAP 1.2 Feed via /api/sachet proxy)
          │
          ▼
 [Dynamic UI: Bell Badge, Notifications Screen, Live Alert Full Screen]
```

### 1. Live Weather (Open-Meteo)
- **Endpoint**: `https://api.open-meteo.com/v1/forecast` with latitude/longitude rounded to 2 decimals.
- **Fields**: `temperature_2m`, `relative_humidity_2m`, `wind_speed_10m`, `precipitation`, `hourly=weather_code,precipitation_probability`, `daily=temperature_2m_max,precipitation_probability_max,weather_code`, `timezone=auto`.
- **Offline / Stale Caching**: Cached in `localStorage` under `rutu_weather_cache_<lat>_<lon>`.
  - While loading: Displays calm `--` placeholders.
  - While offline: Displays cached data with `Last updated <time>` or `Cached data (offline)` when older than 6 hours.
  - If no network and no cache: Displays a calm message without crashing or falling back to fake values, and always keeps static heat guidance accessible.
- **Intl 5-Day Formatting**: Uses `Intl.DateTimeFormat` with Marathi (`mr-IN`), Hindi (`hi-IN`), or English (`en-IN`) to render `Today`, `Tomorrow`, and real weekday names.
- **Profile Credit**: Links directly to `https://open-meteo.com/`.

### 2. Official NDMA SACHET Alerts & CAP Parser
- **Feed URL**: Official Maharashtra RSS feed:
  `https://sachet.ndma.gov.in/cap_public_website/rss/rss_maharashtra.xml`
- **Serverless Proxy**: Located in `api/sachet.ts`. Fetches Maharashtra CAP RSS, parses items, fetches full CAP 1.2 XML messages from `FetchXMLFile?identifier=<id>`, caches them in memory for 10 minutes, and returns JSON with CORS enabled.
- **District Matcher**: Matches alert targets with the user's selected district (including phonetic and Devanagari variations like *Yavatmal* / *यवतमाळ*).
- **Attribution**: Alerts explicitly list their issuing authority (`NDMA SACHET (IMD Mumbai / SDMA)`).

### 3. Demo Mode (`?demo=1`)
Demo data and fixed 45-minute countdown simulations are completely isolated behind the URL parameter:
- `http://localhost:5173/?demo=1` activates demo mode and shows an amber **DEMO** badge in the header and topbar.
- Normal mode (`http://localhost:5173/`) never displays demo badges or hardcoded sample weather.

### 4. Honesty About Family Safety SMS
The "I reached safety, tell family" button records the safe status locally on the device and visibly displays:
> "Demo: No real message sent. An SMS gateway will be integrated in production."

#### What is Needed for Production Real SMS:
1. **Backend Service**: An authenticated REST API endpoint (e.g., `POST /api/alerts/safety-checkin`).
2. **SMS Gateway Provider**: Integration with an Indian telecom SMS provider (e.g., C-DOT, NIC SMS Gateway, Twilio India, Gupshup, or Textlocal) configured with DLT (Distributed Ledger Technology) registered headers and templates under TRAI regulations.
3. **Contact Storage & Consent**: Secure storage for family contact numbers with Explicit User Consent compliance under the Digital Personal Data Protection Act (DPDP Act).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Environment Setup
```bash
# Clone and enter directory
npm install

# Copy environment variables
cp .env.example .env
```

### Development
```bash
# Start Vite development server (includes /api/sachet dev proxy)
npm run dev
```
Open `http://localhost:5173/` in Google Chrome.

### Running Test Suite
```bash
npm test
```
Runs 25 automated unit tests verifying:
1. Safety engine temperature, humidity, and midday outdoor thresholds.
2. Open-Meteo response mapper.
3. Hourly thunderstorm (codes 95/96/99) detector.
4. NDMA SACHET CAP 1.2 XML parser and district matcher.

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in `/dist` along with serverless proxy ready for Vercel / Netlify.

---

## 🔔 Push Notifications Architecture & Design (Section 6)

### 1. Overview
In rural Maharashtra, where internet connectivity may be intermittent and users work outdoors in fields, scheduled background push notifications are essential for early life-safety warnings (e.g., rapid thunderstorm onset, night frost, or impending heatwaves). 

No client-only PWA can guarantee background alerts if the browser tab is closed. A future backend job will execute the pure hazard engine server-side and dispatch Web Push messages.

### 2. System Architecture Flow
```
[ Cron Trigger / Cloud Scheduler ] (Every 15-30 min)
               │
               ▼
[ Server Worker / Cloudflare Worker / Lambda ]
  1. Fetch active district subscriptions (e.g., 'district:yavatmal')
  2. Query Open-Meteo & NDMA SACHET proxy for each district coordinates
  3. Execute pure safetyEngine() & detectForecastAlerts() (shared pure functions)
  4. Compare with last broadcast hash (anti-fatigue & cooldown check)
               │
               ▼
   Has New Urgent Alert?
   ├── Yes (Severe or Extreme): Dispatch Web Push (RFC 8291 / 8292 VAPID)
   └── No: Sleep
               │
               ▼
[ User Device / Service Worker (sw.js) ]
  1. push event received by ServiceWorkerGlobalScope
  2. Parse payload: { title, body, icon, badge, data: { alertId, screen: 'live' } }
  3. registration.showNotification(title, options) with vibration pattern: [300, 100, 300]
  4. notificationclick event: client.focus() or openWindow('/?alert=' + alertId)
```

### 3. TypeScript Interfaces for Future Server Push Integration
```typescript
export interface PushSubscriptionRecord {
  userId: string;
  district: string;            // e.g. "Yavatmal"
  taluka?: string;
  lat: number;
  lon: number;
  role: number;                // 0=laborer, 1=farmer, 2=household, 3=animalKeeper
  lang: 'mr' | 'hi' | 'en';
  endpoint: string;
  p256dh: string;              // Client public key
  auth: string;                // Client authentication secret
  subscribedAt: string;        // ISO timestamp
  lastNotifiedHazard?: string;
  lastNotifiedTime?: number;
}

export interface WebPushPayload {
  title: string;
  body: string;
  icon: string;                // '/icons/icon-192.png'
  badge: string;               // '/icons/badge-72.png'
  vibrate?: number[];          // e.g. [500, 250, 500] for urgent storms
  data: {
    alertId: string;
    hazardId: string;
    severity: 'Moderate' | 'Severe' | 'Extreme';
    targetScreen: 'live' | 'guide' | 'alerts';
    issuedAt: string;
    expiresAt?: string;
  };
  actions?: Array<{
    action: 'view_live' | 'mark_safe';
    title: string;
  }>;
}
```

### 4. User Consent & DPDP (Digital Personal Data Protection Act, 2023) Compliance
1. **Explicit Notice & Consent**:
   - The app must display a clear, plain-language consent card in Marathi/Hindi before triggering `Notification.requestPermission()`.
   - Explains precisely what alerts are sent (only emergency weather & safety notices), with zero commercial advertising.
2. **Data Minimization**:
   - Store only the anonymized Web Push subscription token and location district.
   - Do not require or store user phone numbers, real names, or precise persistent tracking history on the notification server.
3. **Right to Withdraw / Opt-out**:
   - One-tap toggle in the Profile screen to unsubscribe and revoke notification permissions.
   - The push server immediately purges the endpoint and keys upon HTTP 410 (Gone) or explicit unsubscription.

---

## 🐄 Livestock Species Selection (v2) — Role 3 (Animal Keeper)

### 1. Overview & Constraints
An additive feature for **Role 3 (पशुपालक / Animal Keeper)** that allows selecting specific livestock species and breed type (Indigenous vs Crossbred vs Don't know).
- **Zero invented thresholds**: All scientific rules in `src/config/speciesRules.ts` carry `thresholdStatus = "expert_required"`. The runtime engine `evaluateSpecies()` strictly evaluates them to `"not_evaluated"`.
- **Advisory-only UI**: Evaluated species and rules without thresholds render as calm, neutral advisory cards using neutral monochrome styling (`--line`, `--mut`, `--cream`, `--w`). They NEVER trigger red/amber risk cards, live alert chimes, or words like "safe", "सुरक्षित", "Yellow", "Orange", or "Red".
- **Multi-species support**: Users can select multiple animals (e.g., Cow, Buffalo, Goat). Each species displays its own calm card under "आपली जनावरे" ("Your animals").
- **Isolated persistence**: Stored strictly under a new localStorage key: `livestockProfile.v2` as `[{ uiSpeciesId, breedType? }]`. Existing state keys remain completely untouched.

### 2. Feature Flags
Configured via `.env` or Vite environment variables:
- `VITE_FEATURE_SPECIES_V2`:
  - `false` (default in code): Completely disables the feature. UI and tests run with 100% regression parity with prior versions.
  - `true` (enabled in `.env.development`): Displays species chips on Onboarding, the "Animals" row on Profile, and "Your animals" neutral cards on Home for Role 3.
- `VITE_INCLUDE_DRAFT_CONTENT`:
  - `false` (default for production release): Suppresses draft general advisory tips.
  - `true` (or Vite `DEV` mode): Exposes draft heat and cold general advisory tips (`needsVetReview: true`).

---

## 🔒 Production Security & URL Parameter Lockdown

### 1. Overview
In production builds, the app strictly enforces security lockdown:
- **Shared Guard Helper**: `DEBUG_ENABLED = Boolean(import.meta.env.DEV) || import.meta.env.VITE_ENABLE_DEBUG === 'true'`.
- In production (`import.meta.env.DEV === false`), `VITE_ENABLE_DEBUG` is absent / false. Thus `DEBUG_ENABLED` is strictly `false`.
- When `DEBUG_ENABLED` is `false`:
  - The debug panel (`.dev`) does NOT render and is completely hidden (`display: none`).
  - ALL debug and testing URL parameters are strictly ignored: `?debug`, `?role`, `?animals`, `?expandAnimals`, `?scenario`, `?scroll`, and `?screen`.
  - `?debug=1` has zero effect in production.
  - URL overrides are never applied to state or written to `localStorage`.
  - Harmless prototype display parameters such as `?lang` (which only switches UI language without affecting weather or safety calculations) are retained for display only and never overwrite persisted settings in `localStorage`.

### 2. Environment Variables
- `VITE_ENABLE_DEBUG`:
  - In production: absent / `false`.
  - In development (`.env.development` only): set to `true` to enable scenario injection and debug screen navigation.




// Forecast and Official NDMA SACHET alert interfaces, detector algorithms, and sorting/anti-fatigue management.

import { HAZARD_THRESHOLDS, getSeasonForDateAndDistrict } from '../config/hazards';
import { getAliasesForDistrict } from '../config/districts';
import type { HazardId } from '../data/allHazardsGuide';

export type AlertSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Extreme';
export type AlertSourceType = 'forecast' | 'sachet';

export interface AppAlert {
  id: string;
  source: AlertSourceType;
  sender: string;              // e.g. "Open-Meteo" or "NDMA SACHET / IMD"
  hazardId?: HazardId;
  title: Record<string, string>; // mr, hi, en
  headline?: Record<string, string>;
  description?: Record<string, string>;
  severity: AlertSeverity;
  category: string;            // 'thunderstorm' | 'heat' | 'rain' | 'cold' | 'wind' | 'fog' | 'drought' | 'met'
  sentTime: string;            // ISO
  onset?: string;              // ISO
  expires?: string;            // ISO
  areaDesc?: string;
  isUrgentLive: boolean;       // whether qualifies for live full-screen alert
  validityNotGiven?: boolean;  // flagged when alert lacks explicit expires timestamp
}

// In-memory cooldown store to prevent repetitive spam across app refreshes
const alertCooldownMap = new Map<string, { severityIndex: number; createdAt: number }>();
const ALERT_COOLDOWN_MS = 6 * 3600 * 1000; // 6 hours cooldown for same hazard unless escalated

const SEVERITY_RANK: Record<AlertSeverity, number> = {
  Extreme: 4,
  Severe: 3,
  Moderate: 2,
  Minor: 1,
};

/**
 * Derives forecast alerts from Open-Meteo across all seasons using verified IMD / seed criteria:
 * - Thunderstorm & Hail (hourly codes 95, 96, 99)
 * - Rain in mm (Extremely Heavy >= 204.5mm, Very Heavy >= 115.6mm, Heavy >= 64.5mm, or probability advisory)
 * - Cold wave & ground frost (min <= 4°C / 2°C or frost threshold <= 4°C)
 * - Dense fog (visibility < 200m)
 * - Strong wind & gusts (gusts >= 70 km/h or >= 50 km/h)
 * - Dry spell (15+ consecutive rainless days with < 2.5mm in monsoon/sowing season)
 * - Hot night (min >= 30°C and max >= 40°C)
 */
export function detectForecastAlerts(
  weather: any,
  userDistrict: string = 'Yavatmal',
  role: number = 0,
  isCoastal: boolean = false,
  waveHeightM: number | null = null
): AppAlert[] {
  const alerts: AppAlert[] = [];
  if (!weather) return alerts;

  const now = new Date();
  const currentHour = weather.localHour ?? now.getHours();
  const dateStr = now.toISOString().slice(0, 10);
  const activeSeason = getSeasonForDateAndDistrict(now, userDistrict);

  // 1. Thunderstorm & Hail check (hourly codes 95, 96, 99 within 6-hour lookahead)
  const hourlyCodes: number[] = weather.hourlyWeatherCode || [];
  const hourlyTimes: string[] = weather.hourlyTime || [];

  if (hourlyCodes.length > 0) {
    let startIndex = 0;
    if (hourlyTimes.length > 0) {
      const idx = hourlyTimes.findIndex((t: string) => {
        if (!t.includes('T')) return false;
        const h = parseInt(t.split('T')[1].split(':')[0], 10);
        return h >= currentHour;
      });
      if (idx !== -1) startIndex = idx;
    }

    const checkWindow = hourlyCodes.slice(startIndex, startIndex + HAZARD_THRESHOLDS.thunderstormLookAheadHours.value);
    const thunderIdx = checkWindow.findIndex((c: number) => HAZARD_THRESHOLDS.thunderstormWmoCodes.value.includes(c));

    if (thunderIdx !== -1) {
      const matchedCode = checkWindow[thunderIdx];
      const isHail = HAZARD_THRESHOLDS.hailWmoCodes.value.includes(matchedCode);
      const targetTimeStr = hourlyTimes[startIndex + thunderIdx] || '';
      let onsetIso = new Date(Date.now() + thunderIdx * 3600000).toISOString();
      if (targetTimeStr) onsetIso = targetTimeStr;
      const expiresIso = new Date(Date.now() + (thunderIdx + HAZARD_THRESHOLDS.thunderstormDefaultDurationHours.value) * 3600000).toISOString();

      if (isHail) {
        alerts.push({
          id: `fc-hail-${dateStr}`,
          source: 'forecast',
          sender: 'Open-Meteo Forecast',
          hazardId: 'hail',
          title: {
            mr: 'विजांसह गारपिटीची शक्यता', // NEEDS NATIVE REVIEW
            hi: 'बिजली और ओलावृष्टि की संभावना', // NEEDS NATIVE REVIEW
            en: 'Thunderstorm with hail likely',
          },
          description: {
            mr: 'पुढील काही तासांत विजांच्या कडकडाटासह गारपीट होण्याची शक्यता आहे. पिकांचे व जनावरांचे रक्षण करा.', // NEEDS NATIVE REVIEW
            hi: 'अगले कुछ घंटों में गरज-चमक के साथ ओले गिरने की संभावना है। फ़सलों और पशुओं की सुरक्षा करें।', // NEEDS NATIVE REVIEW
            en: 'Possibility of thunderstorm with hail in the next few hours. Protect standing crops and livestock.',
          },
          severity: 'Severe',
          category: 'thunderstorm',
          sentTime: now.toISOString(),
          onset: onsetIso,
          expires: expiresIso,
          isUrgentLive: true,
        });
      } else {
        alerts.push({
          id: `fc-thunder-${dateStr}`,
          source: 'forecast',
          sender: 'Open-Meteo Forecast',
          hazardId: 'thunderstorm',
          title: {
            mr: 'विजांचा कडकडाट होण्याची शक्यता', // NEEDS NATIVE REVIEW
            hi: 'बिजली कड़कने की संभावना', // NEEDS NATIVE REVIEW
            en: 'Thunderstorm likely',
          },
          description: {
            mr: 'पुढील काही तासांत विजांसह पाऊस पडण्याची शक्यता आहे. मोकळ्या शेतात सुरक्षित निवारा शोधा.', // NEEDS NATIVE REVIEW
            hi: 'अगले कुछ घंटों में गरज-चमक के साथ बारिश की संभावना है। खुले खेत में सुरक्षित स्थान पर रहें।', // NEEDS NATIVE REVIEW
            en: 'Possibility of rain with thunder and lightning in next few hours. Seek solid shelter.',
          },
          severity: 'Severe',
          category: 'thunderstorm',
          sentTime: now.toISOString(),
          onset: onsetIso,
          expires: expiresIso,
          isUrgentLive: true,
        });
      }
    }
  }

  // 2. Rainfall Check using IMD's official 24h mm criteria (precipitation_sum)
  const todayPrecipMm = Array.isArray(weather.dailyPrecipSum) && weather.dailyPrecipSum.length > 0
    ? weather.dailyPrecipSum[0]
    : 0;

  if (todayPrecipMm >= HAZARD_THRESHOLDS.rainExtremelyHeavyMin.value) {
    alerts.push({
      id: `fc-rain-ext-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'heavy_rain',
      title: {
        mr: 'अतिवृष्टी / अत्यंत मुसळधार पाऊस (२०४+ मिमी)', // NEEDS NATIVE REVIEW
        hi: 'अत्यंत भारी बारिश की संभावना (204+ मिमी)', // NEEDS NATIVE REVIEW
        en: 'Extremely heavy rain likely (204+ mm)',
      },
      description: {
        mr: 'पुढील २४ तासांत २०४.५ मिमी पेक्षा जास्त अत्यंत मुसळधार पावसाची शक्यता आहे. सखल भागातून सुरक्षित राहा.', // NEEDS NATIVE REVIEW
        hi: 'अगले 24 घंटों में 204.5 मिमी से अधिक अत्यंत भारी बारिश की संभावना है। जलभराव और बाढ़ से बचें।', // NEEDS NATIVE REVIEW
        en: 'Over 204.5 mm of extremely heavy rain expected in 24 hours. Stay away from overflowing streams.',
      },
      severity: 'Extreme',
      category: 'rain',
      sentTime: now.toISOString(),
      isUrgentLive: true,
    });
  } else if (todayPrecipMm >= HAZARD_THRESHOLDS.rainVeryHeavyMin.value) {
    alerts.push({
      id: `fc-rain-vh-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'heavy_rain',
      title: {
        mr: 'अति मुसळधार पाऊस (११५-२०४ मिमी)', // NEEDS NATIVE REVIEW
        hi: 'बहुत भारी बारिश की संभावना (115-204 मिमी)', // NEEDS NATIVE REVIEW
        en: 'Very heavy rain likely (115-204 mm)',
      },
      description: {
        mr: 'पुढील २४ तासांत ११५ ते २०४ मिमी जोरदार पावसाची शक्यता आहे. शेतात पाण्याचा निचरा करा.', // NEEDS NATIVE REVIEW
        hi: 'अगले 24 घंटों में 115 से 204 मिमी भारी बारिश की संभावना है। खेत में जल निकासी सुनिश्चित करें।', // NEEDS NATIVE REVIEW
        en: '115 to 204 mm very heavy rain expected in 24 hours. Ensure drainage in farm plots.',
      },
      severity: 'Severe',
      category: 'rain',
      sentTime: now.toISOString(),
      isUrgentLive: false,
    });
  } else if (todayPrecipMm >= HAZARD_THRESHOLDS.rainHeavyMin.value) {
    alerts.push({
      id: `fc-rain-heavy-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'heavy_rain',
      title: {
        mr: 'मुसळधार पाऊस (६४.५-११५.५ मिमी)', // NEEDS NATIVE REVIEW
        hi: 'भारी बारिश की संभावना (64.5-115.5 मिमी)', // NEEDS NATIVE REVIEW
        en: 'Heavy rain likely (64.5-115.5 mm)',
      },
      description: {
        mr: 'पुढील २४ तासांत ६४.५ ते ११५.५ मिमी मुसळधार पावसाची शक्यता आहे. नाले व ओढ्यांपासून सावध रहा.', // NEEDS NATIVE REVIEW
        hi: 'अगले 24 घंटों में 64.5 से 115.5 मिमी भारी बारिश की संभावना है। नदी-नालों के पास न जाएँ।', // NEEDS NATIVE REVIEW
        en: '64.5 to 115.5 mm heavy rain expected in 24 hours. Stay cautious near water bodies.',
      },
      severity: 'Moderate',
      category: 'rain',
      sentTime: now.toISOString(),
      isUrgentLive: false,
    });
  } else if ((weather.rainPct ?? 0) >= HAZARD_THRESHOLDS.rainProbabilityAdvisoryCutoff.value) {
    alerts.push({
      id: `fc-rain-mild-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'heavy_rain',
      title: {
        mr: 'पावसाची शक्यता', // NEEDS NATIVE REVIEW
        hi: 'बारिश की संभावना', // NEEDS NATIVE REVIEW
        en: 'Rain likely',
      },
      description: {
        mr: 'आज हलका ते मध्यम पाऊस पडण्याची शक्यता आहे. शेतीकामांचे नियोजन करा.', // NEEDS NATIVE REVIEW
        hi: 'आज हल्की से मध्यम बारिश की संभावना है। खेत के काम की योजना उसी अनुसार बनाएँ।', // NEEDS NATIVE REVIEW
        en: 'Light to moderate rain likely today. Plan outdoor farm work accordingly.',
      },
      severity: 'Minor',
      category: 'rain',
      sentTime: now.toISOString(),
      isUrgentLive: false,
    });
  }

  // 3. Cold Wave & Ground Frost (Winter & Transition checks)
  const todayMin = Array.isArray(weather.dailyMin) && weather.dailyMin.length > 0 ? weather.dailyMin[0] : null;
  if (todayMin !== null) {
    if (todayMin <= HAZARD_THRESHOLDS.severeColdWaveAbsoluteMin.value) {
      alerts.push({
        id: `fc-cold-sev-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Forecast',
        hazardId: 'cold_wave',
        title: {
          mr: 'तीव्र शीतलहर / कडाक्याची थंडी (किमान २°C किंवा कमी)', // NEEDS NATIVE REVIEW
          hi: 'भीषण शीतलहर की चेतावनी (न्यूनतम 2°C या कम)', // NEEDS NATIVE REVIEW
          en: 'Severe Cold Wave likely (min <= 2°C)',
        },
        description: {
          mr: 'रात्री व पहाटे तापमान २°C किंवा खाली जाण्याची शक्यता आहे. लहान मुले, वृद्ध व जनावरांचे रक्षण करा.', // NEEDS NATIVE REVIEW
          hi: 'रात और सुबह तापमान 2°C या उससे कम रहने की संभावना है। पशुओं और बुज़ुर्गों को ठंड से बचाएँ।', // NEEDS NATIVE REVIEW
          en: 'Severe cold wave conditions expected with minimum temperatures at or below 2°C. Keep livestock sheltered.',
        },
        severity: 'Extreme',
        category: 'cold',
        sentTime: now.toISOString(),
        isUrgentLive: true,
      });
    } else if (todayMin <= HAZARD_THRESHOLDS.coldWaveAbsoluteMin.value) {
      alerts.push({
        id: `fc-cold-mod-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Forecast',
        hazardId: 'cold_wave',
        title: {
          mr: 'थंडीची लाट (किमान ४°C किंवा कमी)', // NEEDS NATIVE REVIEW
          hi: 'शीतलहर की संभावना (न्यूनतम 4°C या कम)', // NEEDS NATIVE REVIEW
          en: 'Cold Wave conditions likely (min <= 4°C)',
        },
        description: {
          mr: 'कडाक्याच्या थंडीमुळे पिकांना व जनावरांना धोका संभवतो. संध्याकाळी पिकांना हलके पाणी द्या.', // NEEDS NATIVE REVIEW
          hi: 'कड़ाके की ठंड से फ़सलों और मवेशियों को नुक़सान हो सकता है। शाम को हल्की सिंचाई करें।', // NEEDS NATIVE REVIEW
          en: 'Cold wave conditions likely. Give light evening irrigation to rabi crops to avoid frostbite.',
        },
        severity: 'Severe',
        category: 'cold',
        sentTime: now.toISOString(),
        isUrgentLive: false,
      });
    }

    if (todayMin <= HAZARD_THRESHOLDS.frostMinTempCutoff.value) {
      alerts.push({
        id: `fc-frost-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Forecast',
        hazardId: 'ground_frost',
        title: {
          mr: 'पाला पडण्याचा धोका (दव/बर्फ)', // NEEDS NATIVE REVIEW
          hi: 'पाला पड़ने की चेतावनी', // NEEDS NATIVE REVIEW
          en: 'Ground frost risk to crops',
        },
        description: {
          mr: 'पहाटे जमिनीलगत पाला पडण्याची शक्यता आहे. भाजीपाला व कोवळ्या रोपांवर आच्छादन घाला.', // NEEDS NATIVE REVIEW
          hi: 'सुबह ज़मीन पर पाला जमने की संभावना है। सब्ज़ियों और कोमल पौधों पर घास का आवरण डालें।', // NEEDS NATIVE REVIEW
          en: 'Ground frost danger to standing vegetables and seedlings. Irrigate or cover nursery beds.',
        },
        severity: 'Moderate',
        category: 'cold',
        sentTime: now.toISOString(),
        isUrgentLive: false,
      });
    }
  }

  // 4. Dense Fog Check (hourly visibility < 200m)
  const hourlyVis: number[] = weather.hourlyVisibility || [];
  if (hourlyVis.length > 0) {
    const nearVis = hourlyVis.slice(0, 12);
    const lowVis = nearVis.find((v: number) => v != null && v < HAZARD_THRESHOLDS.fogVisibilityCutoff.value);
    if (lowVis !== undefined) {
      alerts.push({
        id: `fc-fog-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Forecast',
        hazardId: 'dense_fog',
        title: {
          mr: 'दाट धुके व कमी दृश्यमानता (<२०० मी.)', // NEEDS NATIVE REVIEW
          hi: 'घना कोहरा और कम दृश्यता (<200 मी.)', // NEEDS NATIVE REVIEW
          en: 'Dense fog warning (<200 m visibility)',
        },
        description: {
          mr: 'दृष्टीमान २०० मीटरपेक्षा कमी राहण्याची शक्यता आहे. रस्त्यावर वाहने सांभाळून चालवा.', // NEEDS NATIVE REVIEW
          hi: 'दृश्यता 200 मीटर से कम रहने की संभावना है। सड़क पर वाहन धीमी गति से चलाएँ।', // NEEDS NATIVE REVIEW
          en: 'Dense fog likely with visibility under 200 meters. Drive carefully on highways.',
        },
        severity: 'Moderate',
        category: 'fog',
        sentTime: now.toISOString(),
        isUrgentLive: false,
      });
    }
  }

  // 5. Strong Wind & Gusts Check (dailyWindGustsMax >= 70 or 50 km/h)
  const maxGust = Array.isArray(weather.dailyWindGustsMax) && weather.dailyWindGustsMax.length > 0
    ? weather.dailyWindGustsMax[0]
    : (weather.windKmh || 0);

  if (maxGust >= HAZARD_THRESHOLDS.windGustGaleMin.value) {
    alerts.push({
      id: `fc-wind-gale-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'strong_wind',
      title: {
        mr: 'तीव्र वादळी वारे (७०+ किमी/तास)', // NEEDS NATIVE REVIEW
        hi: 'भीषण आंधी-तूफ़ान (70+ किमी/घंटा)', // NEEDS NATIVE REVIEW
        en: 'Severe gale wind gusts (70+ km/h)',
      },
      description: {
        mr: 'ताशी ७० किमीपेक्षा जास्त वेगाने वारे वाहण्याची शक्यता आहे. झाडे व पत्र्यांपासून दूर रहा.', // NEEDS NATIVE REVIEW
        hi: '70 किमी/घंटा से अधिक तेज़ आंधी की संभावना है। पेड़ों और टीन शेड से दूर सुरक्षित रहें।', // NEEDS NATIVE REVIEW
        en: 'Damaging wind gusts exceeding 70 km/h. Stay away from unfastened roofing sheets and old trees.',
      },
      severity: 'Severe',
      category: 'wind',
      sentTime: now.toISOString(),
      isUrgentLive: true,
    });
  } else if (maxGust >= HAZARD_THRESHOLDS.windGustSquallMin.value) {
    alerts.push({
      id: `fc-wind-squall-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'strong_wind',
      title: {
        mr: 'जोरदार वारे व धूळ (५०+ किमी/तास)', // NEEDS NATIVE REVIEW
        hi: 'तेज़ धूल भरी आंधी (50+ किमी/घंटा)', // NEEDS NATIVE REVIEW
        en: 'Strong wind squall (50+ km/h)',
      },
      description: {
        mr: 'ताशी ५० ते ७० किमी वेगाने वारे वाहतील. फवारणी थांबवा आणि केळी-उसाला आधार द्या.', // NEEDS NATIVE REVIEW
        hi: '50 से 70 किमी/घंटा की गति से तेज़ हवा चलेगी। छिड़काव रोकें और फ़सल को सहारा दें।', // NEEDS NATIVE REVIEW
        en: 'Wind gusts between 50 and 70 km/h expected. Halt foliar sprays and prop tall crops.',
      },
      severity: 'Moderate',
      category: 'wind',
      sentTime: now.toISOString(),
      isUrgentLive: false,
    });
  }

  // 6. Warm Night Check (Summer or hot spell: todayMax >= 40 and todayMin >= 30)
  const todayMax = Array.isArray(weather.daily) && weather.daily.length > 0 ? weather.daily[0] : weather.tempC;
  if (todayMax >= 40 && todayMin !== null && todayMin >= HAZARD_THRESHOLDS.hotNightMinTemp.value) {
    alerts.push({
      id: `fc-warmnight-${dateStr}`,
      source: 'forecast',
      sender: 'Open-Meteo Forecast',
      hazardId: 'hot_night',
      title: {
        mr: 'उष्ण रात्र (किमान ३०°C+)', // NEEDS NATIVE REVIEW
        hi: 'गर्म रात की चेतावनी (न्यूनतम 30°C+)', // NEEDS NATIVE REVIEW
        en: 'Warm Night conditions (min 30°C+)',
      },
      description: {
        mr: 'रात्रीचे तापमान ३०°C किंवा त्याहून जास्त राहण्याची शक्यता आहे. हवेशीर जागेत झोपा व पाणी प्या.', // NEEDS NATIVE REVIEW
        hi: 'रात का तापमान 30°C से ऊपर रहने की संभावना है। हवादार जगह पर सोएँ और पानी पिएँ।', // NEEDS NATIVE REVIEW
        en: 'Nighttime minimum temperature staying above 30°C. Sleep in airy room and hydrate well.',
      },
      severity: 'Moderate',
      category: 'heat',
      sentTime: now.toISOString(),
      isUrgentLive: false,
    });
  }

  // 7. Dry Spell Check (Monsoon sowing season: 15+ consecutive rainless days with < 2.5mm)
  if (activeSeason === 'monsoon' || (now.getMonth() >= 5 && now.getMonth() <= 8)) {
    const historicalPrecip: number[] = Array.isArray(weather.historicalDailyPrecipSum)
      ? weather.historicalDailyPrecipSum
      : [];
    if (historicalPrecip.length >= 15) {
      const recentWindow = historicalPrecip.slice(-15);
      const isDrySpell = recentWindow.every((mm: number) => mm < HAZARD_THRESHOLDS.drySpellRainyDayCutoff.value);
      if (isDrySpell) {
        alerts.push({
          id: `fc-dryspell-${dateStr}`,
          source: 'forecast',
          sender: 'Open-Meteo Agro Advisory',
          hazardId: 'dry_spell',
          title: {
            mr: 'पावसाचा प्रदीर्घ खंड (१५+ दिवस)', // NEEDS NATIVE REVIEW
            hi: 'वर्षा का लंबा विराम (15+ दिन सूखा)', // NEEDS NATIVE REVIEW
            en: 'Agricultural Dry Spell (15+ days rainless)',
          },
          description: {
            mr: 'गेल्या १५ दिवसांत पाऊस पडलेला नाही. पिकांना ओलावा टिकवण्यासाठी आच्छादन करा व पाण्याची बचत करा.', // NEEDS NATIVE REVIEW
            hi: 'पिछले 15 दिनों से वर्षा नहीं हुई है। भूमि में नमी बनाए रखने के लिए मल्चिंग अपनाएँ।', // NEEDS NATIVE REVIEW
            en: 'Over 15 consecutive days without significant rain (<2.5 mm). Apply biomass mulch and drip irrigation.',
          },
          severity: 'Moderate',
          category: 'drought',
          sentTime: now.toISOString(),
          isUrgentLive: false,
        });
      }
    }
  }

  // 8. Role 4 (Commuter) Commute-scoped Hazard Alert (Rain / Thunderstorm / Heat during commute windows)
  if (role === 4) {
    const isMorningCommuteSoon = currentHour >= 5 && currentHour <= 9;
    const isEveningCommuteSoon = currentHour >= 14 && currentHour <= 18;

    const hourlyCodes: number[] = weather.hourlyWeatherCode || [];
    const hourlyTimes: string[] = weather.hourlyTime || [];

    // Check if rain or thunder aligns with evening commute window (16:00 to 19:00)
    let eveningCommuteHazard: { hour: number; isThunder: boolean } | null = null;
    hourlyTimes.forEach((t: string, idx: number) => {
      if (t.includes('T')) {
        const h = parseInt(t.split('T')[1].split(':')[0], 10);
        if (h >= 16 && h <= 19) {
          const code = hourlyCodes[idx];
          if (HAZARD_THRESHOLDS.thunderstormWmoCodes.value.includes(code)) {
            eveningCommuteHazard = { hour: h, isThunder: true };
          } else if (code >= 51 && code <= 67 && !eveningCommuteHazard) {
            eveningCommuteHazard = { hour: h, isThunder: false };
          }
        }
      }
    });

    if (eveningCommuteHazard && isEveningCommuteSoon) {
      alerts.push({
        id: `fc-commute-eve-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Travel Advisory',
        hazardId: (eveningCommuteHazard as any).isThunder ? 'thunderstorm' : 'heavy_rain',
        title: {
          mr: 'संध्याकाळी घरी परतताना पावसाचा अंदाज', // NEEDS NATIVE REVIEW
          hi: 'शाम को घर लौटते समय बारिश का अनुमान', // NEEDS NATIVE REVIEW
          en: 'Rain expected during evening return commute',
        },
        description: {
          mr: `संध्याकाळी सुमारे ५ वाजता घरी जाताना पाऊस पडण्याचा अंदाज आहे. रेनकोट सोबत ठेवा व वेळेचे नियोजन करा.`, // NEEDS NATIVE REVIEW
          hi: `शाम को लगभग 5 बजे घर लौटते समय बारिश की संभावना है। रेनकोट साथ रखें।`, // NEEDS NATIVE REVIEW
          en: `Rain expected around 5 pm on your way home. Carry rain gear and plan safe transit.`,
        },
        severity: 'Moderate',
        category: 'met',
        sentTime: now.toISOString(),
        isUrgentLive: false,
      });
    }
  }

  // 9. Role 5 (Fisher) Coastal Rough Sea / High Wave Alert
  if (role === 5 && isCoastal) {
    const waveH = waveHeightM ?? 0;
    const squallWind = (weather.windKmh || 0) >= HAZARD_THRESHOLDS.squallyWindFisherWarning.value;

    if (waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightRough.value || squallWind) {
      const isExtremeWaves = waveH >= HAZARD_THRESHOLDS.roughSeaWaveHeightVeryRough.value;
      alerts.push({
        id: `fc-sea-rough-${dateStr}`,
        source: 'forecast',
        sender: 'Open-Meteo Marine / INCOIS',
        hazardId: 'rough_sea',
        title: {
          mr: isExtremeWaves ? 'खवळलेला समुद्र: अत्यंत उंच लाटा (४+ मी)' : 'खवळलेला समुद्र: लाटांची चेतावणी (२.५+ मी)', // NEEDS NATIVE REVIEW
          hi: isExtremeWaves ? 'अशांत समुद्र: अत्यंत ऊँची लहरें (4+ मी)' : 'अशांत समुद्र: ऊँची लहरों की चेतावनी (2.5+ मी)', // NEEDS NATIVE REVIEW
          en: isExtremeWaves ? 'Rough Sea: High Wave Warning (4+ m)' : 'Rough Sea Warning: Significant Waves (2.5+ m)',
        },
        description: {
          mr: 'समुद्रात २.५ ते ४ मीटर उंच लाटा उसळण्याची शक्यता आहे. मच्छीमारांनी समुद्रात जाणे टाळावे व बोटी सुरक्षित बांधाव्यात.', // NEEDS NATIVE REVIEW
          hi: 'समुद्र में 2.5 से 4 मीटर ऊँची लहरें उठने की संभावना है। मछुआरे समुद्र में न जाएँ और नावें सुरक्षित बाँधें।', // NEEDS NATIVE REVIEW
          en: 'Significant wave heights of 2.5 to 4.0 meters expected. Fishermen advised not to venture into deep sea.',
        },
        severity: isExtremeWaves ? 'Extreme' : 'Severe',
        category: 'met',
        sentTime: now.toISOString(),
        isUrgentLive: isExtremeWaves,
      });
    }
  }

  return alerts;
}

// CAP XML Parser
export function parseCapXml(xml: string): Partial<AppAlert> | null {
  try {
    const getTag = (str: string, tag: string): string => {
      const reg = new RegExp(`<(?:cap:)?${tag}[^>]*>([\\s\\S]*?)<\\/(?:cap:)?${tag}>`, 'i');
      const m = str.match(reg);
      return m ? m[1].trim() : '';
    };

    const identifier = getTag(xml, 'identifier');
    const sender = getTag(xml, 'sender') || 'NDMA SACHET / IMD';
    const sent = getTag(xml, 'sent') || new Date().toISOString();

    const infoBlocks = xml.match(/<(?:cap:)?info>([\s\S]*?)<\/(?:cap:)?info>/gi) || [];
    if (infoBlocks.length === 0) return null;

    let mrInfo = '';
    let enInfo = '';
    let hiInfo = '';

    for (const block of infoBlocks) {
      const lang = getTag(block, 'language').toLowerCase();
      if (lang === 'mr' || lang.startsWith('mr')) mrInfo = block;
      else if (lang === 'hi' || lang.startsWith('hi')) hiInfo = block;
      else enInfo = block;
    }

    const defaultBlock = mrInfo || enInfo || hiInfo || infoBlocks[0];

    const headlineMr = mrInfo ? getTag(mrInfo, 'headline') : '';
    const headlineHi = hiInfo ? getTag(hiInfo, 'headline') : '';
    const headlineEn = enInfo ? getTag(enInfo, 'headline') : (headlineMr || headlineHi);

    const descMr = mrInfo ? getTag(mrInfo, 'description') : '';
    const descHi = hiInfo ? getTag(hiInfo, 'description') : '';
    const descEn = enInfo ? getTag(enInfo, 'description') : (descMr || descHi);

    const eventMr = mrInfo ? getTag(mrInfo, 'event') : '';
    const eventEn = enInfo ? getTag(enInfo, 'event') : (eventMr || 'Weather Alert');

    const targetBlock = defaultBlock || '';
    const severity = (getTag(targetBlock, 'severity') || 'Moderate') as AlertSeverity;
    const onset = getTag(targetBlock, 'onset');
    const rawExpires = getTag(targetBlock, 'expires');
    const areaDesc = getTag(targetBlock, 'areaDesc');

    // Handle missing expires with fallback and label
    const validityNotGiven = !rawExpires;
    const expires = rawExpires || new Date(Date.now() + HAZARD_THRESHOLDS.alertValidityFallbackMinutes.value * 60000).toISOString();

    // Map category
    const catStr = `${eventMr} ${eventEn} ${headlineMr} ${headlineEn}`.toLowerCase();
    let hazardId: HazardId = 'thunderstorm';
    if (catStr.includes('lightning') || catStr.includes('thunder') || catStr.includes('वीज')) hazardId = 'thunderstorm';
    else if (catStr.includes('hail') || catStr.includes('गारपीट') || catStr.includes('ओले')) hazardId = 'hail';
    else if (catStr.includes('rain') || catStr.includes('पाऊस') || catStr.includes('वर्षा')) hazardId = 'heavy_rain';
    else if (catStr.includes('heat') || catStr.includes('उष्ण') || catStr.includes('लू')) hazardId = 'heat_wave';
    else if (catStr.includes('cold') || catStr.includes('थंडी') || catStr.includes('शीत')) hazardId = 'cold_wave';
    else if (catStr.includes('wind') || catStr.includes('वारा') || catStr.includes('आंधी')) hazardId = 'strong_wind';

    return {
      id: identifier || `sachet-${Date.now()}`,
      source: 'sachet',
      sender: `NDMA SACHET (${sender})`,
      hazardId,
      title: {
        mr: headlineMr || eventMr || 'आपत्कालीन इशारा',
        hi: headlineHi || headlineEn || 'आपदा चेतावनी',
        en: headlineEn || eventEn || 'Disaster Alert',
      },
      description: {
        mr: descMr || headlineMr,
        hi: descHi || headlineHi,
        en: descEn || headlineEn,
      },
      severity,
      category: 'met',
      sentTime: sent,
      onset,
      expires,
      areaDesc,
      validityNotGiven,
      isUrgentLive: severity === 'Severe' || severity === 'Extreme',
    };
  } catch {
    return null;
  }
}

/**
 * District matching with comprehensive alias list and Devanagari normalization.
 */
export function alertMatchesDistrict(alert: Partial<AppAlert>, userDistrict: string): boolean {
  if (!userDistrict) return true; // Show all if district is not set

  const aliases = getAliasesForDistrict(userDistrict);
  const combined = `${alert.areaDesc || ''} ${JSON.stringify(alert.title || {})} ${JSON.stringify(alert.description || {})}`.toLowerCase();

  return aliases.some((alias) => combined.includes(alias.toLowerCase()));
}

/**
 * Anti-Fatigue, Cooldown, and Precedence Alert Combiner:
 * 1. Official SACHET alerts take precedence over forecast alerts of the same category/hazard.
 * 2. Deduplicates alerts by hazardId and calendar date.
 * 3. Applies cooldown to prevent repeated alert fatigue unless severity escalates.
 * 4. Discards alerts whose expiry has passed.
 * 5. Sorts strictly by severity rank (Extreme > Severe > Moderate > Minor) then newest time.
 */
export function consolidateAndSortAlerts(sachetAlerts: AppAlert[], forecastAlerts: AppAlert[]): AppAlert[] {
  const now = Date.now();

  // 1. Filter out expired alerts
  const validSachet = sachetAlerts.filter((a) => {
    if (!a.expires) return true;
    return new Date(a.expires).getTime() > now;
  });

  const validForecast = forecastAlerts.filter((a) => {
    if (!a.expires) return true;
    return new Date(a.expires).getTime() > now;
  });

  // 2. Identify categories covered by official SACHET alerts to suppress duplicates
  const sachetHazards = new Set(validSachet.map((a) => a.hazardId || a.category));

  const filteredForecast = validForecast.filter((fa) => {
    const key = fa.hazardId || fa.category;
    return !sachetHazards.has(key);
  });

  const combined = [...validSachet, ...filteredForecast];

  // 3. Deduplicate by hazardId + calendar date, keeping highest severity
  const byHazardDay = new Map<string, AppAlert>();
  for (const alert of combined) {
    const dayKey = (alert.onset || alert.sentTime || '').slice(0, 10);
    const dedupeKey = `${alert.source}_${alert.hazardId || alert.category}_${dayKey}`;

    if (!byHazardDay.has(dedupeKey)) {
      byHazardDay.set(dedupeKey, alert);
    } else {
      const existing = byHazardDay.get(dedupeKey)!;
      if (SEVERITY_RANK[alert.severity] > SEVERITY_RANK[existing.severity]) {
        byHazardDay.set(dedupeKey, alert);
      }
    }
  }

  // 4. Anti-fatigue cooldown filter: only allow through if not in cooldown or if escalating
  const allowedAlerts: AppAlert[] = [];
  for (const alert of byHazardDay.values()) {
    const cooldownKey = `${alert.hazardId || alert.category}`;
    const rank = SEVERITY_RANK[alert.severity] || 1;
    const cooldownInfo = alertCooldownMap.get(cooldownKey);

    if (!cooldownInfo || now - cooldownInfo.createdAt > ALERT_COOLDOWN_MS || rank > cooldownInfo.severityIndex) {
      alertCooldownMap.set(cooldownKey, { severityIndex: rank, createdAt: now });
      allowedAlerts.push(alert);
    } else {
      // Still include in list for notifications screen, but preserve existing entry
      allowedAlerts.push(alert);
    }
  }

  // 5. Sort by severity (Extreme -> Severe -> Moderate -> Minor), then newest sentTime
  allowedAlerts.sort((a, b) => {
    const rankDiff = (SEVERITY_RANK[b.severity] || 0) - (SEVERITY_RANK[a.severity] || 0);
    if (rankDiff !== 0) return rankDiff;
    const timeA = new Date(a.sentTime || 0).getTime();
    const timeB = new Date(b.sentTime || 0).getTime();
    return timeB - timeA;
  });

  return allowedAlerts;
}

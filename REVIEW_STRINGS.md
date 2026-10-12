# REVIEW_STRINGS.md — Marathi and Hindi String Catalog

This document catalogs every Marathi and Hindi string added across the app, grouped by hazard and UI feature. All of these strings are marked `// NEEDS NATIVE REVIEW` in the codebase so a native speaker can verify dialect naturalness for rural Maharashtra (Yavatmal/Vidarbha).

---

## 1. Core UI & Common Navigation Keys

| Language | Key | String | Context / Notes |
| :--- | :--- | :--- | :--- |
| **mr** | `card_caution_tag` | `उष्णतेचा इशारा` | Moderate caution header tag on Home card |
| **hi** | `card_caution_tag` | `गर्मी की चेतावनी` | Moderate caution header tag on Home card |
| **mr** | `card_normal_tag` | `हवामान सामान्य` | Normal day header tag on Home card |
| **hi** | `card_normal_tag` | `मौसम सामान्य` | Normal day header tag on Home card |
| **mr** | `card_normal_adv` | `आज हवामान सुरक्षित आहे. नियमित कामे चालू ठेवा आणि भरपूर पाणी प्या.` | Default normal-day advice on Home card |
| **hi** | `card_normal_adv` | `आज मौसम सुरक्षित है। नियमित काम जारी रखें और भरपूर पानी पिएँ।` | Default normal-day advice on Home card |
| **mr** | `weather_unavailable` | `हवामान माहिती सध्या उपलब्ध नाही` | Offline without cache state |
| **hi** | `weather_unavailable` | `मौसम की जानकारी अभी उपलब्ध नहीं है` | Offline without cache state |
| **mr** | `last_updated` | `शेवटचे अपडेट: ` | Cached data timestamp indicator |
| **hi** | `last_updated` | `अंतिम अपडेट: ` | Cached data timestamp indicator |
| **mr** | `old_data` | `जुनी माहिती (इंटरनेट नाही)` | Stale (>6h) cache notice |
| **hi** | `old_data` | `पुरानी जानकारी (इंटरनेट नहीं)` | Stale (>6h) cache notice |
| **mr** | `open_meteo_credit` | `हवामान माहिती: Open-Meteo.com` | Profile screen credit attribution |
| **hi** | `open_meteo_credit` | `मौसम डेटा: Open-Meteo.com` | Profile screen credit attribution |
| **mr** | `no_active_alerts` | `सध्या तुमच्या परिसरासाठी कोणतेही इशारे नाहीत` | Empty notifications screen |
| **hi** | `no_active_alerts` | `वर्तमान में आपके क्षेत्र के लिए कोई चेतावनी नहीं है` | Empty notifications screen |
| **mr** | `source_prefix` | `स्रोत: ` | Notification card source badge |
| **hi** | `source_prefix` | `स्रोत: ` | Notification card source badge |
| **mr** | `family_sms_simulated`| `नमुना: संदेश पाठवला नाही. प्रत्यक्ष सेवेसाठी एसएमएस सेवा जोडली जाईल.` | Honest disclaimer on live alert safe check-in |
| **hi** | `family_sms_simulated`| `नमूना: संदेश नहीं भेजा गया। वास्तविक सेवा के लिए एसएमएस सेवा जोड़ी जाएगी।` | Honest disclaimer on live alert safe check-in |
| **mr** | `heat_wave_likely` | `उष्णतेच्या लाटेची शक्यता` | IMD heat wave phrasing |
| **hi** | `heat_wave_likely` | `लू (हीटवेव) की संभावना` | IMD heat wave phrasing |
| **mr** | `severe_heat_wave_likely` | `तीव्र उष्णतेच्या लाटेची शक्यता` | IMD severe heat wave phrasing |
| **hi** | `severe_heat_wave_likely` | `भीषण लू की संभावना` | IMD severe heat wave phrasing |
| **mr** | `heat_wave_tomorrow_prefix` | `उद्या तापमान {t}°C पर्यंत जाण्याची शक्यता` | 48h advance warning |
| **hi** | `heat_wave_tomorrow_prefix` | `कल तापमान {t}°C तक पहुँचने की संभावना` | 48h advance warning |
| **mr** | `validity_not_given`| `(वैधता नमूद नाही - अंदाजे ३० मि.)` | CAP alert missing expires attribute |
| **hi** | `validity_not_given`| `(वैधता दी नहीं गई - लगभग 30 मिनट)` | CAP alert missing expires attribute |
| **mr** | `todays_care` | `आजची काळजी` | Generic all-season guide screen header |
| **hi** | `todays_care` | `आज की देखभाल` | Generic all-season guide screen header |

---

## 2. All-Season Multi-Hazard Notification Strings

### A. Thunderstorm & Hail (`thunderstorm`, `hail`)
- **mr Title (Hail)**: `विजांसह गारपिटीची शक्यता`
- **hi Title (Hail)**: `बिजली और ओलावृष्टि की संभावना`
- **mr Desc (Hail)**: `पुढील काही तासांत विजांच्या कडकडाटासह गारपीट होण्याची शक्यता आहे. पिकांचे व जनावरांचे रक्षण करा.`
- **hi Desc (Hail)**: `अगले कुछ घंटों में गरज-चमक के साथ ओले गिरने की संभावना है। फ़सलों और पशुओं की सुरक्षा करें।`
- **mr Title (Thunder)**: `विजांचा कडकडाट होण्याची शक्यता`
- **hi Title (Thunder)**: `बिजली कड़कने की संभावना`
- **mr Desc (Thunder)**: `पुढील काही तासांत विजांसह पाऊस पडण्याची शक्यता आहे. मोकळ्या शेतात सुरक्षित निवारा शोधा.`
- **hi Desc (Thunder)**: `अगले कुछ घंटों में गरज-चमक के साथ बारिश की संभावना है। खुले खेत में सुरक्षित स्थान पर रहें।`

### B. Heavy Rainfall (`heavy_rain`)
- **mr Title (Extremely Heavy)**: `अतिवृष्टी / अत्यंत मुसळधार पाऊस (२०४+ मिमी)`
- **hi Title (Extremely Heavy)**: `अत्यंत भारी बारिश की संभावना (204+ मिमी)`
- **mr Desc (Extremely Heavy)**: `पुढील २४ तासांत २०४.५ मिमी पेक्षा जास्त अत्यंत मुसळधार पावसाची शक्यता आहे. सखल भागातून सुरक्षित राहा.`
- **hi Desc (Extremely Heavy)**: `अगले 24 घंटों में 204.5 मिमी से अधिक अत्यंत भारी बारिश की संभावना है। जलभराव और बाढ़ से बचें।`
- **mr Title (Very Heavy)**: `अति मुसळधार पाऊस (११५-२०४ मिमी)`
- **hi Title (Very Heavy)**: `बहुत भारी बारिश की संभावना (115-204 मिमी)`
- **mr Desc (Very Heavy)**: `पुढील २४ तासांत ११५ ते २०४ मिमी जोरदार पावसाची शक्यता आहे. शेतात पाण्याचा निचरा करा.`
- **hi Desc (Very Heavy)**: `अगले 24 घंटों में 115 से 204 मिमी भारी बारिश की संभावना है। खेत में जल निकासी सुनिश्चित करें।`
- **mr Title (Heavy)**: `मुसळधार पाऊस (६४.५-११५.५ मिमी)`
- **hi Title (Heavy)**: `भारी बारिश की संभावना (64.5-115.5 मिमी)`
- **mr Desc (Heavy)**: `पुढील २४ तासांत ६४.५ ते ११५.५ मिमी मुसळधार पावसाची शक्यता आहे. नाले व ओढ्यांपासून सावध रहा.`
- **hi Desc (Heavy)**: `अगले 24 घंटों में 64.5 से 115.5 मिमी भारी बारिश की संभावना है। नदी-नालों के पास न जाएँ।`
- **mr Title (Mild Rain)**: `पावसाची शक्यता`
- **hi Title (Mild Rain)**: `बारिश की संभावना`
- **mr Desc (Mild Rain)**: `आज हलका ते मध्यम पाऊस पडण्याची शक्यता आहे. शेतीकामांचे नियोजन करा.`
- **hi Desc (Mild Rain)**: `आज हल्की से मध्यम बारिश की संभावना है। खेत के काम की योजना उसी अनुसार बनाएँ।`

### C. Cold Wave & Frost (`cold_wave`, `ground_frost`)
- **mr Title (Severe Cold Wave)**: `तीव्र शीतलहर / कडाक्याची थंडी (किमान २°C किंवा कमी)`
- **hi Title (Severe Cold Wave)**: `भीषण शीतलहर की चेतावनी (न्यूनतम 2°C या कम)`
- **mr Desc (Severe Cold Wave)**: `रात्री व पहाटे तापमान २°C किंवा खाली जाण्याची शक्यता आहे. लहान मुले, वृद्ध व जनावरांचे रक्षण करा.`
- **hi Desc (Severe Cold Wave)**: `रात और सुबह तापमान 2°C या उससे कम रहने की संभावना है। पशुओं और बुज़ुर्गों को ठंड से बचाएँ।`
- **mr Title (Cold Wave)**: `थंडीची लाट (किमान ४°C किंवा कमी)`
- **hi Title (Cold Wave)**: `शीतलहर की संभावना (न्यूनतम 4°C या कम)`
- **mr Desc (Cold Wave)**: `कडाक्याच्या थंडीमुळे पिकांना व जनावरांना धोका संभवतो. संध्याकाळी पिकांना हलके पाणी द्या.`
- **hi Desc (Cold Wave)**: `कड़ाके की ठंड से फ़सलों और मवेशियों को नुक़सान हो सकता है। शाम को हल्की सिंचाई करें।`
- **mr Title (Frost)**: `पाला पडण्याचा धोका (दव/बर्फ)`
- **hi Title (Frost)**: `पाला पड़ने की चेतावनी`
- **mr Desc (Frost)**: `पहाटे जमिनीलगत पाला पडण्याची शक्यता आहे. भाजीपाला व कोवळ्या रोपांवर आच्छादन घाला.`
- **hi Desc (Frost)**: `सुबह ज़मीन पर पाला जमने की संभावना है। सब्ज़ियों और कोमल पौधों पर घास का आवरण डालें।`

### D. Dense Fog & Strong Wind (`dense_fog`, `strong_wind`)
- **mr Title (Dense Fog)**: `दाट धुके व कमी दृश्यमानता (<२०० मी.)`
- **hi Title (Dense Fog)**: `घना कोहरा और कम दृश्यता (<200 मी.)`
- **mr Desc (Dense Fog)**: `दृष्टीमान २०० मीटरपेक्षा कमी राहण्याची शक्यता आहे. रस्त्यावर वाहने सांभाळून चालवा.`
- **hi Desc (Dense Fog)**: `दृश्यता 200 मीटर से कम रहने की संभावना है। सड़क पर वाहन धीमी गति से चलाएँ।`
- **mr Title (Gale Wind)**: `तीव्र वादळी वारे (७०+ किमी/तास)`
- **hi Title (Gale Wind)**: `भीषण आंधी-तूफ़ान (70+ किमी/घंटा)`
- **mr Desc (Gale Wind)**: `ताशी ७० किमीपेक्षा जास्त वेगाने वारे वाहण्याची शक्यता आहे. झाडे व पत्र्यांपासून दूर रहा.`
- **hi Desc (Gale Wind)**: `70 किमी/घंटा से अधिक तेज़ आंधी की संभावना है। पेड़ों और टीन शेड से दूर सुरक्षित रहें।`
- **mr Title (Wind Squall)**: `जोरदार वारे व धूळ (५०+ किमी/तास)`
- **hi Title (Wind Squall)**: `तेज़ धूल भरी आंधी (50+ किमी/घंटा)`
- **mr Desc (Wind Squall)**: `ताशी ५० ते ७० किमी वेगाने वारे वाहतील. फवारणी थांबवा आणि केळी-उसाला आधार द्या.`
- **hi Desc (Wind Squall)**: `50 से 70 किमी/घंटा की गति से तेज़ हवा चलेगी। छिड़काव रोकें और फ़सल को सहारा दें।`

### E. Dry Spell & Warm Night (`dry_spell`, `hot_night`)
- **mr Title (Dry Spell)**: `पावसाचा प्रदीर्घ खंड (१५+ दिवस)`
- **hi Title (Dry Spell)**: `वर्षा का लंबा विराम (15+ दिन सूखा)`
- **mr Desc (Dry Spell)**: `गेल्या १५ दिवसांत पाऊस पडलेला नाही. पिकांना ओलावा टिकवण्यासाठी आच्छादन करा व पाण्याची बचत करा.`
- **hi Desc (Dry Spell)**: `पिछले 15 दिनों से वर्षा नहीं हुई है। भूमि में नमी बनाए रखने के लिए मल्चिंग अपनाएँ।`
- **mr Title (Warm Night)**: `उष्ण रात्र (किमान ३०°C+)`
- **hi Title (Warm Night)**: `गर्म रात की चेतावनी (न्यूनतम 30°C+)`
- **mr Desc (Warm Night)**: `रात्रीचे तापमान ३०°C किंवा त्याहून जास्त राहण्याची शक्यता आहे. हवेशीर जागेत झोपा व पाणी प्या.`
- **hi Desc (Warm Night)**: `रात का तापमान 30°C से ऊपर रहने की संभावना है। हवादार जगह पर सोएँ और पानी पिएँ।`

---

## 3. All-Season Role Guidance Strings (`src/data/allHazardsGuide.ts`)

Structured across 6 roles:
- **Role 0**: शेतमजूर (Farm Laborer) / खेतिहर मज़दूर
- **Role 1**: शेतकरी (Farmer) / किसान
- **Role 2**: घरगुती (Household) / घरेलू
- **Role 3**: पशुपालक (Animal Husbandry) / पशुपालक
- **Role 4**: नोकरदार / नौकरीपेशा (Job-Holder / Commuter) — शिक्षक, पोस्टमन, ग्रामसेवक, बँक कर्मचारी
- **Role 5**: मच्छीमार / मछुआरा (Fisher) — समुद्र व गोड्या पाण्यातील मच्छीमार

Each role includes across all 13 hazards (heat_wave, hot_day, hot_night, heavy_rain, thunderstorm, hail, cold_wave, ground_frost, dense_fog, strong_wind, dry_spell, rough_sea, normal):
- Primary advice headline (`adv`)
- Care card 1 (`c1`)
- Care card 2 (`c2`)
- 3 Step-by-step actionable instructions (`g[0..2]`)

*(All text authored in simple, respectful rural Marathi and Hindi with strict first-aid boundaries, zero medical dosing claims, and official emergency referrals: 108 for medical, 112 for disaster, 1554 for Indian Coast Guard Maritime SAR).*

---

## 4. Role 4 (Commuter) & Role 5 (Fisher) Specific Strings

| Language | Key / Context | String | Notes |
| :--- | :--- | :--- | :--- |
| **mr** | `r[4]` | `नोकरदार` | Role 4 Title |
| **hi** | `r[4]` | `नौकरीपेशा / मुसाफ़िर` | Role 4 Title |
| **mr** | `r[5]` | `मच्छीमार` | Role 5 Title |
| **hi** | `r[5]` | `मछुआरा` | Role 5 Title |
| **mr** | `r_sub[4]` | `शिक्षक, पोस्टमन, ग्रामसेवक, बँक कर्मचारी` | Role 4 Examples |
| **hi** | `r_sub[4]` | `शिक्षक, डाकिया, ग्राम सेवक, बैंक कर्मचारी` | Role 4 Examples |
| **mr** | `r_sub[5]` | `समुद्र व गोड्या पाण्यातील मच्छीमार` | Role 5 Examples |
| **hi** | `r_sub[5]` | `समुद्र और मीठे पानी के मछुआरे` | Role 5 Examples |
| **mr** | `fisher_neutral_disclaimer` | `आमच्या डेटामध्ये कोणताही इशारा आढळलेला नाही. समुद्रात जाण्यापूर्वी नेहमी अधिकृत मच्छीमार इशारे (IMD / INCOIS / मत्स्यव्यवसाय विभाग) आणि स्थानिक बंदर सूचना नक्की तपासा.` | Mandatory Neutral Safety Disclaimer |
| **hi** | `fisher_neutral_disclaimer` | `हमारे डेटा में कोई चेतावनी नहीं मिली है। समुद्र में जाने से पहले हमेशा आधिकारिक मछुआरा चेतावनियों (IMD / INCOIS / मत्स्य विभाग) और स्थानीय बंदरगाह निर्देशों की पुष्टि करें।` | Mandatory Neutral Safety Disclaimer |
| **en** | `fisher_neutral_disclaimer` | `No warning found in our data. Always check official fishermen warnings (IMD / INCOIS / Fisheries Department) and port instructions before going to sea.` | Mandatory Neutral Safety Disclaimer |
| **mr** | `monsoon_fishing_ban_active` | `महाराष्ट्र शासनाची पावसाळी मासेमारी बंदी (१ जून ते ३१ जुलै) लागू आहे. यांत्रिक नौकांनी समुद्रात जाऊ नये.` | Annual June 1 – July 31 Mechanized Fishing Ban |
| **hi** | `monsoon_fishing_ban_active` | `महाराष्ट्र सरकार की मानसूनी मत्स्य पालन रोक (1 जून से 31 जुलाई) लागू है। यांत्रिक नावों से समुद्र में न जाएँ।` | Annual June 1 – July 31 Mechanized Fishing Ban |
| **mr** | `coast_guard_sar_helpline` | `तटरक्षक दल सागरी आणीबाणी मदत (SAR): १५५४` | Indian Coast Guard Maritime Helpline 1554 |
| **hi** | `coast_guard_sar_helpline` | `तटरक्षक खोज व बचाव (SAR) हेल्पलाइन: 1554` | Indian Coast Guard Maritime Helpline 1554 |
| **mr** | `rough_sea` Hazard Name | `खवळलेला समुद्र / उंच लाटा` | INCOIS High Wave / Rough Sea Name |
| **hi** | `rough_sea` Hazard Name | `अशांत समुद्र / ऊँची लहरें` | INCOIS High Wave / Rough Sea Name |
| **mr** | Evening Commute Alert Title | `संध्याकाळी घरी परतताना पावसाचा अंदाज` | Scoped travel alert for Role 4 |
| **hi** | Evening Commute Alert Title | `शाम को घर लौटते समय बारिश का अनुमान` | Scoped travel alert for Role 4 |

---

## 5. Livestock Species Selection (v2) Strings (`src/i18n/{mr,hi}.ts`, `src/config/speciesCatalog.ts`, `src/content/advisoryGeneral.ts`)

### A. Onboarding, Profile & Neutral Species Card UI

| Language | Key | String | Context / Notes |
| :--- | :--- | :--- | :--- |
| **mr** | `species_onb_title` | `आपण कोणती जनावरे पाळता?` | Onboarding species selector title |
| **hi** | `species_onb_title` | `आप कौन से पशु पालते हैं?` | Onboarding species selector title |
| **mr** | `species_breed_title` | `जात निवडा` | Breed selector header |
| **hi** | `species_breed_title` | `नस्ल चुनें` | Breed selector header |
| **mr** | `breed_indigenous` | `देशी` | Indigenous breed option |
| **hi** | `breed_indigenous` | `देसी` | Indigenous breed option |
| **mr** | `breed_crossbred` | `संकरित` | Crossbred / exotic breed option |
| **hi** | `breed_crossbred` | `संकर` | Crossbred / exotic breed option |
| **mr** | `breed_dont_know` | `माहीत नाही` | Don't know option (maps safely to crossbred) |
| **hi** | `breed_dont_know` | `पता नहीं` | Don't know option (maps safely to crossbred) |
| **mr** | `species_card_section_title` | `आपली जनावरे` | Home view neutral animal card section header |
| **hi** | `species_card_section_title` | `आपके पशु` | Home view neutral animal card section header |
| **mr** | `species_general_care_title` | `सामान्य काळजीचे उपाय` | Neutral advisory card subtitle |
| **hi** | `species_general_care_title` | `सामान्य देखभाल के उपाय` | Neutral advisory card subtitle |
| **mr** | `species_no_verified_limits` | `या प्राण्यासाठी अद्याप प्रमाणित हवामान मर्यादा निश्चित नाहीत.` | Disclaimer: unverified scientific limits |
| **hi** | `species_no_verified_limits` | `इस पशु के लिए अभी तक प्रमाणित मौसम सीमाएँ निर्धारित नहीं हैं।` | Disclaimer: unverified scientific limits |
| **mr** | `species_vet_advice` | `अधिक माहितीसाठी आपल्या पशुवैद्यकाचा सल्ला घ्या.` | Referral to veterinarian |
| **hi** | `species_vet_advice` | `अधिक जानकारी व परामर्श के लिए अपने पशु चिकित्सक से संपर्क करें।` | Referral to veterinarian |
| **mr** | `species_no_alert_standby` | `आपल्या परिसरात हवामान इशारा सक्रिय झाल्यावर येथे जनावरांच्या काळजीचे उपाय दिसतील.` | Standby explanation on calm days |
| **hi** | `species_no_alert_standby` | `आपके क्षेत्र में मौसम चेतावनी सक्रिय होने पर यहाँ पशु देखभाल के उपाय दिखाई देंगे।` | Standby explanation on calm days |
| **mr** | `profile_animals_row` | `जनावरे` | Profile screen expandable row label |
| **hi** | `profile_animals_row` | `पशु` | Profile screen expandable row label |
| **mr** | `profile_animals_edit` | `बदला` | Profile screen edit toggle button |
| **hi** | `profile_animals_edit` | `बदलें` | Profile screen edit toggle button |

### B. Species Catalog Labels (`src/config/speciesCatalog.ts`)

| Species ID | Marathi Label | Hindi Label | English Label | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `cow` | `गाय` | `गाय` | `Cow` | Dairy cattle (has breed follow-up) |
| `bullock` | `बैल` | `बैल` | `Bullock/Ox` | Working ox (has breed follow-up) |
| `buffalo` | `म्हैस` | `भैंस` | `Buffalo` | Water buffalo |
| `goat` | `शेळी` | `बकरी` | `Goat` | Small ruminant |
| `sheep` | `मेंढी` | `भेड़` | `Sheep` | Small ruminant |
| `poultry` | `कोंबडी` | `मुर्गी` | `Poultry` | Backyard & farm poultry |
| `pig` | `डुक्कर` | `सुअर` | `Pig` | Rule ID: null (advisory-only) |
| `equine` | `घोडा/गाढव/खेचर` | `घोड़ा/गधा/खच्चर` | `Horse/Donkey/Mule` | Rule ID: null (advisory-only) |
| `other` | `इतर` | `अन्य` | `Other` | Rule ID: null (advisory-only) |

### C. General Livestock Advisory Draft Tips (`src/content/advisoryGeneral.ts`)

*(Draft content: gated behind `VITE_INCLUDE_DRAFT_CONTENT=true` or dev mode; `needsVetReview: true`)*

- **Heat Tips**:
  - `heat_shade`: mr: `जनावरांना सावलीत ठेवा आणि थेट उन्हापासून वाचवा.` | hi: `पशुओं को छायादार स्थान पर रखें और सीधी धूप से बचाएं।`
  - `heat_water`: mr: `स्वच्छ व थंड पिण्याचे पाणी सतत उपलब्ध ठेवा.` | hi: `साफ और ठंडा पीने का पानी हमेशा उपलब्ध रखें।`
  - `heat_ventilation`: mr: `गोठ्यात हवा खेळती राहू द्या.` | hi: `बाड़े में हवा का अच्छा वेंटिलेशन बनाए रखें।`
  - `heat_midday_movement`: mr: `दुपारच्या अत्यंत कडक उन्हात जनावरांची ने-आण किंवा कामे टाळा.` | hi: `दोपहर की तेज धूप में जानवरों को चलाने या काम कराने से बचें।`
  - `heat_panting_watch`: mr: `तीव्र धाप लागणे, लाळ गळणे किंवा अशक्तपणा यावर बारीक लक्ष ठेवा.` | hi: `तेज हांफने, लार गिरने या कमजोरी के लक्षणों पर नजर रखें।`
  - `heat_vet_call`: mr: `जनावर खाली बसल्यास किंवा बेशुद्ध पडल्यास ताबडतोब पशुवैद्यकाला बोलवा.` | hi: `यदि पशु गिर पड़े या अत्यधिक सुस्त हो, तो तुरंत पशु चिकित्सक से संपर्क करें।`
- **Cold Wave Tips**:
  - `cold_shelter`: mr: `जनावरांना उबदार व कोरड्या निवाऱ्यात ठेवा.` | hi: `पशुओं को गर्म और सूखे आश्रय में रखें।`
  - `cold_draughts`: mr: `थंड वाऱ्याची थेट झुळूक गोठ्यात येणार नाही याची काळजी घ्या.` | hi: `बाड़े में ठंडी सीधी हवा के झोंकों से बचाव करें।`
  - `cold_bedding`: mr: `जमिनीवर कोरडे गवत किंवा पोत्यांचे आच्छादन (बेडिंग) घाला.` | hi: `फर्श पर सूखी घास या बोरी का सूखा बिछावन बिछाएं।`
  - `cold_water`: mr: `जनावरांना कोमट किंवा सामान्य तापमानाचे स्वच्छ पाणी द्या.` | hi: `पशुओं को सामान्य या हल्का गुनगुना साफ पानी दें।`
  - `cold_vet_call`: mr: `जनावर थरथर कापत असल्यास किंवा सुस्त झाल्यास पशुवैद्यकाचा सल्ला घ्या.` | hi: `यदि पशु कांप रहा हो या बहुत कमजोर दिखे तो पशु चिकित्सक से संपर्क करें।`



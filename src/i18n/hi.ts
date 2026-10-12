import type { Lang } from './mr';

export const hi: Lang = {
  q: "आप क्या करते हैं?",
  qs: "अपनी श्रेणी चुनें — टाइप करने की ज़रूरत नहीं",
  r: [
    "खेतिहर मज़दूर",
    "किसान",
    "घरेलू",
    "पशुपालक",
    "नौकरीपेशा / मुसाफ़िर", // NEEDS NATIVE REVIEW (Role 4 Commuter)
    "मछुआरा", // NEEDS NATIVE REVIEW (Role 5 Fisher)
  ],
  r_sub: [
    "खेत में काम करने वाले मज़दूर",
    "अपनी ज़मीन जोतने वाले",
    "महिलाएँ, बच्चे और बुज़ुर्ग",
    "गाय, भैंस, बकरी पालने वाले",
    "शिक्षक, डाकिया, ग्राम सेवक, बैंक कर्मचारी", // NEEDS NATIVE REVIEW (Role 4 examples)
    "समुद्र और मीठे पानी के मछुआरे", // NEEDS NATIVE REVIEW (Role 5 examples)
  ],
  go: "आगे बढ़ें",
  loc: "आपका गाँव खोजने के लिए लोकेशन का उपयोग होगा",
  hi: "नमस्कार, ",
  tag: "आपातकालीन चेतावनी",
  now: "अभी {t}°C है",
  full: "पूरी सूचना देखें",
  hum: "नमी",
  wnd: "हवा",
  rn: "बारिश",
  wave: "लहरों की ऊँचाई", // NEEDS NATIVE REVIEW
  n5: "अगले 5 दिन",
  dy: ["आज", "कल", "बुध", "गुरु", "शुक्र"],
  care: "आपके लिए सावधानी",
  hc: "स्वास्थ्य केंद्र",
  sms: "इंटरनेट न हो तब भी चेतावनी SMS से आएगी",
  tb: ["होम", "चेतावनी", "मार्गदर्शन", "प्रोफ़ाइल"],
  nt: "सूचनाएँ",
  n: [
    ["बिजली गिरने की गंभीर चेतावनी", "अगले 45 मिनट खुले खेत में न रुकें", "अभी"],
    ["लू की आपातकालीन चेतावनी", "45°C — दोपहर 12 से 4 बजे धूप में काम न करें", "10 मिनट पहले"],
    ["कल हल्की बारिश", "बुधवार को तापमान 39° तक गिरेगा", "आज सुबह"]
  ],
  lt: "बिजली की गंभीर चेतावनी",
  lh: "तेज़ बिजली का<br>खतरा — अभी",
  lb: "अगले 45 मिनट खुले खेत में, पेड़ के नीचे या पानी के पास न रुकें। तुरंत पक्के घर या आश्रय में जाएँ।",
  lw: "अभी क्या करें",
  ls: [
    "पशुओं को तुरंत पेड़ के नीचे से सुरक्षित बाड़े में ले जाएँ",
    "धातु के औज़ार और मोबाइल अलग रख दें",
    "नदी और नाले के किनारे से दूर रहें"
  ],
  sf: "सुरक्षित पहुँच गया, बताएँ",
  sd: "सुरक्षित दर्ज किया ✓",
  fm: "असली सेवा में परिवार को आपकी जगह पता चलेगी",
  fm2: "नमूना: परिवार को असली संदेश नहीं भेजा गया",
  gt: "गर्मी से बचाव",
  gs: "अभी {t}°C · {r} के लिए",
  ai: "आपके काम के अनुसार तैयार सुझाव",
  gn: "तुरंत करें",
  sy: "लक्षण दिखें तो",
  sb: "चक्कर, उल्टी या ज़्यादा पसीना आए तो तुरंत छाया में लेटें, पैरों के नीचे तकिया रखें और नज़दीकी स्वास्थ्य केंद्र को बताएँ",
  hcs: "नज़दीकी स्वास्थ्य केंद्र दिखाएँ",
  pf: ["गाँव", "श्रेणी", "भाषा", "परिवार के सदस्य"],
  pv: ["", "", "", "माँ, भाई (2)"],
  nl: "स्थान चुना नहीं गया",
  lq: "आपका गाँव कहाँ है?",
  lqs: "लोकेशन का उपयोग करें या सूची से गाँव चुनें",
  lu: "मेरा लोकेशन उपयोग करें",
  ld: "लोकेशन खोज रहे हैं…",
  lhint: "ब्राउज़र अनुमति माँगे तो \"अनुमति दें\" चुनें",
  lc: "यही मेरा गाँव है",
  lm: "या गाँव चुनें",
  e_denied: "लोकेशन की अनुमति नहीं मिली। नीचे सूची से अपना गाँव चुनें।",
  e_unavail: "लोकेशन नहीं मिल सका (GPS बंद है या सिग्नल नहीं है)। नीचे सूची से गाँव चुनें।",
  e_unsup: "इस ब्राउज़र में लोकेशन की सुविधा नहीं है। नीचे सूची से गाँव चुनें।",
  e_timeout: "लोकेशन खोजने में बहुत समय लगा। दोबारा कोशिश करें या नीचे सूची से गाँव चुनें।",
  e_name: "लोकेशन मिला, पर गाँव का नाम पहचाना नहीं जा सका (इंटरनेट न हो सकता है)। नीचे सूची से गाँव चुनें।",
  // NEEDS NATIVE REVIEW: Live card states and alert handling
  card_caution_tag: "गर्मी की चेतावनी", // NEEDS NATIVE REVIEW
  card_normal_tag: "मौसम सामान्य", // NEEDS NATIVE REVIEW
  card_normal_adv: "आज मौसम सुरक्षित है। अपने नियमित काम जारी रखें और पर्याप्त पानी पिएँ।", // NEEDS NATIVE REVIEW
  weather_unavailable: "मौसम की जानकारी अभी उपलब्ध नहीं है", // NEEDS NATIVE REVIEW
  last_updated: "अंतिम अपडेट: ", // NEEDS NATIVE REVIEW
  old_data: "पुरानी जानकारी (इंटरनेट नहीं)", // NEEDS NATIVE REVIEW
  open_meteo_credit: "मौसम डेटा: Open-Meteo.com", // NEEDS NATIVE REVIEW
  marine_meteo_credit: "लहरों का डेटा: Open-Meteo Marine (DWD / NOAA)", // NEEDS NATIVE REVIEW
  no_active_alerts: "वर्तमान में आपके क्षेत्र के लिए कोई चेतावनी नहीं है", // NEEDS NATIVE REVIEW
  alert_likely_thunder: "बिजली कड़कने की संभावना", // NEEDS NATIVE REVIEW
  alert_thunder_desc: "अगले कुछ घंटों में गरज-चमक के साथ बारिश की संभावना है। खेत में सतर्क रहें।", // NEEDS NATIVE REVIEW
  alert_heavy_rain: "भारी बारिश की संभावना", // NEEDS NATIVE REVIEW
  alert_rain_desc: "अगले 24 घंटों में तेज़ बारिश की संभावना है।", // NEEDS NATIVE REVIEW
  alert_extreme_heat: "तीव्र लू (गर्मी)", // NEEDS NATIVE REVIEW
  alert_heat_desc: "तापमान बहुत अधिक है। धूप में काम करने से बचें।", // NEEDS NATIVE REVIEW
  source_prefix: "स्रोत: ", // NEEDS NATIVE REVIEW
  today: "आज",
  tomorrow: "कल",
  family_sms_simulated: "नमूना: संदेश नहीं भेजा गया। वास्तविक सेवा के लिए एसएमएस सेवा जोड़ी जाएगी।", // NEEDS NATIVE REVIEW
  // PART 0 additions
  heat_wave_likely: "लू (हीटवेव) की संभावना", // NEEDS NATIVE REVIEW
  severe_heat_wave_likely: "भीषण लू की संभावना", // NEEDS NATIVE REVIEW
  heat_wave_tomorrow_prefix: "कल तापमान {t}°C तक पहुँचने की संभावना", // NEEDS NATIVE REVIEW
  validity_not_given: "(वैधता दी नहीं गई - लगभग 30 मिनट)", // NEEDS NATIVE REVIEW
  todays_care: "आज की देखभाल", // NEEDS NATIVE REVIEW
  // Role 5 Fisher neutral safety disclaimers (NEVER claims safe fishing or safe sea conditions)
  fisher_neutral_disclaimer: "हमारे डेटा में कोई चेतावनी नहीं मिली है। समुद्र में जाने से पहले हमेशा आधिकारिक मछुआरा चेतावनियों (IMD / INCOIS / मत्स्य विभाग) और स्थानीय बंदरगाह निर्देशों की पुष्टि करें।", // NEEDS NATIVE REVIEW
  monsoon_fishing_ban_active: "महाराष्ट्र सरकार की मानसूनी मत्स्य पालन रोक (1 जून से 31 जुलाई) लागू है। यांत्रिक नावों से समुद्र में न जाएँ।", // NEEDS NATIVE REVIEW
  coast_guard_sar_helpline: "तटरक्षक खोज व बचाव (SAR) हेल्पलाइन: 1554", // NEEDS NATIVE REVIEW
  // Livestock Species Selection v2
  species_onb_title: "आप कौन से पशु पालते हैं?", // NEEDS NATIVE REVIEW
  species_breed_title: "नस्ल चुनें", // NEEDS NATIVE REVIEW
  breed_indigenous: "देसी", // NEEDS NATIVE REVIEW
  breed_crossbred: "संकर", // NEEDS NATIVE REVIEW
  breed_dont_know: "पता नहीं", // NEEDS NATIVE REVIEW
  species_card_section_title: "आपके पशु", // NEEDS NATIVE REVIEW
  species_general_care_title: "सामान्य देखभाल के उपाय", // NEEDS NATIVE REVIEW
  species_no_verified_limits: "इस पशु के लिए अभी तक प्रमाणित मौसम सीमाएँ निर्धारित नहीं हैं।", // NEEDS NATIVE REVIEW
  species_vet_advice: "अधिक जानकारी व परामर्श के लिए अपने पशु चिकित्सक से संपर्क करें।", // NEEDS NATIVE REVIEW
  species_no_alert_standby: "आपके क्षेत्र में मौसम चेतावनी सक्रिय होने पर यहाँ पशु देखभाल के उपाय दिखाई देंगे।", // NEEDS NATIVE REVIEW
  profile_animals_row: "पशु", // NEEDS NATIVE REVIEW
  profile_animals_edit: "बदलें", // NEEDS NATIVE REVIEW
} as const;

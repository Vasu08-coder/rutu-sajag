import { GUIDE } from './guide';
import type { GuideData } from './guide';

export type HazardId =
  | 'rough_sea'
  | 'heat_wave'
  | 'hot_day'
  | 'hot_night'
  | 'heavy_rain'
  | 'thunderstorm'
  | 'hail'
  | 'cold_wave'
  | 'ground_frost'
  | 'dense_fog'
  | 'strong_wind'
  | 'dry_spell'
  | 'normal';

export interface HazardGuidance {
  hazardId: HazardId;
  name: Record<string, string>;
  icon: string;
  roles: Record<string, GuideData[]>; // lang -> [laborer, farmer, household, animalKeeper, commuter, fisher]
}

/**
 * Static structured guidance content: Hazard × Role (4) × Language (mr, hi, en)
 * Note: Role 0 = farm laborer, Role 1 = farmer, Role 2 = household, Role 3 = animal keeper
 */
export const ALL_HAZARD_GUIDANCE: Record<HazardId, HazardGuidance> = {
  heat_wave: {
    hazardId: 'heat_wave',
    name: {
      mr: 'उष्णतेची लाट', // NEEDS NATIVE REVIEW
      hi: 'लू / भीषण गर्मी', // NEEDS NATIVE REVIEW
      en: 'Heat Wave',
    },
    icon: 'sun',
    roles: GUIDE, // Preserves exact prototype text verbatim for heat wave
  },

  hot_day: {
    hazardId: 'hot_day',
    name: {
      mr: 'उष्ण दिवस', // NEEDS NATIVE REVIEW
      hi: 'गर्म दिन', // NEEDS NATIVE REVIEW
      en: 'Hot Day',
    },
    icon: 'sun',
    roles: GUIDE,
  },

  hot_night: {
    hazardId: 'hot_night',
    name: {
      mr: 'उष्ण रात्र', // NEEDS NATIVE REVIEW
      hi: 'गर्म रात', // NEEDS NATIVE REVIEW
      en: 'Warm Night',
    },
    icon: 'thermometer',
    roles: {
      mr: [
        {
          adv: 'रात्री मोकळ्या आणि हवेशीर जागेत झोपा. झोपण्यापूर्वी भरपूर पाणी प्या.', // NEEDS NATIVE REVIEW
          c1: 'हवा खेळती राहू द्या, ओले सुती कापड वापरा', // NEEDS NATIVE REVIEW
          c2: 'पाणी जवळ ठेवा आणि पुरेसा आराम करा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'हवेशीर खोली किंवा अंगण', 'खोलीत हवा खेळती ठेवा; शक्य असल्यास गच्चीवर किंवा अंगणात झोपा'], // NEEDS NATIVE REVIEW
            ['drop', 'रात्री पुरेसे पाणी प्या', 'शरीरातील पाण्याचे प्रमाण टिकवून ठेवा; चहा-कॉफी टाळा'], // NEEDS NATIVE REVIEW
            ['clock', 'सकाळी कामाची लवकर तयारी', 'रात्री नीट विश्रांती घेऊन पहाटे कामाला लागा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पिकांच्या रात्रीच्या पाण्याचे योग्य नियोजन करा. शेतात काम करताना विश्रांती घ्या.', // NEEDS NATIVE REVIEW
          c1: 'रात्री उशिरा किंवा पहाटे पिकांना पाणी द्या', // NEEDS NATIVE REVIEW
          c2: 'शेतघरात चांगली हवा येऊ द्या', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'रात्री किंवा पहाटे सिंचन', 'बाष्पीभवन कमी होऊन पिकांचे तापमान नियंत्रणात राहील'], // NEEDS NATIVE REVIEW
            ['home', 'रात्रीचा सुरक्षित मुक्काम', 'उकाड्यामुळे अस्वस्थता वाटल्यास मोकळ्या जागेत विश्रांती घ्या'], // NEEDS NATIVE REVIEW
            ['shield', 'कोवळ्या पिकांचे रक्षण', 'जमिनीतील ओलावा टिकवून ठेवण्यासाठी आच्छादनाचा वापर करा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घरातील लहान मुले व वृद्धांची रात्री विशेष काळजी घ्या. पंखा किंवा कुलर वापरा.', // NEEDS NATIVE REVIEW
          c1: 'घरातील तापमान कमी ठेवण्याचा प्रयत्न करा', // NEEDS NATIVE REVIEW
          c2: 'रात्री पिण्यासाठी थंड पाणी जवळ ठेवा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'खिडक्या उघड्या ठेवा', 'थंड व शुद्ध हवा घरात येण्यासाठी जाळ्या लावा'], // NEEDS NATIVE REVIEW
            ['drop', 'पाण्याचे मडके जवळ ठेवा', 'रात्री तहान लागल्यास लगेच पाणी मिळेल अशी सोय करा'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य सतर्कता', 'उकाड्याने चक्कर किंवा मळमळ वाटल्यास १०८ ला संपर्क करा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'गोठ्यात रात्री हवा खेळती ठेवा. जनावरांना रात्रीच्या वेळी स्वच्छ पाणी उपलब्ध ठेवा.', // NEEDS NATIVE REVIEW
          c1: 'गोठ्यात जनावरांना मोकळी जागा द्या', // NEEDS NATIVE REVIEW
          c2: 'रात्री जनावरांना पाणी पिऊ द्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'गोठ्यातील हवा', 'उकाड्याने जनावरांना धाप लागत असल्यास बाहेर मोकळ्या जागेत बांधा'], // NEEDS NATIVE REVIEW
            ['drop', 'रात्री थंड पाणी द्या', 'जनावरांच्या पाण्याचा हौद स्वच्छ व भरलेला ठेवा'], // NEEDS NATIVE REVIEW
            ['home', 'गोठा थंड ठेवा', 'छतावर गवत किंवा शेडनेट टाकून तापमान कमी ठेवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "उष्ण रात्री पुरेशी विश्रांती घ्या. प्रवासापूर्वी हलका आहार व पाणी घ्या!",
          c1: "खिडक्या उघडून खोली हवेशीर ठेवा",
          c2: "सकाळी प्रवासाला निघण्यापूर्वी भरपूर पाणी प्या",
          g: [
            ['home', "हवेशीर खोलीत झोपा", "उष्णतेचा थकवा टाळण्यासाठी पुरेशी ७ तास झोप घ्या"],
            ['drop', "पाणी भरपूर प्या", "झोपण्यापूर्वी आणि सकाळी उठल्यावर पाणी प्या"],
            ['clock', "प्रवासाची तयारी", "उष्णतेमुळे थकवा असल्यास प्रवासात सावकाश वाहन चालवा"],
          ],
        },
        {
          adv: "रात्रीची मासेमारी करताना उष्णता व दमटपणा जास्त असेल. बोटीवर भरपूर पिण्याचे पाणी ठेवा!",
          c1: "बोटीवर पुरेसे पिण्याचे पाणी व ओआरएस सोबत ठेवा",
          c2: "हवा खेळती राहू द्या आणि विश्रांती घ्या",
          g: [
            ['drop', "बोटीवर पाणी साठा", "समुद्रात किंवा नदीत रात्री पाण्याचा तुटवडा होणार नाही याची खात्री करा"],
            ['home', "सावली व हवा", "केबिनमध्ये पुरेशी हवा खेळती ठेवा"],
            ['phone', "संपर्क यंत्रणा सज्ज", "रेडिओ किंवा फोन व्यवस्थित चार्ज ठेवा"],
          ],
        }
      ],
      hi: [
        {
          adv: 'रात में हवादार जगह पर सोएँ। सोने से पहले पर्याप्त पानी पिएँ।', // NEEDS NATIVE REVIEW
          c1: 'कमरे में हवा आने दें, सूती कपड़े पहनें', // NEEDS NATIVE REVIEW
          c2: 'पानी पास रखें और पूरा आराम करें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'हवादार कमरा या आँगन', 'कमरे में खिड़कियाँ खुली रखें या सुरक्षित स्थान पर सोएँ'], // NEEDS NATIVE REVIEW
            ['drop', 'रात को पानी पिएँ', 'शरीर में पानी की कमी न होने दें'], // NEEDS NATIVE REVIEW
            ['clock', 'सुबह जल्दी की तैयारी', 'रात को अच्छी नींद लें ताकि सुबह आराम से काम कर सकें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'फ़सल की सिंचाई रात या सुबह जल्दी करें। रात में पर्याप्त आराम लें।', // NEEDS NATIVE REVIEW
          c1: 'शाम या रात के समय सिंचाई करें', // NEEDS NATIVE REVIEW
          c2: 'खेत पर हवादार जगह में विश्राम करें', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'रात में पानी दें', 'वाष्पीकरण कम होगा और फ़सल को ठंडक मिलेगी'], // NEEDS NATIVE REVIEW
            ['home', 'खुली हवा में आराम', 'उमस और गर्मी में बंद कमरे में न रहें'], // NEEDS NATIVE REVIEW
            ['shield', 'नमी बचाएँ', 'भूमि में नमी बनाए रखने के लिए मल्चिंग अपनाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बुज़ुर्गों और बच्चों के कमरे में हवा आने दें। पीने का ठंडा पानी पास रखें।', // NEEDS NATIVE REVIEW
          c1: 'कमरे को ठंडा रखने की व्यवस्था करें', // NEEDS NATIVE REVIEW
          c2: 'बच्चों व बुज़ुर्गों को पर्याप्त पानी पिलाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'खिड़कियाँ खुली रखें', 'हवा का बहाव बनाए रखें'], // NEEDS NATIVE REVIEW
            ['drop', 'पीने का पानी पास रखें', 'घड़े का ठंडा साफ़ पानी सुलभ रखें'], // NEEDS NATIVE REVIEW
            ['phone', 'आपात स्वास्थ्य नंबर', 'अस्वस्थता होने पर 108 पर संपर्क करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बाड़े में हवा आने दें और रात को पशुओं के लिए साफ़ पानी रखें।', // NEEDS NATIVE REVIEW
          c1: 'पशुओं को खुली हवादार जगह पर बाँधें', // NEEDS NATIVE REVIEW
          c2: 'रात में पानी की पूरी व्यवस्था रखें', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'खुली जगह में बाँधें', 'उमस होने पर पशुओं को बाहर सुरक्षित रखें'], // NEEDS NATIVE REVIEW
            ['drop', 'ठंडा पानी दें', 'पशुओं की नाँद साफ़ रखें'], // NEEDS NATIVE REVIEW
            ['home', 'छत पर घास डालें', 'बाड़े का तापमान सामान्य बनाए रखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "गर्म रात में पूरी नींद लें। सुबह सफ़र से पहले हल्का भोजन और पानी लें!",
          c1: "खिड़कियाँ खुली रखकर कमरे में हवा आने दें",
          c2: "सुबह सफ़र शुरू करने से पहले पर्याप्त पानी पिएँ",
          g: [
            ['home', "हवादार कमरे में सोएँ", "थकान से बचने के लिए कम से कम 7 घंटे की नींद लें"],
            ['drop', "भरपूर पानी पिएँ", "सोने से पहले और उठकर पर्याप्त पानी पिएँ"],
            ['clock', "सफ़र की योजना", "थकान महसूस हो तो सफ़र में आराम से वाहन चलाएँ"],
          ],
        },
        {
          adv: "रात की मछली पकड़ने के दौरान उमस अधिक रह सकती है। नाव पर पीने का भरपूर पानी रखें!",
          c1: "नाव पर पीने का साफ़ पानी और ओआरएस साथ रखें",
          c2: "केबिन में हवा का संचार बनाए रखें",
          g: [
            ['drop', "नाव पर पानी", "रात के समय नाव पर पानी की कमी न होने दें"],
            ['home', "हवादार जगह", "उमस से बचने के लिए खुली हवा में विश्राम करें"],
            ['phone', "संचार तैयार रखें", "रेडियो या मोबाइल चार्ज रखें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Sleep in well-ventilated space. Drink plenty of water before sleeping.',
          c1: 'Keep air circulating, wear loose cotton clothes',
          c2: 'Keep water nearby and rest well',
          g: [
            ['home', 'Ventilated area', 'Sleep in open yard or airy room'],
            ['drop', 'Hydrate well', 'Drink water to prevent nighttime dehydration'],
            ['clock', 'Early morning work', 'Rest well to handle morning tasks safely'],
          ],
        },
        {
          adv: 'Irrigate crops in early night or dawn. Rest comfortably.',
          c1: 'Irrigate during cooler night hours',
          c2: 'Rest in well-ventilated farm shed',
          g: [
            ['drop', 'Night irrigation', 'Reduces evaporation loss and regulates soil heat'],
            ['home', 'Ventilated rest', 'Avoid staying in stuffy rooms during warm nights'],
            ['shield', 'Retain soil moisture', 'Use mulch to protect roots from high soil warmth'],
          ],
        },
        {
          adv: 'Keep elderly and children cool at night. Keep drinking water near bed.',
          c1: 'Maintain air flow through windows',
          c2: 'Provide cool drinking water through the night',
          g: [
            ['home', 'Open cross ventilation', 'Keep airflow open with insect screens'],
            ['drop', 'Water within reach', 'Keep earthen pot water near bed'],
            ['phone', 'Emergency contact', 'Dial 108 if weakness or dizziness occurs'],
          ],
        },
        {
          adv: 'Ensure air circulation in animal shed and provide fresh water overnight.',
          c1: 'Tie animals in open ventilated area',
          c2: 'Ensure clean drinking water trough is full',
          g: [
            ['cow', 'Ventilated cattle shed', 'Move cattle outdoors if shed is humid and hot'],
            ['drop', 'Overnight drinking water', 'Ensure continuous access to cool water'],
            ['home', 'Cool shed roof', 'Use straw thatch over tin sheets to reduce heat'],
          ],
        },
        {
          adv: "Ensure adequate rest during warm nights. Hydrate before commencing morning commute!",
          c1: "Keep sleeping area well ventilated",
          c2: "Drink ample water before setting out for morning commute",
          g: [
            ['home', "Ventilated rest", "Ensure 7 hours of restful sleep to recover from heat stress"],
            ['drop', "Hydrate well", "Drink water before bed and immediately upon waking"],
            ['clock', "Commute prep", "Drive cautiously if experiencing sleep deficits from nighttime heat"],
          ],
        },
        {
          adv: "Warm humid night conditions offshore. Ensure ample fresh drinking water is carried onboard!",
          c1: "Carry generous reserve of potable water and oral rehydration salts",
          c2: "Keep wheelhouse / cabin ventilated to prevent heat accumulation",
          g: [
            ['drop', "Potable water reserve", "Stay hydrated through night operations on water"],
            ['home', "Ventilated rest", "Ensure airy resting quarters onboard"],
            ['phone', "Communications ready", "Keep marine VHF radio or mobile handset fully charged"],
          ],
        }
      ],
    },
  },

  heavy_rain: {
    hazardId: 'heavy_rain',
    name: {
      mr: 'मुसळधार पाऊस', // NEEDS NATIVE REVIEW
      hi: 'भारी बारिश', // NEEDS NATIVE REVIEW
      en: 'Heavy Rain',
    },
    icon: 'rain',
    roles: {
      mr: [
        {
          adv: 'पावसात शेतात किंवा ओढ्याकाठी थांबू नका. सुरक्षित पक्क्या घरात आसरा घ्या.', // NEEDS NATIVE REVIEW
          c1: 'ओढ्या-नाल्यांचे पूर ओलांडू नका', // NEEDS NATIVE REVIEW
          c2: 'वीज आणि घसरड्या रस्त्यांपासून सावध रहा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्क्या घरात आसरा', 'कच्च्या भिंती किंवा जुन्या झाडांखाली थांबू नका'], // NEEDS NATIVE REVIEW
            ['shield', 'पाण्याच्या प्रवाहात उतरू नका', 'ओढ्यावरून पाणी वाहत असल्यास वाट काढू नका'], // NEEDS NATIVE REVIEW
            ['phone', 'सतर्कता ठेवा', 'पूरपरिस्थितीत आपत्ती व्यवस्थापनाच्या सूचना पाळा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'शेतातील अतिरिक्त पाण्याचा निचरा करा. खते किंवा फवारणी तात्काळ पुढे ढकला.', // NEEDS NATIVE REVIEW
          c1: 'बांधावरील पाण्याचा निचरा मोकळा करा', // NEEDS NATIVE REVIEW
          c2: 'फवारणी व खत टाकणे पाऊस थांबेपर्यंत थांबवा', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'शेतातील पाण्याचा निचरा', 'पिकात पाणी साचल्यास मूळ कुजण्याचा धोका असतो; पाट काढा'], // NEEDS NATIVE REVIEW
            ['drop', 'फवारणी स्थगित करा', 'पावसात कीटकनाशके वाहून जाऊन नुकसान होते'], // NEEDS NATIVE REVIEW
            ['home', 'अवजारे सुरक्षित ठेवा', 'शेतीची अवजारे व बियाणे उंचावर कोरड्या जागी ठेवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पिण्याचे पाणी उकळून प्या. घराजवळ पाण्याचा निचरा ठेवा आणि विजेपासून सावध रहा.', // NEEDS NATIVE REVIEW
          c1: 'पिण्याचे पाणी नेहमी उकळून व गाळून प्या', // NEEDS NATIVE REVIEW
          c2: 'विजेचे खांब आणि पडझडीच्या भिंतींपासून दूर रहा', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पाणी उकळून प्या', 'पावसाळ्यात जलजन्य आजार टाळण्यासाठी खबरदारी घ्या'], // NEEDS NATIVE REVIEW
            ['home', 'घराची सुरक्षितता', 'घरात पाणी शिरण्याचा धोका असल्यास महत्त्वाच्या वस्तू उंचावर ठेवा'], // NEEDS NATIVE REVIEW
            ['phone', 'तातडीची मदत', 'आरोग्य तक्रार असल्यास प्राथमिक आरोग्य केंद्राशी संपर्क साधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना उंचावर आणि कोरड्या गोठ्यात बांधा. ओले गवत देणे टाळा.', // NEEDS NATIVE REVIEW
          c1: 'जनावरांना चिखलात किंवा ओल्या जागी बांधू नका', // NEEDS NATIVE REVIEW
          c2: 'कोरडा चारा उपलब्ध करून द्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'उंचावर सुरक्षित निवारा', 'पाणी साचणाऱ्या सखल भागातून जनावरे तात्काळ हलवा'], // NEEDS NATIVE REVIEW
            ['home', 'गोठ्यात कोरडी जागा', 'जनावरांच्या खुरांना जंतुसंसर्ग होऊ नये म्हणून गोठा कोरडा ठेवा'], // NEEDS NATIVE REVIEW
            ['drop', 'स्वच्छ पाणी द्या', 'घाण सांडपाणी जनावरांना पिऊ देऊ नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "मुसळधार पावसात रस्ते व पूल पाण्याखाली जाऊ शकतात. ओढे-नाले वाहून जाताना ओलांडू नका!",
          c1: "पाणी साचलेले रस्ते व कॉजवे ओलांडू नका",
          c2: "कार्यालय/शाळेत जाण्यापूर्वी स्थानिक रस्त्यांची खात्री करा",
          g: [
            ['warn', "पाणी वाहणारे पूल ओलांडू नका", "अंदाजापेक्षा पाण्याचा प्रवाह जास्त असू शकतो"],
            ['shield', "रेनकोट व सुरक्षित पादत्राणे वापरा", "इलेक्ट्रिक खांब आणि तुटलेल्या तारांपासून दूर रहा"],
            ['phone', "प्रवासाची माहिती ठेवा", "कुटुंबाला पोहोचल्याची माहिती द्या"],
          ],
        },
        {
          adv: "मुसळधार पावसामुळे पाणी वाढू शकते व दिशाभूल होऊ शकते. किनाऱ्याजवळ सुरक्षित ठिकाणी नांगर टाका!",
          c1: "पावसामुळे समुद्रात किंवा नदीत दृश्यता अत्यंत कमी होते",
          c2: "लाईफ जॅकेट नेहमी घालून ठेवा आणि इंजिन सुरक्षित ठेवा",
          g: [
            ['shield', "लाईफ जॅकेट वापरा", "बोटीवरील सर्वांनी अनिवार्यपणे लाईफ जॅकेट परिधान करावे"],
            ['warn', "किनाऱ्याकडे परता", "दृश्यता कमी असल्यास आणि पाण्याचा प्रवाह वाढल्यास किनाऱ्याकडे या"],
            ['phone', "स्थानिक बंदराशी संपर्क", "बंदर नियंत्रक किंवा मत्स्यव्यवसाय कार्यालयाच्या संपर्कात रहा"],
          ],
        }
      ],
      hi: [
        {
          adv: 'खेत या नाले के पास न रुकें। पक्के घर या सुरक्षित शेड में शरण लें।', // NEEDS NATIVE REVIEW
          c1: 'पानी के तेज़ बहाव को पार न करें', // NEEDS NATIVE REVIEW
          c2: 'बिजली के खंभों और जर्जर दीवारों से दूर रहें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्के मकान में रहें', 'पेड़ के नीचे शरण न लें'], // NEEDS NATIVE REVIEW
            ['shield', 'नालों से दूर रहें', 'उफ़नते नालों में उतरने का जोखिम न लें'], // NEEDS NATIVE REVIEW
            ['phone', 'सतर्क रहें', 'प्रशासन की चेतावनी का पालन करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'खेत से अतिरिक्त पानी की निकासी करें। खाद व छिड़काव का काम रोकें।', // NEEDS NATIVE REVIEW
          c1: 'मेड़ों से जल निकासी की व्यवस्था करें', // NEEDS NATIVE REVIEW
          c2: 'दवा व खाद का छिड़काव अभी न करें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'जल निकासी करें', 'पानी भरने से फ़सल की जड़ें गल सकती हैं'], // NEEDS NATIVE REVIEW
            ['drop', 'छिड़काव रोकें', 'बारिश में छिड़काव बहने से भारी नुक़सान होता है'], // NEEDS NATIVE REVIEW
            ['home', 'सामान सुरक्षित रखें', 'बीज और खाद को ऊँची व सूखी जगह पर रखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पीने का पानी उबालकर पिएँ। गीली दीवारों और बिजली के तारों से सावधान रहें।', // NEEDS NATIVE REVIEW
          c1: 'साफ़ उबला पानी ही पिएँ', // NEEDS NATIVE REVIEW
          c2: 'घर में पानी भरने पर ऊँची जगह जाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'उबला पानी पिएँ', 'संक्रामक बीमारियों से बचाव के लिए पानी उबालें'], // NEEDS NATIVE REVIEW
            ['home', 'सुरक्षित स्थान', 'बिजली के उपकरणों को सावधानी से इस्तेमाल करें'], // NEEDS NATIVE REVIEW
            ['phone', 'स्वास्थ्य सेवा 108', 'बीमार होने पर नज़दीकी स्वास्थ्य केंद्र जाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं को ऊँचे और सूखे स्थान पर बाँधें। कीचड़ में न रखें।', // NEEDS NATIVE REVIEW
          c1: 'पशुओं को पानी भराव वाली जगह से हटाएँ', // NEEDS NATIVE REVIEW
          c2: 'सूखा चारा और साफ़ पानी दें', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'ऊँचे स्थान पर शेड', 'बाढ़ संभावित नाले के पास पशु न बाँधें'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े को सूखा रखें', 'खुरपका और अन्य बीमारियों से बचाव करें'], // NEEDS NATIVE REVIEW
            ['drop', 'साफ़ पानी पिलाएँ', 'दूषित पानी पशुओं को न पीने दें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "भारी बारिश में पुल और सड़कें डूब सकती हैं। उफनते नाले पार करने का जोखिम न लें!",
          c1: "जलमग्न सड़कों और पुलिया को पार न करें",
          c2: "कार्यालय/स्कूल निकलने से पहले रास्ते की स्थिति जाँच लें",
          g: [
            ['warn', "उफनते पुल पार न करें", "पानी का बहाव दिखने से कहीं तेज़ हो सकता है"],
            ['shield', "रेनकोट और वाटरप्रूफ बैग उपयोग करें", "बिजली के खंभों और तारों से दूर रहें"],
            ['phone', "संपर्क में रहें", "घर और दफ़्तर में अपनी स्थिति की सूचना दें"],
          ],
        },
        {
          adv: "भारी बारिश से दृश्यता घट जाती है और बहाव तेज़ होता है। नाव को सुरक्षित स्थान पर बाँधें!",
          c1: "बारिश में पानी पर दृश्यता शून्य हो सकती है",
          c2: "लाइफ़ जैकेट अनिवार्य रूप से पहने रखें",
          g: [
            ['shield', "लाइफ़ जैकेट पहनें", "नाव पर सभी सदस्यों के लिए लाइफ़ जैकेट अनिवार्य है"],
            ['warn', "किनारे की ओर लौटें", "तेज़ बहाव या भारी बारिश में मछली पकड़ना रोकें"],
            ['phone', "बंदरगाह से संपर्क", "तटीय नियंत्रण कक्ष के निर्देशों का पालन करें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Avoid staying in open fields or near streams. Take shelter in strong pucca structure.',
          c1: 'Do not cross flooded causeways or streams',
          c2: 'Stay clear of electric poles and slippery banks',
          g: [
            ['home', 'Secure shelter', 'Stay indoors; avoid mud walls and weak structures'],
            ['shield', 'Avoid flood currents', 'Never attempt to wade through rushing stream water'],
            ['phone', 'Follow advisories', 'Keep emergency contacts ready'],
          ],
        },
        {
          adv: 'Ensure excess water drainage from fields. Postpone spraying and fertilization.',
          c1: 'Open field bund drains immediately',
          c2: 'Halt spray operations and fertilizer application',
          g: [
            ['shield', 'Field drainage', 'Prevent water stagnation around crop root zones'],
            ['drop', 'Postpone spray', 'Rain washes away chemicals causing monetary loss'],
            ['home', 'Protect farm inputs', 'Store seeds, fertilizers on elevated dry platforms'],
          ],
        },
        {
          adv: 'Drink boiled water. Stay away from damp electrical wiring.',
          c1: 'Boil drinking water thoroughly',
          c2: 'Keep valuables elevated in low-lying dwellings',
          g: [
            ['drop', 'Boil water', 'Prevent waterborne infections during intense downpours'],
            ['home', 'Electrical caution', 'Do not touch electric poles or loose hanging wires'],
            ['phone', 'Call 108', 'Reach primary health centre if symptoms appear'],
          ],
        },
        {
          adv: 'Move livestock to elevated dry shed. Avoid keeping animals in mud.',
          c1: 'Keep cattle away from flooding nullahs',
          c2: 'Provide dry fodder and clean drinking water',
          g: [
            ['cow', 'Elevated cattle shelter', 'Move livestock out of low-lying flood-prone shed'],
            ['home', 'Dry flooring', 'Keep shed floor clean and dry to prevent foot rot'],
            ['drop', 'Clean water', 'Do not let animals drink runoff or contaminated floodwater'],
          ],
        },
        {
          adv: "Flooded culverts and waterlogged roads can stall travel. Never cross overflowing bridges!",
          c1: "Do not attempt to cross flooded causeways or inundated roads",
          c2: "Verify road conditions with colleagues before commuting",
          g: [
            ['warn', "Avoid waterlogged roads", "Flash flood currents can easily sweep two-wheelers"],
            ['shield', "Waterproof gear", "Protect electronics and avoid proximity to snapped electrical lines"],
            ['phone', "Check-in", "Keep relatives and office aware of transit status"],
          ],
        },
        {
          adv: "Heavy downpours reduce maritime visibility and cause swollen river currents. Return to jetty!",
          c1: "Poor visibility and river spate danger during heavy rain",
          c2: "Life jackets mandatory for all crew onboard at all times",
          g: [
            ['shield', "Wear life jackets", "Mandatory life jacket usage on open waters"],
            ['warn', "Return to shore", "Do not venture out; moor craft safely in protected bay/creek"],
            ['phone', "Port contact", "Maintain contact with local fisheries officer or port control"],
          ],
        }
      ],
    },
  },

  thunderstorm: {
    hazardId: 'thunderstorm',
    name: {
      mr: 'वादळी पाऊस व विजा', // NEEDS NATIVE REVIEW
      hi: 'तूफ़ान और बिजली', // NEEDS NATIVE REVIEW
      en: 'Thunderstorm & Lightning',
    },
    icon: 'bolt',
    roles: {
      mr: [
        {
          adv: 'मोकळ्या शेतात किंवा झाडाखाली थांबू नका. धातूची अवजारे सोडून पक्क्या निवाऱ्यात जा.', // NEEDS NATIVE REVIEW
          c1: 'झाडे, खांब व विजेच्या तारांपासून लांब रहा', // NEEDS NATIVE REVIEW
          c2: 'मोबाईल वापरणे व धातूचे साहित्य हाताळणे टाळा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्का निवारा शोधा', 'कच्चे पत्रे किंवा झाडांखाली थांबू नका'], // NEEDS NATIVE REVIEW
            ['shield', 'धातूची अवजारे लांब ठेवा', 'कुदळ, विळा, ट्रॅक्टरपासून दूर रहा'], // NEEDS NATIVE REVIEW
            ['phone', 'विजेपासून सावधान', '३० सेकंदात गडगडाट ऐकू आल्यास ३० मिनिटे बाहेर पडू नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'शेतातील ट्रॅक्टर व लोखंडी पाईप सोडून त्वरित घरी किंवा पक्क्या शेडमध्ये जा.', // NEEDS NATIVE REVIEW
          c1: 'मोकळ्या मैदानात एकटे उभे राहू नका', // NEEDS NATIVE REVIEW
          c2: 'विजांचा कडकडाट संपेपर्यंत शेतीकामे थांबवा', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'लोखंडी अवजारे सोडा', 'पाईपलाईन किंवा ट्रॅक्टरजवळ उभे राहू नका'], // NEEDS NATIVE REVIEW
            ['home', 'सुरक्षित निवारा', 'शेतात निवारा नसल्यास सखल भागात गुडघ्यावर बसा'], // NEEDS NATIVE REVIEW
            ['clock', 'कामे पुढे ढकला', 'गडगडाट शांत होईपर्यंत बाहेर पडू नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घरातील खिडक्या-दारे बंद करा. विजेची उपकरणे अनप्लग करा आणि घरातच रहा.', // NEEDS NATIVE REVIEW
          c1: 'टीव्ही, फ्रिज, मोबाईल चार्जर सॉकेटमधून काढा', // NEEDS NATIVE REVIEW
          c2: 'खिडकीजवळ किंवा बाल्कनीत उभे राहू नका', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घरामध्ये सुरक्षित रहा', 'विजेचा झटका बसू नये म्हणून उपकरणे बंद करा'], // NEEDS NATIVE REVIEW
            ['drop', 'नळाचे पाणी वापरणे टाळा', 'विजांच्या वेळी धातूच्या पाईपलाईनला हात लावू नका'], // NEEDS NATIVE REVIEW
            ['phone', 'आणीबाणी संपर्क', 'कुणाला शॉक किंवा इजा झाल्यास त्वरित १०८ ला बोलवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना लगेच झाडाखालून सुरक्षित गोठ्यात आणा. लोखंडी कुंपणापासून दूर ठेवा.', // NEEDS NATIVE REVIEW
          c1: 'झाडाखाली बांधलेली जनावरे त्वरित हटवा', // NEEDS NATIVE REVIEW
          c2: 'गोठ्यातील विजेचे कनेक्शन बंद करा', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'जनावरे झाडाखाली बांधू नका', 'विजा झाडावर पडण्याचा सर्वाधिक धोका असतो'], // NEEDS NATIVE REVIEW
            ['shield', 'लोखंडी कुंपणापासून दूर', 'तारेच्या कुंपणात विजेचा प्रवाह उतरू शकतो'], // NEEDS NATIVE REVIEW
            ['home', 'सुरक्षित गोठ्यात ठेवा', 'जनावरांना शांत ठेवा व सुरक्षित बांधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "विजांचा कडकडाट सुरू असताना दुचाकी प्रवास थांबवा. झाडाखाली थांबू नका, पक्क्या निवाऱ्यात जा!",
          c1: "प्रवासात वीज चमकत असल्यास लगेच पक्क्या इमारतीत निवारा घ्या",
          c2: "मोकळ्या रस्त्यावरील झाडाखाली किंवा धातूच्या शेडखाली थांबू नका",
          g: [
            ['home', "पक्का निवारा शोधा", "पेट्रोल पंप, पक्की दुकाने किंवा बस स्टॉपचा निवारा घ्या"],
            ['shield', "दुचाकी बाजूला लावा", "धातूचे हँडल आणि मोबाईल वापरणे विजांच्या वेळी टाळा"],
            ['clock', "४५ मिनिटे थांबा", "वादळ शांत होईपर्यंत पुढील प्रवास पुढे ढकला"],
          ],
        },
        {
          adv: "खुल्या पाण्यात विजा पडण्याचा धोका अत्यंत जास्त असतो! त्वरित मासेमारी थांबवा आणि किनाऱ्याकडे या!",
          c1: "विजा चमकत असताना खुल्या समुद्रात किंवा नदीच्या पात्रात राहू नका",
          c2: "लोखंडी काठ्या, अँटेना व धातूच्या उपकरणांपासून दूर रहा",
          g: [
            ['warn', "लगेच किनाऱ्याकडे या", "खुल्या पाण्यावरील बोट ही विजेसाठी सर्वात उंच बिंदू ठरते"],
            ['shield', "धातूच्या उपकरणांना हात लावू नका", "मासेमारी जाळी, लोखंडी अँकर व अँटेनापासून दूर रहा"],
            ['home', "केबिनमध्ये आश्रय घ्या", "शक्य असल्यास बंद बोटीच्या आत रहा; उघड्या डेकवर थांबू नका"],
          ],
        }
      ],
      hi: [
        {
          adv: 'खुले खेत या पेड़ के नीचे न रुकें। लोहे के औज़ार छोड़कर पक्के मकान में जाएँ।', // NEEDS NATIVE REVIEW
          c1: 'पेड़ों, खंभों और तारों से दूर रहें', // NEEDS NATIVE REVIEW
          c2: 'मोबाइल का इस्तेमाल और लोहे का सामान छूना बंद करें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्का आश्रय लें', 'टीन शेड या पेड़ के नीचे शरण न लें'], // NEEDS NATIVE REVIEW
            ['shield', 'औज़ार दूर रखें', 'फावड़ा, कुल्हाड़ी, ट्रैक्टर से तुरंत दूर हों'], // NEEDS NATIVE REVIEW
            ['phone', 'बिजली से बचाव', 'गड़गड़ाहट शांत होने तक बाहर न निकलें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'ट्रैक्टर और पाइपलाइन से तुरंत दूर हटें। बिजली चमकते समय काम रोकें।', // NEEDS NATIVE REVIEW
          c1: 'खेत के बीच में सीधे खड़े न रहें', // NEEDS NATIVE REVIEW
          c2: 'तूफ़ान थमने तक खेत के काम रोक दें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'लोहे की चीज़ों से दूर', 'ट्रैक्टर और पानी के पाइप को न छुएँ'], // NEEDS NATIVE REVIEW
            ['home', 'सुरक्षित जगह', 'कोई आश्रय न मिले तो गड्ढे में उकड़ूँ बैठें'], // NEEDS NATIVE REVIEW
            ['clock', 'काम रोकें', 'मौसम साफ़ होने तक बाहर न जाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घर की खिड़कियाँ बंद करें। बिजली के उपकरण अनप्लग करें और अंदर रहें।', // NEEDS NATIVE REVIEW
          c1: 'टीवी, फ़्रिज, चार्जर सॉकेट से निकालें', // NEEDS NATIVE REVIEW
          c2: 'खिड़की या बालकनी में न खड़े हों', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घर में सुरक्षित रहें', 'विद्युत उपकरणों के संपर्क से बचें'], // NEEDS NATIVE REVIEW
            ['drop', 'नल का उपयोग न करें', 'धातु के पाइप में करंट आने का ख़तरा रहता है'], // NEEDS NATIVE REVIEW
            ['phone', 'इमरजेंसी नंबर', 'ज़रूरत पड़ने पर 108 डायल करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं को पेड़ के नीचे से तुरंत बाड़े में ले जाएँ। तार की बाड़ से दूर रखें।', // NEEDS NATIVE REVIEW
          c1: 'पेड़ के नीचे बँधे पशुओं को तुरंत हटाएँ', // NEEDS NATIVE REVIEW
          c2: 'तार की बाड़ से पशुओं को दूर रखें', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'पेड़ से दूर रखें', 'बिजली पेड़ पर गिरने की संभावना सबसे अधिक होती है'], // NEEDS NATIVE REVIEW
            ['shield', 'तार की बाड़ से दूरी', 'करंट फैलने से पशुओं को बचाएँ'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े में सुरक्षित रखें', 'पशुओं को शांत रखकर सुरक्षित स्थान पर रखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "बिजली कड़कने के दौरान दुपहिया वाहन चलाना बंद करें। पेड़ के नीचे नहीं, पक्के मकान में रुकें!",
          c1: "सफ़र में बिजली चमकने पर तुरंत पक्की इमारत में शरण लें",
          c2: "सड़क किनारे पेड़ या धातु के शेड के नीचे खड़े न हों",
          g: [
            ['home', "पक्का आश्रय लें", "दुकान, बस स्टॉप या पक्के मकान में रुकें"],
            ['shield', "दुपहिया किनारे खड़ी करें", "बिजली कड़कने के दौरान मोबाइल और धातु से दूर रहें"],
            ['clock', "तूफ़ान थमने का इंतज़ार करें", "मौसम सामान्य होने तक 45 मिनट सफ़र रोकें"],
          ],
        },
        {
          adv: "खुले पानी में बिजली गिरने का ख़तरा बहुत अधिक होता है! तुरंत मछली पकड़ना बंद करें और किनारे लौटें!",
          c1: "बिजली कड़कने के दौरान समुद्र या नदी में न रहें",
          c2: "लोहे की रॉड, एंटीना और धातु के उपकरणों से दूर रहें",
          g: [
            ['warn', "तुरंत किनारे लौटें", "खुले पानी पर नाव बिजली के लिए सबसे ऊँचा संपर्क बिंदु बन जाती है"],
            ['shield', "धातु के उपकरण न छुएँ", "लोहे के लंगर और एंटीना से दूर रहें"],
            ['home', "केबिन के अंदर रहें", "खुले डेक पर खड़े न हों"],
          ],
        }
      ],
      en: [
        {
          adv: 'Do not stay in open fields or under solitary trees. Drop metal tools and seek shelter.',
          c1: 'Keep distance from trees, poles, and electric lines',
          c2: 'Avoid using phone or handling metal farming equipment',
          g: [
            ['home', 'Seek pucca shelter', 'Avoid standing under trees or temporary tin sheds'],
            ['shield', 'Drop metal equipment', 'Move away from shovels, tractors, and wires'],
            ['phone', 'Lightning 30-30 rule', 'Wait 30 minutes after last thunder before resuming outdoor work'],
          ],
        },
        {
          adv: 'Step away from tractor and irrigation pipes. Pause field work immediately.',
          c1: 'Do not stand isolated in an open flat field',
          c2: 'Halt all farm activities until storm passes',
          g: [
            ['shield', 'Distance from iron pipes', 'Keep clear of metal conductors and tractors'],
            ['home', 'Crouch if trapped', 'If caught in open, crouch low with feet together, hands on knees'],
            ['clock', 'Wait it out', 'Do not rush back into field while thunder rumbles'],
          ],
        },
        {
          adv: 'Shut windows and doors. Unplug electric appliances and stay inside.',
          c1: 'Disconnect TVs, fridges, chargers from sockets',
          c2: 'Avoid balconies and window openings',
          g: [
            ['home', 'Stay indoors safely', 'Prevent electrical surge damage to home appliances'],
            ['drop', 'Avoid plumbing fixtures', 'Do not wash dishes or shower during active lightning'],
            ['phone', 'Emergency assistance', 'Dial 108 if someone is hit by lightning or shock'],
          ],
        },
        {
          adv: 'Untie livestock under trees immediately and herd to shelter. Keep clear of wire fences.',
          c1: 'Never leave animals tied under tall trees',
          c2: 'Move livestock away from iron fences',
          g: [
            ['cow', 'Move from trees', 'Solitary trees are prime lightning targets causing high cattle mortality'],
            ['shield', 'Avoid wire fencing', 'Ground charge travels along barbed wire fences'],
            ['home', 'Keep in covered shed', 'Calm animals in dry indoor enclosure'],
          ],
        },
        {
          adv: "Halt two-wheeler commuting during active lightning. Seek solid building shelter, not trees!",
          c1: "Pull over immediately into a pucca building or petrol pump canopy",
          c2: "Never take shelter under isolated roadside trees or metal bus shelters",
          g: [
            ['home', "Seek substantial shelter", "Wait out the storm inside an enclosed building or shop"],
            ['shield', "Dismount vehicle", "Avoid holding metal vehicle handlebars during strikes"],
            ['clock', "30-45 min pause", "Wait 30 minutes after the last thunder roar before continuing"],
          ],
        },
        {
          adv: "Extreme danger of lightning strikes on open water! Halt fishing immediately and head ashore!",
          c1: "A boat on open water acts as the tallest lightning rod — high risk of direct strike",
          c2: "Stay away from metal outriggers, masts, antennas, and fishing gear",
          g: [
            ['warn', "Return to harbour immediately", "Head to nearest sheltered cove or port without delay"],
            ['shield', "Disconnect metal antennas", "Stay off open deck and stay low inside wheelhouse"],
            ['home', "Do not enter water", "Never remain wading or swimming in open water during thunder"],
          ],
        }
      ],
    },
  },

  hail: {
    hazardId: 'hail',
    name: {
      mr: 'गारपीट व वादळ', // NEEDS NATIVE REVIEW
      hi: 'ओलावृष्टि / ओले', // NEEDS NATIVE REVIEW
      en: 'Hailstorm',
    },
    icon: 'hail',
    roles: {
      mr: [
        {
          adv: 'डोक्यावर टोपली किंवा घोंगडी घेऊन लगेच पक्क्या घरात जा. उघड्यावर थांबू नका!', // NEEDS NATIVE REVIEW
          c1: 'डोक्याला इजा होऊ नये म्हणून झाकून घ्या', // NEEDS NATIVE REVIEW
          c2: 'काचेच्या खिडक्या किंवा पत्र्यांपासून सावध रहा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्क्या छताखाली आसरा', 'गारांमुळे गंभीर दुखापत होऊ शकते; बाहेर थांबू नका'], // NEEDS NATIVE REVIEW
            ['shield', 'डोके झाका', 'काही न मिळाल्यास पाठीवर व डोक्यावर गोणपाट किंवा टोपली धरा'], // NEEDS NATIVE REVIEW
            ['phone', 'जखम झाल्यास', 'इजा झाल्यास तात्काळ प्रथमोपचार करा किंवा १०८ ला बोलवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'तयार पीक सुरक्षित असल्यास काढा किंवा शेडनेटने झाका. स्वतःचा जीव धोक्यात घालू नका.', // NEEDS NATIVE REVIEW
          c1: 'फळबागा व भाजीपाला संरक्षणाची खबरदारी', // NEEDS NATIVE REVIEW
          c2: 'गारांचा मारा सुरू असताना शेतात पळू नका', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'रोपवाटिका झाका', 'शेडनेट किंवा ताडपत्रीने कोवळी रोपे झाका'], // NEEDS NATIVE REVIEW
            ['clock', 'काढणी नियोजन', 'शक्य व सुरक्षित असल्यास परिपक्व भाजीपाला तोडून घ्या'], // NEEDS NATIVE REVIEW
            ['home', 'स्वतःची सुरक्षा आधी', 'गारपीट सुरू असताना शेतात पिकांचे रक्षण करण्यासाठी बाहेर पडू नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'खिडक्या आणि पत्र्यांच्या शेडपासून दूर रहा. घराच्या सुरक्षित भागात थांबा.', // NEEDS NATIVE REVIEW
          c1: 'काचेच्या तावदानांना पडदे लावा व दूर रहा', // NEEDS NATIVE REVIEW
          c2: 'सोलर वॉटर हीटर व काचेच्या वस्तूंचे रक्षण करा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'आतल्या खोलीत थांबा', 'गारांच्या वेगाने खिडक्यांची काच फुटण्याचा धोका असतो'], // NEEDS NATIVE REVIEW
            ['shield', 'घरातील वस्तूंचे रक्षण', 'वाहने व मोलवान वस्तू पत्र्याखाली किंवा गोणीने झाका'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य संपर्क', 'कोणी जखमी झाल्यास स्थानिक प्राथमिक आरोग्य केंद्राशी संपर्क साधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना तात्काळ पक्क्या छताखाली आणा. पत्र्याच्या गोठ्यात गारांच्या आवाजाने जनावरे बिचकतात.', // NEEDS NATIVE REVIEW
          c1: 'जनावरांच्या पाठीवर जाड गोणपाट किंवा पोते टाका', // NEEDS NATIVE REVIEW
          c2: 'गोठ्यात जनावरांना शांत ठेवा', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'पक्का निवारा', 'गारांच्या माऱ्याने जनावरांना मोठी दुखापत होते; मोकळ्यात ठेवू नका'], // NEEDS NATIVE REVIEW
            ['shield', 'गोणपाटाचे संरक्षण', 'छत कमकुवत असल्यास जनावरांच्या पाठीवर पोती टाका'], // NEEDS NATIVE REVIEW
            ['home', 'शांत ठेवा', 'गारांच्या कडकडाटाने जनावरे बिचकुन पळू नयेत म्हणून घट्ट बांधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "गारपीट होत असताना तातडीने पक्के छप्पर शोधा. दुचाकी व पायी चालणे पूर्णपणे थांबवा!",
          c1: "गारपीट सुरू होताच पक्क्या दुकानात किंवा इमारतीत शिरा",
          c2: "हेल्मेट किंवा बॅग डोक्यावर धरून डोक्याचे रक्षण करा",
          g: [
            ['shield', "डोक्याचे तातडीने रक्षण", "हेल्मेट किंवा जाड सॅक डोक्यावर धरा"],
            ['home', "पक्क्या इमारतीत जा", "कौक किंवा झाडे फुटू शकतात, काचेच्या खिडक्यांपासून दूर रहा"],
            ['clock', "गारपीट संपेपर्यंत थांबा", "प्रवास चालू ठेवण्याचा प्रयत्न करू नका"],
          ],
        },
        {
          adv: "पाण्यात गारपीट झाल्यास डेकवर गंभीर दुखापत होऊ शकते. त्वरित बोटीच्या निवाऱ्यात जा!",
          c1: "उघड्या बोटीवर असल्यास जाड टोपली किंवा प्लास्टिक क्रेट डोक्यावर धरा",
          c2: "गारपीट सुरू होताच इंजिन सावकाश करून बंदराकडे वळा",
          g: [
            ['shield', "डोक्याचे तातडीने रक्षण", "डोके व हात झाका; लाईफ जॅकेट व हेल्मेट वापरा"],
            ['home', "केबिनमध्ये थांबा", "उघड्या डेकवर उभे राहणे टाळा"],
            ['warn', "लाटांवर लक्ष ठेवा", "गारपिटीसोबत येणाऱ्या वादळी वाऱ्यामुळे पाणी उसळू शकते"],
          ],
        }
      ],
      hi: [
        {
          adv: 'सिर को ढँकें और तुरंत पक्के मकान में जाएँ। खुले में बिल्कुल न खड़े रहें!', // NEEDS NATIVE REVIEW
          c1: 'सिर की चोट से बचाव के लिए टोकरी या बोरी लें', // NEEDS NATIVE REVIEW
          c2: 'काँच की खिड़कियों और टीन शेड से सावधान रहें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्की छत की शरण', 'ओले सिर पर लगने से गंभीर चोट लग सकती है'], // NEEDS NATIVE REVIEW
            ['shield', 'सिर को ढँकें', 'कुछ न मिले तो हाथ या बोरी सिर पर रखें'], // NEEDS NATIVE REVIEW
            ['phone', 'चोट लगने पर 108', 'घायल होने पर तुरंत प्राथमिक उपचार लें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'तैयार सब्ज़ी/फ़सल को जाली या तिरपाल से ढँकें। ओले पड़ते समय खेत में न भागें।', // NEEDS NATIVE REVIEW
          c1: 'नर्सरी और फलदार पौधों को सुरक्षित करें', // NEEDS NATIVE REVIEW
          c2: 'ओलावृष्टि के दौरान जान जोखिम में न डालें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'नर्सरी पर तिरपाल', 'कोमल पौधों को ओलों के सीधे वार से बचाएँ'], // NEEDS NATIVE REVIEW
            ['clock', 'सुरक्षित तुड़ाई', 'यदि संभव हो तो पकी फ़सल पहले ही सुरक्षित कर लें'], // NEEDS NATIVE REVIEW
            ['home', 'पहले खुद की सुरक्षा', 'ओले पड़ते समय खेत में जाकर फ़सल बचाने का प्रयास न करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'खिड़कियों और छज्जों से दूर रहें। घर के सबसे सुरक्षित हिस्से में शरण लें।', // NEEDS NATIVE REVIEW
          c1: 'काँच टूटने से सावधान रहें', // NEEDS NATIVE REVIEW
          c2: 'वाहन और उपयोगी सामान ढक कर रखें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'अंदरूनी कमरे में रहें', 'ओलों से खिड़कियाँ टूट सकती हैं'], // NEEDS NATIVE REVIEW
            ['shield', 'वाहनों को बचाएँ', 'कार या बाइक पर गद्दे या बोरियाँ डालें'], // NEEDS NATIVE REVIEW
            ['phone', 'आपात स्वास्थ्य नंबर', 'नज़दीकी स्वास्थ्य केंद्र से संपर्क करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं को तुरंत पक्के शेड में लाएँ। ओलों से पशुओं को गंभीर चोट लग सकती है।', // NEEDS NATIVE REVIEW
          c1: 'पशुओं की पीठ पर मोटी बोरी डालें', // NEEDS NATIVE REVIEW
          c2: 'बाड़े में पशुओं को शांत रखें', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सुरक्षित छत के नीचे', 'खुले में बँधे पशुओं को ओलों की सीधी मार से बचाएँ'], // NEEDS NATIVE REVIEW
            ['shield', 'बोरी से बचाव', 'कमज़ोर छत होने पर पशुओं की पीठ पर बोरी बिछाएँ'], // NEEDS NATIVE REVIEW
            ['home', 'पशुओं को शांत रखें', 'ओलों की आवाज़ से डरकर भागने से रोकें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "ओलावृष्टि शुरू होने पर तुरंत पक्की छत ढूँढें। बाइक चलाना या पैदल चलना तुरंत रोकें!",
          c1: "ओले गिरते ही पक्की दुकान या मकान के अंदर जाएँ",
          c2: "हेलमेट या बैग से सिर की सुरक्षा करें",
          g: [
            ['shield', "सिर को सुरक्षित करें", "हेलमेट पहने रखें या बैग को सिर पर रखें"],
            ['home', "पक्के आश्रय में रुकें", "काँच की खिड़कियों और टीन की चादरों से दूर रहें"],
            ['clock', "ओले रुकने की प्रतीक्षा करें", "सफ़र जारी रखने का जोखिम न लें"],
          ],
        },
        {
          adv: "पानी पर ओलावृष्टि से डेक पर गंभीर चोट लग सकती है। तुरंत नाव के सुरक्षित हिस्से में शरण लें!",
          c1: "खुली नाव पर हों तो टोकरी या क्रेट से सिर की सुरक्षा करें",
          c2: "ओले गिरते समय नाव को सुरक्षित किनारे की ओर मोड़ें",
          g: [
            ['shield', "सिर को सुरक्षित रखें", "हेलमेट या मजबूत क्रेट से सिर ढकें"],
            ['home', "केबिन में जाएँ", "डेक पर खड़े रहने का जोखिम न लें"],
            ['warn', "पानी की हलचल", "ओलों के साथ आने वाली तेज़ हवाओं से सावधान रहें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Protect your head with basket or sack and run to pucca building immediately!',
          c1: 'Protect head and eyes from high-velocity hailstones',
          c2: 'Avoid glass windows and rusted tin canopies',
          g: [
            ['home', 'Pucca shelter', 'Hailstones cause severe blunt trauma; get indoors fast'],
            ['shield', 'Cover head', 'Use crate, basket, or heavy sack to shield skull'],
            ['phone', 'Call 108 if injured', 'Seek first aid immediately for head or eye lacerations'],
          ],
        },
        {
          adv: 'Cover nursery beds with hail nets or tarpaulin. Never risk life during active hail.',
          c1: 'Shield fruit and vegetable nurseries',
          c2: 'Do not rush into open orchards during hailstorm',
          g: [
            ['shield', 'Cover nurseries', 'Deploy anti-hail shade nets over tender seedlings if advance alert issued'],
            ['clock', 'Harvest ripe produce', 'Harvest marketable horticultural produce ahead of forecast'],
            ['home', 'Personal safety first', 'Never venture into fields to save standing crop while hail falls'],
          ],
        },
        {
          adv: 'Stay clear of glass window panes and skylights. Move to interior rooms.',
          c1: 'Draw thick curtains across windows',
          c2: 'Protect vehicles and solar heaters with quilts',
          g: [
            ['home', 'Stay in inner rooms', 'Shattered glass shards pose acute cutting risks'],
            ['shield', 'Protect rooftop assets', 'Cover solar heater tubes with thick rugs'],
            ['phone', 'Healthcare contact', 'Keep PHC and emergency ambulance numbers accessible'],
          ],
        },
        {
          adv: 'Herd livestock into reinforced shed immediately. Throw burlap sacks over cattle backs.',
          c1: 'Untie livestock in open yards and lead inside',
          c2: 'Keep cattle calm in closed shelter',
          g: [
            ['cow', 'Immediate shed shelter', 'Large hailstones fracture livestock skulls and spines'],
            ['shield', 'Burlap padding', 'Place thick jute padding over animals if under tin sheeting'],
            ['home', 'Prevent stampede', 'Tie securely to prevent panic injuries'],
          ],
        },
        {
          adv: "Hailstones can cause severe physical injury and vehicle damage. Stop travel immediately!",
          c1: "Seek immediate concrete or masonry shelter away from glass panes",
          c2: "Keep helmet strapped on and hold bag over head to shield against blunt impact",
          g: [
            ['shield', "Protect head", "Keep motorcycle helmet on or use thick backpack as shield"],
            ['home', "Concrete shelter", "Avoid tin roofs and trees prone to violent branch snaps"],
            ['clock', "Await all-clear", "Wait out hail burst completely before resuming transit"],
          ],
        },
        {
          adv: "Hailstones inflict severe trauma on open water craft. Take shelter inside cabin immediately!",
          c1: "Open small boats must use plastic fish crates or covers to shield head",
          c2: "Reduce engine throttle and navigate carefully toward nearest jetty",
          g: [
            ['shield', "Shield head and face", "Wear helmet or use rigid fish crates to guard head"],
            ['home', "Stay inside cabin", "Avoid staying exposed on slippery open decks"],
            ['warn', "Sudden squall sea", "Hail bursts accompany sudden wind shifts and choppy waves"],
          ],
        }
      ],
    },
  },

  cold_wave: {
    hazardId: 'cold_wave',
    name: {
      mr: 'थंडीची लाट', // NEEDS NATIVE REVIEW
      hi: 'शीतलहर', // NEEDS NATIVE REVIEW
      en: 'Cold Wave',
    },
    icon: 'cold',
    roles: {
      mr: [
        {
          adv: 'उबदार कपडे वापरा. पहाटे शेतात जाताना कान आणि छाती झाकून घ्या.', // NEEDS NATIVE REVIEW
          c1: 'पहाटेची कडाक्याची थंडी टाळा', // NEEDS NATIVE REVIEW
          c2: 'गरम पाणी आणि पौष्टिक आहार घ्या', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'उबदार कपडे घाला', 'कानटोपी, मफलर आणि घोंगडीचा वापर करा'], // NEEDS NATIVE REVIEW
            ['drop', 'गरम पाणी प्या', 'थंडीमध्येही शरीराला पाण्याची गरज असते; कोमट पाणी प्या'], // NEEDS NATIVE REVIEW
            ['clock', 'कामाची वेळ बदला', 'पहाटे ५ ऐवजी सूर्य वर आल्यावर शेतातील कामे सुरू करा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पिकांना हलके सिंचन द्या जेणेकरून थंडीचा फटका बसणार नाही. शेतात धूर करा.', // NEEDS NATIVE REVIEW
          c1: 'संध्याकाळी किंवा रात्री पिकांना हलके पाणी द्या', // NEEDS NATIVE REVIEW
          c2: 'पिकांच्या भोवती रात्री कचऱ्याचा धूर करून हवा उबदार ठेवा', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'हलके सिंचन करा', 'पाण्यामुळे जमिनीचे तापमान टिकून राहते व पिकांना थंडी लागत नाही'], // NEEDS NATIVE REVIEW
            ['shield', 'शेताभोवती धूर करा', 'उत्तर बाजूने धूर केल्यास थंडीच्या लाटेपासून पिकांचे संरक्षण होते'], // NEEDS NATIVE REVIEW
            ['clock', 'पहाटेची कामे उशिरा करा', 'कडाक्याच्या थंडीत शेतात काम करणे टाळा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घरातील लहान मुले व वृद्धांना उबदार कपड्यात ठेवा. रात्री शेकोटीचा धूर घरात साचू देऊ नका.', // NEEDS NATIVE REVIEW
          c1: 'वृद्ध व्यक्तींना पहाटेच्या गारठ्यापासून सांभाळा', // NEEDS NATIVE REVIEW
          c2: 'खोलीत पुरेशी उब ठेवा, पण हवा खेळती राहू द्या', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'उबदार पांघरूण वापरा', 'रात्री कानटोपी व पायात मोजे घालायला द्या'], // NEEDS NATIVE REVIEW
            ['drop', 'गरम द्रवपदार्थ द्या', 'गरम चहा, सूप किंवा कोमट पाणी पिण्यास द्या'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य सतर्कता', 'छातीत कफ, धाप किंवा थरकाप झाल्यास आरोग्य केंद्रात जा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'गोठ्यात रात्री पोत्यांचे पडदे लावा. जनावरांना थंड पाणी पाजणे टाळा आणि कोरडा चारा द्या.', // NEEDS NATIVE REVIEW
          c1: 'गोठ्यात गार वारा येऊ देऊ नका; पोत्यांचे आच्छादन लावा', // NEEDS NATIVE REVIEW
          c2: 'जनावरांना कोमट किंवा ताजे पाणी पाजा', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'गोठ्यात उब ठेवा', 'जमिनीवर वाळलेले गवत पसरून जनावरांना उबदार बसण्याची सोय करा'], // NEEDS NATIVE REVIEW
            ['drop', 'ताजे पाणी द्या', 'रात्रीचे साठलेले अतिथंड पाणी जनावरांना देऊ नका'], // NEEDS NATIVE REVIEW
            ['home', 'पोत्यांचे पडदे', 'गोठ्याच्या उत्तर व पूर्व बाजूला पोती लावून गार वारे अडवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "सकाळी प्रवासाला निघताना जाड उबदार कपडे व मफलर वापरा. कान आणि छाती झाकून प्रवास करा!",
          c1: "सकाळी दुचाकी चालवताना विंड-चील थंडीपासून बचाव करा",
          c2: "सकाळी लवकरचा प्रवास शक्य असल्यास थोडा उशिरा (८ नंतर) करा",
          g: [
            ['shield', "उबदार कपडे व मफलर", "दुपारपर्यंत थंडीचा गारठा असतो, कान व गळा झाका"],
            ['clock', "प्रवासाची वेळ समायोजित करा", "कडाक्याच्या थंडीत सूर्य उगवल्यानंतर प्रवास सुरू करा"],
            ['drop', "गरम चहा किंवा कोमट पाणी", "प्रवासापूर्वी गरम पेय घ्या"],
          ],
        },
        {
          adv: "पाण्यावरील गार वारे शरीरातील उष्णता वेगाने शोषून घेतात. उबदार कपडे व वॉटरप्रूफ जॅकेट वापरा!",
          c1: "पाण्यात हायपोथर्मियाचा धोका असतो, अंगात उबदार कपडे ठेवा",
          c2: "पहाटे मासेमारीला जाताना गरम पेय व अन्न सोबत ठेवा",
          g: [
            ['shield', "वॉटरप्रूफ उबदार कपडे", "थंड पाणी आणि वारा यापासून शरीराचे रक्षण करा"],
            ['drop', "गरम पेय सोबत ठेवा", "थर्मसमध्ये गरम चहा किंवा पाणी सोबत ठेवा"],
            ['clock', "पहाटे सावधगिरी", "हात गारठल्यास जाळी ओढणे कठीण होते; योग्य विश्रांती घ्या"],
          ],
        }
      ],
      hi: [
        {
          adv: 'गर्म कपड़े पहनें। सुबह खेत जाते समय कान और छाती अच्छी तरह ढँकें।', // NEEDS NATIVE REVIEW
          c1: 'सुबह की कड़ाके की ठंड से बचें', // NEEDS NATIVE REVIEW
          c2: 'गुनगुना पानी और गर्म भोजन लें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'गर्म कपड़े पहनें', 'टोपी, मफलर और कंबल का उपयोग करें'], // NEEDS NATIVE REVIEW
            ['drop', 'गुनगुना पानी पिएँ', 'ठंड में भी पर्याप्त पानी पीते रहें'], // NEEDS NATIVE REVIEW
            ['clock', 'काम का समय बदलें', 'धूप निकलने के बाद ही खेत के काम शुरू करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'फ़सल को पाले/ठंड से बचाने के लिए हल्की सिंचाई करें। खेत की मेड़ पर धुँआ करें।', // NEEDS NATIVE REVIEW
          c1: 'शाम को खेत में हल्की सिंचाई करें', // NEEDS NATIVE REVIEW
          c2: 'उत्तरी दिशा में शाम को धुँआ जलाएँ ताकि तापमान बढ़े', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'शाम की सिंचाई', 'पानी से भूमि का तापमान बना रहता है और फ़सल सुरक्षित रहती है'], // NEEDS NATIVE REVIEW
            ['shield', 'मेड़ पर धुँआ', 'रात में धुँआ करने से पाला जमने का ख़तरा टलता है'], // NEEDS NATIVE REVIEW
            ['clock', 'सुबह देर से काम', 'शीतलहर के समय सुबह जल्दी काम से बचें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बुज़ुर्गों और बच्चों को गर्म कपड़े पहनाएँ। कमरे में धुआँ न भरने दें।', // NEEDS NATIVE REVIEW
          c1: 'बुज़ुर्गों को सुबह की ठंडी हवा से बचाएँ', // NEEDS NATIVE REVIEW
          c2: 'कमरे को गर्म और हवादार रखें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'गर्म रजाई/कंबल', 'रात को टोपी और मोज़े पहनाकर सुलाएँ'], // NEEDS NATIVE REVIEW
            ['drop', 'गर्म पेय दें', 'हल्का गर्म पानी या सूप पिलाएँ'], // NEEDS NATIVE REVIEW
            ['phone', 'स्वास्थ्य सलाह', 'साँस लेने में तकलीफ़ होने पर नज़दीकी अस्पताल ले जाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बाड़े में बोरियों के परदे लगाएँ। पशुओं को बहुत ठंडा पानी न पिलाएँ।', // NEEDS NATIVE REVIEW
          c1: 'बाड़े में ठंडी हवा रोकने के लिए परदे लगाएँ', // NEEDS NATIVE REVIEW
          c2: 'ताज़ा या हल्का गर्म पानी पिलाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सूखा बिछावन', 'बाड़े के फ़र्श पर सूखी घास बिछाएँ ताकि ठंड न लगे'], // NEEDS NATIVE REVIEW
            ['drop', 'ताज़ा पानी', 'रात का रुका हुआ बर्फ़ीला पानी पशुओं को न दें'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े को ढँकें', 'उत्तर की ओर से आने वाली ठंडी हवा को रोकें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "सुबह सफ़र के दौरान गर्म कपड़े और मफ़लर पहनें। कान और सीना पूरी तरह ढककर चलें!",
          c1: "दुपहिया चलाते समय हवा के तेज़ ठंडक (विंड-चिल) से बचाव करें",
          c2: "हो सके तो सुबह का सफ़र धूप निकलने के बाद शुरू करें",
          g: [
            ['shield', "ऊनी कपड़े और दस्ताने", "कान, नाक और गले को मफ़लर से अच्छी तरह ढकें"],
            ['clock', "समय में बदलाव", "कड़ाके की ठंड में सुबह 8 बजे के बाद सफ़र करें"],
            ['drop', "गर्म पेय का सेवन", "निकलने से पहले गुनगुना पानी या चाय पिएँ"],
          ],
        },
        {
          adv: "पानी पर तेज़ ठंडी हवाएँ शरीर को तेज़ी से ठंडा करती हैं। गर्म व वॉटरप्रूफ कपड़े पहनें!",
          c1: "पानी में हाइपोथर्मिया का ख़तरा रहता है, शरीर को सूखा और गर्म रखें",
          c2: "सुबह जल्दी निकलते समय गर्म चाय या पानी साथ रखें",
          g: [
            ['shield', "गर्म जैकेट और टोपी", "हवा और पानी के छींटों से शरीर को सुरक्षित रखें"],
            ['drop', "गर्म पेय साथ रखें", "थर्मस में गर्म पानी या चाय साथ रखें"],
            ['clock', "सतर्कता", "हाथ सुन्न होने से जाल सँभालने में परेशानी से बचें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Wear layered warm clothing. Cover head and chest when heading to farm early morning.',
          c1: 'Avoid exposure to peak morning chill',
          c2: 'Drink warm water and eat nutritious hot meals',
          g: [
            ['home', 'Layered clothing', 'Use caps, mufflers, and wool blankets'],
            ['drop', 'Drink warm fluids', 'Prevent cold dehydration by drinking warm water regularly'],
            ['clock', 'Shift morning hours', 'Begin field work after sun rises and warmth spreads'],
          ],
        },
        {
          adv: 'Provide light irrigation to rabi crops to raise soil temperature. Create border smoke.',
          c1: 'Apply light evening irrigation across sensitive plots',
          c2: 'Light evening smoulder smoke heaps on windward northern border',
          g: [
            ['drop', 'Evening irrigation', 'Specific heat of water prevents frostbite on plant foliage'],
            ['shield', 'Smoulder smoke barrier', 'Traps ground radiation over tender nursery and vegetable beds'],
            ['clock', 'Delay dawn spray', 'Never spray chemicals during active cold wave mornings'],
          ],
        },
        {
          adv: 'Keep elderly and young children warm. Never keep smoking coal fire inside closed room.',
          c1: 'Protect elders from early dawn cold air',
          c2: 'Ensure warm bedding and adequate room ventilation',
          g: [
            ['home', 'Warm bedding', 'Wear socks and warm cap through the night'],
            ['drop', 'Warm nourishing fluids', 'Give warm herbal teas, milk, or soups'],
            ['phone', 'Hypothermia warning', 'Call 108 if persistent shivering, lethargy, or cough occurs'],
          ],
        },
        {
          adv: 'Hang jute curtains on cattle shed sides. Give fresh groundwater, never chilled pond water.',
          c1: 'Shield livestock from direct northern cold drafts',
          c2: 'Provide warm bedding of dry straw on shed floor',
          g: [
            ['cow', 'Warm straw bedding', 'Prevent mastitis and pneumonia by insulating floor'],
            ['drop', 'Fresh groundwater', 'Pump fresh warm well water instead of freezing standing water'],
            ['home', 'Jute sack screens', 'Cover open windy sides of the cattle shed'],
          ],
        },
        {
          adv: "Heavy wind-chill affects two-wheeler commuters. Wear windproof jacket, muffler, and gloves!",
          c1: "Shield chest, throat, and ears from piercing morning wind-chill",
          c2: "Delay morning commute past 8:00 am if temperatures dip below 5°C",
          g: [
            ['shield', "Thermal layers", "Wear wind-resistant jacket, thermal inner, and helmet visor"],
            ['clock', "Delay start", "Reschedule early departures until sun warms the air"],
            ['drop', "Warm fluids", "Hydrate with warm fluids before road travel"],
          ],
        },
        {
          adv: "Wind-chill on water rapidly leads to hypothermia. Wear layered windproof thermal garments!",
          c1: "Guard against maritime hypothermia; keep core dry and warm",
          c2: "Carry hot fluids in thermal flasks during morning trips",
          g: [
            ['shield', "Waterproof thermal outer", "Layer with windbreaker and woollen headgear"],
            ['drop', "Warm beverages", "Drink hot tea or broth to maintain core body warmth"],
            ['clock', "Pace operations", "Prevent finger numbness while hauling fishing nets"],
          ],
        }
      ],
    },
  },

  ground_frost: {
    hazardId: 'ground_frost',
    name: {
      mr: 'दव व पाला धोका', // NEEDS NATIVE REVIEW
      hi: 'पाला / ज़मीनी ठंड', // NEEDS NATIVE REVIEW
      en: 'Ground Frost Risk',
    },
    icon: 'cold',
    roles: {
      mr: [
        {
          adv: 'पहाटे कडाक्याची थंडी व जमिनीवर पाला पडण्याचा धोका आहे. शरीराची पूर्ण काळजी घ्या.', // NEEDS NATIVE REVIEW
          c1: 'पहाटे उबदार कपडे घालूनच बाहेर पडा', // NEEDS NATIVE REVIEW
          c2: 'थंडीत घसरड्या रस्त्यांवर जपून चाला', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'उबदार कपडे वापरा', 'कानटोपी आणि हातमोजे वापरा'], // NEEDS NATIVE REVIEW
            ['drop', 'कोमट पाणी प्या', 'पहाटे बाहेर पडण्यापूर्वी गरम चहा किंवा पाणी घ्या'], // NEEDS NATIVE REVIEW
            ['clock', 'सूर्य वर आल्यावर कामे करा', 'पहाटेची कडाक्याची थंडी टाळा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'रब्बी पिके व भाजीपाला पाल्यापासून वाचवण्यासाठी संध्याकाळी पाणी द्या व धूर करा.', // NEEDS NATIVE REVIEW
          c1: 'पिकांना संध्याकाळी हलके पाणी द्या', // NEEDS NATIVE REVIEW
          c2: 'रोपवाटिकेवर प्लास्टिक किंवा गवताचे आच्छादन घाला', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'संध्याकाळी सिंचन करा', 'ओलाव्यामुळे जमिनीचे तापमान टिकून राहून पाला पडत नाही'], // NEEDS NATIVE REVIEW
            ['shield', 'आच्छादन घाला', 'भाजीपाल्याच्या वाफ्यांवर गवताचे आच्छादन घाला'], // NEEDS NATIVE REVIEW
            ['home', 'शेतात धूर पेटवा', 'कचऱ्याचा धूर करून हवेचे तापमान वाढवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घरातील लहान मुले व वृद्धांना थंडीपासून वाचवा. गरम पाणी आणि उबदार कपडे द्या.', // NEEDS NATIVE REVIEW
          c1: 'घरातील फरशीवर चटई किंवा सतरंजी अंथरा', // NEEDS NATIVE REVIEW
          c2: 'रात्री कानटोपी व मोजे घालून झोपवा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घरात उब ठेवा', 'खिडक्या रात्री बंद ठेवा; उबदार पांघरूण द्या'], // NEEDS NATIVE REVIEW
            ['drop', 'गरम पाणी द्या', 'पिण्यासाठी नेहमी कोमट पाण्याचा वापर करा'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य संपर्क', 'थंडी वाजून ताप आल्यास लगेच डॉक्टरांना दाखवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना गोठ्यात कोरड्या गवतावर बसवा. गोठ्याचे दरवाजे पोत्याने झाकून घ्या.', // NEEDS NATIVE REVIEW
          c1: 'गोठ्याच्या जमिनीवर वाळलेले गवत पसरवा', // NEEDS NATIVE REVIEW
          c2: 'जनावरांना ताजे कोमट पाणी द्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'कोरडा बिछाना द्या', 'गार फरशीमुळे जनावरे आजारी पडू नयेत म्हणून गवत अंथरा'], // NEEDS NATIVE REVIEW
            ['home', 'गोठ्यात गारठा रोखा', 'पोती लावून गार वारे अडवा'], // NEEDS NATIVE REVIEW
            ['drop', 'पौष्टिक खुराक द्या', 'थंडीमध्ये जनावरांची ताकद टिकवण्यासाठी पेंड व खुराक द्या'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "पहाटे रस्त्यांवर निसरडेपणा व दाट थंडी असू शकते. दुचाकी सावकाश चालवा!",
          c1: "पहाटेच्या प्रवासात वाहनाचा वेग नियंत्रित ठेवा",
          c2: "हात सुन्न पडू नयेत म्हणून हँडग्लोज वापरा",
          g: [
            ['shield', "हँडग्लोज व हेल्मेट", "हात सुन्न पडल्यास ब्रेक लावणे कठीण होते"],
            ['clock', "सावकाश प्रवास", "रस्त्यावरील ओलावा आणि निसरड्या वळणांवर लक्ष ठेवा"],
            ['home', "उबदार ठिकाणी थांबा", "थंडी सहन न झाल्यास वाटेत चहाच्या दुकानात थांबा"],
          ],
        },
        {
          adv: "पहाटे बोटीचा डेक निसरडा असू शकतो. ग्रिप असलेली पादत्राणे वापरा आणि सावकाश चाला!",
          c1: "डेकवरील ओलाव्यामुळे घसरून पाण्यात पडण्याचा धोका असतो",
          c2: "हात व पाय उबदार ठेवा",
          g: [
            ['shield', "निसरड्या डेकवर खबरदारी", "ग्रिप असलेले बूट वापरा आणि रेलिंग पकडून चाला"],
            ['home', "बोटीची तपासणी", "इंजिन सुरू होण्यास वेळ लागू शकतो, बॅटरी तपासा"],
            ['clock', "सावकाश हालचाल", "जाळी आणि दोऱ्या ओढताना घसरू नका"],
          ],
        }
      ],
      hi: [
        {
          adv: 'सुबह कड़ाके की ठंड और पाले का ख़तरा है। गर्म कपड़े पहनें और पूरा ध्यान रखें।', // NEEDS NATIVE REVIEW
          c1: 'सुबह सिर और कान अच्छी तरह ढँकें', // NEEDS NATIVE REVIEW
          c2: 'ठंड से बचने के लिए गर्म पेय लें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'ऊनी कपड़े पहनें', 'टोपी और दस्तानों का प्रयोग करें'], // NEEDS NATIVE REVIEW
            ['drop', 'गुनगुना पानी पिएँ', 'सुबह निकलने से पहले गर्म चाय या पानी लें'], // NEEDS NATIVE REVIEW
            ['clock', 'धूप निकलने पर काम करें', 'सुबह की अत्यधिक ठंड से बचें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'रबी फ़सलों व सब्ज़ियों को पाले से बचाने के लिए शाम को हल्की सिंचाई करें।', // NEEDS NATIVE REVIEW
          c1: 'शाम के समय हल्की सिंचाई करें', // NEEDS NATIVE REVIEW
          c2: 'पौधों पर पुआल या तिरपाल का आवरण डालें', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'शाम को पानी दें', 'नमी से ज़मीन का तापमान बना रहता है और पाला नहीं जमता'], // NEEDS NATIVE REVIEW
            ['shield', 'पौधों को ढँकें', 'सब्ज़ियों की क्यारियों पर घास-फूस का आवरण डालें'], // NEEDS NATIVE REVIEW
            ['home', 'धुँआ करें', 'खेत की मेड़ पर शाम को धुँआ सुलगाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बच्चों व बुज़ुर्गों को पाले की ठंड से बचाएँ। गर्म पानी व कपड़े दें।', // NEEDS NATIVE REVIEW
          c1: 'फ़र्श पर चटाई या दरी बिछाएँ', // NEEDS NATIVE REVIEW
          c2: 'रात को गर्म कपड़े पहनाकर सुलाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'कमरे में गर्माहट', 'खिड़कियाँ बंद रखें और रजाई का इस्तेमाल करें'], // NEEDS NATIVE REVIEW
            ['drop', 'गर्म पेय दें', 'गुनगुना पानी या गर्म दूध पिलाएँ'], // NEEDS NATIVE REVIEW
            ['phone', 'डॉक्टर से सलाह', 'ठंड से बुखार या काँपने पर 108 या अस्पताल जाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं के नीचे सूखी घास बिछाएँ। बाड़े को बोरियों से ढँकें।', // NEEDS NATIVE REVIEW
          c1: 'बाड़े के फ़र्श पर सूखी पराली बिछाएँ', // NEEDS NATIVE REVIEW
          c2: 'पशुओं को ताज़ा पानी पिलाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सूखा बिछावन दें', 'ठंडे फ़र्श पर बैठने से पशुओं को निमोनिया हो सकता है'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े को ढँकें', 'बोरियों से ठंडी हवा रोकें'], // NEEDS NATIVE REVIEW
            ['drop', 'पौष्टिक चारा', 'पशुओं की ऊर्जा बनाए रखने के लिए खली और दाना दें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "सुबह की जमा देने वाली ठंड में सड़कें फिसलन भरी हो सकती हैं। वाहन धीमी गति से चलाएँ!",
          c1: "सफ़र में दस्ताने और बंद जूते पहनें",
          c2: "मोड़ों पर वाहन की गति नियंत्रित रखें",
          g: [
            ['shield', "दस्ताने और हेलमेट", "हाथ सुन्न होने से ब्रेक लगाने में परेशानी से बचें"],
            ['clock', "धीमी गति", "ओस और पाले से गीली सड़कों पर सावधानी बरतें"],
            ['home', "रास्ते में विराम", "अत्यधिक ठंड महसूस होने पर थोड़ी देर रुकें"],
          ],
        },
        {
          adv: "सुबह नाव का डेक बहुत फिसलन भरा हो सकता है। सावधानी से चलें और ग्रिप वाले जूते पहनें!",
          c1: "डेक पर फिसलकर पानी में गिरने का जोखिम रहता है",
          c2: "हाथ और पाँव गर्म रखें",
          g: [
            ['shield', "फिसलन से बचाव", "रबर ग्रिप वाले जूते पहनें और रेलिंग पकड़कर चलें"],
            ['home', "इंजन की जाँच", "कड़ाके की ठंड में इंजन और बैटरी की स्थिति देख लें"],
            ['clock', "सावधानी", "जाल खींचते समय संतुलन बनाए रखें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Sub-zero ground cooling risk. Wear comprehensive winter protection outdoors.',
          c1: 'Wear woollen cap, socks, and layered coat',
          c2: 'Drink hot fluids before venturing out early',
          g: [
            ['home', 'Wear woollens', 'Protect extremities from cold numbness'],
            ['drop', 'Hot beverages', 'Drink warm water or tea to maintain core temperature'],
            ['clock', 'Wait for sunshine', 'Postpone open-air tasks until direct sunlight warms the soil'],
          ],
        },
        {
          adv: 'Protect winter seedlings and rabi veggies from frost scorch with evening irrigation.',
          c1: 'Apply light sprinkler or furrow irrigation at dusk',
          c2: 'Cover nursery beds with straw mulch or low polytunnel',
          g: [
            ['drop', 'Dusk irrigation', 'Latent heat release from moist soil prevents ice crystallization'],
            ['shield', 'Straw thatch mulch', 'Erect thatched covers over delicate tomato and chili nursery beds'],
            ['home', 'Smoke generation', 'Burn dry weeds along north-west perimeter at midnight'],
          ],
        },
        {
          adv: 'Insulate indoor rooms for children and senior family members. Drink warm water.',
          c1: 'Spread rugs over bare cold tiled floors',
          c2: 'Provide warm socks and blankets overnight',
          g: [
            ['home', 'Room warmth', 'Keep drafty doors shut; maintain safe ventilation'],
            ['drop', 'Warm water', 'Encourage warm water intake across the day'],
            ['phone', 'Healthcare access', 'Monitor elderly for chest tightness or extreme chills'],
          ],
        },
        {
          adv: 'Spread thick dry paddy straw bedding in cattle sheds. Block cold northern winds.',
          c1: 'Ensure dry straw bedding on cold cement flooring',
          c2: 'Offer warm water and extra oilcake feed',
          g: [
            ['cow', 'Straw bedding', 'Cement chill causes sharp drop in milk yield and causes mastitis'],
            ['home', 'Windbreak curtains', 'Hang gunny screens along exposed shed walls'],
            ['drop', 'Nutritious warm mash', 'Feed protein-rich oilcake mash to support thermoregulation'],
          ],
        },
        {
          adv: "Near-freezing temperatures cause hand numbness and slick road corners. Commute with care!",
          c1: "Wear riding gloves to prevent numb fingers compromising braking ability",
          c2: "Maintain moderate vehicle speed on shaded damp asphalt bends",
          g: [
            ['shield', "Riding gloves", "Keep fingers flexible and warm for safe braking control"],
            ['clock', "Reduced speed", "Watch for slippery condensed moisture on curves"],
            ['home', "Warmth breaks", "Take brief warm-up stops if feeling severe numbness"],
          ],
        },
        {
          adv: "Near-freezing condensation renders boat decks extremely slippery. Maintain firm handholds!",
          c1: "High slip-and-fall risk overboard on frost-condensed decks",
          c2: "Wear non-slip footwear and keep one hand for the boat at all times",
          g: [
            ['shield', "Slip prevention", "Wear non-skid rubber deck boots and hold gunwales"],
            ['home', "Engine inspection", "Allow diesel marine engine to warm up adequately"],
            ['clock', "Careful hauling", "Maintain steady footing when hauling heavy nets"],
          ],
        }
      ],
    },
  },

  dense_fog: {
    hazardId: 'dense_fog',
    name: {
      mr: 'दाट धुके व अंधुकता', // NEEDS NATIVE REVIEW
      hi: 'घना कोहरा', // NEEDS NATIVE REVIEW
      en: 'Dense Fog',
    },
    icon: 'fog',
    roles: {
      mr: [
        {
          adv: 'रस्त्यावर धुके असल्यास वाहने हळू चालवा. दिवे लावून चाला आणि सावध रहा.', // NEEDS NATIVE REVIEW
          c1: 'रस्त्यावरून जाताना पिवळे किंवा मंद दिवे वापरा', // NEEDS NATIVE REVIEW
          c2: 'रेल्वे ट्रॅक किंवा महामार्गावरून चालणे टाळा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'धुक्यात सावधगिरी', 'दृष्टीमान कमी असल्याने वाहने सांभाळून चालवा'], // NEEDS NATIVE REVIEW
            ['shield', 'चमकणारे कपडे वापरा', 'धुक्यात इतरांना दिसण्यासाठी उजळ कपडे घाला'], // NEEDS NATIVE REVIEW
            ['clock', 'प्रवासाची वेळ पुढे ढकला', 'धुके निवळल्यानंतरच लांबचा प्रवास करा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'धुक्यामुळे पिकांवर बुरशीजन्य रोग वाढू शकतात. पिकांची नियमित पाहणी करा.', // NEEDS NATIVE REVIEW
          c1: 'धुके ओसरल्यानंतरच औषध फवारणी करा', // NEEDS NATIVE REVIEW
          c2: 'द्राक्ष, कांदा व हरभऱ्याची बुरशीपासून तपासणी करा', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'पिकांची पाहणी करा', 'सततच्या धुक्यामुळे करपा किंवा तांबेरा रोग येऊ शकतो'], // NEEDS NATIVE REVIEW
            ['drop', 'धुक्यात फवारणी नको', 'पानांवर दव असताना फवारलेले औषध वाहून जाते'], // NEEDS NATIVE REVIEW
            ['clock', 'धुके विरळ झाल्यावर कामे करा', 'सूर्यप्रकाश आल्यावर शेतातील कामे सुरू करा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'धुक्यात लहान मुलांना व वृद्धांना सकाळी बाहेर पाठवू नका. मास्क किंवा रुमाल वापरा.', // NEEDS NATIVE REVIEW
          c1: 'दमा किंवा श्वसनाचा त्रास असणाऱ्यांनी घरातच रहावे', // NEEDS NATIVE REVIEW
          c2: 'सकाळी फिरणे धुके निवळल्यावरच करावे', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घरातच थांबा', 'धुक्यातील प्रदूषण आणि गारठ्यामुळे खोकल्याचा त्रास होतो'], // NEEDS NATIVE REVIEW
            ['shield', 'तोंड व नाक झाका', 'बाहेर पडताना सुती रुमाल किंवा मास्क वापरा'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य सतर्कता', 'दम्याचा त्रास वाढल्यास तात्काळ औषधे घ्या किंवा डॉक्टरांना दाखवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना पहाटे धुक्यात चरण्यासाठी बाहेर काढू नका. गोठ्यात उबदार वातावरण ठेवा.', // NEEDS NATIVE REVIEW
          c1: 'धुके निवळल्यावरच जनावरांना चरायला न्या', // NEEDS NATIVE REVIEW
          c2: 'धुक्यामुळे जनावरांना न्यूमोनिया होणार नाही याची दक्षता घ्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'उशिरा चरण्यास सोडा', 'धुक्यात जनावरे हरवण्याचा किंवा रस्ता भरकटण्याचा धोका असतो'], // NEEDS NATIVE REVIEW
            ['home', 'गोठा कोरडा ठेवा', 'धुक्यातील दमटपणामुळे गोठ्यात रोगराई वाढू देऊ नका'], // NEEDS NATIVE REVIEW
            ['drop', 'स्वच्छ पाणी द्या', 'थंड धुक्यात साठलेले पाणी जनावरांना देऊ नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "धुक्यामुळे समोरचे दिसणे कमी होते. वाहनाचे दिवे लो-बीमवर ठेवा आणि वेग कमी ठेवा!",
          c1: "धुक्यात वाहनाचे दिवे 'लो बीम'वर ठेवा, हाय बीममुळे प्रकाश परावर्तित होतो",
          c2: "रस्त्याच्या डाव्या बाजूच्या पांढऱ्या पट्ट्यावर लक्ष ठेवून वाहन चालवा",
          g: [
            ['warn', "लो-बीम हेडलाइट्स वापरा", "धुक्यात हाय-बीममुळे समोर अंधार दिसतो"],
            ['clock', "वेग कमी करा आणि अंतर ठेवा", "पुढील वाहनापासून सुरक्षित अंतर दुप्पट ठेवा"],
            ['shield', "ओव्हरटेकिंग टाळा", "रस्ता स्पष्ट दिसेपर्यंत धोकादायक ओव्हरटेक करू नका"],
          ],
        },
        {
          adv: "धुक्यामुळे पाण्यात इतर बोटी व खडक दिसत नाहीत. हॉर्न व नेव्हिगेशन दिवे चालू ठेवा!",
          c1: "पाण्यात दिशाभूल होणे व इतर बोटींशी धडक होण्याचा मोठा धोका असतो",
          c2: "बोटीचा वेग अत्यंत कमी करा आणि वेळोवेळी हॉर्न वाजवा",
          g: [
            ['warn', "नेव्हिगेशन दिवे चालू ठेवा", "इतर बोटींना तुमची जागा कळावी म्हणून दिवे लावा"],
            ['phone', "हॉर्न व कंपास वापरा", "धुक्यात दिशा ओळखण्यासाठी कंपास किंवा जीपीएस वापरा"],
            ['clock', "किनाऱ्याजवळ रहा", "दाट धुक्यात खोल समुद्रात जाणे टाळा"],
          ],
        }
      ],
      hi: [
        {
          adv: 'घने कोहरे में वाहन धीमी गति से चलाएँ। लाइट जलाएँ और सतर्क रहें।', // NEEDS NATIVE REVIEW
          c1: 'सड़क पर लो-बीम लाइट का प्रयोग करें', // NEEDS NATIVE REVIEW
          c2: 'राजमार्गों और रेल पटरियों पर पैदल चलने से बचें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'वाहन धीमे चलाएँ', 'दृश्यता बहुत कम होने से दुर्घटना का डर रहता है'], // NEEDS NATIVE REVIEW
            ['shield', 'चमकदार कपड़े पहनें', 'दूसरों को दिखने के लिए हल्के या चमकीले कपड़े पहनें'], // NEEDS NATIVE REVIEW
            ['clock', 'यात्रा टालें', 'कोहरा छँटने तक लंबी यात्रा शुरू न करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'कोहरे से फ़सलों में फफूंद/झुलसा रोग का ख़तरा बढ़ता है। फ़सलों का निरीक्षण करें।', // NEEDS NATIVE REVIEW
          c1: 'कोहरा और ओस सूखने के बाद ही छिड़काव करें', // NEEDS NATIVE REVIEW
          c2: 'चना, सरसों और सब्ज़ियों में रोग की जाँच करें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'फ़सल निरीक्षण', 'नमी से फफूंद जनित रोगों की संभावना बढ़ जाती है'], // NEEDS NATIVE REVIEW
            ['drop', 'ओस में छिड़काव न करें', 'दवा बहने से असर कम हो जाता है'], // NEEDS NATIVE REVIEW
            ['clock', 'धूप निकलने पर काम', 'मौसम साफ़ होने के बाद ही खेत पर काम करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'बुज़ुर्गों और बच्चों को सुबह कोहरे में बाहर न जाने दें। मास्क या रुमाल लगाएँ।', // NEEDS NATIVE REVIEW
          c1: 'अस्थमा व साँस के मरीज़ घर में ही रहें', // NEEDS NATIVE REVIEW
          c2: 'सुबह की सैर कोहरा हटने के बाद करें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घर में सुरक्षित रहें', 'ठंडे कोहरे से साँस की तकलीफ़ बढ़ सकती है'], // NEEDS NATIVE REVIEW
            ['shield', 'मुँह-नाक ढँकें', 'बाहर निकलने पर रुमाल बाँधें'], // NEEDS NATIVE REVIEW
            ['phone', 'दवा पास रखें', 'साँस फूलने पर तुरंत डॉक्टर से संपर्क करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'सुबह कोहरे में पशुओं को बाहर न छोड़ें। बाड़े में रोशनी और सूखापन रखें।', // NEEDS NATIVE REVIEW
          c1: 'कोहरा छँटने के बाद ही चराने ले जाएँ', // NEEDS NATIVE REVIEW
          c2: 'पशुओं को सर्दी-जुकाम से बचाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'देर से चराने जाएँ', 'कोहरे में पशुओं के भटकने का डर रहता है'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े में सूखापन', 'नमी से पशुओं में बीमारियाँ फैलने से रोकें'], // NEEDS NATIVE REVIEW
            ['drop', 'ताज़ा पानी दें', 'पशुओं को साफ़ पानी ही पिलाएँ'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "घने कोहरे में दृश्यता कम हो जाती है। वाहन की लाइट लो-बीम पर रखें और गति धीमी रखें!",
          c1: "कोहरे में लो-बीम लाइट का उपयोग करें, हाई-बीम से रोशनी वापस टकराती है",
          c2: "सड़क की बाईं पट्टी (सफ़ेद लाइन) को देखकर धीमी गति में चलें",
          g: [
            ['warn', "लो-बीम हेडलाइट", "हाई-बीम के बजाय लो-बीम और फॉग लैंप इस्तेमाल करें"],
            ['clock', "दूरी और धीमी गति", "आगे वाले वाहन से सामान्य से अधिक दूरी रखें"],
            ['shield', "ओवरटेकिंग न करें", "आगे का रास्ता पूरी तरह साफ़ दिखने तक ओवरटेक न करें"],
          ],
        },
        {
          adv: "कोहरे में दूसरी नावें और चट्टानें दिखाई नहीं देतीं। हॉर्न और नेविगेशन लाइट चालू रखें!",
          c1: "पानी में रास्ता भटकने और टक्कर का भारी जोखिम रहता है",
          c2: "नाव की गति धीमी करें और समय-समय पर हॉर्न बजाएँ",
          g: [
            ['warn', "नेविगेशन लाइट चालू रखें", "नाव के आगे और पीछे की लाइट जलाए रखें"],
            ['phone', "हॉर्न और कंपास", "दिशा जानने के लिए कंपास या जीपीएस पर भरोसा करें"],
            ['clock', "किनारे के पास रहें", "घने कोहरे में गहरे पानी में न जाएँ"],
          ],
        }
      ],
      en: [
        {
          adv: 'Extreme low visibility on roads. Drive slowly with low-beam fog lights. Avoid highway walking.',
          c1: 'Drive at safe crawl speeds with hazard lights when stalled',
          c2: 'Wear reflective jackets or bright clothes along rural roads',
          g: [
            ['home', 'Road safety', 'Visibility under 200m creates severe head-on collision risk'],
            ['shield', 'High-visibility clothing', 'Ensure tractors and bullock carts have rear reflector tape'],
            ['clock', 'Delay road journeys', 'Wait for mid-morning solar clearing before highway driving'],
          ],
        },
        {
          adv: 'Prolonged fog elevates fungal spore germination. Delay crop sprays until dew evaporates.',
          c1: 'Inspect gram, onion, and pulses for blight or downy mildew',
          c2: 'Never spray foliar chemicals on wet foggy leaves',
          g: [
            ['shield', 'Scout fungal outbreaks', 'High humidity trapped in canopy promotes anthracnose and blight'],
            ['drop', 'Delay spray operations', 'Chemical run-off occurs if sprayed on heavy dew'],
            ['clock', 'Wait for canopy drying', 'Commence field operations only once sunshine clears foliage dew'],
          ],
        },
        {
          adv: 'Keep elderly and respiratory patients indoors during dense smoggy fog. Use face coverings.',
          c1: 'Patients with asthma should remain indoors',
          c2: 'Postpone morning walks until fog disperses',
          g: [
            ['home', 'Indoor protection', 'Cold fog exacerbates bronchial constriction and cough'],
            ['shield', 'Cover mouth and nose', 'Use warm scarf or clean cotton mask outdoors'],
            ['phone', 'Keep inhalers ready', 'Contact PHC doctor or dial 108 if respiratory distress worsens'],
          ],
        },
        {
          adv: 'Do not graze livestock in heavy fog. Maintain dry ventilated conditions inside shed.',
          c1: 'Graze animals only after fog lifts completely',
          c2: 'Protect cattle calves from foggy dampness',
          g: [
            ['cow', 'Delayed grazing', 'Prevent cattle straying onto roadside collision paths in low visibility'],
            ['home', 'Ventilated dry shed', 'Damp enclosed sheds foster pneumonia organisms'],
            ['drop', 'Clean water', 'Supply fresh clean groundwater to animals'],
          ],
        },
        {
          adv: "Severely restricted visibility during morning fog. Drive with low-beams and reduced speed!",
          c1: "Keep vehicle headlights on low-beam; high-beams create a blinding glare wall",
          c2: "Track the roadside lane markings and increase vehicle following distance",
          g: [
            ['warn', "Low-beam headlights", "Use fog lamps and low beams for pavement illumination"],
            ['clock', "Double braking distance", "Drop speed to match stopping distance to visible range"],
            ['shield', "Zero overtaking", "Never overtake blind in morning rural fog"],
          ],
        },
        {
          adv: "Impaired visibility creates severe collision hazards. Sound horn and activate navigation lights!",
          c1: "Critical danger of collision with other craft or coastal rocks in fog",
          c2: "Reduce speed to dead slow and sound periodic fog horn blasts",
          g: [
            ['warn', "Navigation lights on", "Ensure port, starboard, and masthead lights are illuminated"],
            ['phone', "Compass / GPS guidance", "Monitor GPS and keep constant lookout with ear and eye"],
            ['clock', "Remain near harbour", "Avoid setting out into shipping channels during zero visibility"],
          ],
        }
      ],
    },
  },

  strong_wind: {
    hazardId: 'strong_wind',
    name: {
      mr: 'वादळी वारा व धूळ', // NEEDS NATIVE REVIEW
      hi: 'तेज़ हवा व आंधी', // NEEDS NATIVE REVIEW
      en: 'Strong Wind & Gusts',
    },
    icon: 'wind',
    roles: {
      mr: [
        {
          adv: 'कच्च्या पत्र्यांच्या शेडखाली किंवा जुन्या झाडांखाली थांबू नका. उडणाऱ्या वस्तूंपासून सावध रहा.', // NEEDS NATIVE REVIEW
          c1: 'डोळ्यांचे धुळीपासून रक्षण करा, गॉगल किंवा रुमाल वापरा', // NEEDS NATIVE REVIEW
          c2: 'विजेच्या तारा आणि खांबांपासून लांब रहा', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्क्या घरात थांबा', 'वादळी वाऱ्यामुळे पत्रे उडण्याचा मोठा धोका असतो'], // NEEDS NATIVE REVIEW
            ['shield', 'डोळे व चेहरा झाका', 'धूळ उडत असल्यास रुमाल बांधा'], // NEEDS NATIVE REVIEW
            ['phone', 'तारा तुटल्यास सावधान', 'विजेच्या तारा तुटल्यास महावितरणला कळवा, हात लावू नका'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'केळी, पपई आणि उसाच्या पिकाला आधार द्या. फवारणी तात्काळ थांबवा.', // NEEDS NATIVE REVIEW
          c1: 'उंच पिकांना व फळझाडांना बांबूचा किंवा दोरीचा आधार द्या', // NEEDS NATIVE REVIEW
          c2: 'वाऱ्यात कीटकनाशक फवारणी अजिबात करू नका', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'पिकांना आधार द्या', 'वादळात झाडे उन्मळून पडू नयेत म्हणून बांबूचा आधार द्या'], // NEEDS NATIVE REVIEW
            ['drop', 'फवारणी थांबवा', 'वाऱ्यामुळे औषध इतरत्र उडून विषबाधा किंवा नुकसान होऊ शकते'], // NEEDS NATIVE REVIEW
            ['home', 'ताडपत्री घट्ट बांधा', 'धान्य साठवण व शेडवरील ताडपत्री दोरीने घट्ट बांधून ठेवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'घरावरील पत्रे, पाण्याच्या टाक्या व सोलर प्लेट घट्ट बांधून ठेवा. खिडक्या बंद करा.', // NEEDS NATIVE REVIEW
          c1: 'गच्चीवरील हलक्या वस्तू घरात आणा', // NEEDS NATIVE REVIEW
          c2: 'घराच्या खिडक्या-दारे व्यवस्थित लावून घ्या', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'घराची तपासणी करा', 'उडू शकणारे पत्रे किंवा वस्तू घट्ट बांधा'], // NEEDS NATIVE REVIEW
            ['shield', 'धूळ घरात येऊ देऊ नका', 'खिडक्यांचे पडदे लावा व धूळ रोखा'], // NEEDS NATIVE REVIEW
            ['phone', 'मदत संपर्क', 'झाड पडल्यास किंवा नुकसान झाल्यास आपत्ती नियंत्रण कक्षाशी संपर्क साधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांना पत्र्याच्या शेडखाली न बांधता सुरक्षित पक्क्या जागेत ठेवा. चारा झाकून ठेवा.', // NEEDS NATIVE REVIEW
          c1: 'गोठ्यावरील पत्रे मजबूत करा किंवा जनावरे सुरक्षित ठिकाणी हलवा', // NEEDS NATIVE REVIEW
          c2: 'सुकलेला चारा वाऱ्यात उडून जाणार नाही याची काळजी घ्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सुरक्षित निवारा', 'वादळात पत्रे उडून जनावरांना गंभीर इजा होण्याचा धोका असतो'], // NEEDS NATIVE REVIEW
            ['home', 'चारा झाकून ठेवा', 'वाळलेला कडबा किंवा भुसा ताडपत्रीने बांधून ठेवा'], // NEEDS NATIVE REVIEW
            ['drop', 'पाण्याची नाँद स्वच्छ ठेवा', 'धुळीमुळे पाणी घाण झाल्यास ते बदलून ताजे पाणी द्या'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "वादळी वाऱ्यात दुचाकीचे संतुलन बिघडू शकते. मोकळ्या रस्त्यांवर वाहनाचा वेग कमी ठेवा!",
          c1: "मोकळ्या माळावर व पुलांवर वाहनाचा वेग कमी ठेवा",
          c2: "मोठी झाडे, होर्डिंग आणि जुन्या पत्र्यांच्या शेडजवळ थांबू नका",
          g: [
            ['warn', "दुचाकीचे संतुलन सांभाळा", "वाऱ्याच्या जोरदार झोक्यांमुळे (गस्ट्स) वाहन डळमळू शकते"],
            ['home', "झाडांखाली उभे राहू नका", "फांद्या तुटण्याचा धोका असतो, सुरक्षित अंतरावर थांबा"],
            ['clock', "वादळ शमेपर्यंत थांबा", "धोकादायक वारे वाहत असल्यास प्रवास थोडा पुढे ढकला"],
          ],
        },
        {
          adv: "वादळी वाऱ्यामुळे उसळणाऱ्या लाटा बोट उलटवू शकतात. तात्काळ मासेमारी थांबवून सुरक्षित बंदरात या!",
          c1: "वाऱ्याचा वेग ४५+ किमी/तास असल्यास समुद्रात जाऊ नका (मच्छीमार इशारा)",
          c2: "बोटीवरील जाळी व सुटे साहित्य घट्ट बांधून ठेवा",
          g: [
            ['warn', "तात्काळ बंदराकडे परता", "खवळलेल्या समुद्रात लहान बोटी उलटण्याचा धोका असतो"],
            ['shield', "लाईफ जॅकेट वापरा", "बोटीवरील सर्वांनी अनिवार्यपणे लाईफ जॅकेट घाला"],
            ['home', "बोटी सुरक्षित नांगरा", "बंदर किंवा खाडीत बोटी सुरक्षित बांधून ठेवा"],
          ],
        }
      ],
      hi: [
        {
          adv: 'टीन शेड या पुराने पेड़ों के नीचे न खड़े हों। उड़ती हुई चीज़ों से सावधान रहें।', // NEEDS NATIVE REVIEW
          c1: 'आँखों को धूल से बचाएँ, चश्मा या रुमाल लगाएँ', // NEEDS NATIVE REVIEW
          c2: 'बिजली के तारों और खंभों से दूर रहें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'पक्के मकान में रहें', 'तेज़ आंधी में टीन की चद्दरें उड़ने का भारी ख़तरा रहता है'], // NEEDS NATIVE REVIEW
            ['shield', 'चेहरा ढँकें', 'धूल भरी आंधी में मुँह और आँखें ढँकें'], // NEEDS NATIVE REVIEW
            ['phone', 'तार टूटने पर सूचना', 'बिजली के टूटे तारों को न छुएँ, विभाग को सूचित करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'केले, पपीते और गन्ने की फ़सल को सहारा दें। दवा छिड़काव तुरंत बंद करें।', // NEEDS NATIVE REVIEW
          c1: 'ऊँचे पौधों को बाँस या रस्सी का सहारा दें', // NEEDS NATIVE REVIEW
          c2: 'तेज़ हवा में कीटनाशक छिड़काव बिल्कुल न करें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'फ़सल को सहारा दें', 'आंधी में पौधे गिरने से भारी नुक़सान होता है'], // NEEDS NATIVE REVIEW
            ['drop', 'छिड़काव रोकें', 'हवा में दवा उड़कर आँखों या दूसरों पर गिर सकती है'], // NEEDS NATIVE REVIEW
            ['home', 'तिरपाल बाँधें', 'अनाज व भूसे के ढेर को रस्सी से कसकर ढँकें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'छत पर रखी टंकियाँ, टीन व सोलर प्लेट मज़बूती से बाँधें। खिड़कियाँ बंद रखें।', // NEEDS NATIVE REVIEW
          c1: 'छत पर रखा हल्का सामान अंदर ले आएँ', // NEEDS NATIVE REVIEW
          c2: 'घर के खिड़की-दरवाजे कसकर बंद करें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'छत सुरक्षित करें', 'उड़ने वाले सामान को हटाएँ या बाँधें'], // NEEDS NATIVE REVIEW
            ['shield', 'धूल से बचाव', 'खिड़कियों के परदे लगाकर धूल रोकें'], // NEEDS NATIVE REVIEW
            ['phone', 'आपात सहायता', 'पेड़ गिरने या नुक़सान होने पर 108 या प्रशासन से संपर्क करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं को टीन शेड के नीचे न बाँधें। सुरक्षित जगह रखें और चारा ढँकें।', // NEEDS NATIVE REVIEW
          c1: 'बाड़े की छत मज़बूत करें या पशुओं को हटाएँ', // NEEDS NATIVE REVIEW
          c2: 'सूखे चारे को उड़ने से बचाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सुरक्षित स्थान', 'टीन उड़ने से पशुओं को जानलेवा चोट लग सकती है'], // NEEDS NATIVE REVIEW
            ['home', 'चारा ढँकें', 'भूसे के ढेर पर तिरपाल बाँधें'], // NEEDS NATIVE REVIEW
            ['drop', 'साफ़ पानी दें', 'धूल से गंदा हुआ पानी बदलकर ताज़ा पानी भरें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "तेज़ हवाओं में दुपहिया का संतुलन बिगड़ सकता है। खुले रास्तों पर गति धीमी रखें!",
          c1: "खुले मैदान और पुलों पर गाड़ी की रफ़्तार कम रखें",
          c2: "बड़े पेड़ों, होर्डिंग्स और टीन की छतों के नीचे न खड़े हों",
          g: [
            ['warn', "संतुलन बनाए रखें", "हवा के तेज़ झोंकों से वाहन डगमगा सकता है"],
            ['home', "पेड़ों और होर्डिंग्स से दूर", "शाखाएँ टूटने या टीन उड़ने का जोखिम रहता है"],
            ['clock', "हवा थमने का इंतज़ार", "अत्यधिक आंधी होने पर कुछ समय रुक जाएँ"],
          ],
        },
        {
          adv: "तेज़ हवाओं से उठने वाली लहरें नाव को पलट सकती हैं। तुरंत मछली पकड़ना रोकें और बंदरगाह लौटें!",
          c1: "हवा की गति 45+ किमी/घंटा होने पर समुद्र में न जाएँ (मछुआरा चेतावनी)",
          c2: "नाव पर सामान और जाल मज़बूती से बाँधें",
          g: [
            ['warn', "तुरंत बंदरगाह लौटें", "उछलती लहरों में छोटी नावों के पलटने का गंभीर ख़तरा"],
            ['shield', "लाइफ़ जैकेट पहनें", "सभी सदस्यों के लिए लाइफ़ जैकेट अनिवार्य"],
            ['home', "नाव को सुरक्षित बाँधें", "खाड़ी या बंदरगाह में नाव को अच्छी तरह लंगर डालें"],
          ],
        }
      ],
      en: [
        {
          adv: 'Avoid staying under loose tin sheds or aged trees. Watch out for flying debris.',
          c1: 'Protect eyes and airways from airborne dust and grit',
          c2: 'Stay clear of snapping power lines and tilted poles',
          g: [
            ['home', 'Seek pucca enclosure', 'High gusts tear unbolted tin roofing sheets; stay indoors'],
            ['shield', 'Protect face and eyes', 'Wrap cotton scarf around face against flying grit'],
            ['phone', 'Report snapped cables', 'Do not approach dangling lines; notify electricity distribution office'],
          ],
        },
        {
          adv: 'Stake horticultural crops (banana, papaya). Immediately halt foliar spraying.',
          c1: 'Prop up tall crops with bamboo poles and guide ropes',
          c2: 'Never spray pesticides during wind squalls',
          g: [
            ['shield', 'Crop propping', 'Provide mechanical props to prevent fruit trees lodging'],
            ['drop', 'Halt chemical sprays', 'Wind drift causes severe wastage and chemical drift poisoning'],
            ['home', 'Anchor farm tarpaulins', 'Fasten ropes across grain and hay protection sheets'],
          ],
        },
        {
          adv: 'Fasten loose rooftop sheets, water tanks, and solar panels. Shut all windows.',
          c1: 'Bring lightweight terrace furniture and tools indoors',
          c2: 'Secure latches on outer windows and doors',
          g: [
            ['home', 'Secure rooftop assets', 'Anchor solar frames and water storage tank covers'],
            ['shield', 'Block dust entry', 'Draw curtains and seal window sills against fine dust'],
            ['phone', 'Emergency helpline', 'Keep disaster cell contact ready in case of tree fall'],
          ],
        },
        {
          adv: 'Untie livestock from tin sheds liable to lift. Cover fodder stocks with secure sheets.',
          c1: 'Move livestock out from under rusted or weak tin roofing',
          c2: 'Prevent valuable chopped dry fodder from blowing away',
          g: [
            ['cow', 'Safe livestock shelter', 'Flying tin sheets cause severe lacerations to cattle'],
            ['home', 'Tie down fodder', 'Fasten tarpaulins over haystacks using heavy stones and ropes'],
            ['drop', 'Replenish drinking water', 'Clean troughs filled with windblown dust and refill fresh water'],
          ],
        },
        {
          adv: "Gale-force crosswinds compromise two-wheeler stability. Reduce speed and steer clear of trees!",
          c1: "Reduce speed across open causeways, bridges, and open farmlands",
          c2: "Do not stop under large banyan trees, billboards, or loose tin sheds",
          g: [
            ['warn', "Handle crosswind gusts", "Firm two-handed grip on handlebars; anticipate sudden crosswinds"],
            ['home', "Avoid tree lines", "Falling branches and snapped telephone wires pose risks"],
            ['clock', "Pause if necessary", "Halt transit if gusts exceed 60 km/h until squall passes"],
          ],
        },
        {
          adv: "Squally gale winds create dangerous choppy waves. Suspend fishing and seek safe harbour at once!",
          c1: "IMD Squally Wind Warning (>=45 km/h): Small fishing crafts must not venture out",
          c2: "Lash down all loose gear, fuel cans, and nets securely on deck",
          g: [
            ['warn', "Return to port immediately", "Severe capsize risk for traditional and mechanized boats"],
            ['shield', "Don life jackets", "Every crew member must wear approved life jacket"],
            ['home', "Double-moor boat", "Anchor in sheltered creek and secure mooring lines"],
          ],
        }
      ],
    },
  },

  dry_spell: {
    hazardId: 'dry_spell',
    name: {
      mr: 'पावसाचा खंड / दुष्काळ स्थिती', // NEEDS NATIVE REVIEW
      hi: 'वर्षा विराम / सूखा स्थिति', // NEEDS NATIVE REVIEW
      en: 'Dry Spell Advisory',
    },
    icon: 'drought',
    roles: {
      mr: [
        {
          adv: 'पावसाचा प्रदीर्घ खंड पडला आहे. पाण्याची बचत करा आणि उन्हात काळजी घ्या.', // NEEDS NATIVE REVIEW
          c1: 'पिण्याचे पाणी काटकसरीने वापरा', // NEEDS NATIVE REVIEW
          c2: 'उन्हात काम करताना भरपूर पाणी प्या', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पाण्याची बचत', 'घरगुती पाण्याचा अपव्यय टाळा'], // NEEDS NATIVE REVIEW
            ['home', 'उन्हापासून बचाव', 'कडक उन्हात डोके झाकून काम करा'], // NEEDS NATIVE REVIEW
            ['phone', 'आरोग्य दक्षता', 'उष्णतेने थकवा जाणवल्यास विश्रांती घ्या'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पिकांमध्ये ओलावा टिकवण्यासाठी आच्छादन करा. ठिबक किंवा तुषार सिंचनाने पाणी द्या.', // NEEDS NATIVE REVIEW
          c1: 'शेतात आंतरमशागत करून जमिनीतील भेगा बुजवा', // NEEDS NATIVE REVIEW
          c2: 'पिकांना जीवदान देण्यासाठी उपलब्ध पाण्याचे सूक्ष्म नियोजन करा', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'आच्छादन (मल्चिंग) करा', 'गवत किंवा पालापाचोळा टाकून जमिनीतील ओलावा टिकवा'], // NEEDS NATIVE REVIEW
            ['drop', 'सूक्ष्म सिंचनाचा वापर', 'ठिबक किंवा तुषार सिंचनाने फक्त मुळांशी पाणी द्या'], // NEEDS NATIVE REVIEW
            ['clock', 'रासायनिक खते टाळा', 'ओलावा नसल्यास युरिया किंवा खते देऊ नका; पिके जळू शकतात'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पिण्याच्या पाण्याची साठवणूक काटेकोर करा. पाण्याचा पुनर्वापर करा.', // NEEDS NATIVE REVIEW
          c1: 'घरातील पाण्याचा वापर जपून करा', // NEEDS NATIVE REVIEW
          c2: 'सांडपाणी परसबागेतील झाडांना द्या', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पाण्याचे नियोजन', 'पिण्याचे पाणी झाकून व स्वच्छ ठेवा'], // NEEDS NATIVE REVIEW
            ['home', 'पाणी बचत', 'कपडे व भांडी धुताना पाण्याचा पुनर्वापर करा'], // NEEDS NATIVE REVIEW
            ['phone', 'टंचाई निवारण', 'गावात पाण्याची टंचाई असल्यास ग्रामपंचायतीशी संपर्क साधा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांसाठी चारा व पाण्याचे नियोजन करा. हिरवा व कोरडा चारा मिसळून द्या.', // NEEDS NATIVE REVIEW
          c1: 'जनावरांना पुरेसे स्वच्छ पिण्याचे पाणी उपलब्ध ठेवा', // NEEDS NATIVE REVIEW
          c2: 'चाऱ्याची नासाडी टाळण्यासाठी कुट्टी करून चारा द्या', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पाणी नियोजन', 'जनावरांना डिहायड्रेशन होऊ नये म्हणून नियमित पाणी द्या'], // NEEDS NATIVE REVIEW
            ['cow', 'चारा कुट्टी यंत्र वापरा', 'कडब्याची कुट्टी केल्यास चाऱ्याची बचत होते'], // NEEDS NATIVE REVIEW
            ['home', 'छायादार निवारा', 'उन्हात जनावरांचा ताण कमी करण्यासाठी सावलीत ठेवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "कोरड्या व उष्ण वातावरणात धूळ जास्त उडते. प्रवासात डोळ्यांचे व त्वचेचे रक्षण करा!",
          c1: "कच्च्या ग्रामीण रस्त्यांवर डोळ्यांवर चष्मा किंवा हेल्मेट व्हायझर वापरा",
          c2: "प्रवासात पाण्याची बाटली सोबत ठेवा",
          g: [
            ['shield', "धूळ आणि उन्हापासून रक्षण", "डोळ्यांत धूळ जाऊ नये म्हणून हेल्मेट काच वापरा"],
            ['drop', "पाणी भरपूर प्या", "कोरड्या हवामानात डिहायड्रेशन पटकन होते"],
            ['clock', "नियमित प्रवास चालू ठेवा", "हवामान प्रवासास अनुकूल आहे, खबरदारी बाळगा"],
          ],
        },
        {
          adv: "हवामान कोरडे आहे. मासेमारी नियमित चालू ठेवू शकता, पण पाणी आणि ताक सोबत ठेवा!",
          c1: "खुल्या पाण्यात उन्हाचा चटका जास्त बसतो, डोके झाका",
          c2: "बोटीवर पिण्याच्या पाण्याचा पुरेसा साठा ठेवा",
          g: [
            ['shield', "उन्हापासून रक्षण", "सुती टोपी व लांब बाह्यांचे कपडे वापरा"],
            ['drop', "पाणी भरपूर प्या", "समुद्रावर असताना भरपूर ताजे पाणी प्या"],
            ['clock', "नियमित मासेमारी", "हवामान समुद्रासाठी सामान्य आहे"],
          ],
        }
      ],
      hi: [
        {
          adv: 'बारिश में लंबा विराम आ गया है। पानी बचाएँ और धूप में काम करते समय पानी पिएँ।', // NEEDS NATIVE REVIEW
          c1: 'पीने का पानी समझदारी से इस्तेमाल करें', // NEEDS NATIVE REVIEW
          c2: 'धूप में सिर ढँकें और पानी पीते रहें', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पानी की बचत', 'पानी का फिजूलखर्च न करें'], // NEEDS NATIVE REVIEW
            ['home', 'धूप से बचाव', 'सिर पर गमछा बाँधकर काम करें'], // NEEDS NATIVE REVIEW
            ['phone', 'स्वास्थ्य का ध्यान', 'कमज़ोरी महसूस होने पर आराम करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'फ़सलों में नमी बचाने के लिए मल्चिंग करें। ड्रिप या फव्वारे से ही सिंचाई करें।', // NEEDS NATIVE REVIEW
          c1: 'निराई-गुड़ाई करके खेत की दरारें बंद करें', // NEEDS NATIVE REVIEW
          c2: 'उपलब्ध पानी का सूक्ष्म नियोजन करें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'मल्चिंग अपनाएँ', 'घास या पराली बिछाकर ज़मीन की नमी उड़ने से रोकें'], // NEEDS NATIVE REVIEW
            ['drop', 'ड्रिप सिंचाई', 'केवल जड़ों में पानी दें ताकि पानी व्यर्थ न हो'], // NEEDS NATIVE REVIEW
            ['clock', 'रासायनिक खाद न दें', 'नमी की कमी में यूरिया न डालें; पौधे सूख सकते हैं'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पीने का पानी सुरक्षित रखें। पानी का दोबारा उपयोग करने का प्रयास करें।', // NEEDS NATIVE REVIEW
          c1: 'घर में पानी किफायत से खर्च करें', // NEEDS NATIVE REVIEW
          c2: 'रसोई का पानी पेड़-पौधों में डालें', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पानी की बचत', 'पीने के पानी को ढककर साफ़ रखें'], // NEEDS NATIVE REVIEW
            ['home', 'किफायती उपयोग', 'बर्तन-कपड़ों का पानी बर्बाद न करें'], // NEEDS NATIVE REVIEW
            ['phone', 'जल संकट सहायता', 'पानी की किल्लत होने पर स्थानीय प्रशासन से संपर्क करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं के लिए चारे और पानी का प्रबंधन करें। चारे की कुट्टी बनाकर खिलाएँ।', // NEEDS NATIVE REVIEW
          c1: 'पशुओं को पर्याप्त साफ़ पानी पिलाएँ', // NEEDS NATIVE REVIEW
          c2: 'चारे की बर्बादी रोकने के लिए काटकर खिलाएँ', // NEEDS NATIVE REVIEW
          g: [
            ['drop', 'पानी की व्यवस्था', 'पशुओं को दिन में कई बार पानी दें'], // NEEDS NATIVE REVIEW
            ['cow', 'कुट्टी काटकर खिलाएँ', 'चारा काटकर खिलाने से 30% बचत होती है'], // NEEDS NATIVE REVIEW
            ['home', 'छाया में रखें', 'गर्मी और तनाव से बचाने के लिए बाड़े में रखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "शुष्क और गर्म मौसम में धूल अधिक उड़ती है। सफ़र में आँखों और त्वचा की सुरक्षा करें!",
          c1: "कच्चे रास्तों पर चश्मा या हेलमेट वाइज़र नीचे रखें",
          c2: "सफ़र में पीने का पानी साथ रखें",
          g: [
            ['shield', "धूल से बचाव", "आँखों में धूल जाने से रोकने के लिए सुरक्षात्मक चश्मा पहनें"],
            ['drop', "पानी साथ रखें", "शुष्क मौसम में गला सूखने से बचने के लिए पानी पिएँ"],
            ['clock', "सामान्य सफ़र", "मौसम यात्रा के अनुकूल है, सामान्य सतर्कता रखें"],
          ],
        },
        {
          adv: "मौसम शुष्क है। मछली पकड़ना सामान्य रूप से जारी रख सकते हैं, पर पीने का पानी साथ रखें!",
          c1: "खुले पानी में धूप का असर तेज़ होता है, सिर ढकें",
          c2: "नाव पर पीने का पर्याप्त पानी रखें",
          g: [
            ['shield', "धूप से बचाव", "सिर पर गमछा बाँधें या टोपी पहनें"],
            ['drop', "पानी साथ रखें", "समुद्र में रहते हुए पर्याप्त मीठा पानी पिएँ"],
            ['clock', "नियमित कार्य", "मौसम सामान्य है"],
          ],
        }
      ],
      en: [
        {
          adv: 'Extended dry break during Kharif. Conserve water and stay hydrated under blazing sun.',
          c1: 'Conserve household water strictly',
          c2: 'Cover head and drink adequate water during outdoor work',
          g: [
            ['drop', 'Conserve water', 'Prevent domestic water wastage'],
            ['home', 'Sun protection', 'Cover head with cotton scarf during prolonged farm labor'],
            ['phone', 'Fatigue care', 'Rest in shade if weakness or cramps occur'],
          ],
        },
        {
          adv: 'Retain soil moisture using biomass mulch. Prioritize micro-irrigation systems.',
          c1: 'Perform shallow interculture to create dust mulch and seal cracks',
          c2: 'Apply life-saving irrigation exclusively via drip or sprinkler',
          g: [
            ['shield', 'Apply mulch', 'Spread straw or dry crop residue to curtail evaporation'],
            ['drop', 'Micro-irrigation only', 'Target root zone irrigation to conserve precious farm pond water'],
            ['clock', 'Avoid chemical topdressing', 'Do not apply urea in dry soil to prevent leaf scorch'],
          ],
        },
        {
          adv: 'Safeguard potable drinking water reserves. Reuse greywater for home garden.',
          c1: 'Ration domestic water usage strictly',
          c2: 'Direct wash-water to kitchen garden beds',
          g: [
            ['drop', 'Safe water storage', 'Keep drinking water covered in clean vessels'],
            ['home', 'Water recycling', 'Conserve every bucket during prolonged rural dry spells'],
            ['phone', 'Tanker supply', 'Contact village panchayat if groundwater table recedes critically'],
          ],
        },
        {
          adv: 'Chop dry fodder to eliminate feed wastage. Provide round-the-clock clean drinking water.',
          c1: 'Ensure livestock have continuous access to fresh drinking water',
          c2: 'Feed chaffed dry fodder mixed with silage or tree loppings',
          g: [
            ['drop', 'Prevent dehydration', 'Provide cool drinking water troughs to prevent heat exhaustion'],
            ['cow', 'Chaff fodder stocks', 'Chaffing dry stover cuts feed wastage by up to 35%'],
            ['home', 'Shaded yard rest', 'Keep cattle out of midday sun to maintain body condition'],
          ],
        },
        {
          adv: "Dry prolonged spell causes high dust suspension on rural roads. Wear eyewear and hydrate!",
          c1: "Keep helmet visor lowered to prevent airborne dust particles",
          c2: "Carry adequate water bottle during road commute",
          g: [
            ['shield', "Eye protection", "Use protective glasses or helmet visor against dust swirl"],
            ['drop', "Drink water", "Replenish moisture lost in prolonged dry air"],
            ['clock', "Proceed normally", "Weather is generally clear for regular transit"],
          ],
        },
        {
          adv: "Dry sunny conditions on water. Fishing operations may proceed normally with ample hydration!",
          c1: "High solar radiation on open water; protect skin and eyes",
          c2: "Carry sufficient freshwater reserve onboard",
          g: [
            ['shield', "Sun shielding", "Wear wide brim hats and UV protective sunglasses"],
            ['drop', "Freshwater reserve", "Drink sweet water regularly to offset perspiration"],
            ['clock', "Normal operations", "General sea and lake conditions remain suitable"],
          ],
        }
      ],
    },
  },

  normal: {
    hazardId: 'normal',
    name: {
      mr: 'हवामान सामान्य', // NEEDS NATIVE REVIEW
      hi: 'मौसम सामान्य', // NEEDS NATIVE REVIEW
      en: 'Normal Weather',
    },
    icon: 'sun',
    roles: {
      mr: [
        {
          adv: 'आज हवामान सुरक्षित आहे. नियमित कामे चालू ठेवा आणि भरपूर पाणी प्या.', // NEEDS NATIVE REVIEW
          c1: 'नियमित कामे शांतपणे पूर्ण करा', // NEEDS NATIVE REVIEW
          c2: 'दिवसभरात पुरेसे पाणी प्या', // NEEDS NATIVE REVIEW
          g: [
            ['clock', 'नियमित कामे करा', 'हवामान अनुकूल आहे; दिवसाचे नियोजन पूर्ण करा'], // NEEDS NATIVE REVIEW
            ['drop', 'पाणी प्या', 'शरीर ताजेतवाने राहण्यासाठी स्वच्छ पाणी पीत रहा'], // NEEDS NATIVE REVIEW
            ['shield', 'सुरक्षित दिनक्रम', 'उन्हात किंवा प्रवासात आरोग्याची काळजी घ्या'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'शेतीकामांसाठी आजचे हवामान अनुकूल आहे. नियमित मशागत व सिंचन चालू ठेवा.', // NEEDS NATIVE REVIEW
          c1: 'हवामान अनुकूल आहे; शेतीचे नियमित नियोजन करा', // NEEDS NATIVE REVIEW
          c2: 'वेळेवर सिंचन आणि पिकांची निगराणी ठेवा', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'नियमित शेतीकामे', 'पेरणी, मशागत किंवा आंतरमशागत सुरक्षितपणे करा'], // NEEDS NATIVE REVIEW
            ['drop', 'सिंचन नियोजन', 'पिकांच्या गरजेनुसार पाणी द्या'], // NEEDS NATIVE REVIEW
            ['clock', 'हवामानावर लक्ष ठेवा', 'संध्याकाळच्या हवामान अंदाजानुसार पुढील कामे ठरवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'आज घराबाहेर जाण्यासाठी हवामान चांगले आहे. दैनंदिन कामे सुरळीत पार पाडा.', // NEEDS NATIVE REVIEW
          c1: 'दिवसाचे नियोजन व्यवस्थित करा', // NEEDS NATIVE REVIEW
          c2: 'घरातील लहान मुले व वृद्धांची नियमित काळजी घ्या', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'दैनंदिन दिनक्रम', 'हवामान सामान्य असल्याने घरगुती कामे वेळेवर करा'], // NEEDS NATIVE REVIEW
            ['drop', 'पाणी व आहार', 'सकस आहार आणि पुरेसे पाणी घ्या'], // NEEDS NATIVE REVIEW
            ['phone', 'माहिती मिळवत रहा', 'ऋतू बदलाच्या सूचना ॲपवरून जाणून घ्या'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'जनावरांसाठी आजचे हवामान उत्तम आहे. नियमित चारा-पाणी द्या आणि चरायला सोडा.', // NEEDS NATIVE REVIEW
          c1: 'जनावरांना नियमित वेळेवर चरायला न्या', // NEEDS NATIVE REVIEW
          c2: 'गोठा स्वच्छ ठेवा आणि पुरेसा चारा द्या', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'नियमित चरणी', 'हवामान अनुकूल असल्याने जनावरे मोकळ्या हवेत चरायला नेऊ शकता'], // NEEDS NATIVE REVIEW
            ['drop', 'स्वच्छ पाणी', 'दिवसातून २-३ वेळा जनावरांना पाणी पाजा'], // NEEDS NATIVE REVIEW
            ['home', 'गोठा स्वच्छता', 'जनावरांचे आरोग्य चांगले राहण्यासाठी गोठा स्वच्छ ठेवा'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "आज प्रवासासाठी हवामान पूर्णपणे अनुकूल आहे. सुरक्षित वेगाने नियमित प्रवास करा!",
          c1: "कार्यालय व शाळा प्रवास सुरळीत पार पाडा",
          c2: "वाहनाची नियमित तपासणी (हवा, ब्रेक) करून प्रवास करा",
          g: [
            ['shield', "सुरक्षित प्रवास", "हवामान उत्तम आहे; हेल्मेट व सीटबेल्ट नियमांचे पालन करा"],
            ['clock', "वेळेवर नियोजन", "नियमित वेळापत्रकानुसार दैनंदिन प्रवास पूर्ण करा"],
            ['phone', "अपडेट्स तपासा", "दुपारच्या व संध्याकाळच्या हवामान बदलांवर लक्ष ठेवा"],
          ],
        },
        {
          adv: "आमच्या डेटामध्ये कोणताही इशारा आढळलेला नाही. समुद्रात जाण्यापूर्वी नेहमी अधिकृत मच्छीमार इशारे (IMD / INCOIS / मत्स्यव्यवसाय विभाग) आणि स्थानिक बंदर सूचना नक्की तपासा.",
          c1: "समुद्रात जाण्यापूर्वी स्थानिक बंदर सूचना व हवामान अंदाज तपासा",
          c2: "बोटीवर लाईफ जॅकेट, होकायंत्र आणि संपर्क यंत्रणा सज्ज ठेवा",
          g: [
            ['shield', "सुरक्षा साधनांची खात्री", "लाईफ जॅकेट, रिंग बॉय व प्रथमोपचार पेटी तपासा"],
            ['phone', "अधिकृत सूचना तपासा", "निघण्यापूर्वी नेहमी स्थानिक बंदर किंवा मत्स्य विभागाची खात्री करा"],
            ['clock', "जबाबदार मासेमारी", "नेहमी गटाने किंवा दुसऱ्या बोटीच्या संपर्कात राहून समुद्रात जा"],
          ],
        }
      ],
      hi: [
        {
          adv: 'आज मौसम सुरक्षित है। नियमित काम जारी रखें और भरपूर पानी पिएँ।', // NEEDS NATIVE REVIEW
          c1: 'अपने काम शांति से पूरा करें', // NEEDS NATIVE REVIEW
          c2: 'दिन भर पर्याप्त पानी पीते रहें', // NEEDS NATIVE REVIEW
          g: [
            ['clock', 'दैनिक काम करें', 'मौसम अनुकूल है; अपने कार्य समय पर पूरे करें'], // NEEDS NATIVE REVIEW
            ['drop', 'पानी पिएँ', 'शरीर में ऊर्जा बनाए रखने के लिए पानी पिएँ'], // NEEDS NATIVE REVIEW
            ['shield', 'सुरक्षित दिनचर्या', 'धूप में सिर ढँककर काम करें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'खेती के कामों के लिए आज मौसम अनुकूल है। सामान्य निराई और सिंचाई जारी रखें।', // NEEDS NATIVE REVIEW
          c1: 'मौसम अनुकूल है; खेत के काम योजनानुसार करें', // NEEDS NATIVE REVIEW
          c2: 'समय पर सिंचाई और फ़सल की देखभाल करें', // NEEDS NATIVE REVIEW
          g: [
            ['shield', 'सामान्य खेती कार्य', 'बुवाई, निराई या जुताई सुरक्षित रूप से करें'], // NEEDS NATIVE REVIEW
            ['drop', 'सिंचाई योजना', 'फ़सल की आवश्यकतानुसार पानी दें'], // NEEDS NATIVE REVIEW
            ['clock', 'मौसम पर नज़र', 'शाम को अगले दिन का पूर्वानुमान देखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'आज घर से बाहर के कामों के लिए मौसम उत्तम है। सामान्य कार्य जारी रखें।', // NEEDS NATIVE REVIEW
          c1: 'दिन के कार्य सुगमता से करें', // NEEDS NATIVE REVIEW
          c2: 'परिवार के सदस्यों की सामान्य देखभाल रखें', // NEEDS NATIVE REVIEW
          g: [
            ['home', 'दैनिक दिनचर्या', 'मौसम सामान्य है; रोज़मर्रा के काम समय पर निपटाएँ'], // NEEDS NATIVE REVIEW
            ['drop', 'स्वास्थ्य व पानी', 'संतुलित भोजन और पर्याप्त पानी लें'], // NEEDS NATIVE REVIEW
            ['phone', 'जानकारी रखें', 'मौसम ऐप से जुड़े रहें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: 'पशुओं के लिए आज का मौसम अनुकूल है। समय पर चारा-पानी दें और चराने ले जाएँ।', // NEEDS NATIVE REVIEW
          c1: 'पशुओं को सामान्य रूप से चराने ले जाएँ', // NEEDS NATIVE REVIEW
          c2: 'बाड़े को साफ़ रखें और ताज़ा पानी दें', // NEEDS NATIVE REVIEW
          g: [
            ['cow', 'सामान्य चराई', 'मौसम सुहावना है; पशुओं को खुली हवा में चराएँ'], // NEEDS NATIVE REVIEW
            ['drop', 'साफ़ पानी', 'दिन में कई बार स्वच्छ पानी पिलाएँ'], // NEEDS NATIVE REVIEW
            ['home', 'बाड़े की सफ़ाई', 'पशुओं को स्वस्थ रखने के लिए बाड़ा साफ़ रखें'], // NEEDS NATIVE REVIEW
          ],
        },
        {
          adv: "आज सफ़र के लिए मौसम बिल्कुल अनुकूल है। सामान्य गति से सुरक्षित यात्रा करें!",
          c1: "दफ़्तर और स्कूल का सफ़र सामान्य रूप से पूरा करें",
          c2: "वाहन के टायर और ब्रेक जाँचकर सफ़र पर निकलें",
          g: [
            ['shield', "सुरक्षित सफ़र", "मौसम साफ़ है; यातायात नियमों का पालन करें"],
            ['clock', "समयबद्धता", "अपने दैनिक कार्यक्रम के अनुसार सुचारू रूप से कार्य करें"],
            ['phone', "मौसम अपडेट", "शाम के मौसम पूर्वानुमान पर नज़र रखें"],
          ],
        },
        {
          adv: "हमारे डेटा में कोई चेतावनी नहीं मिली है। समुद्र में जाने से पहले हमेशा आधिकारिक मछुआरा चेतावनियों (IMD / INCOIS / मत्स्य विभाग) और स्थानीय बंदरगाह निर्देशों की पुष्टि करें।",
          c1: "समुद्र में जाने से पहले स्थानीय बंदरगाह निर्देश अवश्य जाँचें",
          c2: "नाव पर लाइफ़ जैकेट, कंपास और संचार उपकरण तैयार रखें",
          g: [
            ['shield', "सुरक्षा उपकरण", "लाइफ़ जैकेट और फ़र्स्ट-एड किट की जाँच करें"],
            ['phone', "आधिकारिक निर्देश", "निकलने से पहले स्थानीय मत्स्य कार्यालय की पुष्टि करें"],
            ['clock', "सतर्कता के साथ कार्य", "हमेशा अन्य नावों के संपर्क में रहकर समुद्र में जाएँ"],
          ],
        }
      ],
      en: [
        {
          adv: 'Weather is safe today. Proceed with routine activities and stay hydrated.',
          c1: 'Carry out planned outdoor labor smoothly',
          c2: 'Drink clean drinking water regularly',
          g: [
            ['clock', 'Routine schedule', 'Favorable conditions; complete outdoor tasks on schedule'],
            ['drop', 'Stay hydrated', 'Keep body refreshed with clean water'],
            ['shield', 'Safe routine', 'Practice sensible sun hygiene during midday'],
          ],
        },
        {
          adv: 'Weather is favorable for farm operations. Proceed with irrigation and cultivation.',
          c1: 'Favorable conditions for routine crop care',
          c2: 'Carry out scheduled irrigation and weeding',
          g: [
            ['shield', 'Farm operations', 'Carry on with intercultural work, sowing, or weeding safely'],
            ['drop', 'Scheduled watering', 'Irrigate crops as per normal soil moisture requirements'],
            ['clock', 'Follow forecast', 'Review evening advisory for upcoming seasonal transitions'],
          ],
        },
        {
          adv: 'Favorable day for family outdoor activities. Carry out daily routine smoothly.',
          c1: 'Complete household errands comfortably',
          c2: 'Ensure normal care for children and elders',
          g: [
            ['home', 'Daily routine', 'Weather is normal and comfortable for errands and domestic work'],
            ['drop', 'Good nutrition & water', 'Maintain wholesome diet and adequate water intake'],
            ['phone', 'Stay updated', 'Keep app active for real-time local hazard changes'],
          ],
        },
        {
          adv: 'Comfortable day for livestock. Provide regular feed, water, and grazing.',
          c1: 'Take animals out for open grazing on schedule',
          c2: 'Keep cattle shelter clean and feed regular ration',
          g: [
            ['cow', 'Open grazing', 'Comfortable ambient weather; let cattle graze freely'],
            ['drop', 'Fresh water', 'Provide fresh water 2 to 3 times daily'],
            ['home', 'Clean shed', 'Keep barn floor clean and dry for animal wellness'],
          ],
        },
        {
          adv: "Weather is fully favorable for travel and commute today. Drive safely at normal speeds!",
          c1: "Complete school and office transit smoothly",
          c2: "Ensure vehicle tire pressure and brakes are in good working order",
          g: [
            ['shield', "Safe commute", "Pleasant weather; follow road safety rules and wear helmet"],
            ['clock', "Smooth transit", "Carry on with regular work and transit schedule"],
            ['phone', "Stay informed", "Check evening forecast for any oncoming changes"],
          ],
        },
        {
          adv: "No warning found in our data. Always check official fishermen warnings (IMD / INCOIS / Fisheries Department) and port instructions before going to sea.",
          c1: "Always verify local port signals and official fisheries alerts before cast-off",
          c2: "Ensure life jackets, magnetic compass, and communications gear are onboard",
          g: [
            ['shield', "Safety equipment audit", "Inspect life buoys, life jackets, and emergency torches"],
            ['phone', "Verify official alerts", "Check INCOIS / IMD bulletins with port controller prior to departure"],
            ['clock', "Buddy boat navigation", "Operate within visual or radio range of fellow fishing crafts"],
          ],
        }
      ],
    },
  },
  rough_sea: {
    hazardId: 'rough_sea',
    name: {
      mr: 'खवळलेला समुद्र / उंच लाटा',
      hi: 'अशांत समुद्र / ऊँची लहरें',
      en: 'Rough Sea / High Wave Alert',
    },
    icon: 'boat',
    roles: {
      mr: [
        {
          adv: "समुद्रात उंच लाटा उसळत आहेत. किनाऱ्यावरील शेतमजुरांनी समुद्राच्या लाटांपासून दूर रहावे!",
          c1: "भरतीच्या वेळी किनाऱ्याजवळ जाऊ नका",
          c2: "सुरक्षित अंतरावर रहा",
          g: [
            ['warn', "किनाऱ्यापासून दूर रहा", "मोठ्या लाटांमुळे किनाऱ्यावर धोका निर्माण होऊ शकतो"],
            ['home', "सुरक्षित ठिकाणी थांगा", "खवळलेल्या समुद्रात पाण्याचा प्रवाह वेगवान असतो"],
            ['phone', "स्थानिक सूचना पाळा", "प्रशासनाच्या सूचनांचे पालन करा"],
          ],
        },
        {
          adv: "उंच लाटांमुळे खाडीचे पाणी शेतात शिरू शकते. बांधबंदिस्ती तपासा आणि सावध रहा!",
          c1: "खाडीकाठच्या शेतांचे बांध तपासा",
          c2: "खाऱ्या पाण्याच्या घुसखोरीपासून पिकांचे रक्षण करा",
          g: [
            ['shield', "बांधबंदिस्ती सुरक्षित करा", "उधाणाच्या लाटांमुळे खारे पाणी शेतात शिरू देऊ नका"],
            ['warn', "खाडीकाठी जाणे टाळा", "प्रवाहाच्या वेळी शेतीकामे थांबवा"],
            ['clock', "ओहोटीची वाट पहा", "पाणी ओसरल्यानंतर शेतीकामांची पाहणी करा"],
          ],
        },
        {
          adv: "खवळलेल्या समुद्रात मुलांनी आणि कुटुंबाने समुद्रकिनाऱ्यावर जाणे पूर्णपणे टाळावे!",
          c1: "पर्यटन किंवा फिरण्यासाठी समुद्रकिनाऱ्यावर जाऊ नका",
          c2: "समुद्रकाठच्या सखल भागातील घरात सतर्क रहा",
          g: [
            ['home', "किनाऱ्यापासून दूर रहा", "उंच लाटा अचानक किनाऱ्यावर उसळू शकतात"],
            ['phone', "आपत्कालीन संपर्क", "समुद्राचे पाणी वस्तीत आल्यास तातडीने ११२ किंवा १०८ वर संपर्क करा"],
            ['shield', "मुलांवर लक्ष ठेवा", "मुलांना समुद्राजवळ फिरकू देऊ नका"],
          ],
        },
        {
          adv: "समुद्राकाठच्या व खाडीकाठच्या जनावरांना उंचावर सुरक्षित बांधा!",
          c1: "जनावरांना समुद्रकिनाऱ्यावरून दूर उंचावर न्या",
          c2: "गोठ्यात लाटांचे खारे पाणी शिरू नये याची काळजी घ्या",
          g: [
            ['cow', "जनावरांना उंचावर बांधा", "उधाणाच्या भरतीत पाणी भरण्याची शक्यता असते"],
            ['home', "गोठा सुरक्षित ठेवा", "गोठ्यात कोरडी जागा उपलब्ध करून द्या"],
            ['drop', "स्वच्छ पिण्याचे पाणी", "जनावरांना खारे पाणी पिण्यापासून रोखा"],
          ],
        },
        {
          adv: "खवळलेल्या समुद्रात किनारपट्टीच्या रस्त्यांवर लाटांचे पाणी येऊ शकते. किनारी प्रवास टाळा!",
          c1: "समुद्रकिनाऱ्यालगतच्या रस्त्यांवरून प्रवास टाळा",
          c2: "खाडीपुलांवर लाटांचे पाणी आदळत असल्यास मार्ग बदला",
          g: [
            ['warn', "किनारी रस्ते टाळा", "लाटांमुळे रस्ता खचण्याचा किंवा पाणी साचण्याचा धोका असतो"],
            ['clock', "पर्यायी मार्ग वापरा", "अंतर्गत सुरक्षित रस्त्यांचा वापर करा"],
            ['phone', "स्थानिक प्रशासनाचे निर्देश", "प्रवासापूर्वी वाहतूक सूचना तपासा"],
          ],
        },
        {
          adv: "खवळलेला समुद्र! लाटांची उंची २.५ ते ४+ मीटर आहे. मच्छीमारांनी समुद्रात अजिबात जाऊ नये!",
          c1: "मच्छीमारांसाठी इशारा: समुद्रात जाऊ नका; समुद्रात असलेल्यांनी त्वरित बंदरात परतावे",
          c2: "सर्व बोटी बंदरात किंवा सुरक्षित खाडीत मजबूत दोरांनी नांगरा",
          g: [
            ['warn', "समुद्रात जाण्यास सक्त मनाई", "INCOIS / IMD इशारा: लाटा उसळत असल्याने लहान व मोठ्या बोटी उलटण्याचा धोका"],
            ['home', "बोटी सुरक्षित बांधा", "बंदर किंवा जेटीवर लाटांच्या तडाख्यापासून बोटी सुरक्षित अंतरावर बांधा"],
            ['phone', "तटरक्षक दल आणीबाणी: १५५४", "सागरी आणीबाणीच्या प्रसंगी भारतीय तटरक्षक दलाशी (1554) संपर्क साधा"],
          ],
        }
      ],
      hi: [
        {
          adv: "समुद्र में ऊँची लहरें उठ रही हैं। तटीय मज़दूर किनारे से सुरक्षित दूरी बनाए रखें!",
          c1: "ज्वार के समय समुद्र तट के पास न जाएँ",
          c2: "सुरक्षित ऊँचे स्थान पर रहें",
          g: [
            ['warn', "तट से दूर रहें", "अचानक आने वाली ऊँची लहरों से ख़तरा हो सकता है"],
            ['home', "सुरक्षित आश्रय", "पानी के तेज़ बहाव से दूर रहें"],
            ['phone', "निर्देशों का पालन", "स्थानीय प्रशासन की चेतावनियों पर ध्यान दें"],
          ],
        },
        {
          adv: "ऊँची लहरों से खाड़ी का खारा पानी खेतों में घुस सकता है। मेड़ें मज़बूत रखें!",
          c1: "तटीय खेतों की मेड़ों की जाँच करें",
          c2: "खारे पानी के प्रवेश से फ़सलों को बचाएँ",
          g: [
            ['shield', "मेड़ों को मज़बूत करें", "ज्वार के पानी को खेत में न आने दें"],
            ['warn', "खाड़ी के किनारे न जाएँ", "तेज़ बहाव के दौरान काम रोकें"],
            ['clock', "पानी घटने की प्रतीक्षा", "ज्वार उतरने के बाद ही मुआयना करें"],
          ],
        },
        {
          adv: "अशांत समुद्र के दौरान परिवार और बच्चे समुद्र तट पर बिल्कुल न जाएँ!",
          c1: "समुद्र किनारे घूमने या नहाने न जाएँ",
          c2: "तटीय निचले इलाक़ों में रहने वाले लोग सतर्क रहें",
          g: [
            ['home', "तट से दूर रहें", "ऊँची लहरें अचानक तट पर आ सकती हैं"],
            ['phone', "आपातकालीन नंबर", "पानी बस्ती में आने पर 112 या 108 पर संपर्क करें"],
            ['shield', "बच्चों की सुरक्षा", "बच्चों को पानी के पास न जाने दें"],
          ],
        },
        {
          adv: "तटीय इलाक़ों के मवेशियों को ऊँचे और सुरक्षित स्थानों पर बाँधें!",
          c1: "पशुओं को समुद्र किनारे से दूर ऊँचाई पर ले जाएँ",
          c2: "बाड़े में खारा पानी न भरने दें",
          g: [
            ['cow', "पशुओं को ऊँचे स्थान पर रखें", "भारी ज्वार में पानी भरने की संभावना रहती है"],
            ['home', "बाड़े को सुरक्षित रखें", "पशुओं के बैठने के लिए सूखी जगह सुनिश्चित करें"],
            ['drop', "साफ़ पानी उपलब्ध कराएँ", "पशुओं को खारा पानी पीने से बचाएँ"],
          ],
        },
        {
          adv: "अशांत समुद्र में तटीय सड़कों पर लहरों का पानी आ सकता है। किनारों के रास्ते टालें!",
          c1: "तटीय सड़कों से सफ़र करने से बचें",
          c2: "पुलों पर पानी आने पर रास्ता बदलें",
          g: [
            ['warn', "तटीय रास्ते टालें", "लहरों के पानी से सड़क पर फिसलन या कटाव हो सकता है"],
            ['clock', "वैकल्पिक मार्ग लें", "आंतरिक सुरक्षित सड़कों का उपयोग करें"],
            ['phone', "यातायात निर्देश", "सफ़र से पहले स्थानीय स्थिति की जाँच करें"],
          ],
        },
        {
          adv: "अशांत समुद्र! लहरों की ऊँचाई 2.5 से 4+ मीटर है। मछुआरे समुद्र में बिल्कुल न जाएँ!",
          c1: "मछुआरों के लिए चेतावनी: समुद्र में न उतरें; जो पहले से समुद्र में हैं तुरंत लौटें",
          c2: "सभी नौकाओं को बंदरगाह या सुरक्षित खाड़ी में मज़बूत रस्सियों से बाँधें",
          g: [
            ['warn', "समुद्र में जाने पर रोक", "INCOIS / IMD चेतावनी: ऊँची लहरों के कारण नौका पलटने का भारी ख़तरा"],
            ['home', "नावों को सुरक्षित बाँधें", "बंदरगाह में नावों को लहरों की टक्कर से बचाकर बाँधें"],
            ['phone', "तटरक्षक आपातकाल: 1554", "समुद्री आपात स्थिति में भारतीय तटरक्षक बल (1554) से संपर्क करें"],
          ],
        }
      ],
      en: [
        {
          adv: "High surging waves along coastline. Farm laborers must stay well clear of breaker zones!",
          c1: "Stay away from sea walls and beachfronts during high tide",
          c2: "Work safely inland from breaker zones",
          g: [
            ['warn', "Stay clear of coast", "Sudden surge waves can sweep rocky ledges and beaches"],
            ['home', "Move inland", "Wait out high wave periods well above high-water marks"],
            ['phone', "Follow local advisories", "Heed warnings issued by district disaster management"],
          ],
        },
        {
          adv: "High surge waves may inundate coastal creeks and low farmlands. Inspect coastal bunds!",
          c1: "Inspect creek bunds and saline embankment barriers",
          c2: "Protect low-lying paddy plots from saline intrusion",
          g: [
            ['shield', "Reinforce coastal bunds", "Prevent saline water incursion into agriculture fields"],
            ['warn', "Avoid creek margins", "Halt farm operations along tidal estuaries during spring tides"],
            ['clock', "Await low tide", "Inspect fields only after tide recedes"],
          ],
        },
        {
          adv: "Rough sea conditions with dangerous breakers. Keep family and children away from beaches!",
          c1: "Strictly avoid recreational visits, walking, or swimming along coastlines",
          c2: "Households in low-lying coastal villages must stay on alert for sea ingress",
          g: [
            ['home', "Stay away from beachfront", "Dangerous rip currents and rogue waves near shore"],
            ['phone', "Emergency numbers", "Dial 112 or 108 if saline water threatens homes"],
            ['shield', "Supervise children", "Keep children strictly away from docks and beaches"],
          ],
        },
        {
          adv: "Relocate livestock from low coastal pockets and tidal banks to elevated ground!",
          c1: "Move cattle away from beach zones to high inland shelters",
          c2: "Prevent seawater incursion into livestock pens",
          g: [
            ['cow', "Move animals to high ground", "Prevent livestock from being trapped in tidal surge inundation"],
            ['home', "Keep shed dry", "Provide dry bedding away from tidal creek overflow"],
            ['drop', "Freshwater supply", "Ensure animals do not consume brackish seawater"],
          ],
        },
        {
          adv: "Coastal causeways may experience crashing waves and sea spray. Avoid coastal road transit!",
          c1: "Avoid commuting via coastal road stretches exposed to sea waves",
          c2: "Detour inland if causeways or bridges face breaking wave overtopping",
          g: [
            ['warn', "Avoid coastal highways", "Crashing surge waves and salt spray impair traction"],
            ['clock', "Take inland detour", "Choose interior roads away from waterfront"],
            ['phone', "Traffic bulletins", "Verify route safety with local traffic police"],
          ],
        },
        {
          adv: "Rough sea alert! Significant wave height 2.5m to 4+m. Fishermen must not venture into the sea!",
          c1: "Fishermen warning: Total suspension of fishing; vessels at sea must return immediately",
          c2: "Moor all crafts securely inside protected harbours with heavy double ropes",
          g: [
            ['warn', "Total sea suspension", "INCOIS / IMD High Wave Alert: Severe capsize risk for all craft"],
            ['home', "Secure boat moorings", "Berth vessels safely clear of pier wave collisions"],
            ['phone', "Coast Guard SAR: 1554", "Contact Indian Coast Guard maritime emergency helpline (1554)"],
          ],
        }
      ],
    },
  },

};

/**
 * Returns role-based guidance for any hazard, role, and language
 */
export function getHazardGuidance(hazardId: HazardId = 'normal', role: number = 0, lang: string = 'mr'): GuideData {
  const hazard = ALL_HAZARD_GUIDANCE[hazardId] || ALL_HAZARD_GUIDANCE.normal;
  const langRoles = hazard.roles[lang] || hazard.roles['mr'] || hazard.roles['en'];
  const safeRole = Math.max(0, Math.min(5, role));
  return langRoles[safeRole] || langRoles[0];
}

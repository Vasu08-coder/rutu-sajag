/**
 * Draft general advisory tips for livestock
 * Status: "draft"
 * needsVetReview: true
 * // NEEDS NATIVE REVIEW
 *
 * Release-build gate: draft content is included only when includeDraftContent is true
 * (dev mode or VITE_INCLUDE_DRAFT_CONTENT === 'true').
 */

export interface AdvisoryTipItem {
  id: string;
  hazardType: 'heat' | 'cold';
  status: 'draft';
  needsVetReview: boolean;
  text: {
    mr: string;
    hi: string;
    en: string;
  };
}

export const GENERAL_LIVESTOCK_ADVISORY: AdvisoryTipItem[] = [
  // Heat tips
  {
    id: 'heat_shade',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जनावरांना सावलीत ठेवा आणि थेट उन्हापासून वाचवा.', // NEEDS NATIVE REVIEW
      hi: 'पशुओं को छायादार स्थान पर रखें और सीधी धूप से बचाएं।', // NEEDS NATIVE REVIEW
      en: 'Keep animals in shaded areas and protect them from direct sun.',
    },
  },
  {
    id: 'heat_water',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'स्वच्छ व थंड पिण्याचे पाणी सतत उपलब्ध ठेवा.', // NEEDS NATIVE REVIEW
      hi: 'साफ और ठंडा पीने का पानी हमेशा उपलब्ध रखें।', // NEEDS NATIVE REVIEW
      en: 'Provide clean, cool drinking water at all times.',
    },
  },
  {
    id: 'heat_ventilation',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'गोठ्यात हवा खेळती राहू द्या.', // NEEDS NATIVE REVIEW
      hi: 'बाड़े में हवा का अच्छा वेंटिलेशन बनाए रखें।', // NEEDS NATIVE REVIEW
      en: 'Ensure good airflow and ventilation in the shelter.',
    },
  },
  {
    id: 'heat_midday_movement',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'दुपारच्या अत्यंत कडक उन्हात जनावरांची ने-आण किंवा कामे टाळा.', // NEEDS NATIVE REVIEW
      hi: 'दोपहर की तेज धूप में जानवरों को चलाने या काम कराने से बचें।', // NEEDS NATIVE REVIEW
      en: 'Avoid handling or moving animals during peak midday heat.',
    },
  },
  {
    id: 'heat_panting_watch',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'तीव्र धाप लागणे, लाळ गळणे किंवा अशक्तपणा यावर बारीक लक्ष ठेवा.', // NEEDS NATIVE REVIEW
      hi: 'तेज हांफने, लार गिरने या कमजोरी के लक्षणों पर नजर रखें।', // NEEDS NATIVE REVIEW
      en: 'Watch closely for heavy panting, drooling, or signs of weakness.',
    },
  },
  {
    id: 'heat_vet_call',
    hazardType: 'heat',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जनावर खाली बसल्यास किंवा बेशुद्ध पडल्यास ताबडतोब पशुवैद्यकाला बोलवा.', // NEEDS NATIVE REVIEW
      hi: 'यदि पशु गिर पड़े या अत्यधिक सुस्त हो, तो तुरंत पशु चिकित्सक से संपर्क करें।', // NEEDS NATIVE REVIEW
      en: 'Call a veterinarian immediately if an animal collapses or is unresponsive.',
    },
  },

  // Cold wave tips
  {
    id: 'cold_shelter',
    hazardType: 'cold',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जनावरांना उबदार व कोरड्या निवाऱ्यात ठेवा.', // NEEDS NATIVE REVIEW
      hi: 'पशुओं को गर्म और सूखे आश्रय में रखें।', // NEEDS NATIVE REVIEW
      en: 'Provide a warm, dry shelter for the animals.',
    },
  },
  {
    id: 'cold_draughts',
    hazardType: 'cold',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'थंड वाऱ्याची थेट झुळूक गोठ्यात येणार नाही याची काळजी घ्या.', // NEEDS NATIVE REVIEW
      hi: 'बाड़े में ठंडी सीधी हवा के झोंकों से बचाव करें।', // NEEDS NATIVE REVIEW
      en: 'Protect animals from direct cold wind and draughts.',
    },
  },
  {
    id: 'cold_bedding',
    hazardType: 'cold',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जमिनीवर कोरडे गवत किंवा पोत्यांचे आच्छादन (बेडिंग) घाला.', // NEEDS NATIVE REVIEW
      hi: 'फर्श पर सूखी घास या बोरी का सूखा बिछावन बिछाएं।', // NEEDS NATIVE REVIEW
      en: 'Use dry straw or sacking bedding on cold floors.',
    },
  },
  {
    id: 'cold_water',
    hazardType: 'cold',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जनावरांना कोमट किंवा सामान्य तापमानाचे स्वच्छ पाणी द्या.', // NEEDS NATIVE REVIEW
      hi: 'पशुओं को सामान्य या हल्का गुनगुना साफ पानी दें।', // NEEDS NATIVE REVIEW
      en: 'Provide clean water at comfortable temperature.',
    },
  },
  {
    id: 'cold_vet_call',
    hazardType: 'cold',
    status: 'draft',
    needsVetReview: true,
    text: {
      mr: 'जनावर थरथर कापत असल्यास किंवा सुस्त झाल्यास पशुवैद्यकाचा सल्ला घ्या.', // NEEDS NATIVE REVIEW
      hi: 'यदि पशु कांप रहा हो या बहुत कमजोर दिखे तो पशु चिकित्सक से संपर्क करें।', // NEEDS NATIVE REVIEW
      en: 'Call a veterinarian if an animal is shivering or appears lethargic.',
    },
  },
];

/**
 * Returns generic tips gated by release flag.
 */
export function getLivestockGeneralTips(
  hazardType: 'heat' | 'cold',
  lang: 'mr' | 'hi' | 'en',
  includeDraftContent: boolean
): string[] {
  if (!includeDraftContent) {
    return [];
  }
  return GENERAL_LIVESTOCK_ADVISORY
    .filter((tip) => tip.hazardType === hazardType)
    .map((tip) => tip.text[lang] || tip.text.en);
}

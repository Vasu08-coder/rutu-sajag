export interface GuideStep {
  icon: string;
  title: string;
  detail: string;
}

export interface GuideData {
  adv: string;
  c1: string;
  c2: string;
  g: [string, string, string][];
}

export const GUIDE: Record<string, GuideData[]> = {
  mr: [
    {
      adv: "२ तास काम थांबवा. सावलीत बसा आणि लगेच ताक प्या!",
      c1: "दुपारी १२ ते ४ उन्हात काम टाळा",
      c2: "दर अर्ध्या तासाने पाणी किंवा ताक प्या",
      g: [
        ["clock", "२ तास काम थांबवा", "दुपारी १२ ते २ वाजेपर्यंत उन्हात थांबू नका"],
        ["home", "सावलीत किंवा घरात बसा", "झाडाची किंवा शेडची सावली शोधा"],
        ["drop", "लगेच ताक किंवा मिठाचे पाणी प्या", "दर ३० मिनिटांनी थोडे थोडे पाणी प्या"]
      ]
    },
    {
      adv: "दुपारी शेतीकामे थांबवा. सिंचन सकाळी किंवा संध्याकाळी करा आणि सावलीत विश्रांती घ्या!",
      c1: "शेतातील कामे सकाळी लवकर किंवा संध्याकाळी करा",
      c2: "सिंचन सकाळी किंवा संध्याकाळी करा, दुपारी नको",
      g: [
        ["clock", "कामाची वेळ बदला", "दुपारी १२ ते ४ शेतात काम टाळा; सकाळी व संध्याकाळी करा"],
        ["drop", "सिंचन सकाळी किंवा संध्याकाळी", "दुपारी पाणी दिल्यास पिकाला व तुम्हाला त्रास होतो"],
        ["shield", "पिकांचे संरक्षण करा", "कोवळ्या रोपांवर आच्छादन घाला; विश्रांती सावलीत घ्या"]
      ]
    },
    {
      adv: "वृद्ध आणि मुलांना घरात ठेवा. पिण्याचे पाणी साठवा आणि आणीबाणीची तयारी ठेवा!",
      c1: "वृद्ध व मुलांना दुपारी १२ ते ४ घरात ठेवा",
      c2: "पिण्याचे स्वच्छ पाणी भरून ठेवा",
      g: [
        ["home", "वृद्ध आणि मुलांना घरात ठेवा", "दुपारी बाहेर पाठवू नका; खिडक्यांना पडदे लावा"],
        ["drop", "पिण्याचे पाणी साठवा", "थंड, स्वच्छ पाणी भरून ठेवा; मीठ-साखरेचे पाणी घरी ठेवा"],
        ["phone", "आणीबाणीची तयारी ठेवा", "१०८ क्रमांक व जवळचे आरोग्य केंद्र माहीत ठेवा; मोबाईल चार्ज ठेवा"]
      ]
    },
    {
      adv: "जनावरांना सावलीत ठेवा आणि भरपूर पाणी द्या. दुपारी वाहतूक टाळा!",
      c1: "जनावरांना दुपारी सावलीत बांधा, गोठ्यात हवा खेळती ठेवा",
      c2: "जनावरांना दिवसभर स्वच्छ, थंड पाणी द्या",
      g: [
        ["cow", "जनावरांना सावलीत ठेवा", "झाडाखाली किंवा गोठ्यात बांधा; उन्हात चरायला नेऊ नका"],
        ["drop", "भरपूर पाणी द्या", "दिवसातून अनेकदा स्वच्छ, थंड पाणी द्या"],
        ["home", "गोठ्यात हवा खेळती ठेवा", "दुपारी १२ ते ४ जनावरांची वाहतूक टाळा"]
      ]
    },
    // Role 4 Commuter (नोकरदार)
    {
      adv: "प्रवासाची वेळ बदला. दुपारच्या उन्हात प्रवास टाळा, डोके झाका आणि पाण्याची बाटली सोबत ठेवा!", // NEEDS NATIVE REVIEW
      c1: "सकाळी ९:३० पूर्वी किंवा संध्याकाळी ४ नंतर प्रवास करा", // NEEDS NATIVE REVIEW
      c2: "दुचाकी चालवताना डोके व चेहरा सुती कपड्याने झाका आणि सोबत पाणी ठेवा", // NEEDS NATIVE REVIEW
      g: [
        ["clock", "प्रवासाची वेळ बदला", "दुपारी १२ ते ४ दरम्यान लांबचा प्रवास टाळा"],
        ["drop", "पाण्याची बाटली सोबत ठेवा", "प्रवासात ओआरएस किंवा लिंबू पाणी सोबत ठेवा"],
        ["shield", "उन्हापासून संरक्षण", "डोक्यावर टोपी किंवा रुमाल वापरा; वातानुकूलित किंवा सावलीत विश्रांती घ्या"]
      ]
    },
    // Role 5 Fisher (मच्छीमार)
    {
      adv: "दुपारच्या कडक उन्हात समुद्रात किंवा खुल्या पाण्यात काम टाळा. भरपूर पाणी प्या आणि डोके झाका!", // NEEDS NATIVE REVIEW
      c1: "दुपारी १२ ते ३ दरम्यान खुल्या पाण्यात थेट उन्हात काम टाळा", // NEEDS NATIVE REVIEW
      c2: "बोटीवर पिण्याचे भरपूर पाणी ठेवा आणि सुती टोपी वापरा", // NEEDS NATIVE REVIEW
      g: [
        ["clock", "मासेमारीची वेळ सांभाळा", "उष्णतेच्या लाटेत दुपारच्या आधी किंवा संध्याकाळी काम करा"],
        ["drop", "बोटीवर पिण्याचे पाणी ठेवा", "डिहायड्रेशन टाळण्यासाठी सतत पाणी प्या"],
        ["shield", "डोके व अंग झाका", "खुल्या पाण्यात उन्हाचे प्रतिबिंब तीव्र असते; डोके व मान झाका"]
      ]
    }
  ],
  hi: [
    {
      adv: "2 घंटे काम रोकें। छाया में बैठें और तुरंत छाछ पिएँ!",
      c1: "दोपहर 12 से 4 बजे धूप में काम न करें",
      c2: "हर आधे घंटे में पानी या छाछ पिएँ",
      g: [
        ["clock", "2 घंटे काम रोकें", "दोपहर 12 से 2 बजे तक धूप में न रहें"],
        ["home", "छाया या घर में बैठें", "पेड़ या शेड की छाया ढूँढें"],
        ["drop", "तुरंत छाछ या नमक-पानी पिएँ", "हर 30 मिनट में थोड़ा-थोड़ा पानी पिएँ"]
      ]
    },
    {
      adv: "दोपहर में खेती का काम रोकें। सिंचाई सुबह या शाम को करें और छाया में आराम करें!",
      c1: "खेत का काम सुबह जल्दी या शाम को करें",
      c2: "सिंचाई सुबह या शाम को करें, दोपहर में नहीं",
      g: [
        ["clock", "काम का समय बदलें", "दोपहर 12 से 4 बजे खेत में काम न करें; सुबह और शाम को करें"],
        ["drop", "सिंचाई सुबह या शाम को", "दोपहर में पानी देने से फ़सल और आपको नुकसान होता है"],
        ["shield", "फ़सल की सुरक्षा करें", "छोटे पौधों पर आवरण डालें; आराम छाया में करें"]
      ]
    },
    {
      adv: "बुज़ुर्गों और बच्चों को घर के अंदर रखें। पीने का पानी जमा करें और आपात तैयारी रखें!",
      c1: "बुज़ुर्गों और बच्चों को दोपहर 12 से 4 बजे घर में रखें",
      c2: "पीने का साफ़ पानी भरकर रखें",
      g: [
        ["home", "बुज़ुर्गों और बच्चों को घर में रखें", "दोपहर में बाहर न भेजें; खिड़कियों पर परदे लगाएँ"],
        ["drop", "पीने का पानी जमा करें", "ठंडा, साफ़ पानी भरकर रखें; नमक-चीनी का घोल घर में रखें"],
        ["phone", "आपात तैयारी रखें", "108 नंबर और नज़दीकी स्वास्थ्य केंद्र की जानकारी रखें; मोबाइल चार्ज रखें"]
      ]
    },
    {
      adv: "पशुओं को छाया में रखें और भरपूर पानी दें। दोपहर में ढुलाई न करें!",
      c1: "पशुओं को दोपहर में छाया में बाँधें, बाड़े में हवा आने दें",
      c2: "पशुओं को दिन भर साफ़, ठंडा पानी दें",
      g: [
        ["cow", "पशुओं को छाया में रखें", "पेड़ के नीचे या बाड़े में बाँधें; धूप में चराने न ले जाएँ"],
        ["drop", "भरपूर पानी दें", "दिन में कई बार साफ़, ठंडा पानी दें"],
        ["home", "बाड़े में हवा आने दें", "दोपहर 12 से 4 बजे पशुओं की ढुलाई न करें"]
      ]
    },
    // Role 4 Commuter (नौकरीपेशा)
    {
      adv: "सफ़र का समय बदलें। दोपहर की कड़ी धूप में सफ़र न करें, सिर ढकें और पानी की बोतल साथ रखें!", // NEEDS NATIVE REVIEW
      c1: "सुबह 9:30 से पहले या शाम 4 बजे के बाद सफ़र करें", // NEEDS NATIVE REVIEW
      c2: "दुपहिया चलाते समय सिर और चेहरा सूती कपड़े से ढकें और पानी पिएँ", // NEEDS NATIVE REVIEW
      g: [
        ["clock", "सफ़र का समय बदलें", "दोपहर 12 से 4 बजे के बीच लंबा सफ़र टालें"],
        ["drop", "पानी की बोतल साथ रखें", "सफ़र में ओआरएस या नीबू पानी साथ रखें"],
        ["shield", "धूप से बचाव", "सिर पर टोपी या गमछा बाँधें; छाया में आराम करें"]
      ]
    },
    // Role 5 Fisher (मछुआरा)
    {
      adv: "दोपहर की कड़ी धूप में खुले पानी में काम करने से बचें। पर्याप्त पानी पिएँ और सिर ढकें!", // NEEDS NATIVE REVIEW
      c1: "दोपहर 12 से 3 बजे के बीच खुले पानी में सीधी धूप से बचें", // NEEDS NATIVE REVIEW
      c2: "नाव पर पीने का पर्याप्त पानी रखें और सूती टोपी पहनें", // NEEDS NATIVE REVIEW
      g: [
        ["clock", "मछली पकड़ने का समय बदलें", "भीषण गर्मी में सुबह जल्दी या शाम को काम करें"],
        ["drop", "नाव पर पानी रखें", "पानी की कमी (डिहाइड्रेशन) से बचने के लिए लगातार पानी पिएँ"],
        ["shield", "सिर और गर्दन ढकें", "खुले पानी में धूप का परावर्तन तेज़ होता है; सिर ढककर रखें"]
      ]
    }
  ],
  en: [
    {
      adv: "Stop work for 2 hours. Sit in the shade and drink buttermilk now!",
      c1: "Avoid working in the sun from 12 to 4 pm",
      c2: "Drink water or buttermilk every half hour",
      g: [
        ["clock", "Stop work for 2 hours", "Do not stay in the sun from 12 to 2 pm"],
        ["home", "Sit in shade or indoors", "Find shade of a tree or shed"],
        ["drop", "Drink buttermilk or salt water", "Sip water every 30 minutes"]
      ]
    },
    {
      adv: "Stop field work at midday. Irrigate early morning or evening and rest in the shade!",
      c1: "Do field work early morning or in the evening",
      c2: "Irrigate in the morning or evening, not at noon",
      g: [
        ["clock", "Change your work timing", "Avoid field work from 12 to 4 pm; work morning and evening"],
        ["drop", "Irrigate morning or evening", "Midday watering harms the crop and you"],
        ["shield", "Protect the crops", "Cover young seedlings; take your rest in the shade"]
      ]
    },
    {
      adv: "Keep elderly people and children indoors. Store drinking water and be ready for emergencies!",
      c1: "Keep elderly people and children indoors from 12 to 4 pm",
      c2: "Store clean drinking water",
      g: [
        ["home", "Keep elderly and children indoors", "Do not send them out at midday; cover windows with curtains"],
        ["drop", "Store drinking water", "Keep cool, clean water filled; keep salt-sugar water at home"],
        ["phone", "Be ready for emergencies", "Know the 108 number and nearest health centre; keep phone charged"]
      ]
    },
    {
      adv: "Keep animals in shade and give plenty of water. Avoid transport at midday!",
      c1: "Tie animals in shade at midday and keep the shed ventilated",
      c2: "Give animals clean, cool water all day",
      g: [
        ["cow", "Keep animals in shade", "Tie them under a tree or in the shed; do not take them out to graze in the sun"],
        ["drop", "Give plenty of water", "Offer clean, cool water many times a day"],
        ["home", "Keep the shed ventilated", "Avoid transporting animals from 12 to 4 pm"]
      ]
    },
    // Role 4 Commuter
    {
      adv: "Adjust travel schedule. Avoid commuting during peak heat, keep hydrated and cover head!",
      c1: "Complete travel before 09:30 am or after 04:00 pm",
      c2: "Carry water and cover head and face when riding two-wheelers",
      g: [
        ["clock", "Adjust commute timing", "Avoid non-essential midday travel between 12 and 4 pm"],
        ["drop", "Carry water bottle", "Keep ORS or lemon water handy during travel"],
        ["shield", "Sun protection", "Wear wide-brim hat or cotton scarf; seek air-conditioned/shaded stops"]
      ]
    },
    // Role 5 Fisher
    {
      adv: "Avoid intense midday heat on open water. Maintain extra hydration and cover head!",
      c1: "Avoid direct sun exposure on open waters between 12 and 3 pm",
      c2: "Carry ample drinking water onboard and wear protective sun clothing",
      g: [
        ["clock", "Adjust fishing trips", "Carry out fishing activities in early mornings or evenings during heatwaves"],
        ["drop", "Carry water onboard", "Drink clean water frequently to avoid maritime dehydration"],
        ["shield", "Guard against water reflection", "Water surface reflection intensifies UV radiation; cover neck and head"]
      ]
    }
  ]
};

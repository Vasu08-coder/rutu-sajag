/**
 * District Aliases for Maharashtra for robust CAP alert matching.
 * Includes English spellings, historical/colonial spellings, Devanagari (Marathi/Hindi),
 * and normalized tokens.
 */

export interface DistrictAlias {
  id: string;
  primaryEnglish: string;
  aliases: string[];
}

export const MAHARASHTRA_DISTRICT_ALIASES: DistrictAlias[] = [
  {
    id: 'yavatmal',
    primaryEnglish: 'Yavatmal',
    aliases: ['yavatmal', 'yeotmal', 'यवतमाळ', 'यवतमाल'],
  },
  {
    id: 'amravati',
    primaryEnglish: 'Amravati',
    aliases: ['amravati', 'omrawutty', 'अमरावती'],
  },
  {
    id: 'akola',
    primaryEnglish: 'Akola',
    aliases: ['akola', 'अकोला'],
  },
  {
    id: 'washim',
    primaryEnglish: 'Washim',
    aliases: ['washim', 'वाशीम', 'वाशिम', 'basim'],
  },
  {
    id: 'buldhana',
    primaryEnglish: 'Buldhana',
    aliases: ['buldhana', 'buldana', 'बुलढाणा', 'बुलडाणा'],
  },
  {
    id: 'wardha',
    primaryEnglish: 'Wardha',
    aliases: ['wardha', 'वर्धा'],
  },
  {
    id: 'nagpur',
    primaryEnglish: 'Nagpur',
    aliases: ['nagpur', 'नागपूर', 'नागपुर'],
  },
  {
    id: 'chandrapur',
    primaryEnglish: 'Chandrapur',
    aliases: ['chandrapur', 'chanda', 'चंद्रपूर', 'चंद्रपुर'],
  },
  {
    id: 'gadchiroli',
    primaryEnglish: 'Gadchiroli',
    aliases: ['gadchiroli', 'गडचिरोली'],
  },
  {
    id: 'bhandara',
    primaryEnglish: 'Bhandara',
    aliases: ['bhandara', 'भंडारा'],
  },
  {
    id: 'gondia',
    primaryEnglish: 'Gondia',
    aliases: ['gondia', 'gondiya', 'गोंदिया'],
  },
  {
    id: 'chhatrapati_sambhajinagar',
    primaryEnglish: 'Chhatrapati Sambhajinagar',
    aliases: ['chhatrapati sambhajinagar', 'aurangabad', 'छत्रपती संभाजीनगर', 'औरंगाबाद'],
  },
  {
    id: 'dharashiv',
    primaryEnglish: 'Dharashiv',
    aliases: ['dharashiv', 'osmanabad', 'धाराशिव', 'उस्मानाबाद'],
  },
  {
    id: 'ahilyanagar',
    primaryEnglish: 'Ahilyanagar',
    aliases: ['ahilyanagar', 'ahmednagar', 'अहिल्यानगर', 'अहमदनगर'],
  },
  {
    id: 'pune',
    primaryEnglish: 'Pune',
    aliases: ['pune', 'poona', 'पुणे'],
  },
  {
    id: 'satara',
    primaryEnglish: 'Satara',
    aliases: ['satara', 'सातारा'],
  },
  {
    id: 'sangli',
    primaryEnglish: 'Sangli',
    aliases: ['sangli', 'सांगली'],
  },
  {
    id: 'kolhapur',
    primaryEnglish: 'Kolhapur',
    aliases: ['kolhapur', 'कोल्हापूर', 'कोल्हापुर'],
  },
  {
    id: 'solapur',
    primaryEnglish: 'Solapur',
    aliases: ['solapur', 'sholapur', 'सोलापूर', 'सोलापुर'],
  },
  {
    id: 'nashik',
    primaryEnglish: 'Nashik',
    aliases: ['nashik', 'nasik', 'नाशिक'],
  },
  {
    id: 'jalgaon',
    primaryEnglish: 'Jalgaon',
    aliases: ['jalgaon', 'जळगाव', 'जलगांव'],
  },
  {
    id: 'dhule',
    primaryEnglish: 'Dhule',
    aliases: ['dhule', 'धुळे', 'धुलिया'],
  },
  {
    id: 'nandurbar',
    primaryEnglish: 'Nandurbar',
    aliases: ['nandurbar', 'नंदुरबार'],
  },
  {
    id: 'jalna',
    primaryEnglish: 'Jalna',
    aliases: ['jalna', 'जालना'],
  },
  {
    id: 'parbhani',
    primaryEnglish: 'Parbhani',
    aliases: ['parbhani', 'परभणी'],
  },
  {
    id: 'beed',
    primaryEnglish: 'Beed',
    aliases: ['beed', 'bid', 'बीड'],
  },
  {
    id: 'nanded',
    primaryEnglish: 'Nanded',
    aliases: ['nanded', 'नांदेड'],
  },
  {
    id: 'hingoli',
    primaryEnglish: 'Hingoli',
    aliases: ['hingoli', 'हिंगोली'],
  },
  {
    id: 'latur',
    primaryEnglish: 'Latur',
    aliases: ['latur', 'लातूर', 'लातुर'],
  },
  {
    id: 'ratnagiri',
    primaryEnglish: 'Ratnagiri',
    aliases: ['ratnagiri', 'रत्नागिरी'],
  },
  {
    id: 'sindhudurg',
    primaryEnglish: 'Sindhudurg',
    aliases: ['sindhudurg', 'सिंधुदुर्ग'],
  },
  {
    id: 'raigad',
    primaryEnglish: 'Raigad',
    aliases: ['raigad', 'रायगड', 'colaba'],
  },
  {
    id: 'thane',
    primaryEnglish: 'Thane',
    aliases: ['thane', 'ठाणे', 'thana'],
  },
  {
    id: 'palghar',
    primaryEnglish: 'Palghar',
    aliases: ['palghar', 'पालघर'],
  },
  {
    id: 'mumbai_city',
    primaryEnglish: 'Mumbai City',
    aliases: ['mumbai', 'bombay', 'मुंबई'],
  },
  {
    id: 'mumbai_suburban',
    primaryEnglish: 'Mumbai Suburban',
    aliases: ['mumbai suburban', 'मुंबई उपनगर'],
  },
];

/**
 * Finds all matching aliases for a given user-input district name.
 */
export function getAliasesForDistrict(districtName: string): string[] {
  if (!districtName) return [];
  const normalized = districtName.trim().toLowerCase();

  for (const entry of MAHARASHTRA_DISTRICT_ALIASES) {
    if (entry.aliases.some((alias) => normalized.includes(alias) || alias.includes(normalized))) {
      return entry.aliases;
    }
  }

  return [normalized];
}

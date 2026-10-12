export interface SeaPoint {
  lat: number;
  lon: number;
}

export interface Place {
  id: string;
  name: Record<string, string>;
  lat: number;
  lon: number;
  coastal?: boolean;
  district?: string;
  seaPoint?: SeaPoint;
}

export interface Gazetteer {
  state: Record<string, string>;
  district: Record<string, string>;
  places: Place[];
}

// Manual location list. Works with no GPS / no network.
// Extend by adding more states / districts / places.
export const GAZ: Gazetteer = {
  state: { mr: "महाराष्ट्र", hi: "महाराष्ट्र", en: "Maharashtra" },
  district: { mr: "यवतमाळ", hi: "यवतमाल", en: "Yavatmal" },
  places: [
    { id: 'darwha',   name: { mr: "दारव्हा",  hi: "दारव्हा",  en: "Darwha"   }, lat: 20.31, lon: 77.77 },
    { id: 'yavatmal', name: { mr: "यवतमाळ",  hi: "यवतमाल",  en: "Yavatmal"  }, lat: 20.39, lon: 78.13 },
    { id: 'pusad',    name: { mr: "पुसद",    hi: "पुसद",    en: "Pusad"     }, lat: 19.91, lon: 77.57 },
    { id: 'digras',   name: { mr: "दिग्रस",  hi: "दिग्रस",  en: "Digras"   }, lat: 20.11, lon: 77.71 },
    { id: 'ner',      name: { mr: "नेर",     hi: "नेर",     en: "Ner"       }, lat: 20.47, lon: 77.88 },
    { id: 'wani',     name: { mr: "वणी",     hi: "वणी",     en: "Wani"      }, lat: 20.06, lon: 78.95 },
  ]
};

// Verified coastal ports and fishing villages in Maharashtra Konkan
export const COASTAL_PLACES: Place[] = [
  {
    id: 'satpati',
    name: { mr: "सातपाटी (पालघर)", hi: "सातपाती (पालघर)", en: "Satpati (Palghar)" },
    lat: 19.73,
    lon: 72.70,
    district: 'Palghar',
    coastal: true,
    seaPoint: { lat: 19.73, lon: 72.60 },
  },
  {
    id: 'dahanu',
    name: { mr: "डहाणू बंदर", hi: "डहाणू बंदर", en: "Dahanu Port" },
    lat: 19.97,
    lon: 72.73,
    district: 'Palghar',
    coastal: true,
    seaPoint: { lat: 19.97, lon: 72.62 },
  },
  {
    id: 'versova',
    name: { mr: "वर्सोवा कोळीवाडा (मुंबई)", hi: "वर्सोवा कोलीवाड़ा (मुंबई)", en: "Versova Koliwada (Mumbai)" },
    lat: 19.13,
    lon: 72.81,
    district: 'Mumbai Suburban',
    coastal: true,
    seaPoint: { lat: 19.13, lon: 72.70 },
  },
  {
    id: 'sasoon_dock',
    name: { mr: "ससून डॉक (दक्षिण मुंबई)", hi: "ससून डॉक (दक्षिण मुंबई)", en: "Sassoon Dock (South Mumbai)" },
    lat: 18.91,
    lon: 72.82,
    district: 'Mumbai City',
    coastal: true,
    seaPoint: { lat: 18.90, lon: 72.70 },
  },
  {
    id: 'alibag',
    name: { mr: "अलिबाग / वरसोली", hi: "अलीबाग / वरसोली", en: "Alibag / Varsoli" },
    lat: 18.64,
    lon: 72.87,
    district: 'Raigad',
    coastal: true,
    seaPoint: { lat: 18.64, lon: 72.75 },
  },
  {
    id: 'murud',
    name: { mr: "मुरुड जंजिरा", hi: "मुरुड जंजीरा", en: "Murud Janjira" },
    lat: 18.33,
    lon: 72.96,
    district: 'Raigad',
    coastal: true,
    seaPoint: { lat: 18.33, lon: 72.84 },
  },
  {
    id: 'harnai',
    name: { mr: "हर्णे बंदर (दापोली)", hi: "हर्णे बंदर (दापोली)", en: "Harnai Port (Dapoli)" },
    lat: 17.81,
    lon: 73.09,
    district: 'Ratnagiri',
    coastal: true,
    seaPoint: { lat: 17.81, lon: 72.98 },
  },
  {
    id: 'mirkarwada',
    name: { mr: "मिरकरवाडा बंदर (रत्नागिरी)", hi: "मिरकरवाड़ा बंदर (रत्नागिरी)", en: "Mirkarwada Port (Ratnagiri)" },
    lat: 16.99,
    lon: 73.28,
    district: 'Ratnagiri',
    coastal: true,
    seaPoint: { lat: 16.99, lon: 73.15 },
  },
  {
    id: 'malvan',
    name: { mr: "मालवण बंदर", hi: "मालवण बंदर", en: "Malvan Port" },
    lat: 16.06,
    lon: 73.47,
    district: 'Sindhudurg',
    coastal: true,
    seaPoint: { lat: 16.06, lon: 73.35 },
  },
  {
    id: 'vengurla',
    name: { mr: "वेंगुर्ला बंदर", hi: "वेंगुर्ला बंदर", en: "Vengurla Port" },
    lat: 15.86,
    lon: 73.63,
    district: 'Sindhudurg',
    coastal: true,
    seaPoint: { lat: 15.86, lon: 73.50 },
  },
];

export const COASTAL_DISTRICTS = ['palghar', 'thane', 'mumbai city', 'mumbai suburban', 'mumbai', 'raigad', 'ratnagiri', 'sindhudurg'];

/**
 * Checks if a location is coastal based on district or coordinates
 */
export function isCoastalLocation(districtName: string = '', lat?: number | null, lon?: number | null): boolean {
  const norm = districtName.trim().toLowerCase();
  if (COASTAL_DISTRICTS.some(d => norm === d || norm.includes(d))) return true;

  // Approximate Maharashtra coastline bounding box: lat 15.5 to 20.3, lon 72.5 to 73.8
  if (lat != null && lon != null) {
    if (lat >= 15.5 && lat <= 20.3 && lon >= 72.5 && lon <= 73.5) {
      return true;
    }
  }
  return false;
}

/**
 * Snaps any coastal coordinate to the nearest offshore sea point (~10-15 km west)
 * to ensure Open-Meteo Marine API returns marine grid data rather than null.
 */
export function snapToNearestSeaPoint(lat: number, lon: number): SeaPoint {
  // If coordinates already close to a known coastal place, use its pre-tested offshore sea point
  let closestDist = Infinity;
  let closestSeaPoint: SeaPoint = { lat, lon: lon - 0.12 }; // Default: snap ~12 km west into the Arabian Sea

  for (const cp of COASTAL_PLACES) {
    const dist = Math.hypot(cp.lat - lat, cp.lon - lon);
    if (dist < closestDist && cp.seaPoint) {
      closestDist = dist;
      closestSeaPoint = cp.seaPoint;
    }
  }

  // If within ~50 km of a known port, use its sea point; otherwise shift west into the Arabian Sea
  if (closestDist < 0.6) {
    return closestSeaPoint;
  }
  return { lat: Number(lat.toFixed(2)), lon: Number((lon - 0.12).toFixed(2)) };
}


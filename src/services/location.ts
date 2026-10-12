export interface GpsPosition {
  lat: number;
  lon: number;
  accuracy: number;
}

export interface PlaceNames {
  village: string;
  taluka: string;
  district: string;
  state: string;
}

export interface LocationError {
  code: 'denied' | 'unsupported' | 'timeout' | 'unavailable' | 'offline' | 'noname' | 'http';
}

export function locationService(): Promise<GpsPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject({ code: 'unsupported' } as LocationError);
      return;
    }
    try {
      navigator.geolocation.getCurrentPosition(
        (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, accuracy: p.coords.accuracy }),
        (e) => reject({ code: e && e.code === 1 ? 'denied' : e && e.code === 3 ? 'timeout' : 'unavailable' } as LocationError),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
      );
    } catch {
      reject({ code: 'unavailable' } as LocationError);
    }
  });
}

// Replace this ONE function with your production geocoder; nothing else changes.
export async function reverseGeocode(lat: number, lon: number, lang: string, isOnline: boolean): Promise<PlaceNames> {
  if (!isOnline) throw { code: 'offline' } as LocationError;

  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), 8000);
  try {
    const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=14&addressdetails=1'
      + '&lat=' + encodeURIComponent(lat)
      + '&lon=' + encodeURIComponent(lon)
      + '&accept-language=' + encodeURIComponent(lang + ',en');
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) throw { code: 'http' } as LocationError;
    const a = ((await r.json()) as { address?: Record<string, string> }).address ?? {};
    const village = a['village'] || a['hamlet'] || a['town'] || a['suburb'] || a['neighbourhood'] || a['city'] || '';
    const taluka  = a['county'] || a['city_district'] || a['subdistrict'] || '';
    const district = a['state_district'] || a['district'] || '';
    if (!village && !taluka) throw { code: 'noname' } as LocationError;
    return { village, taluka, district, state: a['state'] || '' };
  } finally {
    clearTimeout(to);
  }
}

import {
  CollatedLocationDataType,
  FeatureDataType,
  GeocodejsonDataType,
} from "../type/locationType";

export async function locationQuerySearch(
  query: string,
  administrativeOnly?: boolean
): Promise<CollatedLocationDataType[]> {
  const url = `https://nominatim.openstreetmap.org/search?q=${query}${
    administrativeOnly ? "&featureType=settlement" : ""
  }&countrycodes=ID,US&addressdetails=1&format=geocodejson`;

  const response = await fetch(url, {
    headers: { "Accept-Language": "en-US" },
  });

  const body: GeocodejsonDataType = await response.json();
  if (response.ok)
    return body.features
      .map((feature) => collateAddressProperties(feature))
      .filter((address): address is CollatedLocationDataType => !!address);
  else throw new Error("fetch failed");
}

export async function reverseLocationLookup({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<CollatedLocationDataType | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&addressdetails=1&format=geocodejson`;

  const response = await fetch(url, {
    headers: { "Accept-Language": "en-US" },
  });

  const body: GeocodejsonDataType | { error: "Unable to geocode" } =
    await response.json();
  console.log(body);
  if (response.ok) {
    if ("error" in body) return null;
    else
      return body.features ? collateAddressProperties(body.features[0]) : null;
  } else throw new Error("fetch failed");
}

function collateAddressProperties({
  properties: {
    geocoding: { label, country, admin },
  },
  geometry: { type, coordinates },
}: FeatureDataType): CollatedLocationDataType | null {
  const { level8, level7, level6, level5, level4 } = admin;
  if (!(level5 || level6) || !level4 || !country || type !== "Point")
    return null;
  else {
    const [longitude, latitude] = coordinates as number[]; //type !== "Point" return null
    return {
      longitude,
      latitude,
      display_name: label,
      village: level7 ?? level8,

      district: level5 ? level6 : level7 ?? level8,

      city: (level5 ?? level6)!,

      province: level4,

      country: country,
    };
  }
}

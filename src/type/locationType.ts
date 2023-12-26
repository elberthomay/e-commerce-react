export interface GeocodejsonDataType {
  geocoding: {
    query: string;
  };
  features: FeatureDataType[];
}

export interface FeatureDataType {
  type: "Feature";
  properties: {
    geocoding: {
      place_id: number;
      label: string;
      name: string;

      postcode?: string;

      village?: string;
      suburb?: string;

      city_district?: string;

      county?: string;
      city?: string;
      municipality?: string;
      town?: string;

      province?: string;
      state?: string;

      country?: string;
      country_code?: string;
      admin: {
        level8?: string;
        level7?: string;
        level6?: string;
        level5?: string;
        level4?: string;
        level3?: string;
      };
    };
  };
  geometry:
    | {
        type: "Point";
        coordinates: number[]; // [longitude,latitude]
      }
    | {
        type: "LineString";
        coordinates: number[][]; // array of [longitude,latitude]
      }
    | {
        type: "Polygon";
        coordinates: number[][][]; // array of linear rings
      }
    | {
        type: "MultiPoints";
        coordinates: number[][]; // array of [longitude,latitude]
      }
    | {
        type: "MultiLineString";
        coordinates: number[][][]; // array of Linestring coordinates
      }
    | {
        type: "MultiPolygon";
        coordinates: number[][][][]; // array of polygon coordinates
      };
}

export interface CollatedLocationDataType {
  longitude: number;
  latitude: number;
  display_name: string;
  village?: string;

  district?: string;

  city: string;

  province: string;

  country: string;
}

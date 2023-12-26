export type CoordinateType = { latitude: number; longitude: number };

export interface AddressCreateType {
  name: string;
  phoneNumber: string;
  latitude?: number;
  longitude?: number;
  postCode?: string;
  detail: string;
  village?: string | null;
  district?: string | null;
  city: string;
  province: string;
  country: string;
  recipient: string;
}

export type AddressUpdateType = Partial<AddressCreateType>;

export interface AddressOutputType {
  id: string;
  name: string;
  phoneNumber: string;
  latitude?: number;
  longitude?: number;
  postCode?: string;
  detail: string;
  village?: string;
  district?: string;
  city: string;
  province: string;
  country: string;
  recipient: string;
  subdistrictId?: number;
  selected: boolean;
}

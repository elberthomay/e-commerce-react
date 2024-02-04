type AdministrativeObjectType = {
  village?: string | null;
  district?: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
};

export const toAdministrativeString = ({
  village,
  district,
  city,
  province,
  country,
}: AdministrativeObjectType) =>
  [village, district, city, province, country].filter((i) => !!i).join(", ");

import { CollatedLocationDataType } from "../type/locationType";

export const toAdministrativeString = ({
  village,
  district,
  city,
  province,
  country,
}: CollatedLocationDataType["address"]) =>
  [village, district, city, province, country].filter((i) => !!i).join(", ");

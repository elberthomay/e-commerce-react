import { useQuery } from "@tanstack/react-query";
import { reverseLocationLookup } from "../../api/location";
import { CollatedLocationDataType } from "../../type/locationType";

export default function useReverseLocationLookup({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reverseLocationLookup", longitude, latitude],
    queryFn: (): Promise<CollatedLocationDataType | null> =>
      reverseLocationLookup({ longitude, latitude }),
  });
  return { isLoading, error, location: data };
}

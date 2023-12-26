import { useQuery } from "@tanstack/react-query";
import { locationQuerySearch } from "../../api/location";

export default function useLocationQuerySearch(
  query: string,
  administrativeOnly?: boolean
) {
  const searchQuery = query.trim();
  const { isLoading, error, data } = useQuery({
    queryKey: ["locationSearch", searchQuery],
    queryFn: async () => {
      if (searchQuery.length === 0) return [];
      else return await locationQuerySearch(searchQuery, administrativeOnly);
    },
  });
  return { isLoading, error, locations: data };
}

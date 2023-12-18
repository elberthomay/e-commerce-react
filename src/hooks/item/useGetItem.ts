import { useQuery } from "@tanstack/react-query";
import { getItem } from "../../api/item";
import { RequestError } from "../../error/RequestError";

export default function useGetItem(itemId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItem(itemId),
    retry: (failureCount, error) => {
      if (error instanceof RequestError && error.status === 404) return false;
      if (failureCount > 10) return false;
      return true;
    },
  });
  return { isLoading, error, item: data };
}

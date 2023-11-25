import { useQuery } from "react-query";
import { getShop } from "../../api/shop";
import { RequestError } from "../../error/RequestError";

export default function useGetShop(shopId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getShop", shopId],
    queryFn: () => getShop(shopId),
    retry: (failureCount, error) => {
      if (error instanceof RequestError && error.status === 404) return false;
      if (failureCount > 10) return false;
      return true;
    },
  });
  return { isLoading, error, shop: data };
}

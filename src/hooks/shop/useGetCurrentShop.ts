import { useQuery } from "@tanstack/react-query";
import { getCurrentShop } from "../../api/shop";
import { RequestError } from "../../error/RequestError";

export default function useGetCurrentShop() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentShop"],
    queryFn: () => getCurrentShop(),
    retry: (count, body) =>
      (body instanceof RequestError && body.status === 401) || count > 10
        ? false
        : true,
  });
  return {
    isLoading,
    error,
    currentShop: data,
    hasShop: data?.id !== undefined,
  };
}

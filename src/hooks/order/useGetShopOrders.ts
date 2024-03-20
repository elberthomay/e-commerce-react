import { getOrdersQuery } from "@elycommerce/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getShopOrders } from "../../api/order";
import { RequestError } from "../../error/RequestError";

export default function useGetShopOrders(
  shopId: string,
  queryData: Omit<
    Partial<Record<keyof z.infer<typeof getOrdersQuery>, string>>,
    "page"
  >
) {
  const { isLoading, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", "shop", queryData],
      queryFn: ({ pageParam }) =>
        getShopOrders(shopId, { ...queryData, page: String(pageParam) }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam, __) =>
        lastPage.length !== 0 ? lastPageParam + 1 : undefined,
      retry: (failureCount, error) => {
        if (error instanceof RequestError) return false;
        else if (failureCount < 5) return false;
        else return true;
      },
    });

  return {
    isLoading,
    error,
    orders: data?.pages?.flat(),
    hasNextPage,
    fetchNextPage,
  };
}

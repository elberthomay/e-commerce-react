import { getOrdersQuery } from "@elycommerce/common";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getUserOrders } from "../../api/order";
import { RequestError } from "../../error/RequestError";

export default function useGetUserOrders(
  userId: string,
  queryData: Omit<
    Partial<Record<keyof z.infer<typeof getOrdersQuery>, string>>,
    "page"
  >
) {
  const { isLoading, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["orders", "user", queryData],
      queryFn: ({ pageParam }) =>
        getUserOrders(userId, { ...queryData, page: String(pageParam) }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
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

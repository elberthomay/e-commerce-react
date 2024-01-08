import { useInfiniteQuery } from "@tanstack/react-query";
import { getShopItems } from "../../api/shop";
import { GetShopItemOptions, ShopItemRowType } from "../../type/shopType";
import { DEFAULT_CLIENT_LIMIT } from "../../variables/constant";

export default function useGetShopItemsInvScroll(options: GetShopItemOptions) {
  const { search, shopId, orderBy, limit } = options;
  const { isLoading, error, fetchNextPage, hasNextPage, isFetching, data } =
    useInfiniteQuery({
      queryKey: ["shopItems", shopId, search, orderBy, limit],
      queryFn: ({ pageParam = 1 }) =>
        getShopItems({
          ...options,
          page: pageParam,
          limit,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPage, lastPageParam) =>
        lastPageParam + 1 <=
        Math.ceil(lastPage.count / (limit ?? DEFAULT_CLIENT_LIMIT))
          ? lastPageParam + 1
          : undefined,
      getPreviousPageParam: (lastPage, allPage, firstPageParam) =>
        firstPageParam - 1 > 0 ? firstPageParam - 1 : undefined,
    });
  return {
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    shopItem: data?.pages?.reduce(
      (acc, { count, rows }) => [...acc, ...rows],
      [] as ShopItemRowType[]
    ),
  };
}

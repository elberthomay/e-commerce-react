import { useQuery } from "@tanstack/react-query";
import { getShopItems } from "../../api/shop";
import { GetShopItemOptions } from "../../type/shopType";

export default function useGetShopItems(options?: GetShopItemOptions) {
  const { search, shopId, limit, page, orderBy } = options ?? {};
  const { isLoading, error, data } = useQuery({
    queryKey: ["shopItems", shopId, search, orderBy, limit, page],
    queryFn: () => getShopItems(options),
  });
  return { isLoading, error, shopItem: data };
}

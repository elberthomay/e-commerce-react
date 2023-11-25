import { useQuery } from "react-query";
import { getShopItems } from "../../api/shop";

export default function useGetShopItems(
  shopId: string,
  limit: number,
  page: number
) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getShopItem", shopId, limit, page],
    queryFn: () => getShopItems(shopId, limit, page),
  });
  return { isLoading, error, shopItem: data };
}

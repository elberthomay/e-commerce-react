import { getOrdersQuery } from "@elycommerce/common";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { getShopOrders } from "../../api/order";

export default function useGetShopOrders(
  shopId: string,
  queryData: z.infer<typeof getOrdersQuery>
) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", "shop", queryData],
    queryFn: () => getShopOrders(shopId, queryData),
  });

  return { isLoading, error, orders: data };
}

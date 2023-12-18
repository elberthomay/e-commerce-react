import { useMutation } from "@tanstack/react-query";
import { checkShopName } from "../../api/shop";

export default function useCheckShopName() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["checkShopName"],
    mutationFn: (shopName: string) => checkShopName(shopName),
  });
  return { isLoading: isPending, error, checkShopName: mutateAsync };
}

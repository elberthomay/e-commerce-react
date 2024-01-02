import { useMutation } from "@tanstack/react-query";
import { ShopUpdateType } from "../../type/shopType";
import { updateShop } from "../../api/shop";

export function useUpdateShop(shopId: string) {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["updateCurrentShop"],
    mutationFn: (updateData: ShopUpdateType) => updateShop(shopId, updateData),
  });
  return { isLoading: isPending, error, updateShop: mutateAsync };
}

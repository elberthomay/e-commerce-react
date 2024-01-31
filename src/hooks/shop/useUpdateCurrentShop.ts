import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShopUpdateType } from "../../type/shopType";
import { updateShop } from "../../api/shop";

export function useUpdateShop(shopId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["updateCurrentShop"],
    mutationFn: (updateData: ShopUpdateType) => updateShop(shopId, updateData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentShop"] }),
  });
  return { isLoading: isPending, error, updateShop: mutateAsync };
}

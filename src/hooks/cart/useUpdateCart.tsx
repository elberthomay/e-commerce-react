import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart } from "../../api/cart";
import { cartUpdateType } from "../../type/cartType";

export default function useUpdateCart() {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: ({
      itemId,
      updateData,
    }: {
      itemId: string;
      updateData: cartUpdateType;
    }) => updateCart({ ...updateData, itemId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  return { isLoading: isPending, error, updateCart: mutate };
}

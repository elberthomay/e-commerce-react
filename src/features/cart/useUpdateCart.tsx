import { useMutation, useQueryClient } from "react-query";
import { updateCart } from "../../api/cart";
import { cartUpdateType } from "../../type/cartType";

export default function useUpdateCart() {
  const queryClient = useQueryClient();
  const { isLoading, error, mutate } = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: ({
      itemId,
      updateData,
    }: {
      itemId: string;
      updateData: cartUpdateType;
    }) => updateCart({ ...updateData, itemId }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });
  return { isLoading, error, updateCart: mutate };
}

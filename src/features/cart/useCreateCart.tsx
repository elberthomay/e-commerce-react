import { useMutation, useQueryClient } from "react-query";
import { createCart } from "../../api/cart";

export default function useCreateCart() {
  const queryClient = useQueryClient();
  const { isLoading, error, mutate } = useMutation({
    mutationKey: ["createCart"],
    mutationFn: (cartData: { itemId: string; quantity: number }) =>
      createCart(cartData),
    onSuccess: (data) => queryClient.invalidateQueries(["cart"]),
  });
  return { isLoading, error, createCart: mutate };
}

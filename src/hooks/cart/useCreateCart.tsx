import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCart } from "../../api/cart";

export default function useCreateCart() {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["createCart"],
    mutationFn: (cartData: { itemId: string; quantity: number }) =>
      createCart(cartData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return { isLoading: isPending, error, createCart: mutate };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCart } from "../../api/cart";
import useMutationIsLoading from "../useMutationIsLoading";

const mutationKey = ["createCart"];

export default function useCreateCart() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: mutationKey,
    mutationFn: (cartData: { itemId: string; quantity: number }) =>
      createCart(cartData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return { isLoading: isPending, error, createCart: mutateAsync };
}

export const useCreateCartsIsLoading = () => useMutationIsLoading(mutationKey);

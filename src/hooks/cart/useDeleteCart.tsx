import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "../../api/cart";

export default function useDeleteCart() {
  const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: (itemId: string) => deleteCart({ itemId }),
    onSuccess: (data) => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
  return { isLoading: isPending, error, deleteCart: mutate };
}

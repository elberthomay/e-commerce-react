import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemImage } from "../../api/item";

export default function useDeleteImage(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["deleteItemImage"],
    mutationFn: (order: number[]) => deleteItemImage(itemId, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });
  return { isLoading: isPending, error, deleteItemImage: mutateAsync };
}

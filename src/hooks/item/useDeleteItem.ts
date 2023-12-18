import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../../api/item";

export default function useDeleteItem(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: () => deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
    },
  });
  return { isLoading: isPending, error, deleteItem: mutateAsync };
}

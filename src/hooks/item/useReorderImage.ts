import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderItemImage } from "../../api/item";

export default function useReorderImage(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["reorderItemImage"],
    mutationFn: (order: number[]) => reorderItemImage(itemId, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });
  return { isLoading: isPending, error, reorderItemImage: mutateAsync };
}

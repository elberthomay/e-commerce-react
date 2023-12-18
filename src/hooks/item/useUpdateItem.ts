import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../../api/item";
import { ItemUpdateType } from "../../type/itemType";

export default function useUpdateItem(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: (updateData: ItemUpdateType) => updateItem(itemId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });
  return { isLoading: isPending, error, updateItem: mutateAsync };
}

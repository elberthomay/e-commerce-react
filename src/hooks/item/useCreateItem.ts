import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemCreateType } from "../../type/itemType";
import { createItem } from "../../api/item";

export default function useCreateItem() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["createItem"],
    mutationFn: (newItemData: { itemData: ItemCreateType; images: Blob[] }) =>
      createItem(newItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
    },
  });
  return { isLoading: isPending, error, createItem: mutateAsync };
}

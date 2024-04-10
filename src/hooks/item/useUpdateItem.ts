import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../../api/item";
import { z } from "zod";
import { itemUpdateSchema } from "@elycommerce/common";

type ItemUpdateType = z.infer<typeof itemUpdateSchema>;

export default function useUpdateItem(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: (update: { updateData: ItemUpdateType; newImages?: Blob[] }) =>
      updateItem(itemId, update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });
  return { isLoading: isPending, error, updateItem: mutateAsync };
}

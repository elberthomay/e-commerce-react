import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemImage } from "../../api/item";

export default function useAddImage(itemId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["addItemImage"],
    mutationFn: (newImages: Blob[]) => addItemImage(itemId, newImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["shopItems"] });
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
  });
  return { isLoading: isPending, error, addItemImage: mutateAsync };
}

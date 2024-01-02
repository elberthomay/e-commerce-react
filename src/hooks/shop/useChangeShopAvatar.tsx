import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeShopAvatar } from "../../api/shop";

export default function useChangeShopAvatar() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["changeShopAvatar"],
    mutationFn: (image: Blob) => changeShopAvatar(image),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentShop"] }),
  });
  return { isLoading: isPending, error, changeShopAvatar: mutateAsync };
}

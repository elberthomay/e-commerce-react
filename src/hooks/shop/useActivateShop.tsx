import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateShop } from "../../api/shop";

export default function useActivateShop() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["activateShop"],
    mutationFn: (shopData: { name: string; description: string }) =>
      activateShop(shopData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentShop"] }),
  });
  return { isLoading: isPending, error, activateShop: mutateAsync };
}

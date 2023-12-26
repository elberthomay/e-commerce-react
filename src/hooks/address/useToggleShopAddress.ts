import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleAddress } from "../../api/address";

export default function useToggleShopAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["toggleShopAddress"],
    mutationFn: (addressId: string) => toggleAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] });
    },
  });
  return { isLoading: isPending, error, toggleShopAddress: mutateAsync };
}

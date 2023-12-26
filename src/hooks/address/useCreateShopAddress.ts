import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressCreateType } from "../../type/addressType";
import { createShopAddress } from "../../api/address";

export default function useCreateShopAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["createShopAddress"],
    mutationFn: (addressData: AddressCreateType) =>
      createShopAddress(addressData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] }),
  });
  return { isLoading: isPending, error, createShopAddress: mutateAsync };
}

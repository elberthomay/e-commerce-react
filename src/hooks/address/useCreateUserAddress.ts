import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressCreateType } from "../../type/addressType";
import { createUserAddress } from "../../api/address";

export default function useCreateUserAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["createUserAddress"],
    mutationFn: (addressData: AddressCreateType) =>
      createUserAddress(addressData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] }),
  });
  return { isLoading: isPending, error, createUserAddress: mutateAsync };
}

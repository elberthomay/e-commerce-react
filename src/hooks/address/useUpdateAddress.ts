import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressUpdateType } from "../../type/addressType";
import { updateAddress } from "../../api/address";

export default function useUpdateAddress(addressId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["updateAddress", addressId],
    mutationFn: (updateData: AddressUpdateType) =>
      updateAddress(addressId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] });
    },
  });
  return { isLoading: isPending, error, updateAddress: mutateAsync };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../api/address";

export default function useDeleteAddress(addressId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["deleteAddress", addressId],
    mutationFn: () => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] });
    },
  });
  return { isLoading: isPending, error, deleteAddress: mutateAsync };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectAddress } from "../../api/address";

export default function useSelectUserAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["selectUserAddress"],
    mutationFn: (addressId: string) => selectAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
  return { isLoading: isPending, error, selectUserAddress: mutateAsync };
}

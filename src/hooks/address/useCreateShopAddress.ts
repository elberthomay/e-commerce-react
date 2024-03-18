import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShopAddress } from "../../api/address";
import { z } from "zod";
import { addressCreateSchema } from "@elycommerce/common";

export default function useCreateShopAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["createShopAddress"],
    mutationFn: (addressData: z.input<typeof addressCreateSchema>) =>
      createShopAddress(addressData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shopAddresses"] }),
  });
  return { isLoading: isPending, error, createShopAddress: mutateAsync };
}

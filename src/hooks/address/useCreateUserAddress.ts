import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAddress } from "../../api/address";
import { addressCreateSchema } from "@elycommerce/common";
import { z } from "zod";

export default function useCreateUserAddress() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["createUserAddress"],
    mutationFn: (addressData: z.input<typeof addressCreateSchema>) =>
      createUserAddress(addressData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userAddresses"] }),
  });
  return { isLoading: isPending, error, createUserAddress: mutateAsync };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processOrder } from "../../api/order";
import { currentUserKeyObject } from "../user/useGetCurrentUser";

export default function useProcessOrders() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["processOrder"],
    mutationFn: () => processOrder(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries(currentUserKeyObject);
    },
  });

  return { isLoading: isPending, error, processOrders: mutateAsync };
}

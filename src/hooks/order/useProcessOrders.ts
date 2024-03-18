import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processOrder } from "../../api/order";

export default function useProcessOrders() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["processOrder"],
    mutationFn: () => processOrder(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  return { isLoading: isPending, error, processOrders: mutateAsync };
}

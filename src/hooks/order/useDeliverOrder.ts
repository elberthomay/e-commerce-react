import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deliverOrder } from "../../api/order";

function useDeliverOrder(orderId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["deliverOrder"],
    mutationFn: () => deliverOrder(orderId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orderDetail", orderId],
      });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  return { isLoading: isPending, error, deliverOrder: mutateAsync };
}

export default useDeliverOrder;

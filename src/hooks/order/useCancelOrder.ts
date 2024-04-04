import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../api/order";
import { currentUserKeyObject } from "../user/useGetCurrentUser";

function useCancelOrder(orderId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["cancelOrder"],
    mutationFn: () => cancelOrder(orderId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orderDetail", orderId],
      });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries(currentUserKeyObject);
    },
  });
  return { isLoading: isPending, error, cancelOrder: mutateAsync };
}

export default useCancelOrder;

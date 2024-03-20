import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../../api/order";

function useConfirmOrder(orderId: string) {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["confirmOrder"],
    mutationFn: () => confirmOrder(orderId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orderDetail", orderId],
      });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  return { isLoading: isPending, error, confirmOrder: mutateAsync };
}

export default useConfirmOrder;

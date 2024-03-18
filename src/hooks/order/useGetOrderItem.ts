import { useQuery } from "@tanstack/react-query";
import { getOrderItem } from "../../api/order";
import { RequestError } from "../../error/RequestError";

export default function useGetOrderItem(orderId: string, itemId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orderItem", orderId, itemId],
    queryFn: () => getOrderItem(orderId, itemId),
    retry: (failureCount, error) => {
      if (
        error instanceof RequestError &&
        (error.status === 404 || error.status === 400)
      )
        return false;
      else if (failureCount > 5) return false;
      else return true;
    },
  });
  return { isLoading, error, orderItem: data };
}

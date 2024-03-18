import { useQuery } from "@tanstack/react-query";
import { getOrderDetail } from "../../api/order";
import { RequestError } from "../../error/RequestError";

function useGetOrderDetail(orderId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => getOrderDetail(orderId),
    retry: (count, error) => {
      if (error instanceof RequestError) return false;
      else if (count > 5) return false;
      else return true;
    },
  });

  return { isLoading, error, orderDetail: data };
}

export default useGetOrderDetail;

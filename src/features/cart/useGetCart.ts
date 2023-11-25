import { useQuery } from "react-query";
import { getCart } from "../../api/cart";

export default function useGetCart() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return { isLoading, error, cart: data };
}

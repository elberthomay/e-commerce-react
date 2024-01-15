import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cart";
import { RequestError } from "../../error/RequestError";

export const cartKeyObject = { queryKey: ["cart"] };

export default function useGetCart() {
  const { isLoading, error, data } = useQuery({
    ...cartKeyObject,
    queryFn: () => getCart(),
    retry: (count, body) =>
      (body instanceof RequestError && body.status === 401) || count > 10
        ? false
        : true,
  });

  return { isLoading, error, cart: data };
}

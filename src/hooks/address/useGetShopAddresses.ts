import { useQuery } from "@tanstack/react-query";
import { getShopAddresses } from "../../api/address";

export default function useGetShopAddresses() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["shopAddresses"],
    queryFn: () => getShopAddresses(),
  });
  return { isLoading, error, shopAddress: data };
}

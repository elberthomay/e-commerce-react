import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "../../api/address";

export default function useGetUserAddresses() {
  const result = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => getUserAddresses(),
  });
  return { ...result, userAddresses: result.data };
}

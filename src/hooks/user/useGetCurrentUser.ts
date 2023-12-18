import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/user";

export default function useGetCurrentUser() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
  return {
    isLoading,
    error,
    currentUser: data,
    isAuthenticated: data?.email !== undefined,
  };
}

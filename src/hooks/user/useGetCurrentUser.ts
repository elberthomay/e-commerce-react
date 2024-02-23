import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/user";

export const currentUserKeyObject = { queryKey: ["currentUser"] };

export default function useGetCurrentUser() {
  const { isLoading, error, data } = useQuery({
    ...currentUserKeyObject,
    queryFn: () => getCurrentUser(),
  });
  return {
    isLoading,
    error,
    currentUser: data,
    isAuthenticated: data?.email !== undefined,
  };
}

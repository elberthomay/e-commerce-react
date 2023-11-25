import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../api/user";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
  return { isLoading, logout: mutate };
}

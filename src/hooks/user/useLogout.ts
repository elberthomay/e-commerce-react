import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/user";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      console.log("on success run");
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },
  });
  return { isLoading: isPending, logout: mutateAsync };
}

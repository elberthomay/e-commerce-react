import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../api/user";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: { email: string; password: string }) =>
      login(loginData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser", "cart", "myShop"],
      });
    },
  });
  return { isLoading: isPending, error, login: mutateAsync };
}

import { useMutation, useQueryClient } from "react-query";
import { login } from "../../api/user";

export default function useLogin() {
  const queryClient = useQueryClient();
  const { isLoading, error, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (loginData: { email: string; password: string }) =>
      login(loginData),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      console.log("success");
    },
  });
  return { isLoading, error, login: mutate };
}

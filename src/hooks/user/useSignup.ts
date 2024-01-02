import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/user";

export default function useSignup() {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: { email: string; name: string; password: string }) =>
      signup(userData),
  });
  return { isLoading: isPending, error, signup: mutateAsync };
}

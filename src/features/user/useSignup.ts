import { useMutation } from "react-query";
import { signup } from "../../api/user";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: { email: string; name: string; password: string }) =>
      signup(userData),
    onSuccess: () => navigate("/login"),
  });
  return { isLoading, error, signup: mutate };
}

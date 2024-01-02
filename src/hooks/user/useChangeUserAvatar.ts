import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserAvatar } from "../../api/user";

export default function useChangeUserAvatar() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["changeUserAvatar"],
    mutationFn: (image: Blob) => changeUserAvatar(image),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
  return { isLoading: isPending, error, changeUserAvatar: mutateAsync };
}

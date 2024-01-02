import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserUpdateType } from "../../type/userType";
import { updateCurrentUser } from "../../api/user";

export default function useUpdateCurrentUser() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["changeUserAvatar"],
    mutationFn: (updateData: UserUpdateType) => updateCurrentUser(updateData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
  return { isLoading: isPending, error, updateCurrentUser: mutateAsync };
}

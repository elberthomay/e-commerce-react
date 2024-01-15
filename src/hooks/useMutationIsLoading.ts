import { MutationKey, useMutationState } from "@tanstack/react-query";

/**
 * hook to easily check if a certain mutation is loading
 */
function useMutationIsLoading(mutationKey?: MutationKey) {
  const pendingMutations = useMutationState({
    filters: { mutationKey, status: "pending" },
  });

  const updateIsLoading = pendingMutations.length > 0;
  return updateIsLoading;
}

export default useMutationIsLoading;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "../../api/cart";
import { cartKeyObject } from "./useGetCart";
import { cartOutputType } from "../../type/cartType";
import useMutationIsLoading from "../useMutationIsLoading";
import { currentUserKeyObject } from "../user/useGetCurrentUser";

const mutationKey = ["deleteCart"];

export default function useDeleteCarts() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey,
    mutationFn: (itemIds: string[]) =>
      Promise.all(itemIds.map((itemId) => deleteCart({ itemId }))),
    onMutate: async (itemIds: string[]) => {
      await queryClient.cancelQueries(cartKeyObject);
      const prevCart = queryClient.getQueriesData(cartKeyObject);
      queryClient.setQueriesData(cartKeyObject, (cart?: cartOutputType[]) =>
        //delete if itemId exist in cart to delete
        cart?.filter(({ itemId }) =>
          itemIds.find((idToDelete) => idToDelete === itemId)
        )
      );
      return { prevCart };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(cartKeyObject);
      await queryClient.invalidateQueries(currentUserKeyObject);
    },
  });
  return { isLoading: isPending, error, deleteCarts: mutateAsync };
}

export const useDeleteCartsIsLoading = () => useMutationIsLoading(mutationKey);

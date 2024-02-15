import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart } from "../../api/cart";
import { cartOutputType, cartUpdateType } from "../../type/cartType";
import { cartKeyObject } from "./useGetCart";
import useMutationIsLoading from "../useMutationIsLoading";

export const mutationKey = ["updateCarts"];

export default function useUpdateCarts() {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey,
    mutationFn: (
      updateDatas: {
        itemId: string;
        updateData: cartUpdateType;
      }[]
    ) =>
      Promise.all(
        updateDatas.map(({ itemId, updateData }) =>
          updateCart({ ...updateData, itemId })
        )
      ),
    onMutate: async (
      updateDatas: {
        itemId: string;
        updateData: cartUpdateType;
      }[]
    ) => {
      await queryClient.cancelQueries(cartKeyObject);
      const prevCart = queryClient.getQueriesData(cartKeyObject);
      queryClient.setQueriesData(cartKeyObject, (cart?: cartOutputType[]) =>
        cart?.map((item) => {
          //find updateData for the cart item, update item if exist
          const updateData = updateDatas.find(
            ({ itemId }) => itemId === item.itemId
          );
          if (updateData) return { ...item, ...updateData.updateData };
          else return item;
        })
      );
      return { prevCart };
    },
    onError: (_, __, context) =>
      queryClient.setQueriesData(cartKeyObject, context?.prevCart),
    onSettled: () => {
      return queryClient.invalidateQueries(cartKeyObject);
    },
  });
  return { isLoading: isPending, error, updateCarts: mutateAsync };
}

export const useUpdateCartsIsLoading = () => useMutationIsLoading(mutationKey);

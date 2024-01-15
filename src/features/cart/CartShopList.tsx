import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import CartRow from "./CartRow";
import Checkbox from "../../ui/Checkbox";
import useUpdateCarts, {
  mutationKey,
  useUpdateCartsIsLoading,
} from "../../hooks/cart/useUpdateCarts";
import toast from "react-hot-toast";
import { useMutationState } from "@tanstack/react-query";
import { useDeleteCartsIsLoading } from "../../hooks/cart/useDeleteCarts";

function CartShopList({
  cartShop,
}: {
  cartShop: { shopId: string; shopName: string; items: cartOutputType[] };
}) {
  const { shopId, shopName, items } = cartShop;
  const { updateCarts } = useUpdateCarts();
  const allSelected = items.every(({ selected }) => selected);

  const updateIsLoading = useUpdateCartsIsLoading();
  const deleteIsLoading = useDeleteCartsIsLoading();

  const isLoading = updateIsLoading || deleteIsLoading;

  async function handleShopToggleSelected() {
    try {
      await updateCarts(
        items.map(({ itemId }) => ({
          itemId,
          updateData: { selected: !allSelected },
        }))
      );
    } catch (e) {
      toast.error("Error updating cart");
    }
  }
  return (
    <div className="p-6 flex flex-col gap-4 justify-between last:rounded-b-lg shadow-lg border border-slate-300">
      <div className="flex items-center gap-4">
        <Checkbox
          type="checkbox"
          id={`selected${shopId}`}
          checked={allSelected}
          disabled={isLoading}
          onChange={handleShopToggleSelected}
        />
        <Link className="font-bold" to={`/shop/${shopId}`}>
          {shopName}
        </Link>
      </div>
      {items.map((item) => (
        <CartRow key={item.itemId} cartItem={item} />
      ))}
    </div>
  );
}

export default CartShopList;

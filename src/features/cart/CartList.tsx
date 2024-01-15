import { cartOutputType } from "../../type/cartType";
import CartShopList from "./CartShopList";
import Checkbox from "../../ui/Checkbox";
import useUpdateCarts, {
  useUpdateCartsIsLoading,
} from "../../hooks/cart/useUpdateCarts";
import toast from "react-hot-toast";
import useDeleteCarts, {
  useDeleteCartsIsLoading,
} from "../../hooks/cart/useDeleteCarts";

function CartList({ cart }: { cart: cartOutputType[] }) {
  //convert cart to entries by shop
  const cartByShop = new Map<
    string,
    { shopId: string; shopName: string; items: cartOutputType[] }
  >();
  cart.forEach((item) => {
    const shopEntry = cartByShop.get(item.shopId);
    if (!shopEntry)
      cartByShop.set(item.shopId, {
        shopId: item.shopId,
        shopName: item.shopName,
        items: [item],
      });
    else
      cartByShop.set(item.shopId, {
        ...shopEntry,
        items: [...shopEntry.items, item],
      });
  });

  const { updateCarts } = useUpdateCarts();
  const { deleteCarts } = useDeleteCarts();

  const updateIsLoading = useUpdateCartsIsLoading();
  const deleteIsLoading = useDeleteCartsIsLoading();

  const isLoading = updateIsLoading || deleteIsLoading;

  const allSelected = cart.every(({ selected }) => selected);
  const anySelected = cart.some(({ selected }) => selected);

  async function handleAllToggleSelected() {
    try {
      await updateCarts(
        cart.map(({ itemId }) => ({
          itemId,
          updateData: { selected: !allSelected },
        }))
      );
    } catch (e) {
      toast.error("Error updating cart");
    }
  }

  function handleDeleteSelected() {
    deleteCarts(cart.filter((selected) => selected).map((item) => item.itemId));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 flex justify-between rounded-t-lg shadow-lg border border-slate-300">
        <div className="flex items-center gap-4">
          <Checkbox
            type="checkbox"
            id="selectAllCart"
            checked={allSelected}
            onChange={handleAllToggleSelected}
            disabled={isLoading}
          />
          <label className="font-bold" htmlFor="selectAllCart">
            Select All
          </label>
        </div>
        {anySelected && (
          <button
            className="text-governor-bay-800 font-bold disabled:text-slate-300"
            onClick={handleDeleteSelected}
            disabled={isLoading}
          >
            Delete Selected
          </button>
        )}
      </div>

      {Array.from(cartByShop.values()).map((cartShop) => (
        <CartShopList key={cartShop.shopId} cartShop={cartShop} />
      ))}
    </div>
  );
}

export default CartList;

import { cartOutputType } from "../../type/cartType";
import CartShopList from "./CartShopList";
import useDeleteCart from "../../hooks/cart/useDeleteCart";
import useUpdateCart from "../../hooks/cart/useUpdateCart";
import Checkbox from "../../ui/Checkbox";

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

  const { isLoading, error, updateCart } = useUpdateCart();
  const {
    isLoading: deleteIsLoading,
    error: deleteError,
    deleteCart,
  } = useDeleteCart();

  const allSelected = cart.every(({ selected }) => selected);
  const anySelected = cart.some(({ selected }) => selected);

  function handleToggleSelect() {
    cart.map(({ itemId }) =>
      updateCart({ itemId, updateData: { selected: !allSelected } })
    );
  }

  function handleDeleteSelected() {
    cart.filter((selected) => selected).map(({ itemId }) => deleteCart(itemId));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 flex justify-between rounded-t-lg shadow-lg border border-slate-300">
        <div className="flex items-center gap-4">
          <Checkbox
            type="checkbox"
            id="selectAllCart"
            checked={allSelected}
            onChange={handleToggleSelect}
            disabled={isLoading}
          />
          <label className="font-bold" htmlFor="selectAllCart">
            Select All
          </label>
        </div>
        {anySelected && (
          <button
            className="text-governor-bay-800 font-bold"
            onClick={handleDeleteSelected}
            disabled={deleteIsLoading}
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

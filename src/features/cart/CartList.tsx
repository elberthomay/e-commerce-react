import { cartOutputType } from "../../type/cartType";
import CartShopList from "./CartShopList";
import useDeleteCart from "../../hooks/cart/useDeleteCart";
import useUpdateCart from "../../hooks/cart/useUpdateCart";

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
    <div>
      <input
        type="checkbox"
        id="selectAllCart"
        checked={allSelected}
        onChange={handleToggleSelect}
        disabled={isLoading}
      />
      <label htmlFor="selectAllCart">Select all</label>
      {anySelected && (
        <button onClick={handleDeleteSelected} disabled={deleteIsLoading}>
          Delete Selected
        </button>
      )}
      <ul>
        {Array.from(cartByShop.values()).map((cartShop) => (
          <CartShopList key={cartShop.shopId} cartShop={cartShop} />
        ))}
      </ul>
    </div>
  );
}

export default CartList;

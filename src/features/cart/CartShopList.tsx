import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import CartRow from "./CartRow";
import { updateCart } from "../../api/cart";
import useUpdateCart from "../../hooks/cart/useUpdateCart";
import Checkbox from "../../ui/Checkbox";

function CartShopList({
  cartShop,
}: {
  cartShop: { shopId: string; shopName: string; items: cartOutputType[] };
}) {
  const { shopId, shopName, items } = cartShop;
  const { isLoading, error, updateCart } = useUpdateCart();
  const allSelected = items.every(({ selected }) => selected);

  function toggleAll() {
    items.map(({ itemId }) =>
      updateCart({ itemId, updateData: { selected: !allSelected } })
    );
  }
  return (
    <div className="p-6 flex flex-col gap-4 justify-between last:rounded-b-lg shadow-lg border border-slate-300">
      <div className="flex items-center gap-4">
        <Checkbox
          type="checkbox"
          id={`selected${shopId}`}
          checked={allSelected}
          disabled={isLoading}
          onClick={toggleAll}
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

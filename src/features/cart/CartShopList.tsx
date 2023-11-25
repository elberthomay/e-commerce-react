import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import CartRow from "./CartRow";
import { updateCart } from "../../api/cart";
import useUpdateCart from "./useUpdateCart";

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
    <div>
      <input
        type="checkbox"
        id={`selected${shopId}`}
        checked={allSelected}
        disabled={isLoading}
        onClick={toggleAll}
      />
      <Link to={`/shop/${shopId}`}>
        <p>{shopName}</p>
      </Link>
      <div>
        {items.map((item) => (
          <CartRow key={item.itemId} cartItem={item} />
        ))}
      </div>
    </div>
  );
}

export default CartShopList;

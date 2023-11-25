import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import Counter from "../../components/Counter";
import useUpdateCart from "./useUpdateCart";
import { useEffect, useState } from "react";

function CartRow({ cartItem }: { cartItem: cartOutputType }) {
  const { itemId, name, price, inventory, quantity, selected } = cartItem;
  const { isLoading, error, updateCart } = useUpdateCart();
  const [tempQuantity, setTempQuantity] = useState(quantity);
  function toggleSelected() {
    updateCart({ itemId, updateData: { selected: !selected } });
  }

  function handleChangeTempQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(e.target.value);
    if (Number.isInteger(newQuantity) && quantity > 1)
      setTempQuantity(newQuantity <= inventory ? newQuantity : inventory);
  }

  useEffect(() => {
    function handleQuantityUpdate(newQuantity: number) {
      updateCart(
        { itemId, updateData: { quantity: newQuantity } },
        {
          onError: (data) => {
            setTempQuantity(quantity);
          },
        }
      );
    }

    if (quantity !== tempQuantity) {
      const timeoutId = setTimeout(() => {
        handleQuantityUpdate(tempQuantity);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [tempQuantity, quantity, itemId, updateCart]);

  return (
    <li>
      <input
        type="checkBox"
        checked={selected}
        id={`check${itemId}`}
        onClick={toggleSelected}
        disabled={isLoading}
      />
      <Link to={`/item/${itemId}`}>
        <p>{name}</p>
        <p>{price}</p>
      </Link>
      <Counter
        disabled={isLoading}
        min={1}
        max={inventory}
        onInc={() =>
          setTempQuantity((quantity) =>
            quantity + 1 <= inventory ? quantity + 1 : inventory
          )
        }
        onDec={() =>
          setTempQuantity((quantity) =>
            quantity - 1 <= inventory ? quantity - 1 : inventory
          )
        }
        onChange={handleChangeTempQuantity}
        value={tempQuantity}
      />
      {quantity > inventory && (
        <p>Cannot exceed maximum quantity of {inventory}</p>
      )}
    </li>
  );
}

export default CartRow;

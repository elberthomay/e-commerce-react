import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import Counter from "../../components/Counter";
import useUpdateCart from "../../hooks/cart/useUpdateCart";
import { useEffect, useState } from "react";
import { createImageUrl } from "../../api/image";
import Checkbox from "../../ui/Checkbox";
import { formatPrice } from "../../utilities/intlUtils";
import { LuTrash2 } from "react-icons/lu";

function CartRow({ cartItem }: { cartItem: cartOutputType }) {
  const { itemId, name, price, inventory, image, quantity, selected } =
    cartItem;
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

  const incTempQuantity = () => setTempQuantity((quantity) => quantity + 1);
  const decTempQuantity = () => setTempQuantity((quantity) => quantity - 1);

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
    <div className="flex gap-4">
      <Checkbox
        type="checkBox"
        checked={selected}
        id={`check${itemId}`}
        onClick={toggleSelected}
        disabled={isLoading}
      />
      <img
        className="h-[4.5rem] w-[4.5rem] border border-slate-300 rounded-lg"
        src={createImageUrl(image ?? "image-not-found.webp")}
        alt={name}
      />
      <div className="flex-1 grid grid-cols-[1fr_max-content] gap-y-3">
        <div className="flex flex-col">
          <Link className="line-clamp-2 text-elipsis" to={`/item/${itemId}`}>
            {name}
          </Link>
        </div>
        <p className="font-bold text-lg">{formatPrice(price)}</p>
        <div className="col-span-2 flex gap-4 justify-end items-center ">
          <LuTrash2 className="h-6 w-6 text-slate-500" />
          <Counter
            disabled={isLoading}
            min={1}
            max={inventory}
            onInc={incTempQuantity}
            onDec={decTempQuantity}
            onChange={handleChangeTempQuantity}
            value={tempQuantity}
          />
        </div>
      </div>

      {quantity > inventory && (
        <p>Cannot exceed maximum quantity of {inventory}</p>
      )}
    </div>
  );
}

export default CartRow;

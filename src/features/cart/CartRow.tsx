import { Link } from "react-router-dom";
import { cartOutputType } from "../../type/cartType";
import Counter from "../../components/Counter";
import { useCallback, useEffect, useState } from "react";
import { createImageUrl } from "../../api/image";
import Checkbox from "../../ui/Checkbox";
import { formatPrice } from "../../utilities/intlUtils";
import { LuTrash2 } from "react-icons/lu";
import useUpdateCarts, {
  useUpdateCartsIsLoading,
} from "../../hooks/cart/useUpdateCarts";
import useDeleteCarts, {
  useDeleteCartsIsLoading,
} from "../../hooks/cart/useDeleteCarts";

function CartRow({ cartItem }: { cartItem: cartOutputType }) {
  const { itemId, name, price, inventory, image, quantity, selected } =
    cartItem;
  const { updateCarts } = useUpdateCarts();
  const { deleteCarts } = useDeleteCarts();
  const updateCartsIsLoading = useUpdateCartsIsLoading();
  const deleteCartsIsLoading = useDeleteCartsIsLoading();
  const [tempQuantity, setTempQuantity] = useState(quantity);

  function toggleSelected() {
    updateCarts([{ itemId, updateData: { selected: !selected } }]);
  }

  const setQuantity = useCallback(
    (quantity: number) => {
      updateCarts([{ itemId, updateData: { quantity } }], {
        onError: (data) => {
          setTempQuantity(quantity);
        },
      });
    },
    [itemId, updateCarts]
  );

  function handleTempQuantityChange(quantity: number) {
    if (Number.isInteger(quantity) && quantity > 0 && quantity <= inventory)
      setTempQuantity(quantity);
  }

  //debounce
  useEffect(() => {
    if (quantity !== tempQuantity) {
      const timeoutId = setTimeout(() => {
        setQuantity(tempQuantity);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [tempQuantity, quantity, itemId, setQuantity]);

  const isLoading = updateCartsIsLoading || deleteCartsIsLoading;

  return (
    <div className="flex gap-4">
      <Checkbox
        type="checkBox"
        checked={selected}
        id={`check${itemId}`}
        onChange={toggleSelected}
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
          <button
            className="group"
            disabled={isLoading}
            onClick={() => deleteCarts([itemId])}
          >
            <LuTrash2 className="h-6 w-6 text-slate-500 transition-colors duration-100 hover:text-slate-700 group-[:disabled]:text-slate-300" />
          </button>
          <Counter
            disabled={isLoading}
            min={1}
            max={inventory}
            onChange={handleTempQuantityChange}
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

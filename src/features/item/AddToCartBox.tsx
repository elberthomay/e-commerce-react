import { HTMLAttributes, forwardRef, useState } from "react";
import Counter from "../../components/Counter";
import Button from "../../ui/Button";
import { formatPrice } from "../../utilities/intlUtils";
import { useCreateCartsIsLoading } from "../../hooks/cart/useCreateCart";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { twMerge } from "tailwind-merge";

const AddToCartBox = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    itemId: string;
    price: number;
    inventory: number;
    onAddToCart: (itemId: string, quantity: number) => void;
  }
>(({ itemId, price, inventory, onAddToCart, ...props }, forwardedRef) => {
  const [quantity, setQuantity] = useState<number>(1);
  const isLoading = useCreateCartsIsLoading();

  function handleChange(newQuantity: number) {
    if (newQuantity <= inventory && Number.isInteger(newQuantity))
      setQuantity(newQuantity);
  }

  return (
    <div
      {...props}
      className={twMerge(
        " min-w-60 flex flex-col gap-8 border border-slate-300 rounded-lg p-4",
        props.className
      )}
      ref={forwardedRef}
    >
      <p className="font-bold text-md">Set quantity and add to cart</p>
      <div className="flex gap-4 items-center">
        <Counter
          onChange={handleChange}
          value={quantity}
          disabled={isLoading}
          min={1}
          max={inventory}
          className="w-fit"
        />
        <p>
          stock: <span className="font-bold">{inventory}</span>
        </p>
      </div>
      <p className="flex justify-between items-center">
        Subtotal:{" "}
        <span className="font-bold text-xl">
          {formatPrice(price * quantity)}
        </span>
      </p>

      <Button
        disabled={isLoading}
        onClick={() => onAddToCart(itemId, quantity)}
        className="align-center"
      >
        {isLoading ? <ButtonSpinner /> : "Add to cart"}
      </Button>
    </div>
  );
});

export default AddToCartBox;

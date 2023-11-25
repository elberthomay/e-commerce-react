import React, { useState } from "react";
import useCreateCart from "../cart/useCreateCart";
import Counter from "../../components/Counter";

function AddToCartBox({
  itemId,
  inventory,
}: {
  itemId: string;
  inventory: number;
}) {
  const { isLoading, error, createCart } = useCreateCart();
  const [quantity, setQuantity] = useState<number>(1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(e.target.value);
    if (newQuantity <= inventory && Number.isInteger(newQuantity))
      setQuantity(newQuantity);
  }

  function handleInc() {
    if (quantity < inventory) setQuantity((quantity) => quantity + 1);
  }
  function handleDec() {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
  }
  return (
    <div>
      <Counter
        onInc={handleInc}
        onDec={handleDec}
        onChange={handleChange}
        value={quantity}
        disabled={isLoading}
        min={1}
        max={inventory}
      />

      <button onClick={() => createCart({ itemId: itemId, quantity })}>
        Add to cart
      </button>
    </div>
  );
}

export default AddToCartBox;

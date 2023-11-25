import { cartOutputType } from "../../type/cartType";

function CartSummary({ cart }: { cart: cartOutputType[] }) {
  const allAvailable = cart.every(
    ({ quantity, inventory }) => quantity <= inventory
  );
  const { itemCount, itemPrice } = cart.reduce(
    (acc, { quantity, price, selected }) =>
      selected
        ? {
            itemCount: acc.itemCount + quantity,
            itemPrice: acc.itemPrice + quantity * price,
          }
        : acc,
    { itemCount: 0, itemPrice: 0 }
  );
  return (
    <>
      <div>
        <h1>Cart Summary</h1>
        <p>TotalPrice({itemCount}):</p>
        <p>{itemPrice}</p>
      </div>
      {itemCount > 0 && allAvailable && <button>Buy now</button>}
    </>
  );
}

export default CartSummary;

import { useMutationState } from "@tanstack/react-query";
import {
  mutationKey,
  useUpdateCartsIsLoading,
} from "../../hooks/cart/useUpdateCarts";
import { cartOutputType } from "../../type/cartType";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { formatPrice } from "../../utilities/intlUtils";

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

  const updateIsLoading = useUpdateCartsIsLoading();

  const isLoading = updateIsLoading;

  const orderEnabled = itemCount > 0 && allAvailable && !isLoading;

  const textColorClassName = !orderEnabled ? "text-slate-500" : "";
  const itemCountText = itemCount > 0 && `(${itemCount})`;

  return (
    <div className="flex flex-col gap-3 p-8 rounded-lg shadow-lg border border-slate-200">
      <h1 className="text-md font-bold">Cart Summary</h1>
      <div
        className={`flex justify-between items-center ${textColorClassName}`}
      >
        <p>Total {itemCountText}:</p>
        <p className="text-lg font-bold ">
          {orderEnabled ? formatPrice(itemPrice) : "-"}
        </p>
      </div>
      <div className="h-[1px] bg-slate-300 w-full my-3"></div>
      <Button className="w-full flex justify-center" disabled={!orderEnabled}>
        {isLoading ? <ButtonSpinner /> : "Buy now"}
      </Button>
    </div>
  );
}

export default CartSummary;

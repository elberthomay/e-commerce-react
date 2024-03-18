import toast from "react-hot-toast";
import { useUpdateCartsIsLoading } from "../../hooks/cart/useUpdateCarts";
import useProcessOrders from "../../hooks/order/useProcessOrders";
import { cartOutputType } from "../../type/cartType";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { formatPrice } from "../../utilities/intlUtils";
import { RequestError } from "../../error/RequestError";
import { useNavigate } from "react-router-dom";

function CartSummary({ cart }: { cart: cartOutputType[] }) {
  const updateIsLoading = useUpdateCartsIsLoading();
  const { isLoading: orderProcessLoading, processOrders } = useProcessOrders();
  const navigate = useNavigate();

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

  function handleProcessOrders() {
    const processOrdersPromise = processOrders();
    toast.promise(processOrdersPromise, {
      success: () => {
        navigate("/orders");
        return "Order successfully created";
      },
      loading: "Creating order",
      error: (error) => {
        if (error instanceof RequestError && error.status !== 500)
          return error.message;
        else return "Failed creating order";
      },
    });
  }

  const isLoading = updateIsLoading || orderProcessLoading;

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
      <Button
        className="w-full flex justify-center"
        disabled={!orderEnabled}
        onClick={handleProcessOrders}
      >
        {isLoading ? <ButtonSpinner /> : "Buy now"}
      </Button>
    </div>
  );
}

export default CartSummary;

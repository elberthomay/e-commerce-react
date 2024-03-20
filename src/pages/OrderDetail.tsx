import { Link, useParams } from "react-router-dom";
import useGetOrderDetail from "../hooks/order/useGetOrderDetail";
import GutteredBox from "../ui/GutteredBox";
import Spinner from "../components/Spinner";
import { RequestError } from "../error/RequestError";
import { orderStatusDisplayText } from "../variables/orderStatusBoxClassName";
import { z } from "zod";
import { OrderStatuses, getOrderDetailOutputSchema } from "@elycommerce/common";
import { format } from "date-fns";
import { HiChevronRight } from "react-icons/hi2";
import { useState } from "react";
import { createItemCardImageUrl } from "../api/image";
import { formatPrice } from "../utilities/intlUtils";
import Button from "../ui/Button";
import ErrorBody from "../components/ErrorBody";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import useGetCurrentShop from "../hooks/shop/useGetCurrentShop";
import useCancelOrder from "../hooks/order/useCancelOrder";
import toast from "react-hot-toast";
import CustomDialog from "../components/CustomDialog";
import OrderConfirmationBody from "../features/order/OrderConfirmationBody";
import useDeliverOrder from "../hooks/order/useDeliverOrder";
import useConfirmOrder from "../hooks/order/useConfirmOrder";

function OrderDetail() {
  const { orderId } = useParams();
  const {
    isLoading: getOrderIsLoading,
    error,
    orderDetail,
  } = useGetOrderDetail(orderId ?? "");
  const { isLoading: getCurrentUserIsLoading, currentUser } =
    useGetCurrentUser();
  const { isLoading: getCurrentShopIsLoading, currentShop } =
    useGetCurrentShop();

  const isLoading =
    getOrderIsLoading || getCurrentUserIsLoading || getCurrentShopIsLoading;

  const accessor: "shop" | "user" =
    currentShop?.id === orderDetail?.shopId ||
    currentUser?.privilege === 0 ||
    currentUser?.privilege === 1
      ? "shop"
      : "user";

  const notFoundError =
    error instanceof RequestError &&
    (error.status === 400 || error.status === 404);
  return (
    <>
      {isLoading && <Spinner />}
      {error &&
        (notFoundError ? (
          <OrderNotFoundError orderId={orderId ?? ""} />
        ) : (
          <ErrorBody />
        ))}
      {orderDetail && (
        <OrderDetailBody orderDetail={orderDetail} accessor={accessor} />
      )}
    </>
  );
}

function OrderNotFoundError({ orderId }: { orderId: string }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-6">
      <p>Order {orderId} does not exist</p>
      <Link to="/orders">
        <Button>Return to order list</Button>
      </Link>
    </div>
  );
}

function OrderDetailBody({
  orderDetail,
  accessor,
}: {
  orderDetail: z.infer<typeof getOrderDetailOutputSchema>;
  accessor: "user" | "shop";
}) {
  // const {confirmOrder} = useConfirmOrder()
  const { confirmOrder } = useConfirmOrder(orderDetail.id);
  const { deliverOrder } = useDeliverOrder(orderDetail.id);
  const { cancelOrder } = useCancelOrder(orderDetail.id);

  function handleConfirmOrder() {
    const confirmOrderPromise = confirmOrder();
    toast.promise(confirmOrderPromise, {
      loading: "Confirming Order",
      error: "Error confirming order",
      success: "Order confirmed successfully",
    });
  }

  function handleDeliverOrder() {
    const deliverOrderPromise = deliverOrder();
    toast.promise(deliverOrderPromise, {
      loading: "Initiating delivery Order",
      error: "Error initiating delivery order",
      success: "Order delivery initiated successfully",
    });
  }

  function handleCancelOrder() {
    const cancelOrderPromise = cancelOrder();
    toast.promise(cancelOrderPromise, {
      loading: "Cancelling Order",
      error: "Error cancelling order",
      success: "Order cancelled successfully",
    });
  }

  const {
    id,
    shopId,
    shopName,
    items,
    createdAt,
    totalPrice,
    status,
    recipient,
    phoneNumber,
    village,
    district,
    city,
    province,
    country,
    postCode,
    addressDetail,
  } = orderDetail;
  const totalItemCount = items.reduce((sum, { quantity }) => sum + quantity, 0);
  const totalItemPrice = items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );
  return (
    <GutteredBox className="flex flex-col gap-5 p-2">
      <h1 className="text-3xl font-bold">Order Detail</h1>
      <p className="font-bold">Order {orderStatusDisplayText[status]}</p>
      <div className="grid grid-cols-2 justify-between gap-2 text-sm">
        <p className="text-slate-400">Order Id</p>
        <p className="font-bold text-right">{id}</p>
        <p className="text-slate-400">Purchase Date</p>
        <p className="font-bold text-right">
          {format(new Date(createdAt), "d MMMM u, HH:mm")}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="flex justify-between items-center font-bold">
          <span>Item Detail</span>
          <Link
            to={`/shop/${shopId}`}
            className="group flex items-center gap-2 text-sm "
          >
            <span className="group-hover:text-governor-bay-800">
              {shopName}
            </span>

            <HiChevronRight className="h-3 text-slate-400" />
          </Link>
        </p>
        <OrderItemList items={items} orderId={id} />
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-bold">Delivery Detail</p>
        <div className="grid grid-cols-[auto_1fr] gap-4 items-start text-sm">
          <p className="flex justify-between min-w-20 text-slate-400">
            <span>Address</span> <span>:</span>
          </p>
          <div>
            <p className="font-bold">{recipient}</p>
            <p>{phoneNumber}</p>
            <p>{addressDetail}</p>
            <p className="capitalize">
              {[village, district, city].filter((w) => w).join(", ")}
            </p>
            <p>
              {province}, {country} {postCode ?? ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-bold">Payment Detail</p>
        <div className="grid grid-cols-2 justify-between text-sm gap-4">
          <p className="text-slate-400">
            Total Item Price({totalItemCount} Item{totalItemCount > 1 && "s"})
          </p>
          <p className="text-right">{formatPrice(totalItemPrice)}</p>
        </div>
      </div>
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>{formatPrice(totalPrice)}</p>
      </div>
      <div className="flex justify-around">
        {status === OrderStatuses.AWAITING && accessor === "shop" && (
          <CustomDialog trigger={<Button>Confirm Order</Button>}>
            <OrderConfirmationBody
              message="Would you like to confirm this order?"
              confirmationString="confirm order"
              onConfirm={handleConfirmOrder}
            />
          </CustomDialog>
        )}
        {status === OrderStatuses.CONFIRMED && accessor === "shop" && (
          <CustomDialog
            trigger={<Button variant="green">Deliver Order</Button>}
          >
            <OrderConfirmationBody
              message="Would you like to deliver this order?"
              confirmationString="deliver order"
              onConfirm={handleDeliverOrder}
            />
          </CustomDialog>
        )}
        {(status === OrderStatuses.AWAITING ||
          (status === OrderStatuses.CONFIRMED && accessor === "shop")) && (
          <CustomDialog trigger={<Button variant="red">Cancel Order</Button>}>
            <OrderConfirmationBody
              message="Would you like to cancel this order?"
              confirmationString="cancel order"
              onConfirm={handleCancelOrder}
            />
          </CustomDialog>
        )}
      </div>
    </GutteredBox>
  );
}

function OrderItemList({
  items,
  orderId,
}: {
  items: z.infer<typeof getOrderDetailOutputSchema>["items"];
  orderId: string;
}) {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      {items.slice(0, showAll ? undefined : 1).map((item) => (
        <OrderItem key={item.id} item={item} orderId={orderId} />
      ))}
      {items.length > 1 && (
        <p
          data-all={showAll}
          onClick={() => setShowAll((show) => !show)}
          className="group self-start flex gap-2 items-center font-bold text-governor-bay-600 hover:text-governor-bay-800 transition cursor-pointer"
        >
          <span>Show All</span>
          <HiChevronRight className="h-5 w-5 rotate-90 group-data-[all=true]:-rotate-90 transition duration-500" />
        </p>
      )}
    </div>
  );
}

function OrderItem({
  item,
  orderId,
}: {
  item: z.infer<typeof getOrderDetailOutputSchema>["items"][number];
  orderId: string;
}) {
  const { id, image, name, quantity, price } = item;
  return (
    <div className="p-2 border border-slate-300 rounded-md">
      <div className="grid gap-3 grid-cols-[auto_1fr_auto]">
        <img
          src={createItemCardImageUrl(image)}
          alt={`${name}'s image`}
          className="h-0 min-h-full aspect-square"
        />
        <div>
          <Link to={`/order/${orderId}/item/${id}`}>
            <p className="font-bold line-clamp-2 text-ellipsis" title={name}>
              {name}
            </p>
          </Link>
          <p className="text-slate-300">
            <span>{quantity}</span> x <span>{formatPrice(price)}</span>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p>Total Price</p>
          <p className="font-bold">{formatPrice(quantity * price)}</p>
        </div>
      </div>
      {/* buy again */}
    </div>
  );
}

export default OrderDetail;

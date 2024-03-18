import { Link, useNavigate, useParams } from "react-router-dom";
import useGetOrderItem from "../hooks/order/useGetOrderItem";
import Spinner from "../components/Spinner";
import { RequestError } from "../error/RequestError";
import Button from "../ui/Button";
import ErrorBody from "../components/ErrorBody";
import { z } from "zod";
import { orderItemOutputSchema } from "@elycommerce/common";
import GutteredBox from "../ui/GutteredBox";
import { HiArrowLeft } from "react-icons/hi2";
import { format } from "date-fns";
import ImageDisplay from "../ui/ImageDisplay";
import { formatPrice } from "../utilities/intlUtils";
import useGetItem from "../hooks/item/useGetItem";
import { useMaxBreakpoints } from "../hooks/useWindowSize";

function OrderItem() {
  const { orderId, itemId } = useParams();
  const {
    isLoading: orderItemIsLoading,
    error,
    orderItem,
  } = useGetOrderItem(orderId ?? "", itemId ?? "");
  const { isLoading: itemIsLoading, item } = useGetItem(itemId ?? "");
  console.log(item);
  const isLoading = orderItemIsLoading || itemIsLoading;
  return (
    <>
      {isLoading && <Spinner />}
      {error &&
        (error instanceof RequestError ? (
          <OrderItemNotFoundError
            orderId={orderId ?? ""}
            itemId={itemId ?? ""}
          />
        ) : (
          <ErrorBody />
        ))}
      {orderItem && (
        <OrderItemBody
          orderItem={orderItem}
          orderId={orderId ?? ""}
          available={!!item}
        />
      )}
    </>
  );
}

function OrderItemBody({
  orderItem,
  orderId,
  available,
}: {
  orderItem: z.infer<typeof orderItemOutputSchema>;
  orderId: string;
  available: boolean;
}) {
  const navigate = useNavigate();
  const { id, createdAt, name, images, description, price } = orderItem;
  const { isSm } = useMaxBreakpoints();
  return (
    <GutteredBox>
      <div className="flex items-center gap-4 bg-slate-100 border border-slate-300 rounded-md">
        <button
          onClick={() => navigate(`/order/${orderId}`)}
          className="flex p-4 justify-center items-center hover:bg-slate-300"
        >
          <HiArrowLeft className="h-5 w-5" />
        </button>
        <p>
          Displaying item snapshot ordered at{" "}
          <span className="font-bold">
            {format(new Date(createdAt), "d MMMM Y H:m")}
          </span>
        </p>
      </div>
      <div className=" w-full max-w- p-4 pt-8 flex justify-center flex-col items-stretch sm:grid sm:grid-cols-[minmax(18rem,0.7fr),minmax(20rem,1fr),minmax(15rem,17rem)] sm:items-start gap-x-6">
        <ImageDisplay images={images} />
        <div className="flex flex-col gap-4 h-[200rem]">
          <h1 className="font-bold text-xl">{name}</h1>
          <p className=" text-2xl font-bold">{formatPrice(price)}</p>
          <p className="font-bold text-lg">Description:</p>
          <p className="">{description}</p>
        </div>
        {isSm ? (
          <Button
            disabled={!available}
            className="w-30"
            onClick={() => navigate(`/item/${id}`)}
          >
            View Live Product Page
          </Button>
        ) : (
          <div className="fixed bottom-0 left-0 w-screen p-3 rounded-t-md">
            <Button
              disabled={!available}
              className="w-full"
              onClick={() => navigate(`/item/${id}`)}
            >
              View Live Product Page
            </Button>
          </div>
        )}
      </div>
    </GutteredBox>
  );
}

function OrderItemNotFoundError({
  orderId,
  itemId,
}: {
  orderId: string;
  itemId: string;
}) {
  return (
    <div className="flex gap-4 justify-center items-center mt-6">
      <p>
        Item {itemId} from order {orderId} does not exist
      </p>
      <Link to="/orders">
        <Button>Return to order list</Button>
      </Link>
    </div>
  );
}

export default OrderItem;

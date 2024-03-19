import Spinner from "../../components/Spinner";
import { RequestError } from "../../error/RequestError";
import OrderListItem from "./OrderListItem";
import { useInView } from "react-intersection-observer";
import { z } from "zod";
import { getOrdersOutputSchema } from "@elycommerce/common";

function OrderList({
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  orders,
}: {
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  orders?: z.infer<typeof getOrdersOutputSchema>;
}) {
  function handleFetchNewPage(inView: boolean) {
    if (inView) fetchNextPage();
  }

  const { ref } = useInView({
    onChange: handleFetchNewPage,
  });

  return (
    <>
      {isLoading ?? <Spinner />}
      {error instanceof RequestError &&
        (error.status === 404 || error.status === 400) && (
          <p className="text-center text-xl text-slate-400">
            No item could be displayed
          </p>
        )}
      {orders?.length === 0 && (
        <p className="text-center text-xl text-slate-400">
          No item could be displayed
        </p>
      )}
      {orders && orders.length !== 0 && (
        <div className="flex flex-col gap-3">
          {orders?.map((item) => (
            <OrderListItem orderItem={item} />
          ))}
          {!hasNextPage && (
            <p className="text-center text-xl text-slate-400">
              Last data has been reached
            </p>
          )}
          <div ref={ref}></div>
        </div>
      )}
    </>
  );
}

export default OrderList;

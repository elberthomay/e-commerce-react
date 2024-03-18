import { useSearchParams } from "react-router-dom";
import { createItemCardImageUrl } from "../../api/image";
import Spinner from "../../components/Spinner";
import { RequestError } from "../../error/RequestError";
import useGetUserOrders from "../../hooks/order/useGetUserOrders";
import useImagePreloader from "../../hooks/useImagePreloader";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { addDays, startOfToday } from "date-fns";
import OrderListItem from "./OrderListItem";
import { useInView } from "react-intersection-observer";

function OrderList() {
  const { currentUser } = useGetCurrentUser();
  const [searchParams] = useSearchParams();

  const queryOption = {
    limit: searchParams.get("limit") ?? undefined,
    orderBy: searchParams.get("sortBy") ?? undefined,
    itemName:
      searchParams.get("query") && searchParams.get("query")?.trim() !== ""
        ? searchParams.get("query")?.trim()
        : undefined,
    newerThan:
      searchParams.get("newerThan") &&
      !isNaN(Number(searchParams.get("newerThan")))
        ? addDays(
            startOfToday(),
            -Number(searchParams.get("newerThan"))
          ).toISOString()
        : undefined,
    status: searchParams.get("status") ?? undefined,
  };

  const {
    isLoading: getUserIsLoading,
    error,
    orders,
    hasNextPage,
    fetchNextPage,
  } = useGetUserOrders(currentUser?.id ?? "", queryOption);

  const { imagesPreloaded } = useImagePreloader(
    orders?.map(({ image }) => createItemCardImageUrl(image))
  );

  function handleFetchNewPage(inView: boolean) {
    if (hasNextPage && inView && !getUserIsLoading) fetchNextPage();
  }

  const { ref } = useInView({
    onChange: handleFetchNewPage,
  });

  const isLoading = getUserIsLoading || !imagesPreloaded;

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

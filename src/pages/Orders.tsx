import GutteredBox from "../ui/GutteredBox";
import OrderList from "../features/order/OrderList";
import useSetTitle from "../hooks/useSetTitle";
import OrderItemSearchBar from "../features/order/OrderItemSearchBar";
import OrderStatusCheckBox from "../features/order/OrderStatusCheckBox";
import OrderNewerThanSelect from "../features/order/OrderNewerThanSelect";
import OrderBySelect from "../features/order/OrderBySelect";
import { addDays, startOfToday } from "date-fns";
import { useSearchParams } from "react-router-dom";
import useGetUserOrders from "../hooks/order/useGetUserOrders";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";

function Orders() {
  useSetTitle((defaultTitle) => `Orders | ${defaultTitle}`);
  const { currentUser } = useGetCurrentUser();

  const queryOption = useGetUserOrdersQueryOption();

  const { isLoading, error, orders, hasNextPage, fetchNextPage } =
    useGetUserOrders(currentUser?.id ?? "", queryOption);

  function handleFetchNextPage() {
    if (hasNextPage && !isLoading) fetchNextPage();
  }

  return (
    <GutteredBox className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <div className="flex gap-x-2 justify-around flex-wrap">
        <OrderItemSearchBar />
        <OrderStatusCheckBox />
        <div className="flex items-center gap-2">
          <span>Newer Than: </span>
          <OrderNewerThanSelect />
        </div>
        <div className="flex items-center gap-2">
          <span>Sort by: </span>
          <OrderBySelect />
        </div>
      </div>
      <OrderList
        isLoading={isLoading}
        error={error}
        fetchNextPage={handleFetchNextPage}
        hasNextPage={hasNextPage}
        orders={orders}
      />
    </GutteredBox>
  );
}

function useGetUserOrdersQueryOption() {
  const [searchParams] = useSearchParams();
  return {
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
}

export default Orders;

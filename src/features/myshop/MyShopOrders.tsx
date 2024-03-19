import { useSearchParams } from "react-router-dom";
import useGetShopOrders from "../../hooks/order/useGetShopOrders";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import OrderBySelect from "../order/OrderBySelect";
import OrderItemSearchBar from "../order/OrderItemSearchBar";
import OrderList from "../order/OrderList";
import OrderNewerThanSelect from "../order/OrderNewerThanSelect";
import OrderStatusCheckBox from "../order/OrderStatusCheckBox";
import { addDays, startOfToday } from "date-fns";
import useSetTitle from "../../hooks/useSetTitle";

function MyShopOrders() {
  const { currentShop } = useGetCurrentShop();
  useSetTitle((defaultTitle) => `Shop Orders | ${defaultTitle}`);

  const queryOption = useGetShopOrdersQueryOption();

  const { isLoading, error, orders, hasNextPage, fetchNextPage } =
    useGetShopOrders(currentShop?.id ?? "", queryOption);

  function handleFetchNextPage() {
    if (hasNextPage && !isLoading) fetchNextPage();
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Shop orders</h1>
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
        hasNextPage={hasNextPage}
        fetchNextPage={handleFetchNextPage}
        orders={orders}
      />
    </div>
  );
}

function useGetShopOrdersQueryOption() {
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

export default MyShopOrders;

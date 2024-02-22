import { useSearchParams } from "react-router-dom";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import useGetShopItemsInvScroll from "../../hooks/shop/useGetShopItemsInvScroll";
import Sort from "../../components/Sort";
import MyShopItemsTable from "./MyShopItemsTable";

function MyShopItemsList() {
  const { currentShop } = useGetCurrentShop();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") ?? undefined;
  const orderBy = searchParams.get("sort") ?? undefined;
  const { fetchNextPage, hasNextPage, isFetching, shopItem } =
    useGetShopItemsInvScroll({
      search,
      orderBy,
      shopId: currentShop?.id ?? "",
    });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>Search Bar</div>
        <div className="flex gap-2">
          <Sort />
        </div>
      </div>
      <MyShopItemsTable
        shopItem={shopItem ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
    </div>
  );
}

export default MyShopItemsList;

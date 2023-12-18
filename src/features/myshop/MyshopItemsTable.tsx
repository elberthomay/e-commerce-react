import { useSearchParams } from "react-router-dom";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import useGetShopItemsInvScroll from "../../hooks/shop/useGetShopItemsInvScroll";
import Sort from "../../components/Sort";
import MyShopItemsList from "./MyShopItemsList";

function MyshopItemsTable() {
  const { currentShop } = useGetCurrentShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? undefined;
  const orderBy = searchParams.get("sort") ?? undefined;
  const { isLoading, error, fetchNextPage, hasNextPage, isFetching, shopItem } =
    useGetShopItemsInvScroll({
      search,
      orderBy,
      shopId: currentShop?.id ?? "",
    });
  return (
    <div>
      <Sort />
      <MyShopItemsList
        shopItem={shopItem ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
    </div>
  );
}

export default MyshopItemsTable;

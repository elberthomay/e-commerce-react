import { useSearchParams } from "react-router-dom";
import useLimitAndPagination from "../../hooks/useLimitAndPagination";
import useGetShopItems from "../../hooks/shop/useGetShopItems";
import Spinner from "../../components/Spinner";
import { RequestError } from "../../error/RequestError";
import ShopItemList from "./ShopItemList";
import Sort from "../../components/Sort";
import PagingLimit from "../../components/PagingLimit";
import PagingPage from "../../components/PagingPage";

function ShopItemTable({ shopId }: { shopId: string }) {
  const { limit, page, getPaginationFunctions } = useLimitAndPagination();

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? undefined;
  const orderBy = searchParams.get("sort") ?? undefined;

  const { isLoading, error, shopItem } = useGetShopItems({
    shopId,
    search,
    orderBy,
    limit,
    page,
  });
  const { maxPage, setLimit, setPage } = getPaginationFunctions(
    shopItem?.count ?? 0
  );
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading &&
        error &&
        (error instanceof RequestError ? (
          <p>Shop Not Found</p>
        ) : (
          <p>Error fetching shop items</p>
        ))}
      {!isLoading && shopItem && (
        <>
          <Sort />
          <ShopItemList items={shopItem.rows} />
          <div>
            <PagingLimit limit={limit} setLimit={setLimit} />
            <PagingPage page={page} maxPage={maxPage} setPage={setPage} />
          </div>
        </>
      )}
    </>
  );
}

export default ShopItemTable;

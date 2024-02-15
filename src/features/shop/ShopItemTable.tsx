import { Link, useSearchParams } from "react-router-dom";
import useLimitAndPagination from "../../hooks/useLimitAndPagination";
import useGetShopItems from "../../hooks/shop/useGetShopItems";
import Spinner from "../../components/Spinner";
import { RequestError } from "../../error/RequestError";
import ShopItemList from "./ShopItemList";
import Sort from "../../components/Sort";
import PagingLimit from "../../components/PagingLimit";
import PagingPage from "../../components/PagingPage";
import Button from "../../ui/Button";

function ShopItemTable({ shopId }: { shopId: string }) {
  const { limit, page, getPaginationFunctions } = useLimitAndPagination();

  const [searchParams] = useSearchParams();
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
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">All Items</h2>
          <Sort className="justify-end" />
          {shopItem.count > 0 ? (
            <>
              <ShopItemList items={shopItem.rows} />
              <div className="flex justify-between">
                <PagingLimit limit={limit} setLimit={setLimit} />
                <PagingPage page={page} maxPage={maxPage} setPage={setPage} />
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="p-4 rounded-lg border border-slate-500 w-[min(max-content,95vw)] text-center">
                <p>No item could be displayed</p>
                <Link to={`/shop/${shopId}`}>
                  <Button className="w-full">View All Items</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShopItemTable;

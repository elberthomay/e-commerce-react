import { useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter";
import Paging from "../../components/Paging";
import Spinner from "../../components/Spinner";
import useLimitAndPagination from "../../hooks/useLimitAndPagination";
import ItemList from "./ItemList";
import useGetItems from "./useGetItems";
import Sort from "../../components/Sort";

function ItemTable() {
  const { limit, page } = useLimitAndPagination();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const orderBy = searchParams.get("sort") ?? "";

  const { isLoading, error, items } = useGetItems({
    search,
    orderBy,
    limit,
    page,
    tags: [],
  });
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && items && (
        <div>
          <h1>Items</h1>
          <Filter />
          <Sort />
          <ItemList items={items.rows} />
          <Paging count={items.count} />
        </div>
      )}
    </>
  );
}

export default ItemTable;

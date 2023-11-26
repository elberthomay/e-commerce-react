import Filter from "../../components/Filter";
import Paging from "../../components/Paging";
import Spinner from "../../components/Spinner";
import useLimitAndPagination from "../../hooks/useLimitAndPagination";
import ItemList from "./ItemList";
import useGetItems from "./useGetItems";

function ItemTable() {
  const { limit, page } = useLimitAndPagination();
  const { isLoading, error, items } = useGetItems(limit, page, []);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && items && (
        <div>
          <h1>Items</h1>
          <Filter />
          <ItemList items={items.rows} />
          <Paging count={items.count} />
        </div>
      )}
    </>
  );
}

export default ItemTable;

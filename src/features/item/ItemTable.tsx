import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useLimitAndPagination from "../../hooks/useLimitAndPagination";
import ItemList from "./ItemList";
import useGetItems from "../../hooks/item/useGetItems";
import Sort from "../../components/Sort";
import ItemEmpty from "./ItemEmpty";
import PagingLimit from "../../components/PagingLimit";
import PagingPage from "../../components/PagingPage";
import useSetTitle from "../../hooks/useSetTitle";

function ItemTable() {
  const { limit, page, getPaginationFunctions } = useLimitAndPagination();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const orderBy = searchParams.get("sort") ?? "";

  useSetTitle(
    searchQuery
      ? (defaultTitle) => `Searching ${searchQuery} | ${defaultTitle}`
      : undefined
  );

  const { isLoading, items } = useGetItems({
    search: searchQuery,
    orderBy,
    limit,
    page,
    tags: [],
  });

  const { maxPage, startCount, endCount, setLimit, setPage } =
    getPaginationFunctions(items?.count ?? 0);

  const countString = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(items?.count ?? 0);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading &&
        items &&
        (items.count !== 0 ? (
          <div className="flex flex-col gap-3">
            {searchQuery && (
              <p className="font-bold">
                {/* consider intl later */}
                Displaying item {startCount} to {endCount} out of {countString}{" "}
                item with keyword "{searchQuery}"
              </p>
            )}
            {/* <Filter /> */}
            <Sort className="self-end" />
            <ItemList items={items.rows} />
            <div className="flex justify-between">
              <PagingLimit limit={limit} setLimit={setLimit} />
              <PagingPage page={page} maxPage={maxPage} setPage={setPage} />
            </div>
          </div>
        ) : (
          <ItemEmpty>No item is found for keyword "{searchQuery}"</ItemEmpty>
        ))}
    </>
  );
}

export default ItemTable;

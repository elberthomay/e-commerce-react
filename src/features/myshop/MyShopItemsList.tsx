import { useSearchParams } from "react-router-dom";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import useGetShopItemsInvScroll from "../../hooks/shop/useGetShopItemsInvScroll";
import Sort from "../../components/Sort";
import MyShopItemsTable from "./MyShopItemsTable";
import SearchBar from "../../ui/SearchBar";
import { useEffect, useState } from "react";

function MyShopItemsList() {
  const { currentShop } = useGetCurrentShop();
  const [undebouncedQuery, setUndebouncedQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("shopItemSearch") ?? undefined;
  const orderBy = searchParams.get("sort") ?? undefined;
  const { fetchNextPage, hasNextPage, isFetching, shopItem } =
    useGetShopItemsInvScroll({
      search,
      orderBy,
      shopId: currentShop?.id ?? "",
    });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (undebouncedQuery !== searchParams.get("shopItemSearch")) {
      timeoutId = setTimeout(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (undebouncedQuery.length !== 0)
          newSearchParams.set("shopItemSearch", undebouncedQuery);
        else newSearchParams.delete("shopItemSearch");
        setSearchParams(newSearchParams);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [undebouncedQuery, searchParams, setSearchParams]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <SearchBar.Box>
          <SearchBar.Icon />
          <SearchBar.Input
            value={undebouncedQuery}
            placeholder="Search item name"
            onChange={(e) => setUndebouncedQuery(e.target.value)}
          />
        </SearchBar.Box>
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

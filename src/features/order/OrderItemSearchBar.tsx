import { useEffect, useState } from "react";
import SearchBar from "../../ui/SearchBar";
import { useSearchParams } from "react-router-dom";

function OrderItemSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchParams.get("query") !== query) {
        if (query.trim().length > 0) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("query", query);
          setSearchParams(newSearchParams);
        } else {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete("query");
          setSearchParams(newSearchParams);
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, searchParams, setSearchParams]);

  return (
    <SearchBar.Box className="bg-slate-100 min-w-40 flex items-center border-slate-300">
      <SearchBar.Icon className="p-0 px-1 h-4" />
      <SearchBar.Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search item name"
        max={200}
        className=""
      />
    </SearchBar.Box>
  );
}

export default OrderItemSearchBar;

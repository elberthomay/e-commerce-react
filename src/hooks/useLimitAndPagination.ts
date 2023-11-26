import { useSearchParams } from "react-router-dom";
import {
  DEFAULT_CLIENT_LIMIT,
  MAX_CLIENT_LIMIT,
  MAX_CLIENT_PAGE,
} from "../helper/constant";

// convert to string, floor, check against min and max, check default
function convertAndBoundIntegerString(
  numberString: string | null,
  defaultNumber: number,
  min?: number,
  max?: number
) {
  if (numberString === null) return defaultNumber;
  return (
    Math.max(
      Math.min(
        Math.floor(Number(numberString)),
        max ?? Number.POSITIVE_INFINITY
      ),
      min ?? Number.NEGATIVE_INFINITY
    ) || defaultNumber
  );
}

export default function useLimitAndPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = convertAndBoundIntegerString(
    searchParams.get("limit"),
    DEFAULT_CLIENT_LIMIT,
    1,
    MAX_CLIENT_LIMIT
  );
  const page = convertAndBoundIntegerString(
    searchParams.get("page"),
    1,
    1,
    MAX_CLIENT_PAGE
  );

  function getPaginationFunctions(count: number) {
    const maxPage = Math.ceil(count / limit);
    const startCount = (page - 1) * limit + 1;
    const endCount = Math.min(page * limit, count);

    function setLimit(limit: number) {
      searchParams.delete("page");
      if (limit === 0) searchParams.delete("limit");
      else searchParams.set("limit", limit.toString());
      setSearchParams(searchParams);
    }
    function incPage() {
      if (page < maxPage) {
        searchParams.set("page", (page + 1).toString());
        setSearchParams(searchParams);
      }
    }
    function decPage() {
      if (page > 1) {
        if (page === 2) searchParams.delete("page");
        else searchParams.set("page", (page - 1).toString());
        setSearchParams(searchParams);
      }
    }

    return { maxPage, startCount, endCount, setLimit, incPage, decPage };
  }

  return {
    limit,
    page,
    getPaginationFunctions,
  };
}

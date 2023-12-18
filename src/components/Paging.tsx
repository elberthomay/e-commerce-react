import useGetItems from "../hooks/item/useGetItems";
import useLimitAndPagination from "../hooks/useLimitAndPagination";

function Paging({ count }: { count: number }) {
  const { limit, page, getPaginationFunctions } = useLimitAndPagination();
  const { maxPage, startCount, endCount, setLimit, incPage, decPage } =
    getPaginationFunctions(count);
  return (
    <>
      <p>
        Displaying item {startCount} to {endCount}({endCount - startCount + 1}{" "}
        out of {count} item
        {count > 1 ? "s" : ""})
      </p>
      <div>
        <p onClick={() => setLimit(0)}>40</p>
        <p onClick={() => setLimit(60)}>60</p>
        <p onClick={() => setLimit(80)}>80</p>
      </div>
      <div>
        <button disabled={page === 1} onClick={decPage}>
          Prev
        </button>
        <button disabled={page === maxPage} onClick={incPage}>
          Next
        </button>
      </div>
    </>
  );
}

export default Paging;

import { twMerge } from "tailwind-merge";
import Pagination from "./Pagination";
import { HTMLAttributes } from "react";

function PagingPage({
  peekthrough = 1,
  page,
  maxPage,
  setPage,
  ...props
}: {
  peekthrough?: number;
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
} & HTMLAttributes<HTMLDivElement>) {
  const startPage = Math.max(1, page - peekthrough);
  const endPage = Math.min(maxPage, page + peekthrough);

  function handleChangePage(page: number) {
    setPage(page);
    window.scroll(0, 0);
  }

  const elipsisClassName =
    "w-10 h-10 rounded-md flex justify-center items-center";
  const buttonClassName =
    "p-2 rounded-md hover:bg-slate-400 disabled:bg-slate-200 disabled:text-slate-500";
  const pageNumberClassName =
    "w-10 h-10 rounded-md flex justify-center items-center hover:bg-slate-300 data-[selected]:bg-slate-500";

  const pageNumberArray = Array.from({ length: endPage - startPage + 1 }).map(
    (_, i) => {
      const pageNumber = startPage + i;
      return (
        <Pagination.PageNumber className={pageNumberClassName}>
          {pageNumber}
        </Pagination.PageNumber>
      );
    }
  );

  return (
    <Pagination
      page={page}
      setPage={handleChangePage}
      className={twMerge("flex gap-2", props?.className)}
    >
      {maxPage !== 1 && (
        <Pagination.Prev
          compact
          disabled={page === 1}
          className={buttonClassName}
        />
      )}
      {startPage !== 1 && (
        <Pagination.PageNumber className={pageNumberClassName}>
          1
        </Pagination.PageNumber>
      )}
      {startPage > 2 && <Pagination.Elipsis className={elipsisClassName} />}
      {pageNumberArray}
      {endPage < maxPage - 1 && (
        <Pagination.Elipsis className={elipsisClassName} />
      )}
      {endPage !== maxPage && (
        <Pagination.PageNumber className={pageNumberClassName}>
          {maxPage}
        </Pagination.PageNumber>
      )}
      {maxPage !== 1 && (
        <Pagination.Next
          disabled={page === maxPage}
          className={buttonClassName}
        />
      )}
    </Pagination>
  );
}

export default PagingPage;

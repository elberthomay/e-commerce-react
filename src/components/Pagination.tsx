import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
} from "react";

const pagingPageContext = createContext<{
  page: number;
  setPage: (page: number) => void;
} | null>(null);

function Pagination({
  page,
  setPage,
  ...props
}: {
  page: number;
  setPage: (page: number) => void;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <pagingPageContext.Provider value={{ page, setPage }}>
      <div {...props}>{props.children}</div>
    </pagingPageContext.Provider>
  );
}

/**
 * Render page number element. Page prop must be provided when using custom child.
 * otherwise child would be used as page number
 */
function PageNumber({
  page,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | {
        page: number;
        children: ReactNode;
      }
    | { page?: number; children: string | number }
  )) {
  const { page: currentPage, setPage } = usePaginationContext();
  // use page
  const pageNumber = page ?? Number(props.children);
  const selected = pageNumber === currentPage;
  return (
    <button
      {...props}
      onClick={() => setPage(pageNumber)}
      data-selected={selected ? true : undefined}
    >
      {props.children}
    </button>
  );
}

function Elipsis(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>...</div>;
}

function Prev({
  compact,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  compact: boolean;
  children?: ReactNode;
}) {
  const { page, setPage } = usePaginationContext();
  const defaultButtonText = compact ? "‹ Prev" : "‹ Previous";
  return (
    <button {...props} onClick={() => setPage(page - 1)}>
      {children ? children : defaultButtonText}
    </button>
  );
}

function Next(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { page, setPage } = usePaginationContext();
  const defaultButtonText = "Next ›";
  return (
    <button {...props} onClick={() => setPage(page + 1)}>
      {props.children ? props.children : defaultButtonText}
    </button>
  );
}

function usePaginationContext() {
  const context = useContext(pagingPageContext);
  if (!context) throw new Error("PagingPageContext used outside scope");
  else return context;
}

Pagination.PageNumber = PageNumber;
Pagination.Elipsis = Elipsis;
Pagination.Prev = Prev;
Pagination.Next = Next;

export default Pagination;

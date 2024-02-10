import { Header, Row, Table, flexRender } from "@tanstack/react-table";
import { ComponentProps, ReactNode, createContext, useContext } from "react";
import { twMerge } from "tailwind-merge";

const TableContext = createContext<{ table: Table<unknown> } | null>(null);

function CustomTable({
  table,
  className,
  ...props
}: ComponentProps<"table"> & { table: Table<any> }) {
  return (
    <TableContext.Provider value={{ table: table }}>
      <table
        {...props}
        className={twMerge("grid items-center min-w-full text-left", className)}
      />
    </TableContext.Provider>
  );
}

function TableHeader({
  render,
  className,
}: {
  render?: (header: Header<any, any>) => ReactNode;
  className?: string;
}) {
  const { table } = useTableContext();
  return (
    <thead className="contents">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          className={twMerge(
            "contents text-slate-500 font-bold capitalize text-center border-b border-slate-300",
            className
          )}
        >
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={twMerge("w-full block p-3", className)}
            >
              {render
                ? render(header)
                : header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function Body({
  render,
  className,
}: {
  render?: (header: Row<any>) => ReactNode;
  className?: string;
}) {
  const { table } = useTableContext();
  return (
    <tbody className="contents">
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="contents">
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={twMerge(
                "block w-full text-slate-500 px-1 py-2",
                className
              )}
            >
              {render
                ? render(row)
                : flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) throw new Error("TableContext used outside scope");
  else return context;
}

CustomTable.Header = TableHeader;
CustomTable.Body = Body;

export default CustomTable;

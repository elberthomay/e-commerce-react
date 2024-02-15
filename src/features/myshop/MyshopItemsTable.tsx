import { InView } from "react-intersection-observer";
import { ShopItemRowType } from "../../type/shopType";
import ButtonSpinner from "../../ui/ButtonSpinner";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatPrice } from "../../utilities/intlUtils";
import useDeleteItem from "../../hooks/item/useDeleteItem";
import toast from "react-hot-toast";
import CustomDialog, {
  useCustomDialogContext,
} from "../../components/CustomDialog";
import Button from "../../ui/Button";
import { ComponentProps, forwardRef } from "react";
import UpdateItemForm from "./UpdateItemForm";
import CustomTable from "../../ui/CustomTable";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<ShopItemRowType>();

const defaultColumns = [
  columnHelper.accessor("name", {
    header: "Item Name",
    cell: (info) => (
      <Link
        to={`/item/${info.row.original.id}`}
        className="text-governor-bay-800"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => formatPrice(info.getValue()),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => <p className="text-center">{info.getValue()}</p>,
  }),
  columnHelper.display({
    header: " ",
    cell: (info) => <ItemRowAction item={info.row.original} />,
  }),
];

function MyShopItemsTable({
  shopItem,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: {
  shopItem: ShopItemRowType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}) {
  const table = useReactTable({
    columns: defaultColumns,
    data: shopItem,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <CustomTable
        className="grid-cols-[2.5fr_1fr_auto_max-content]"
        table={table}
      >
        <CustomTable.Header />
        <CustomTable.Body />
      </CustomTable>
      {shopItem.length > 0 && (
        <InView
          onChange={(inView) =>
            inView && hasNextPage && !isFetching ? fetchNextPage() : null
          }
        >
          <div className="text-center">
            {isFetching ? <ButtonSpinner className="h-10 w-10" /> : null}
          </div>
        </InView>
      )}
    </div>
  );
}

function ItemRowAction({ item }: { item: ShopItemRowType }) {
  const { id } = item;

  return (
    <div className="flex gap-2">
      <CustomDialog
        trigger={
          <Button className="px-3 py-1 lg:py-1.5 w-full h-full">Edit</Button>
        }
      >
        <UpdateItemForm id={id} />
      </CustomDialog>
      <CustomDialog
        trigger={
          <Button variant="red" className="px-3 py-1 lg:py-1.5 w-full h-full">
            Delete
          </Button>
        }
      >
        <ItemDeleteConfirmationBody item={item} />
      </CustomDialog>
    </div>
  );
}

const ItemDeleteConfirmationBody = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & { item: ShopItemRowType }
>(({ item, className, ...props }, forwardedRef) => {
  const { id, name } = item;
  const truncatedName = name.length > 50 ? name.slice(0, 50) + "..." : name;
  const { isLoading, deleteItem } = useDeleteItem(id);
  function handleDelete() {
    const deletePromise = deleteItem();
    toast.promise(deletePromise, {
      loading: "Deleting item",
      success: () => {
        close();
        return "Item successfully deleted";
      },
      error: "Failed deleting item",
    });
  }
  const { close } = useCustomDialogContext();

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(className, "flex flex-col gap-3")}
    >
      <h1 className="text-xl font-bold">Delete Item</h1>
      <p>Are you sure you want to delete {truncatedName} ?</p>
      <div className="mt-5 flex gap-4 justify-between">
        <Button onClick={handleDelete} disabled={isLoading}>
          Delete
        </Button>
        <Button onClick={close} variant="grey" disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default MyShopItemsTable;

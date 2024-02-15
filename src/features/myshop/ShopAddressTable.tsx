import { AddressOutputType } from "../../type/addressType";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toAdministrativeString } from "../../utilities/addressUtils";
import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import useToggleShopAddress from "../../hooks/address/useToggleShopAddress";
import Switch from "../../ui/Switch";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import CustomDialog, {
  CustomDialogContextType,
} from "../../components/CustomDialog";
import AddressDeleteConfirmation from "../address/AddressDeleteConfirmation";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import AddressEditDialog from "../address/AddressEditDialog";
import { useMaxBreakpoints } from "../../hooks/useWindowSize";
import { Popover, PopoverTrigger } from "../../../@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import CustomTable from "../../ui/CustomTable";

const columnHelper = createColumnHelper<AddressOutputType>();

const defaultColumns = [
  columnHelper.accessor("name", {
    header: "Location Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("detail", {
    header: "Address Details",
    cell: (info) => (
      <p
        title={info.getValue()}
        className=" line-clamp-2 break-words text-ellipsis"
      >
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor((row) => toAdministrativeString(row), {
    header: "City/ District",
    cell: (info) => (
      <p
        title={info.getValue()}
        className=" line-clamp-2 break-words text-ellipsis"
      >
        {info.getValue()}
      </p>
    ),
  }),
  columnHelper.accessor("postCode", {
    header: "Post Code",
    cell: (info) => <p className="text-center">{info.getValue() ?? "-"}</p>,
  }),
  columnHelper.accessor((row) => !!row.latitude && !!row.latitude, {
    header: "Point",
    cell: (info) => (
      <div className="flex justify-center items-center">
        <PinpointDisplay pinpointAvailable={info.getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor("selected", {
    header: "Active",
    cell: (info) => (
      <div className="flex justify-center items-center">
        <ShopAddressSwitch shopAddress={info.row.original} />
      </div>
    ),
  }),
  columnHelper.display({
    header: " ",
    cell: (info) => (
      <div className="flex justify-center items-center">
        <ShopAddressActions shopAddress={info.row.original} />
      </div>
    ),
  }),
];

function ShopAddressTable({
  shopAddress,
}: {
  shopAddress: AddressOutputType[];
}) {
  const table = useReactTable({
    columns: defaultColumns,
    data: shopAddress,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full">
      <CustomTable
        table={table}
        className="grid-cols-[minmax(5rem,10rem)_minmax(10rem,2.5fr)_minmax(5rem,1fr)_5rem_auto_auto_max-content]"
      >
        <CustomTable.Header />
        <CustomTable.Body />
      </CustomTable>
    </div>
  );
}

function PinpointDisplay({
  pinpointAvailable,
}: {
  pinpointAvailable: boolean;
}) {
  return (
    <div className="flex gap-3 items-center text-slate-400">
      {pinpointAvailable ? (
        <LuMapPin className="h-6 w-6 shrink-0 text-governor-bay-800" />
      ) : (
        <LuMapPinOff className="h-6 w-6 shrink-0" />
      )}
      <span
        data-available={pinpointAvailable}
        className="font-bold text-center hidden md:inline-block data-[available=true]:text-governor-bay-800"
      >
        {pinpointAvailable ? "Point Available" : "Point Unavailable"}
      </span>
    </div>
  );
}

function ShopAddressSwitch({
  shopAddress,
}: {
  shopAddress: AddressOutputType;
}) {
  const { id, name, selected } = shopAddress;
  const { isLoading, toggleShopAddress } = useToggleShopAddress();
  function handleToggle() {
    const togglePromise = toggleShopAddress(id);
    toast.promise(togglePromise, {
      loading: selected ? "Deactivating location" : "Activating location",
      success: `${name} successfuly ${selected ? "deactivated" : "activated"}`,
      error: `Error ${selected ? "deactivating" : "activating"} location`,
    });
  }
  return (
    <Switch active={selected} disabled={isLoading} onClick={handleToggle} />
  );
}

function ShopAddressActions({
  shopAddress,
}: {
  shopAddress: AddressOutputType;
}) {
  const { id, name } = shopAddress;
  const { deleteAddress } = useDeleteAddress(id);
  const { isSm } = useMaxBreakpoints();
  const editDialogContextRef = useRef<CustomDialogContextType | null>(null);
  const deleteDialogContextRef = useRef<CustomDialogContextType | null>(null);

  function handleDelete() {
    const deletePromise = deleteAddress();
    toast.promise(deletePromise, {
      loading: "Deleting address",
      success: "Address deleted",
      error: "Error deleting address",
    });
  }

  const actionMenu = (
    <div className="h-full grid grid-flow-column lg:grid-cols-[repeat(2,1fr)] gap-y-2 sm:gap-3">
      <Button
        className="px-3 py-1 lg:py-1.5 w-full h-full"
        onClick={() => editDialogContextRef.current?.open()}
      >
        Edit
      </Button>
      <Button
        className="px-3 py-1 lg:py-1.5 w-full h-full bg-red-600 hover:bg-red-400"
        onClick={() => deleteDialogContextRef.current?.open()}
      >
        Delete
      </Button>
    </div>
  );

  //display action menu in hamburger if screen is smaller than sm
  return (
    <>
      {isSm ? (
        actionMenu
      ) : (
        <Popover>
          <PopoverTrigger>
            <button className="p-1 rounded-md hover:bg-slate-300">
              <RxHamburgerMenu className="h-6 w-6 text-slate-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent>{actionMenu}</PopoverContent>
        </Popover>
      )}
      <CustomDialog contextRef={editDialogContextRef}>
        <AddressEditDialog address={shopAddress} />
      </CustomDialog>
      <CustomDialog contextRef={deleteDialogContextRef}>
        <AddressDeleteConfirmation itemName={name} onDelete={handleDelete} />
      </CustomDialog>
    </>
  );
}

export default ShopAddressTable;

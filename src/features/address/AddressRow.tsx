import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import { AddressOutputType } from "../../type/addressType";
import toast from "react-hot-toast";
import AddressEditDialog from "./AddressEditDialog";
import Button from "../../ui/Button";
import { HiCheck } from "react-icons/hi2";
import CustomDialog from "../../components/CustomDialog";
import AddressDeleteConfirmation from "./AddressDeleteConfirmation";

function AddressRow({
  address,
  allowUnselect,
  onSelect,
}: {
  address: AddressOutputType;
  allowUnselect: boolean;
  onSelect: (id: string) => void;
}) {
  const { id, name, longitude, detail, phoneNumber, recipient, selected } =
    address;
  const { deleteAddress } = useDeleteAddress(address.id);

  function handleDelete() {
    const deletePromise = deleteAddress();
    toast.promise(deletePromise, {
      loading: "Deleting address",
      success: "Address deleted",
      error: "Error deleting address",
    });
  }
  return (
    <div
      data-selected={selected}
      className="p-4 flex justify-between items-center bg-slate-100 border border-slate-300 rounded-lg data-[selected=true]:bg-governor-bay-200 data-[selected=true]:border-governor-bay-800"
    >
      <div>
        <p className="text-slate-500">{name}</p>
        <p className="text-md">{recipient}</p>
        <p>{phoneNumber}</p>
        <p className=" text-ellipsis line-clamp-1">{detail}</p>
        <p className="flex gap-2 items-center text-slate-500 my-3">
          {longitude ? (
            <>
              <LuMapPin className="h-5 w-5" />
              <span>Location Available</span>
            </>
          ) : (
            <>
              <LuMapPinOff className="h-5 w-5" />
              <span className="font-bold">Location Unavailable</span>
            </>
          )}
        </p>
        <div className="flex *:pr-2 *:border-right *:border-slate-500 *:last:border-right-0 *:last:mr-0">
          <CustomDialog
            trigger={
              <button className=" text-governor-bay-800 p-2">Edit</button>
            }
          >
            <AddressEditDialog address={address} />
          </CustomDialog>

          <CustomDialog
            trigger={
              <button className=" text-governor-bay-800 p-2">Delete</button>
            }
          >
            <AddressDeleteConfirmation
              itemName={address.name}
              onDelete={handleDelete}
            />
          </CustomDialog>
        </div>
      </div>
      {!address.selected && (
        <Button className="px-3" onClick={() => onSelect(address.id)}>
          Select
        </Button>
      )}
      {address.selected &&
        (allowUnselect ? (
          <Button className="px-3" onClick={() => onSelect(address.id)}>
            Unselect
          </Button>
        ) : (
          <HiCheck className="h-8 w-8 text-governor-bay-800" />
        ))}
    </div>
  );
}

export default AddressRow;

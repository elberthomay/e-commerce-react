import { HiCheck } from "react-icons/hi2";
import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import useUpdateAddress from "../../hooks/address/useUpdateAddress";
import { AddressOutputType } from "../../type/addressType";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import AddressForm from "./AddressForm";
import AddressEditDialog from "./AddressEditDialog";

function AddressRow({ address }: { address: AddressOutputType }) {
  const { id, longitude, latitude, detail, subdistrictId, selected } = address;
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
    <div>
      <p>{detail}</p>
      <p>
        {longitude ? (
          <>
            <LuMapPin />
            Location Available
          </>
        ) : (
          <>
            <LuMapPinOff />
            Location Unavailable
          </>
        )}
      </p>
      <Modal>
        <Modal.Open id={"edit" + id}>
          <button>Edit</button>
        </Modal.Open>
        <Modal.Window id={"edit" + id}>
          <AddressEditDialog address={address} />
        </Modal.Window>
      </Modal>

      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}

export default AddressRow;

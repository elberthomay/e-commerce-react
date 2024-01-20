import { HTMLAttributes, forwardRef, useState } from "react";
import { AddressCreateType, AddressOutputType } from "../../type/addressType";
import toast from "react-hot-toast";
import useUpdateAddress from "../../hooks/address/useUpdateAddress";
import { omit } from "lodash";
import AddressForm from "./AddressForm";
import { HiArrowLeft } from "react-icons/hi2";
import AddressMap from "./AddressMap";
import { toAdministrativeString } from "../../utilities/addressUtils";
import useLocationQuerySearch from "../../hooks/location/useLocationQuerySearch";
import { twMerge } from "tailwind-merge";
import { useCustomDialogContext } from "../../components/CustomDialog";

const AddressEditDialog = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { address: AddressOutputType }
>(({ address, ...props }, forwardedRef) => {
  const [state, setState] = useState<number>(0);
  const [addressValues, setAddressValues] = useState<AddressCreateType>(
    omit(address, ["id", "selected"])
  );
  const { closeDialog } = useCustomDialogContext();
  const { longitude, latitude } = addressValues;
  const administrativeString = toAdministrativeString(addressValues);
  const { locations } = useLocationQuerySearch(administrativeString, true);
  const fetchedCoordinate =
    locations && locations.length > 0
      ? {
          latitude: locations[0].latitude,
          longitude: locations[0].longitude,
        }
      : undefined;

  const { updateAddress } = useUpdateAddress(address.id);

  const openLocationMap = () => setState(1);
  const closeLocationMap = () => setState(0);

  function handleMapSubmit(
    location: Pick<
      AddressCreateType,
      | "latitude"
      | "longitude"
      | "village"
      | "district"
      | "city"
      | "province"
      | "country"
    >
  ) {
    const { village, district } = location;
    setAddressValues((address) => ({
      ...address,
      ...location,
      village: village ?? undefined,
      district: district ?? undefined,
    }));
    closeLocationMap();
  }

  function handleSubmit(formData: AddressCreateType) {
    //when updating village and district should not be undefined
    const { village, district } = formData;
    const addressPromise = updateAddress({
      ...formData,
      village: village ?? null,
      district: district ?? null,
    });
    toast.promise(addressPromise, {
      loading: "Updating address",
      success: "Address has been updated",
      error: "Failed updating address",
    });
    closeDialog();
  }

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(props.className, "max-w-[min(50rem,95vw)] w-full")}
    >
      <h1 className="font-bold text-xl text-center mb-4">Edit address</h1>
      {state === 0 && (
        <div className="px-8 max-h-[calc(80vh-10rem)] overflow-y-scroll">
          <AddressForm
            address={addressValues}
            onChangeLocation={openLocationMap}
            onSubmit={handleSubmit}
            buttonLabel="Edit Address"
          />
        </div>
      )}
      {state === 1 && (
        <>
          <button onClick={closeLocationMap}>
            <HiArrowLeft />
          </button>
          <AddressMap
            defaultCoordinate={
              longitude && latitude
                ? { longitude, latitude }
                : fetchedCoordinate
            }
            onSubmit={handleMapSubmit}
          />
        </>
      )}
    </div>
  );
});

export default AddressEditDialog;

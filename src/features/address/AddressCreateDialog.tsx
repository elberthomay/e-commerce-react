import { useState } from "react";
import {
  AddressCreateType,
  AddressOutputType,
  CoordinateType,
} from "../../type/addressType";
import AddressForm from "./AddressForm";
import AddressSearch from "./AddressSearch";
import { HiArrowLeft, HiCheck } from "react-icons/hi2";
import AddressMap from "./AddressMap";
import AddressManualForm from "./AddressManualForm";
import Modal, { useModal } from "../../components/Modal";
import toast from "react-hot-toast";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

function AddressCreateDialog({
  createAddress,
}: {
  createAddress: UseMutateAsyncFunction<
    AddressOutputType,
    Error,
    AddressCreateType,
    unknown
  >;
}) {
  const [state, setState] = useState<number>(0);
  const { close, closeImmediately } = useModal();
  const [address, setAddress] = useState<AddressCreateType>({
    name: "",
    phoneNumber: "",
    detail: "",
    city: "",
    province: "",
    country: "",
    recipient: "",
  });
  const { longitude, latitude } = address;

  const back = () => setState((state) => state - 1);
  const nextState = () => setState((state) => state + 1);
  const searchManually = () => setState(3);

  function handleCoordinateSubmit(coordinate: CoordinateType) {
    setAddress((address) => ({ ...address, ...coordinate }));
    nextState();
  }

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
    setAddress((address) => ({ ...address, ...location }));
    nextState();
  }

  function handleCreateAddress(formData: AddressCreateType) {
    const addressPromise = createAddress(formData);
    toast.promise(addressPromise, {
      loading: "Creating address",
      success: "Address has been created",
      error: "Failed creating address",
    });
    closeImmediately();
  }
  return (
    <div>
      <h1>Add address</h1>
      {state < 3 && (
        <ul>
          <li>
            <span>{state > 0 ? <HiCheck /> : 1}</span>Find your location
          </li>
          <li>
            <span>{state > 1 ? <HiCheck /> : 2}</span>Pinpoint your location
          </li>
          <li>
            <span>{state > 2 ? <HiCheck /> : 3}</span>Complete your address
          </li>
        </ul>
      )}
      <div>
        {state === 0 && (
          <AddressSearch
            onSubmit={handleCoordinateSubmit}
            onSearchManually={searchManually}
          />
        )}
        {state === 1 && (
          <>
            <button onClick={back}>
              <HiArrowLeft />
            </button>
            <AddressMap
              defaultCoordinate={
                latitude && longitude ? { latitude, longitude } : undefined
              }
              onSubmit={handleMapSubmit}
              onSearchManually={searchManually}
            />
          </>
        )}
        {state === 2 && (
          <>
            <button onClick={back}>
              <HiArrowLeft />
            </button>
            <AddressForm
              address={address}
              onSubmit={handleCreateAddress}
              buttonLabel="Create Address"
            />
          </>
        )}
        {state === 3 && (
          <>
            <button onClick={() => setState(0)}>
              <HiArrowLeft />
            </button>
            <AddressManualForm onSubmit={handleCreateAddress} />
          </>
        )}
      </div>
      <button onClick={close}>Cancel</button>
    </div>
  );
}

export default AddressCreateDialog;

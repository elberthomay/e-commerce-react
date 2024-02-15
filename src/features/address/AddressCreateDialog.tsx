import { HTMLAttributes, forwardRef, useState } from "react";
import {
  AddressCreateType,
  AddressOutputType,
  CoordinateType,
} from "../../type/addressType";
import AddressForm from "./AddressForm";
import AddressSearch from "./AddressSearch";
import { HiArrowLeft } from "react-icons/hi2";
import AddressMap from "./AddressMap";
import AddressManualForm from "./AddressManualForm";
import toast from "react-hot-toast";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { useCustomDialogContext } from "../../components/CustomDialog";
import { twMerge } from "tailwind-merge";
import { FaCheck } from "react-icons/fa6";

const AddressCreateDialog = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    createAddress: UseMutateAsyncFunction<
      AddressOutputType,
      Error,
      AddressCreateType,
      unknown
    >;
  }
>(({ createAddress, ...props }, forwardedRef) => {
  const [state, setState] = useState<number>(0);
  const { closeDialog } = useCustomDialogContext();
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

  const handleBack = () => {
    if (state > 0 && state < 3) setState((state) => state - 1);
    else if (state === 3) setState(0);
  };
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
    closeDialog();
  }

  return (
    <div
      {...props}
      className={twMerge(
        props.className,
        "px-0 max-w-[min(50rem,95vw)] w-full"
      )}
      ref={forwardedRef}
    >
      {state > 0 && (
        <button
          className="absolute h-5 w-5 top-4 left-4 rounded-lg"
          onClick={handleBack}
        >
          <HiArrowLeft className="h-5 w-5" />
        </button>
      )}
      <div className="flex flex-col items-center px-8 gap-6 pb-3 border-b border-slate-300">
        <h1 className="text-xl font-bold">Add Address</h1>
        {state < 3 && (
          <div className="grid grid-cols-3 gap-4">
            <AddressCreateStepsNumber currentStep={state} step={0}>
              Find your location
            </AddressCreateStepsNumber>
            <AddressCreateStepsNumber currentStep={state} step={1}>
              Pinpoint your location
            </AddressCreateStepsNumber>
            <AddressCreateStepsNumber currentStep={state} step={2}>
              Complete your address
            </AddressCreateStepsNumber>
          </div>
        )}
      </div>
      <div className="pt-3">
        {state === 0 && (
          <AddressSearch
            onSubmit={handleCoordinateSubmit}
            onSearchManually={searchManually}
          />
        )}
        {state === 1 && (
          <AddressMap
            defaultCoordinate={
              latitude && longitude ? { latitude, longitude } : undefined
            }
            onSubmit={handleMapSubmit}
            onSearchManually={searchManually}
          />
        )}
        {state === 2 && (
          <div className="px-8 max-h-[calc(80vh-10rem)] overflow-y-scroll">
            <h2 className="text-lg font-bold mb-4">Complete Your Address</h2>
            <AddressForm
              address={address}
              onSubmit={handleCreateAddress}
              buttonLabel="Create Address"
            />
          </div>
        )}
        {state === 3 && <AddressManualForm onSubmit={handleCreateAddress} />}
      </div>
    </div>
  );
});

function AddressCreateStepsNumber({
  currentStep,
  step,
  children,
}: {
  currentStep: number;
  step: number;
  children: string;
}) {
  const isCompleted = currentStep > step;
  const isOngoing = currentStep >= step;
  return (
    <div
      data-passed={isOngoing}
      className="group relative flex flex-col items-center text-center"
    >
      <div className="h-8 w-8 flex justify-center items-center rounded-full border border-governor-bay-800 group-data-[passed=true]:bg-governor-bay-700">
        {isCompleted ? (
          <FaCheck className="h-4 w-4 text-slate-100" />
        ) : (
          <span className="font-bold text-governor-bay-800 group-data-[passed=true]:text-slate-100">
            {step + 1}
          </span>
        )}
      </div>
      {children}
      <div className="absolute top-[30%] -right-[calc(50%-0.15rem)] h-[1px] group-last:hidden w-[calc(100%-1.5rem)] bg-black"></div>
    </div>
  );
}

export default AddressCreateDialog;

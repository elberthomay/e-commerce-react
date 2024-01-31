import { useForm } from "react-hook-form";
import { AddressCreateType } from "../../type/addressType";
import { useState } from "react";
import AddressCommonForm, {
  AddressCommonFormFieldValues,
} from "./AddressCommonForm";
import useDebouncedString from "../../hooks/useDebouncedString";
import { CollatedLocationDataType } from "../../type/locationType";
import FormRow from "../../components/FormRow";
import { omit, pick } from "lodash";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { toAdministrativeString } from "../../utilities/addressUtils";
import useLocationQuerySearch from "../../hooks/location/useLocationQuerySearch";
import TextInput from "../../ui/TextInput";
import Button from "../../ui/Button";

function AddressManualForm({
  onSubmit,
}: {
  onSubmit: (formData: AddressCreateType) => void;
}) {
  const [locationSearchOpen, setLocationSearchOpen] = useState<boolean>(false);

  const {
    debouncingString: locationSearchField,
    resultString: locationSearchQuery,
    setDebouncingString: setLocationSearchField,
    setResultString,
  } = useDebouncedString();

  const [newAddress, setNewAddress] = useState<Pick<
    AddressCreateType,
    "village" | "district" | "city" | "province" | "country"
  > | null>(null);

  const displayAddress = newAddress ? toAdministrativeString(newAddress) : "";

  const { isLoading, locations } = useLocationQuerySearch(
    locationSearchQuery,
    true
  );
  //filter administrative boundary bigger than city

  const { currentUser } = useGetCurrentUser();
  const { name: userName } = currentUser ?? {};

  const defaultValues = {
    name: "Residence",
    phoneCountryCode: "+62",
    phoneNumber: "",
    detail: "",
    recipient: userName,
    location: "",
  };

  const formApi = useForm<AddressCommonFormFieldValues & { location: string }>({
    defaultValues,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = formApi;

  function handleCreateAddress(
    commonFormData: AddressCommonFormFieldValues & { location: string }
  ) {
    if (newAddress) {
      const { phoneCountryCode, phoneNumber } = commonFormData;
      const formData = {
        ...omit(commonFormData, ["phoneCountryCode", "location"]),
        ...newAddress,
        phoneNumber: `${phoneCountryCode} ${phoneNumber}`,
      };
      onSubmit(formData);
    }
  }

  function handleSelectLocation(address: CollatedLocationDataType) {
    const administrativeAddress = pick(address, [
      "village",
      "district",
      "city",
      "province",
      "country",
    ]);
    setNewAddress(administrativeAddress);
    setValue("location", toAdministrativeString(administrativeAddress));

    //empty search query so options disappear
    setLocationSearchField("");
    setResultString("");
  }
  return (
    <div className="p-8 max-h-[calc(80vh-10rem)] overflow-y-scroll">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateAddress)}
      >
        <input
          type="hidden"
          hidden={true}
          {...register("location", { required: true })}
        />
        <div className="relative">
          <FormRow label="Location" formErrors={errors}>
            <TextInput
              type="text"
              value={
                !locationSearchOpen && newAddress
                  ? displayAddress
                  : locationSearchField
              }
              onChange={(e) => setLocationSearchField(e.target.value)}
              placeholder="Enter district or city name"
              onFocus={() => setLocationSearchOpen(true)}
              onBlur={() => {
                setLocationSearchOpen(false);
                setLocationSearchField("");
              }}
            />
          </FormRow>

          {locationSearchField.length > 0 && (
            <div className="absolute w-full border border-slate-300 rounded-lg p-2 bg-white">
              {isLoading && <p>Loading...</p>}
              {!isLoading && locations && locations.length > 0 ? (
                locations.map((location) => (
                  <p
                    className="p-2 hover:bg-slate-300 rounded-lg"
                    onClick={() => handleSelectLocation(location)}
                  >
                    {location.display_name}
                  </p>
                ))
              ) : (
                <p>No location found</p>
              )}
            </div>
          )}
        </div>
        <AddressCommonForm formApi={formApi} />
        <Button className="w-full">Create Address</Button>
      </form>
    </div>
  );
}

export default AddressManualForm;

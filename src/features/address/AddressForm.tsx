import { useForm } from "react-hook-form";
import { AddressCreateType } from "../../type/addressType";
import AddressCommonForm, {
  AddressCommonFormFieldValues,
} from "./AddressCommonForm";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { omit } from "lodash";
import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import { toAdministrativeString } from "../../utilities/addressUtils";

function AddressForm({
  address,
  onChangeLocation,
  onSubmit,
  buttonLabel,
}: {
  address: AddressCreateType;
  onChangeLocation?: () => void;
  onSubmit: (formData: AddressCreateType) => void;
  buttonLabel: string;
}) {
  const { currentUser } = useGetCurrentUser();
  const { name: userName } = currentUser ?? {};
  // get phone number from currentUser when applicable
  const {
    name,
    phoneNumber: phoneCodeAndNumber,
    detail,
    longitude,
    recipient,
  } = address ?? {};

  const [phoneCountryCode, phoneNumber] = phoneCodeAndNumber
    ? phoneCodeAndNumber.split(" ")
    : [undefined, undefined];
  const locationString = toAdministrativeString(address);

  const defaultValues = {
    name: name || "Residence",
    phoneCountryCode: phoneCountryCode || "+62",
    phoneNumber: phoneNumber || "",
    detail: detail || "",
    recipient: recipient || userName,
  };

  const formApi = useForm<AddressCommonFormFieldValues>({ defaultValues });
  const { handleSubmit } = formApi;

  function handleCreateAddress(commonFormData: AddressCommonFormFieldValues) {
    const { phoneCountryCode, phoneNumber } = commonFormData;
    const formData: AddressCreateType = {
      ...address,
      ...omit(commonFormData, ["phoneCountryCode"]),
      phoneNumber: `${phoneCountryCode} ${phoneNumber}`,
    };
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAddress)}>
      {longitude !== undefined && (
        <LocationIncludedIndicator
          longitude={longitude}
          location={locationString}
          onChange={onChangeLocation}
        />
      )}
      <AddressCommonForm formApi={formApi} />
      {longitude === undefined && (
        <LocationIncludedIndicator onChange={onChangeLocation} />
      )}
      <button>{buttonLabel}</button>
    </form>
  );
}

function LocationIncludedIndicator({
  longitude,
  location,
  onChange,
}: {
  longitude?: number;
  location?: string;
  onChange?: () => void;
}) {
  return (
    <p>
      {longitude ? (
        <>
          <LuMapPin />
          {location}
        </>
      ) : (
        <>
          <LuMapPinOff /> Location is not determined
        </>
      )}
      {onChange && (
        <button onClick={onChange}>{longitude ? "Change" : "Add"}</button>
      )}
    </p>
  );
}

export default AddressForm;

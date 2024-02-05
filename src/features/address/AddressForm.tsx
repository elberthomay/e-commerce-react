import { AddressCreateType } from "../../type/addressType";
import { Name, PhoneNumber, Detail, Recipient } from "./AddressFormFragment";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { omit } from "lodash";
import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import { toAdministrativeString } from "../../utilities/addressUtils";
import { Form } from "../../components/Form";
import Button from "../../ui/Button";

type AddressFormFieldValues = {
  name: string;
  phoneCountryCode: string;
  phoneNumber: string;
  detail: string;
  recipient: string;
};

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

  function handleSubmitAddress(commonFormData: AddressFormFieldValues) {
    const { phoneCountryCode, phoneNumber } = commonFormData;
    const formData: AddressCreateType = {
      ...address,
      ...omit(commonFormData, ["phoneCountryCode"]),
      phoneNumber: `${phoneCountryCode} ${phoneNumber}`,
    };
    onSubmit(formData);
  }

  return (
    <Form
      submitFunc={handleSubmitAddress}
      defaultValues={defaultValues}
      className="flex flex-col gap-3"
    >
      {longitude !== undefined && (
        <LocationChangeBox
          location={locationString}
          onChange={onChangeLocation}
        />
      )}
      <Name name="name" />
      <PhoneNumber name="phoneNumber" />
      <Detail name="detail" />
      <Recipient name="recipient" />
      {longitude === undefined && (
        <LocationChangeBox onChange={onChangeLocation} />
      )}
      <Button className="">{buttonLabel}</Button>
    </Form>
  );
}

function LocationChangeBox({
  location,
  onChange,
}: {
  location?: string;
  onChange?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-200 rounded-lg">
      {location ? (
        <>
          <LuMapPin className="h-5 w-5 shrink-0" />
          {location}
        </>
      ) : (
        <>
          <LuMapPinOff className="h-5 w-5" /> Location is not set
        </>
      )}
      {onChange && (
        <button onClick={onChange}>{location ? "Change" : "Add"}</button>
      )}
    </div>
  );
}

export default AddressForm;

import { useForm } from "react-hook-form";
import { AddressCreateType } from "../../type/addressType";
import { useState } from "react";
import {
  Detail,
  ManualLocationSearch,
  Name,
  PhoneNumber,
  Recipient,
} from "./AddressFormFragment";
import { CollatedLocationDataType } from "../../type/locationType";
import { omit, pick } from "lodash";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import Button from "../../ui/Button";
import { Form } from "../../components/Form";

type ManualAddressFormType = {
  name: string;
  phoneCountryCode: string;
  phoneNumber: string;
  detail: string;
  recipient: string;
  location: string;
};

function AddressManualForm({
  onSubmit,
}: {
  onSubmit: (formData: AddressCreateType) => void;
}) {
  const [newAddress, setNewAddress] = useState<Pick<
    AddressCreateType,
    "village" | "district" | "city" | "province" | "country"
  > | null>(null);

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

  function handleCreateAddress(commonFormData: ManualAddressFormType) {
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
  }

  return (
    <div className="p-8 max-h-[calc(80vh-10rem)] overflow-y-scroll">
      <Form
        className="flex flex-col gap-2"
        submitFunc={handleCreateAddress}
        defaultValues={defaultValues}
      >
        <ManualLocationSearch onSelect={handleSelectLocation} name="location" />
        <Name name="name" />
        <PhoneNumber name="phoneNumber" />
        <Detail name="detail" />
        <Recipient name="recipient" />
        <Button className="w-full">Create Address</Button>
      </Form>
    </div>
  );
}

export default AddressManualForm;

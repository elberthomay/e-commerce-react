import { UseFormReturn } from "react-hook-form";
import FormRow from "../../components/formRow";
import { countryPhoneCode } from "../../helper/countryPhoneCode";
import { SyntheticEvent, useState } from "react";

export interface AddressCommonFormFieldValues {
  name: string;
  phoneCountryCode: string;
  phoneNumber: string;
  detail: string;
  recipient: string;
}

function AddressCommonForm({
  formApi,
}: {
  formApi: UseFormReturn<any, any, undefined>;
}) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = formApi;
  const [phoneCodeSearchOpen, setPhoneCodeSearchOpen] =
    useState<boolean>(false);
  const [phoneCodeSearchString, setPhoneCodeSearchString] =
    useState<string>("");
  const filteredPhoneCode = countryPhoneCode.filter(
    ({ name, prefix }) =>
      name.toLowerCase().includes(phoneCodeSearchString.toLowerCase()) ||
      prefix === getValues("phoneCountryCode")
  );

  function handlePhoneNumberChange(e: any) {
    const newValue = e.target.value;
    const numberOnly = newValue.replace(/\D/g, ""); // Remove non-numeric characters

    setValue(
      "phoneNumber",
      numberOnly.charAt(0) === "0" ? numberOnly.slice(1) : numberOnly
    );
  }

  return (
    <>
      <FormRow formErrors={errors} label="Address name">
        <input
          type="text"
          maxLength={40}
          {...register("name", {
            required: { value: true, message: "Address name is required" },
            maxLength: 40,
          })}
        />
      </FormRow>
      <p>{watch("name")?.length ?? 0}/40</p>

      <input
        type="text"
        value={phoneCodeSearchString}
        id="phoneCodeSearchString"
        onChange={(e) => setPhoneCodeSearchString(e.target.value)}
        onFocus={() => setPhoneCodeSearchOpen(true)}
        onBlur={() => setPhoneCodeSearchOpen(false)}
      />
      <select
        {...register("phoneCountryCode", {
          required: { value: true, message: "Country code is required" },
        })}
      >
        {filteredPhoneCode.map(({ code, prefix, emoji, name }) => (
          <option value={prefix} key={code + prefix}>{`${prefix} ${emoji} ${
            phoneCodeSearchOpen ? name : ""
          }`}</option>
        ))}
      </select>
      <FormRow formErrors={errors} label="Phone number">
        <input
          type="text"
          minLength={7}
          maxLength={15}
          {...register("phoneNumber", {
            required: { value: true, message: "Phone number is required" },
            minLength: {
              value: 7,
              message: "Phone number cannot have less than 7 characters",
            },
            maxLength: 15,
            onChange: handlePhoneNumberChange,
          })}
        />
      </FormRow>

      <FormRow label="Detail" formErrors={errors}>
        <textarea
          maxLength={200}
          cols={30}
          rows={10}
          {...register("detail", {
            required: {
              value: true,
              message: "Address detail is cannot be empty",
            },
            maxLength: 200,
          })}
        ></textarea>
      </FormRow>
      <p>{watch("detail").length ?? 0}/200</p>

      <FormRow label="Recipient name" formErrors={errors}>
        <input
          type="text"
          maxLength={40}
          {...register("recipient", {
            required: {
              value: true,
              message: "Packet recipient's name cannot be empty",
            },
            maxLength: 40,
          })}
        />
      </FormRow>
      <p>{watch("recipient").length ?? 0}/40</p>
    </>
  );
}

export default AddressCommonForm;

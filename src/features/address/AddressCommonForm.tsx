import { UseFormReturn } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { countryPhoneCode } from "../../variables/countryPhoneCode";
import { ButtonHTMLAttributes, useMemo, useState } from "react";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import { HiChevronUpDown } from "react-icons/hi2";
import CustomCombobox from "../../components/CustomCombobox";
import { twMerge } from "tailwind-merge";

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
  } = formApi;

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
      <FormRow
        formErrors={errors}
        label="Address name"
        countString={`${watch("name")?.length ?? 0}/40`}
      >
        <TextInput
          type="text"
          maxLength={40}
          {...register("name", {
            required: { value: true, message: "Address name is required" },
            maxLength: 40,
          })}
        />
      </FormRow>

      <FormRow formErrors={errors} label="Phone number" name="phoneNumber">
        <div className="group flex gap-2">
          <PhoneCodeSelector formApi={formApi} />
          <TextInput
            type="text"
            minLength={7}
            maxLength={15}
            className=" grow group-data-[error=true]:border-red-400"
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
        </div>
      </FormRow>

      <FormRow
        label="Detail"
        formErrors={errors}
        countString={`${watch("detail")?.length ?? 0}/200`}
      >
        <TextArea
          maxLength={200}
          cols={30}
          {...register("detail", {
            required: {
              value: true,
              message: "Address detail is cannot be empty",
            },
            maxLength: 200,
          })}
        ></TextArea>
      </FormRow>

      <FormRow
        label="Recipient name"
        formErrors={errors}
        countString={`${watch("recipient")?.length ?? 0}/40`}
      >
        <TextInput
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
    </>
  );
}

function PhoneCodeSelector({
  formApi,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  formApi: UseFormReturn<any, any, undefined>;
}) {
  const [selectWindowOpen, setSearchWindowOpen] = useState<boolean>(false);
  const [phoneCodeIndex, setPhoneCodeIndex] = useState<number>(0);

  const { register, setValue } = formApi;
  const mappedPhoneCode = useMemo(
    () =>
      countryPhoneCode.map(({ prefix, emoji, name }, index) => ({
        value: prefix,
        key: index,
        label: `${prefix} ${emoji} ${name}`,
        labelShort: `${prefix} ${emoji}`,
      })),
    []
  );
  const selectedPhoneCode = mappedPhoneCode[phoneCodeIndex];
  const phoneCodeButtonString =
    selectedPhoneCode !== undefined
      ? selectWindowOpen
        ? selectedPhoneCode.label
        : selectedPhoneCode.labelShort
      : "Select your phone code";

  function handlePhoneCountryCodeChange(newPhoneCodeIndex: string) {
    const index = Number(newPhoneCodeIndex);
    const phoneCodeEntry = mappedPhoneCode[index];
    setPhoneCodeIndex(index);
    setValue("phoneCountryCode", phoneCodeEntry?.value);
  }

  return (
    <>
      <input
        type="text"
        {...register("phoneCountryCode", {
          required: { value: true, message: "Country code is required" },
        })}
        hidden
      />
      <CustomCombobox
        open={selectWindowOpen}
        onChangeOpen={setSearchWindowOpen}
        datas={mappedPhoneCode.map(({ label, key }) => ({
          label,
          value: label,
          key: String(key),
        }))}
        currentValue={selectedPhoneCode.label}
        setValue={handlePhoneCountryCodeChange}
      >
        <button
          {...props}
          className={twMerge(
            "flex items-center px-3 data-[state=open]:w-80 rounded-lg border-2 border-slate-300",
            props.className
          )}
        >
          <span className="mr-3">{phoneCodeButtonString}</span>

          <HiChevronUpDown className=" h-5 w-5 ml-auto" />
        </button>
      </CustomCombobox>
    </>
  );
}

export default AddressCommonForm;

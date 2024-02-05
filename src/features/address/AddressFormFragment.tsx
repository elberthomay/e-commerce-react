import { UseFormReturn } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { countryPhoneCode } from "../../variables/countryPhoneCode";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import { HiChevronUpDown } from "react-icons/hi2";
import CustomCombobox from "../../components/CustomCombobox";
import { twMerge } from "tailwind-merge";
import { CollatedLocationDataType } from "../../type/locationType";
import useDebouncedString from "../../hooks/useDebouncedString";
import useLocationQuerySearch from "../../hooks/location/useLocationQuerySearch";
import { pick } from "lodash";
import { toAdministrativeString } from "../../utilities/addressUtils";

export interface AddressCommonFormFieldValues {
  name: string;
  phoneCountryCode: string;
  phoneNumber: string;
  detail: string;
  recipient: string;
}

export function Name({
  formApi,
  name = "name",
  ...inputProps
}: {
  formApi?: UseFormReturn<any, unknown, undefined>;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  if (!formApi) return null;
  const {
    register,
    formState: { errors },

    watch,
  } = formApi;
  return (
    <FormRow
      formErrors={errors}
      label="Address name"
      countString={`${watch(name)?.length ?? 0}/40`}
    >
      <TextInput
        type="text"
        maxLength={40}
        {...inputProps}
        {...register(name, {
          required: { value: true, message: "Address name is required" },
          maxLength: 40,
        })}
      />
    </FormRow>
  );
}

export function PhoneNumber({
  formApi,
  name = "phoneNumber",
}: {
  formApi?: UseFormReturn<any, unknown, undefined>;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  if (!formApi) return null;
  const {
    register,
    formState: { errors },
    setValue,
  } = formApi;

  function handlePhoneNumberChange(e: any) {
    const newValue = e.target.value;
    const numberOnly = newValue.replace(/\D/g, ""); // Remove non-numeric characters

    setValue(
      name,
      numberOnly.charAt(0) === "0" ? numberOnly.slice(1) : numberOnly
    );
  }

  return (
    <FormRow formErrors={errors} label="Phone number" name={name}>
      <div className="group flex gap-2">
        <PhoneCodeSelector formApi={formApi} />
        <TextInput
          type="text"
          minLength={7}
          maxLength={15}
          className=" grow group-data-[error=true]:border-red-400"
          {...register(name, {
            required: { value: true, message: "Phone number is required" },
            minLength: {
              value: 7,
              message: "Phone number cannot have less than 7 characters",
            },
            maxLength: {
              value: 15,
              message: "Phone number cannot be longer than 15 characters",
            },
            onChange: handlePhoneNumberChange,
          })}
        />
      </div>
    </FormRow>
  );
}

export function Detail({
  formApi,
  name = "detail",
}: {
  formApi?: UseFormReturn<any, unknown, undefined>;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  if (!formApi) return null;
  const {
    register,
    formState: { errors },
    watch,
  } = formApi;

  return (
    <FormRow
      label="Detail"
      formErrors={errors}
      countString={`${watch(name)?.length ?? 0}/200`}
    >
      <TextArea
        maxLength={200}
        cols={30}
        {...register(name, {
          required: {
            value: true,
            message: "Address detail is cannot be empty",
          },
          maxLength: {
            value: 200,
            message: "Address detail cannot be longer than 200 characters",
          },
        })}
      ></TextArea>
    </FormRow>
  );
}

export function Recipient({
  formApi,
  name = "recipient",
}: {
  formApi?: UseFormReturn<any, unknown, undefined>;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  if (!formApi) return null;
  const {
    register,
    formState: { errors },
    watch,
  } = formApi;

  return (
    <FormRow
      label="Recipient name"
      formErrors={errors}
      countString={`${watch(name)?.length ?? 0}/40`}
    >
      <TextInput
        type="text"
        maxLength={40}
        {...register(name, {
          required: {
            value: true,
            message: "Packet recipient's name cannot be empty",
          },
          maxLength: {
            value: 40,
            message: "Recipient's name cannot be longer than 40 characters",
          },
        })}
      />
    </FormRow>
  );
}

export function ManualLocationSearch({
  onSelect,
  formApi,
  name = "location",
}: {
  onSelect: (location: CollatedLocationDataType) => void;
  formApi?: UseFormReturn<any, unknown, undefined>;
  name: string;
}) {
  const [locationSearchOpen, setLocationSearchOpen] = useState<boolean>(false);
  const [displayString, setDisplayString] = useState<string | undefined>(
    undefined
  );

  const {
    debouncingString: locationSearchField,
    resultString: locationSearchQuery,
    setDebouncingString: setLocationSearchField,
    setResultString,
  } = useDebouncedString();

  const { isLoading, locations } = useLocationQuerySearch(
    locationSearchQuery,
    true
  );

  if (!formApi) return null;

  const {
    register,
    formState: { errors },
    setValue,
  } = formApi;

  function handleSelect(location: CollatedLocationDataType) {
    console.log(location);
    onSelect(location);
    const administrativeAddress = pick(location, [
      "village",
      "district",
      "city",
      "province",
      "country",
    ]);
    const display = toAdministrativeString(administrativeAddress);
    setDisplayString(display);
    setValue(name, display);
    //empty search query so options disappear
    setLocationSearchOpen(false);
    setLocationSearchField("");
    setResultString("");
  }

  return (
    <>
      <input
        type="hidden"
        hidden={true}
        {...register(name, {
          required: { value: true, message: "Location must be selected" },
        })}
      />
      <div className="relative">
        <FormRow label="Location" name={name} formErrors={errors}>
          <TextInput
            type="text"
            value={
              !locationSearchOpen && displayString
                ? displayString
                : locationSearchField
            }
            onChange={(e) => setLocationSearchField(e.target.value)}
            placeholder="Enter district or city name"
            onFocus={() => setLocationSearchOpen(true)}
            onBlur={() => {
              if (
                locationSearchField === "" ||
                !locations ||
                locations.length === 0
              ) {
                setLocationSearchOpen(false);
                setLocationSearchField("");
              }
            }}
          />
        </FormRow>

        {locationSearchQuery.length > 0 && (
          <div className="absolute w-full border border-slate-300 rounded-lg p-2 bg-white">
            {isLoading && <p>Loading...</p>}
            {!isLoading &&
              (locations && locations.length > 0 ? (
                locations.map((location) => (
                  <button
                    className="p-2 w-full hover:bg-slate-300 rounded-lg text-left"
                    onClick={() => handleSelect(location)}
                  >
                    {location.display_name}
                  </button>
                ))
              ) : (
                <p>No location found</p>
              ))}
          </div>
        )}
      </div>
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

import Spinner from "../../components/Spinner";
import useGetUserAddresses from "../../hooks/address/useGetUserAddresses";
import useSelectUserAddress from "../../hooks/address/useSelectUserAddress";
import useCreateUserAddress from "../../hooks/address/useCreateUserAddress";
import AddressCreateDialog from "../address/AddressCreateDialog";
import AddressList from "../address/AddressList";
import Button from "../../ui/Button";
import { FaPlus } from "react-icons/fa6";
import CustomDialog from "../../components/CustomDialog";
import {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import CloseDialogConfirmation from "../../ui/CloseDialogConfirmation";
import useSetTitle from "../../hooks/useSetTitle";
import { z } from "zod";
import { addressOutputSchema } from "@elycommerce/common";
import SearchBar from "../../ui/SearchBar";
import { useSearchParams } from "react-router-dom";

function UserAddress() {
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, isError, isSuccess, userAddresses } =
    useGetUserAddresses();
  useSetTitle((defaultTitle) => `Address | ${defaultTitle}`);
  const { createUserAddress } = useCreateUserAddress();
  const { selectUserAddress } = useSelectUserAddress();

  useEffect(() => {
    if ((searchParams.get("addressSearch") ?? "") !== tempSearchQuery) {
      const func = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (tempSearchQuery.length !== 0)
          newSearchParams.set("addressSearch", tempSearchQuery);
        else newSearchParams.delete("addressSearch");
        setSearchParams(newSearchParams);
      };
      const timeoutId = setTimeout(func, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchParams, setSearchParams, tempSearchQuery]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <p>Error occured, will try again in a moment</p>}
      {isSuccess && userAddresses && (
        <div className="flex p-8 flex-col gap-4">
          <div className="flex items-center justify-between">
            <SearchBar.Box>
              <SearchBar.Icon />
              <SearchBar.Input
                value={tempSearchQuery}
                onChange={(e) => setTempSearchQuery(e.target.value)}
              />
            </SearchBar.Box>
            <CustomDialog
              trigger={
                <UseraddressCreateButton userAddresses={userAddresses} />
              }
              confirmation={<CloseDialogConfirmation />}
            >
              <AddressCreateDialog createAddress={createUserAddress} />
            </CustomDialog>
          </div>

          <AddressList
            addresses={userAddresses}
            onSelect={selectUserAddress}
            allowUnselect={false}
          />
        </div>
      )}
    </>
  );
}

const UseraddressCreateButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    userAddresses: z.infer<typeof addressOutputSchema>[];
  }
>(({ userAddresses, ...props }, forwardedRef) => {
  return (
    <Button
      {...props}
      className={twMerge(
        " px-4 flex items-center gap-2 rounded-lg",
        props.className
      )}
      ref={forwardedRef}
      disabled={userAddresses.length >= 10}
    >
      <FaPlus className="h-3 w-3" />
      Create new address
    </Button>
  );
});

export default UserAddress;

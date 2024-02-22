import Spinner from "../../components/Spinner";
import useGetUserAddresses from "../../hooks/address/useGetUserAddresses";
import useSelectUserAddress from "../../hooks/address/useSelectUserAddress";
import useCreateUserAddress from "../../hooks/address/useCreateUserAddress";
import AddressCreateDialog from "../address/AddressCreateDialog";
import AddressList from "../address/AddressList";
import Button from "../../ui/Button";
import { FaPlus } from "react-icons/fa6";
import CustomDialog from "../../components/CustomDialog";
import { AddressOutputType } from "../../type/addressType";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import CloseDialogConfirmation from "../../ui/CloseDialogConfirmation";
import useSetTitle from "../../hooks/useSetTitle";

function UserAddress() {
  const { isLoading, isError, isSuccess, userAddresses } =
    useGetUserAddresses();
  useSetTitle((defaultTitle) => `Address | ${defaultTitle}`);
  const { createUserAddress } = useCreateUserAddress();
  const { selectUserAddress } = useSelectUserAddress();
  return (
    <>
      {isLoading && <Spinner />}
      {isError && <p>Error occured, will try again in a moment</p>}
      {isSuccess && userAddresses && (
        <div className="flex p-8 flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>searchbar</div>
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
    userAddresses: AddressOutputType[];
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

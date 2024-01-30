import Spinner from "../../components/Spinner";
import useGetUserAddresses from "../../hooks/address/useGetUserAddresses";
import useSelectUserAddress from "../../hooks/address/useSelectUserAddress";
import useCreateUserAddress from "../../hooks/address/useCreateUserAddress";
import AddressCreateDialog from "../address/AddressCreateDialog";
import AddressList from "../address/AddressList";
import Button from "../../ui/Button";
import { FaPlus } from "react-icons/fa6";
import CustomDialog, {
  useCustomDialogContext,
} from "../../components/CustomDialog";
import { AddressOutputType } from "../../type/addressType";
import { ButtonHTMLAttributes, HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function UserAddress() {
  const { isLoading, isError, isSuccess, userAddresses } =
    useGetUserAddresses();
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

const CloseDialogConfirmation = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { closeDialog, closeConfirmation } = useCustomDialogContext();
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(
        "flex flex-col gap-3 w-[min(20rem,95vh)]",
        props.className
      )}
    >
      <div className="text-center">
        <p>Are you sure you want to quit?</p>
        <p>Your progress will not be saved</p>
      </div>
      <div className="grid grid-cols-2 gap-2 justify-center">
        <Button
          className="w-full bg-slate-100 border-governor-bay-800 text-governor-bay-800 hover:border-governor-bay-500 hover:border-l-governor-bay-500"
          onClick={closeConfirmation}
        >
          Continue
        </Button>
        <Button className="w-full" onClick={closeDialog}>
          Close
        </Button>
      </div>
    </div>
  );
});

export default UserAddress;

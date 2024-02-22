import CustomDialog from "../../components/CustomDialog";
import Spinner from "../../components/Spinner";
import useCreateShopAddress from "../../hooks/address/useCreateShopAddress";
import useGetShopAddresses from "../../hooks/address/useGetShopAddresses";
import useSetTitle from "../../hooks/useSetTitle";
import Button from "../../ui/Button";
import CloseDialogConfirmation from "../../ui/CloseDialogConfirmation";
import AddressCreateDialog from "../address/AddressCreateDialog";
import ShopAddressTable from "./ShopAddressTable";

function MyShopAddressSettings() {
  const { isLoading, error, shopAddress } = useGetShopAddresses();
  const { createShopAddress } = useCreateShopAddress();
  useSetTitle((defaultTitle) => `Shop Address | ${defaultTitle}`);
  return (
    <>
      {isLoading && <Spinner />}
      {error && <p>Error fetching addresses</p>}
      {shopAddress && (
        <div className="p-2 flex flex-col gap-3">
          <h1 className="text-xl font-bold">Shop Locations</h1>
          <div className="flex justify-end">
            <CustomDialog
              trigger={<Button className="px-3">Create New Address</Button>}
              confirmation={<CloseDialogConfirmation />}
            >
              <AddressCreateDialog createAddress={createShopAddress} />
            </CustomDialog>
          </div>
          <ShopAddressTable shopAddress={shopAddress} />
        </div>
      )}
    </>
  );
}

export default MyShopAddressSettings;

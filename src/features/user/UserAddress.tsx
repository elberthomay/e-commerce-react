import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import useGetUserAddresses from "../../hooks/address/useGetUserAddresses";
import useSelectUserAddress from "../../hooks/address/useSelectUserAddress";
import useCreateUserAddress from "../../hooks/address/useCreateUserAddress";
import AddressCreateDialog from "../address/AddressCreateDialog";
import AddressList from "../address/AddressList";

function UserAddress() {
  const { isLoading, isError, isSuccess, userAddresses } =
    useGetUserAddresses();
  const { createUserAddress } = useCreateUserAddress();
  const { selectUserAddress } = useSelectUserAddress();
  return (
    <>
      <h1>User Address</h1>
      {isLoading && <Spinner />}
      {isError && <p>Error occured, will try again in a moment</p>}
      {isSuccess && userAddresses && (
        <>
          <Modal>
            <Modal.Open id="createAddress">
              <button disabled={!isSuccess || userAddresses.length >= 10}>
                Create new address
              </button>
            </Modal.Open>
            <Modal.Window id="createAddress">
              <AddressCreateDialog createAddress={createUserAddress} />
            </Modal.Window>
          </Modal>
          <AddressList
            addresses={userAddresses}
            onSelect={selectUserAddress}
            allowUnselect={false}
          />
        </>
      )}
    </>
  );
}

export default UserAddress;

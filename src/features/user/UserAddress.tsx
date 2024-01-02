import Modal, { useModal } from "../../components/Modal";
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
          <Modal useConfirmation={true}>
            <Modal.Open id="createAddress">
              <button disabled={!isSuccess || userAddresses.length >= 10}>
                Create new address
              </button>
            </Modal.Open>
            <Modal.Window id="createAddress" style="replace">
              <AddressCreateDialog createAddress={createUserAddress} />
            </Modal.Window>
            <Modal.Confirmation>
              <CloseDialogConfirmation />
            </Modal.Confirmation>
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

function CloseDialogConfirmation() {
  const { close, cancelClose } = useModal();
  return (
    <>
      <p>Are you sure you want to quit? Your progress will not be saved </p>
      <button
        onClick={() => {
          close();
        }}
      >
        Close
      </button>
      <button onClick={cancelClose}>Cancel</button>
    </>
  );
}

export default UserAddress;

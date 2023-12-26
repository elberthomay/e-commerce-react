import { HiCheck } from "react-icons/hi2";
import AddressRow from "./AddressRow";
import { AddressOutputType } from "../../type/addressType";

function AddressList({
  addresses,
  onSelect,
  allowUnselect,
}: {
  addresses: AddressOutputType[];
  onSelect: (id: string) => any;
  allowUnselect: boolean;
}) {
  return (
    <>
      <div>
        {addresses?.map((address) => (
          <div key={address.id}>
            <AddressRow address={address} />
            {!address.selected ? (
              <div onClick={() => onSelect(address.id)}>select</div>
            ) : allowUnselect ? (
              <div onClick={() => onSelect(address.id)}>Unselect</div>
            ) : (
              <HiCheck />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AddressList;

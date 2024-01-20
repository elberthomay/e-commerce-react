import AddressRow from "./AddressRow";
import { AddressOutputType } from "../../type/addressType";

function AddressList({
  addresses,
  onSelect,
  allowUnselect,
}: {
  addresses: AddressOutputType[];
  onSelect: (id: string) => void;
  allowUnselect: boolean;
}) {
  return addresses.length > 0 ? (
    <div className="flex flex-col gap-4">
      {addresses?.map((address) => (
        <AddressRow
          key={address.id}
          address={address}
          onSelect={onSelect}
          allowUnselect={allowUnselect}
        />
      ))}
    </div>
  ) : (
    <EmptyAddressList />
  );
}

function EmptyAddressList() {
  return (
    <div className="inline-block mx-auto p-8 rounded-lg border border-slate-300 shadow-lg">
      <p className="text-lg font-bold">Your Address list is empty</p>
      <p className="text-sm text-slate-300">
        Create address before creating your order
      </p>
    </div>
  );
}

export default AddressList;

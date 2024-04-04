import AddressRow from "./AddressRow";
import { z } from "zod";
import { addressOutputArraySchema } from "@elycommerce/common";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

function AddressList({
  addresses,
  onSelect,
  allowUnselect,
}: {
  addresses: z.infer<typeof addressOutputArraySchema>;
  onSelect: (id: string) => void;
  allowUnselect: boolean;
}) {
  const [searchParams] = useSearchParams();
  const displayedAddress = useMemo(
    () =>
      // address is included if substring of it's name, recipient, phoneNumber or detail match the search query
      addresses.filter(({ name, recipient, phoneNumber, detail }) =>
        [name, recipient, phoneNumber, detail].some(
          (string) =>
            string
              .toLowerCase()
              .indexOf(
                searchParams.get("addressSearch")?.toLowerCase() ?? ""
              ) !== -1
        )
      ),
    [addresses, searchParams]
  );

  return (
    <>
      {addresses.length > 0 && displayedAddress.length > 0 && (
        <div className="flex flex-col gap-4">
          {displayedAddress?.map((address) => (
            <AddressRow
              key={address.id}
              address={address}
              onSelect={onSelect}
              allowUnselect={allowUnselect}
            />
          ))}
        </div>
      )}
      {addresses.length > 0 && displayedAddress.length === 0 && (
        <p className="text-center text-lg font-bold text-slate-500">
          No Address matches the search criteria
        </p>
      )}
      {addresses.length === 0 && <EmptyAddressList />}
    </>
  );
}

function EmptyAddressList() {
  return (
    <div className="flex flex-col gap-2 items-center mx-auto p-8 rounded-lg border border-slate-300 shadow-lg">
      <p className="text-lg font-bold">Your Address List is Empty</p>
      <p className="text text-slate-300">
        Create address before creating your order
      </p>
    </div>
  );
}

export default AddressList;

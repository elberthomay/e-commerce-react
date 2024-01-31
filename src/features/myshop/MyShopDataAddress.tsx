import Spinner from "../../components/Spinner";
import useGetShopAddresses from "../../hooks/address/useGetShopAddresses";

function MyShopDataAddress() {
  const { isLoading, error, shopAddress } = useGetShopAddresses();
  return (
    <>
      {isLoading && <Spinner />}
      {error && <p>Error fetching addresses</p>}
    </>
  );
}

export default MyShopDataAddress;

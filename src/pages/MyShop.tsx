import CreateShop from "../features/shop/CreateShop";
import ShopMain from "../features/shop/ShopMain";
import useGetCurrentShop from "../hooks/shop/useGetCurrentShop";

function MyShop() {
  const { isLoading, currentShop } = useGetCurrentShop();
  return (
    <>
      {!isLoading &&
        (currentShop?.id ? (
          <div>
            <ShopMain />
          </div>
        ) : (
          <CreateShop />
        ))}
    </>
  );
}

export default MyShop;

import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

import useGetShop from "../hooks/shop/useGetShop";
import { RequestError } from "../error/RequestError";
import ShopItemTable from "../features/shop/ShopItemTable";
import GutteredBox from "../ui/GutteredBox";
import ShopInformation from "../components/shop/ShopInformation";
import useSetTitle from "../hooks/useSetTitle";
function Shop() {
  const { shopId } = useParams();
  const { isLoading, error, shop } = useGetShop(shopId);
  useSetTitle(
    shop ? (defaultTitle) => `${shop.name} | ${defaultTitle}` : undefined
  );
  return (
    <GutteredBox>
      {isLoading && <Spinner />}
      {!isLoading &&
        error &&
        (error instanceof RequestError ? (
          <p>Shop does not exist</p>
        ) : (
          <p>Error fetching shop</p>
        ))}
      {!isLoading && shop && (
        <div className="flex flex-col gap-2">
          <ShopInformation shop={shop} />
          <ShopItemTable shopId={shop.id} />
        </div>
      )}
    </GutteredBox>
  );
}

export default Shop;

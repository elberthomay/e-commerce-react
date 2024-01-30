import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

import useGetShop from "../hooks/shop/useGetShop";
import { RequestError } from "../error/RequestError";
import { formatDistanceToNow } from "date-fns";
import ShopItemTable from "../features/shop/ShopItemTable";
import GutteredBox from "../ui/GutteredBox";
function Shop() {
  const { shopId } = useParams();
  const { isLoading, error, shop } = useGetShop(shopId);
  const { name, description, createdAt } = shop ?? {};
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
        <div>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>
            created{" "}
            {formatDistanceToNow(new Date(createdAt!), { addSuffix: true })}
          </p>
          <h1>Items</h1>
          <ShopItemTable shopId={shopId!} />
        </div>
      )}
    </GutteredBox>
  );
}

export default Shop;

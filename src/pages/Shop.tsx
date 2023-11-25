import { useParams } from "react-router-dom";
import useGetShopItems from "../features/shop/useGetShopItems";
import Spinner from "../components/Spinner";
import ItemRow from "../features/item/ItemRow";
function Shop() {
  const { shopId } = useParams();
  const { isLoading, error, shopItem } = useGetShopItems(shopId ?? "", 80, 1);
  console.log(shopItem);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <div>
          <h1>Shop {shopId}</h1>
          <div>
            {shopItem.map((item: any) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Shop;

import { Link, useParams } from "react-router-dom";
import useGetItem from "../hooks/item/useGetItem";
import Spinner from "../components/Spinner";
import AddToCartBox from "../features/item/AddToCartBox";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import ImageDisplay from "../ui/ImageDisplay";
import useGetShop from "../hooks/shop/useGetShop";
import { createImageUrl } from "../api/image";
function ItemDetail() {
  const { itemId } = useParams();
  const { isLoading, error, item } = useGetItem(itemId ?? "");
  const { shop } = useGetShop(item?.shopId);
  const { isAuthenticated } = useGetCurrentUser();
  const { id, name, shopId, shopName, description, price, quantity, images } =
    item ?? {};
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && item && shop && (
        <>
          <div>
            <h1>{name}</h1>
            <ImageDisplay images={item.images} />
            <p>Description: {description}</p>

            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
            {isAuthenticated && (
              <AddToCartBox itemId={item.id} inventory={item.quantity} />
            )}
          </div>
          <div>
            <img
              src={createImageUrl(shop.avatar ?? "defaultAvatar.webp", {
                height: 50,
              })}
              alt=""
            />
            <Link to={`/shop/${shopId}`}>Shop: {shopName}</Link>
          </div>
        </>
      )}
    </>
  );
}

export default ItemDetail;

import { Link, useParams } from "react-router-dom";
import useGetItem from "../hooks/item/useGetItem";
import Spinner from "../components/Spinner";
import AddToCartBox from "../features/item/AddToCartBox";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import ImageDisplay from "../ui/ImageDisplay";
function ItemDetail() {
  const { itemId } = useParams();
  const { isLoading, error, item } = useGetItem(itemId ?? "");
  const { isAuthenticated } = useGetCurrentUser();
  const { id, name, shopId, shopName, description, price, quantity, images } =
    item ?? {};
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && item && (
        <div>
          <h1>{name}</h1>
          <ImageDisplay images={item.images} />
          <p>Description: {description}</p>
          <Link to={`/shop/${shopId}`}>Shop: {shopName}</Link>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
          {isAuthenticated && (
            <AddToCartBox itemId={item.id} inventory={item.quantity} />
          )}
        </div>
      )}
    </>
  );
}

export default ItemDetail;

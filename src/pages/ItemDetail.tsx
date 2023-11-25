import { Link, useParams } from "react-router-dom";
import useGetItem from "../features/item/useGetItem";
import Spinner from "../components/Spinner";
import AddToCartBox from "../features/item/AddToCartBox";
import useGetCurrentUser from "../features/user/useGetCurrentUser";
function ItemDetail() {
  const { itemId } = useParams();
  const { isLoading, error, item } = useGetItem(itemId ?? "");
  const { isAuthenticated } = useGetCurrentUser();
  console.log(item);
  const { id, name, shopId, description, price, quantity } = item ?? {};
  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && !error && (
        <div>
          <h1>{name}</h1>
          <p>Description: {description}</p>
          <Link to={`/shop/${shopId}`}>Shop: {shopId}</Link>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
          {isAuthenticated && <AddToCartBox itemId={id} inventory={quantity} />}
        </div>
      )}
    </>
  );
}

export default ItemDetail;

import { Link } from "react-router-dom";
import { getItemType } from "../../type/itemType";

function ItemRow({ item }: { item: getItemType }) {
  const { id, name, price, quantity, shopId, shopName } = item;
  return (
    <Link to={`/item/${id}`}>
      <li>
        <p>{name}</p>
        <p>{price}</p>
        <Link to={`/shop/${shopId}`}>{shopName}</Link>
      </li>
    </Link>
  );
}

export default ItemRow;

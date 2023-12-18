import { Link } from "react-router-dom";
import { ItemRowType } from "../../type/itemType";
import { createImageUrl } from "../../api/image";

function ItemRow({ item }: { item: ItemRowType }) {
  const { id, name, price, quantity, image, shopId, shopName } = item;
  return (
    <Link to={`/item/${id}`}>
      <li>
        <img src={createImageUrl(image ?? "image-not-found.webp")} alt="" />
        <p>{name}</p>
        <p>Rp.{price}</p>
        <Link to={`/shop/${shopId}`}>{shopName}</Link>
      </li>
    </Link>
  );
}

export default ItemRow;

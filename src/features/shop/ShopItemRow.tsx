import { Link } from "react-router-dom";
import { createImageUrl } from "../../api/image";
import { ShopItemRowType } from "../../type/shopType";

function ShopItemRow({ item }: { item: ShopItemRowType }) {
  const { id, name, price, image } = item;
  return (
    <Link to={`/item/${id}`}>
      <li>
        <img src={createImageUrl(image ?? "image-not-found.webp")} alt="" />
        <p>{name}</p>
        <p>Rp.{price}</p>
      </li>
    </Link>
  );
}

export default ShopItemRow;

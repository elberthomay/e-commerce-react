import { createImageUrl } from "../../api/image";
import { cartOutputType } from "../../type/cartType";

function HeaderCartRow({ item }: { item: cartOutputType }) {
  const { name, quantity, price, image } = item;
  return (
    <div>
      <img src={createImageUrl(image ?? "image-not-found.webp")} alt="" />
      <p>{name}</p>
      <p>
        {quantity} item{quantity > 1 ? "s" : ""}
      </p>
      <p>Rp.{price}</p>
    </div>
  );
}

export default HeaderCartRow;

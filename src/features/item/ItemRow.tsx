import { ItemRowType } from "../../type/itemType";
import ItemCard from "../../components/ItemCard";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

function ItemRow({
  item,
  ...props
}: HTMLAttributes<HTMLDivElement> & { item: ItemRowType }) {
  const { id, name, price, quantity, image, shopName } = item;
  return (
    <Link to={`/item/${id}`}>
      <ItemCard itemName={name} quantity={quantity} {...props}>
        <ItemCard.Image image={image} name={name} />
        <ItemCard.Body>
          <ItemCard.Name>{name}</ItemCard.Name>
          <ItemCard.Price>{price}</ItemCard.Price>
          <ItemCard.Shop>{shopName}</ItemCard.Shop>
        </ItemCard.Body>
      </ItemCard>
    </Link>
  );
}

export default ItemRow;

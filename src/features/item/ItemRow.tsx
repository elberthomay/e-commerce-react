import { ItemRowType } from "../../type/itemType";
import ItemCard from "../../components/ItemCard";
import { AnchorHTMLAttributes } from "react";

function ItemRow({
  item,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { item: ItemRowType }) {
  const { id, name, price, quantity, image, shopId, shopName } = item;
  return (
    <ItemCard
      itemName={name}
      link={`/item/${id}`}
      quantity={quantity}
      {...props}
    >
      <ItemCard.Image image={image} name={name} />
      <ItemCard.Body>
        <ItemCard.Name>{name}</ItemCard.Name>
        <ItemCard.Price>{price}</ItemCard.Price>
        <ItemCard.Shop>{shopName}</ItemCard.Shop>
      </ItemCard.Body>
    </ItemCard>
  );
}

export default ItemRow;

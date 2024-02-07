import { Link } from "react-router-dom";
import { ShopItemRowType } from "../../type/shopType";
import ItemCard from "../../components/ItemCard";

function ShopItemRow({ item }: { item: ShopItemRowType }) {
  const { id, name, price, quantity, image } = item;
  return (
    <Link to={`/item/${id}`}>
      <ItemCard
        itemName={name}
        quantity={quantity}
        className="flex flex-col gap-1"
      >
        <ItemCard.Image image={image} name={name} />
        <ItemCard.Body>
          <ItemCard.Name>{name}</ItemCard.Name>
          <ItemCard.Price>{price}</ItemCard.Price>
        </ItemCard.Body>
      </ItemCard>
    </Link>
  );
}

export default ShopItemRow;

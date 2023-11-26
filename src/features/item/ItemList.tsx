import { itemRowType } from "../../type/itemType";
import ItemRow from "./ItemRow";

function ItemList({ items }: { items: itemRowType[] }) {
  return (
    <>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </>
  );
}

export default ItemList;

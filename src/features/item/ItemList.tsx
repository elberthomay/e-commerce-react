import { ItemRowType } from "../../type/itemType";
import ItemRow from "./ItemRow";

function ItemList({ items }: { items: ItemRowType[] }) {
  return (
    <>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </>
  );
}

export default ItemList;

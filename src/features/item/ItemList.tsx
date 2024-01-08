import { ItemRowType } from "../../type/itemType";
import ItemRow from "./ItemRow";

function ItemList({ items }: { items: ItemRowType[] }) {
  return (
    <div className="flex flex-wrap justify-center items-stretch gap-3">
      {items.map((item) => (
        <ItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;

import { ShopItemRowType } from "../../type/shopType";
import ShopItemRow from "./ShopItemRow";

function ShopItemList({ items }: { items: ShopItemRowType[] }) {
  return (
    <>
      {items.length !== 0 ? (
        items.map((item) => <ShopItemRow key={item.id} item={item} />)
      ) : (
        <p>No item could be displayed</p>
      )}
    </>
  );
}

export default ShopItemList;

import { ShopItemRowType } from "../../type/shopType";
import ShopItemRow from "./ShopItemRow";

function ShopItemList({ items }: { items: ShopItemRowType[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,12rem)] justify-center items-stretch gap-3">
      {items.length !== 0 ? (
        items.map((item) => <ShopItemRow key={item.id} item={item} />)
      ) : (
        <p>No item could be displayed</p>
      )}
    </div>
  );
}

export default ShopItemList;

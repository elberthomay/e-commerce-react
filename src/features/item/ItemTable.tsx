import Filter from "../../components/Filter";
import ItemList from "./ItemList";

function ItemTable() {
  return (
    <div>
      <h1>Items</h1>
      <Filter />
      <ItemList />
    </div>
  );
}

export default ItemTable;

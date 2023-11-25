import Spinner from "../../components/Spinner";
import ItemRow from "./ItemRow";
import useGetItems from "./useGetItems";

function ItemList() {
  const { isLoading, error, items } = useGetItems(80, 1, []);
  console.log(items);
  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading &&
        items !== undefined &&
        items.map((item) => <ItemRow key={item.id} item={item} />)}
    </div>
  );
}

export default ItemList;

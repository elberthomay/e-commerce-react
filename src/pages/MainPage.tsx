import { Link } from "react-router-dom";
import ItemTable from "../features/item/ItemTable";
function MainPage() {
  return (
    <div>
      <h1>Item list</h1>
      <ItemTable />
    </div>
  );
}

export default MainPage;

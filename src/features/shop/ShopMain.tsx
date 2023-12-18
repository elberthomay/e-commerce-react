import { Link, Outlet } from "react-router-dom";

function ShopMain() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/myshop/">Dashboard</Link>
          </li>
          <li>
            <Link to="/myshop/items">Items</Link>
          </li>
          <li>
            <Link to="/myshop/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default ShopMain;

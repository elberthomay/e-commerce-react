import { Link, Outlet } from "react-router-dom";
function UserSettings() {
  return (
    <div>
      <Link to="/user/settings/">User Data</Link>
      <Link to="/user/settings/address">Address</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserSettings;

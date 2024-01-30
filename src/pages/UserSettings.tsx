import { Outlet } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import NavigationTab from "../components/NavigationTab";
import GutteredBox from "../ui/GutteredBox";
function UserSettings() {
  const { currentUser } = useGetCurrentUser();
  return (
    <GutteredBox>
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-3">
          <IoPersonOutline className="h-3 w-3 shrink-0" />
          <span className="text-ellipsis overflow-hidden">
            {currentUser?.name}
          </span>
        </p>
        <NavigationTab>
          <NavigationTab.Item to="/user/settings">
            Personal Data
          </NavigationTab.Item>
          <NavigationTab.Item to="/user/settings/address">
            Addresses
          </NavigationTab.Item>
        </NavigationTab>

        <div>
          <Outlet />
        </div>
      </div>
    </GutteredBox>
  );
}

export default UserSettings;

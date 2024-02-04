import { FaShop } from "react-icons/fa6";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import NavigationTab from "../../components/NavigationTab";
import { Outlet } from "react-router-dom";

function MyShopSetting() {
  const { currentShop } = useGetCurrentShop();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-slate-500 mb-4">
        <FaShop className="h-8 w-8 " />
        <span className=" font-bold text-2xl">{currentShop?.name}</span>
      </div>
      <NavigationTab>
        <NavigationTab.Item to="/myshop/settings">Shop Data</NavigationTab.Item>
        <NavigationTab.Item to="/myshop/settings/address">
          Locations
        </NavigationTab.Item>
      </NavigationTab>
      <Outlet />
    </div>
  );
}

export default MyShopSetting;

import { Outlet } from "react-router-dom";
import SideNavigation from "../../components/SideNavigation";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiArchiveBox, HiOutlineArchiveBox } from "react-icons/hi2";
import { PiGear, PiGearFill } from "react-icons/pi";
import Header from "../../components/header/Header";

function ShopMain() {
  return (
    <div className="h-dvh grid grid-rows-[auto_minmax(0,1fr)]">
      <Header />
      <div className="h-full grid grid-cols-[auto_minmax(0,1fr)]">
        <SideNavigation className="h-full">
          <SideNavigation.Item
            IconRender={BsGraphUpArrow}
            IconFilledRender={BsGraphUpArrow}
            to="/myshop/"
            end
          >
            Dashboard
          </SideNavigation.Item>

          <SideNavigation.Item
            IconRender={HiOutlineArchiveBox}
            IconFilledRender={HiArchiveBox}
            to="/myshop/items"
          >
            Items
          </SideNavigation.Item>

          <SideNavigation.Item
            IconRender={PiGear}
            IconFilledRender={PiGearFill}
            to="/myshop/settings"
          >
            Settings
          </SideNavigation.Item>

          {Array.from({ length: 20 }).map((_) => (
            <SideNavigation.Item
              IconRender={PiGear}
              IconFilledRender={PiGearFill}
              to="/myshop/settings"
            >
              Settings
            </SideNavigation.Item>
          ))}
        </SideNavigation>
        <main className="h-full p-2 sm:p-6 flex-grow overflow-y-auto">
          <div className="h-[100rem]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShopMain;

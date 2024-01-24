import { Link, Outlet, useLocation } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { ReactNode } from "react";
function UserSettings() {
  const { currentUser } = useGetCurrentUser();
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-3">
        <IoPersonOutline className="h-3 w-3 shrink-0" />
        <span className="text-ellipsis overflow-hidden">
          {currentUser?.name}
        </span>
      </p>
      <div className="w-full flex flex-start gap-1 border-b border-slate-300">
        <NavigationTabItem to="/user/settings/">
          Personal Data
        </NavigationTabItem>
        <NavigationTabItem to="/user/settings/address/">
          Addresses
        </NavigationTabItem>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

function NavigationTabItem({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className="group flex flex-col items-center"
      data-active={active}
    >
      <div className="p-4 text-sm font-bold text-slate-500  hover:text-governor-bay-500 group-data-[active=true]:text-governor-bay-800">
        {children}
      </div>
      <div className="h-[2px] bg-governor-bay-800 w-0 group-data-[active=true]:w-full group-hover:w-full transition-all duration-200"></div>
    </Link>
  );
}

export default UserSettings;

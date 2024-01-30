import { HTMLAttributes, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavigationTab({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        "w-full flex flex-shrink-0 flex-grow-0 flex-start gap-1 border-b border-slate-300 overflow-x-auto scrollbar-small",
        className
      )}
    >
      {children}
    </div>
  );
}

const isPathEqual = (p1: string, p2: string) =>
  p1.replace(/\/+$/, "") === p2.replace(/\/+$/, "");
function Item({ children, to }: { children: ReactNode; to: string }) {
  const { pathname } = useLocation();
  //make sure to remove trailing slash out of equation
  const active = isPathEqual(pathname, to);
  return (
    <Link
      to={to}
      className="group flex flex-col items-center"
      data-active={active}
    >
      <div className="p-4 py-2 sm:py-4 text-sm font-bold text-slate-500  hover:text-governor-bay-500 group-data-[active=true]:text-governor-bay-800">
        {children}
      </div>
      <div className="h-[2px] bg-governor-bay-800 w-0 group-data-[active=true]:w-full group-hover:w-full transition-all duration-200"></div>
    </Link>
  );
}

NavigationTab.Item = Item;

export default NavigationTab;

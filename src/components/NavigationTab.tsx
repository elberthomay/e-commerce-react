import { HTMLAttributes, ReactNode } from "react";
import { NavLink } from "react-router-dom";
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

function Item({ children, to }: { children: ReactNode; to: string }) {
  //make sure to remove trailing slash out of equation
  return (
    <NavLink to={to} className="group flex flex-col items-center" end>
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div
            data-active={isActive}
            className="p-4 py-2 sm:py-4 text-sm font-bold text-slate-500  hover:text-governor-bay-500 data-[active=true]:text-governor-bay-800"
          >
            {children}
          </div>
          <div
            data-active={isActive}
            className="h-[2px] bg-governor-bay-800 w-0 data-[active=true]:w-full group-hover:w-full transition-all duration-200"
          ></div>
        </>
      )}
    </NavLink>
  );
}

NavigationTab.Item = Item;

export default NavigationTab;

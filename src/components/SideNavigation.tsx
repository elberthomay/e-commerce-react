import {
  Dispatch,
  HTMLAttributes,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IconType } from "react-icons";
import { useMaxBreakpoints } from "../hooks/useWindowSize";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { Link, NavLink, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import * as Tooltip from "@radix-ui/react-tooltip";

type SideNavigationContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  size: "full" | "mini";
  setSize: Dispatch<SetStateAction<"full" | "mini">>;
};

const SideNavigationContext = createContext<SideNavigationContextType | null>(
  null
);

function SideNavigation({
  contextRef,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  contextRef?: MutableRefObject<SideNavigationContextType>;
}) {
  const { isSm } = useMaxBreakpoints();
  const [open, setOpen] = useState<boolean>(isSm ? true : false);
  const [size, setSize] = useState<"full" | "mini">(isSm ? "full" : "mini");

  const sideNavigationContextValue: SideNavigationContextType = useMemo(
    () => ({
      open,
      setOpen,
      size,
      setSize,
    }),
    [open, size, setOpen, setSize]
  );

  useEffect(() => {
    if (contextRef) contextRef.current = sideNavigationContextValue;
  }, [contextRef, sideNavigationContextValue]);

  return (
    <SideNavigationContext.Provider value={sideNavigationContextValue}>
      <nav
        data-open={open}
        data-size={size}
        {...props}
        className={twMerge(
          "group transition-all overflow-y-auto overflow-x-clip flex flex-col items-stretch scrollbar-small bg-blue-500",
          className
        )}
      >
        <Trigger />
        {children}
      </nav>
    </SideNavigationContext.Provider>
  );
}

function Trigger() {
  const { isSm } = useMaxBreakpoints();
  const { open, setOpen, size, setSize } = useSideNavigationContext();
  return (
    <div className="flex items-center">
      <button
        className="px-2 group-data-[size=mini]:pr-0 py-2  flex items-center transition-all gap-3 group-data-[size=mini]:gap-0 *:shrink-0"
        onClick={() => (size === "full" ? setSize("mini") : setOpen(false))}
      >
        <HiChevronLeft className="h-5 w-5" />
        <span className="font-bold text-slate-500 line-clamp-1 w-max group-data-[selected=true]:text-governor-bay-800, transition-all opacity-100 group-data-[size=mini]:opacity-0 max-w-28 group-data-[size=mini]:max-w-0">
          Hide Menu
        </span>
      </button>
      <button
        className="box-border pr-2 py-2 transition-all max-w-8 group-data-[size=full]:max-w-0 group-data-[size=full]:opacity-0 group-data-[size=full]:invisible group-data-[size=full]:p-0"
        onClick={() => setSize("full")}
      >
        <HiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function Item({
  IconRender,
  IconFilledRender,
  to,
  end,
  children,
}: {
  IconRender: IconType;
  IconFilledRender: IconType;
  to: string;
  end?: boolean;
  children: string;
}) {
  const { size } = useSideNavigationContext();

  const renderFunction = ({ isActive }: { isActive: boolean }) => {
    const ItemIcon = (
      <div className="w-full flex justify-center py-1 px-2 rounded-lg data-[size=mini]:hover:bg-slate-300">
        {isActive ? (
          <IconFilledRender className="h-5 w-5 text-governor-bay-800" />
        ) : (
          <IconRender className="h-5 w-5 text-slate-800" />
        )}
      </div>
    );

    return (
      <>
        {size === "full" ? (
          ItemIcon
        ) : (
          <Tooltip.Provider delayDuration={150} skipDelayDuration={150}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>{ItemIcon}</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="right" asChild>
                  <div>
                    <Tooltip.Arrow asChild>
                      <div className="flex items-center justify-center h-[calc(0.625rem+1px)] w-[0.75rem+1px] bg-slate-300 triangle-clip border mr-[-1px]">
                        <div className="h-2.5 w-3 triangle-clip bg-slate-100 "></div>
                      </div>
                    </Tooltip.Arrow>
                    <div className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-300">
                      {children}
                    </div>
                  </div>
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
        <span className="w-full font-bold group-data-[selected=true]:text-governor-bay-800, transition-all opacity-100 group-data-[size=mini]:opacity-0 group-data-[size=mini]:invisible">
          {children}
        </span>
      </>
    );
  };

  return (
    <NavLink
      to={to}
      className="p-1 grid grid-cols-[max-content_minmax(0,1fr)] delay-100 group-data-[size=mini]:grid-cols-[3rem_0] items-center border-left-2 border-transparent transition-all data-[selected=true]:border-governor-bay-800 "
      end={end}
    >
      {renderFunction}
    </NavLink>
  );
}

// function ItemWithAccordion({ children, icon }) {}

function useSideNavigationContext() {
  const context = useContext(SideNavigationContext);
  if (!context) throw Error("SideNavigationCOntext used outside scope");
  else return context;
}

SideNavigation.Trigger = Trigger;
SideNavigation.Item = Item;

export default SideNavigation;

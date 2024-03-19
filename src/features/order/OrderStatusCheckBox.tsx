import { OrderStatuses } from "@elycommerce/common";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { GrFormCheckmark } from "react-icons/gr";
import { HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function OrderStatusCheckBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatuses = searchParams.get("status")?.split(",") ?? [];

  function toggleStatus(status: string) {
    const statusIndex = activeStatuses.findIndex((active) => active === status);
    const newActiveStatuses =
      statusIndex >= 0
        ? activeStatuses.filter((_, i) => i !== statusIndex)
        : [...activeStatuses, status];
    if (newActiveStatuses.length !== 0) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("status", newActiveStatuses.join(","));
      setSearchParams(newSearchParams);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("status");
      setSearchParams(newSearchParams);
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="group flex gap-2 items-center border-2 border-slate-300 rounded-md p-2 py-1 data-[state=open]:border-governor-bay-800">
        <span>Order Status</span>
        <HiChevronRight className="h-4 w-4 text-xl  transition-all duration-200 origin-center rotate-90 group-data-[state=open]:-rotate-90" />
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col min-w-36 p-1 rounded-md border border-slate-300 bg-slate-100"
        sideOffset={5}
      >
        {Object.values(OrderStatuses).map((status) => (
          <button
            className="flex justify-between items-center p-2 pr-1 rounded-md transition hover:bg-slate-200"
            onClick={() => toggleStatus(status)}
          >
            <span className="capitalize">{status}</span>
            {activeStatuses.some((active) => active === status) && (
              <GrFormCheckmark className=" text-governor-bay-800 h-6 w-6" />
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default OrderStatusCheckBox;

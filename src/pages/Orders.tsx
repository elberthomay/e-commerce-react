import { Navigate, useSearchParams } from "react-router-dom";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import SearchBar from "../ui/SearchBar";
import { useEffect, useState } from "react";
import { CustomSelect, CustomSelectItem } from "../components/CustomSelect";
import { Popover } from "../../@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { OrderStatuses } from "@elycommerce/common";
import { HiChevronRight } from "react-icons/hi2";
import { GrFormCheckmark } from "react-icons/gr";
import GutteredBox from "../ui/GutteredBox";
import OrderList from "../features/order/OrderList";
import useSetTitle from "../hooks/useSetTitle";

function Orders() {
  const { currentUser } = useGetCurrentUser();
  useSetTitle((defaultTitle) => `Orders | ${defaultTitle}`);

  return (
    <>
      {!currentUser ? (
        <Navigate to="/" />
      ) : (
        <GutteredBox className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Orders</h1>
          <div className="flex gap-x-2 justify-around flex-wrap">
            <OrderItemSearchBar />
            <OrderStatusCheckBox />
            <div className="flex items-center gap-2">
              <span>Newer Than: </span>
              <OrderNewerThanSelect />
            </div>
            <div className="flex items-center gap-2">
              <span>Sort by: </span>
              <OrderBySelect />
            </div>
          </div>
          <OrderList />
        </GutteredBox>
      )}
    </>
  );
}

function OrderItemSearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchParams.get("query") !== query) {
        if (query.trim().length > 0) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("query", query);
          setSearchParams(newSearchParams);
        } else {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete("query");
          setSearchParams(newSearchParams);
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, searchParams, setSearchParams]);

  return (
    <SearchBar.Box className="bg-slate-100 min-w-40 flex items-center border-slate-300">
      <SearchBar.Icon className="p-0 px-1 h-4" />
      <SearchBar.Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search item name"
        max={200}
        className=""
      />
    </SearchBar.Box>
  );
}

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

function OrderNewerThanSelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueChange(value: string) {
    if (value !== "all") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("newerThan", value);
      setSearchParams(newSearchParams);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("newerThan");
      setSearchParams(newSearchParams);
    }
  }
  return (
    <CustomSelect
      {...{
        open,
        onValueChange: handleValueChange,
        value: searchParams.get("newerThan") ?? "all",
        name: "newerThan",
        triggerClassName: "data-[state=open]:border-governor-bay-800",
      }}
    >
      <CustomSelectItem value="7">1 Week Ago</CustomSelectItem>
      <CustomSelectItem value="30">1 Month Ago</CustomSelectItem>
      <CustomSelectItem value="183">6 Month Ago</CustomSelectItem>
      <CustomSelectItem value="all">All Orders</CustomSelectItem>
    </CustomSelect>
  );
}

function OrderBySelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sortBy", value);
    setSearchParams(newSearchParams);
  }
  return (
    <CustomSelect
      {...{
        open,
        onValueChange: handleValueChange,
        value: searchParams.get("sortBy") ?? "newest",
        name: "sortBy",
        triggerClassName: "data-[state=open]:border-governor-bay-800",
      }}
    >
      <CustomSelectItem value="newest">Newest</CustomSelectItem>
      <CustomSelectItem value="oldest">Oldest</CustomSelectItem>
    </CustomSelect>
  );
}

export default Orders;

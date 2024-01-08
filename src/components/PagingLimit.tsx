import { HTMLAttributes } from "react";
import Limit from "./Limit";
import { twMerge } from "tailwind-merge";

function PagingLimit({
  limit,
  setLimit,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  limit: number;
  setLimit: (limit: number) => void;
}) {
  function handleSetLimit(newLimit: number) {
    setLimit(newLimit);
    window.scroll(0, 0);
  }
  const limitValueClassName =
    "w-10 h-10 rounded-md flex justify-center items-center bg-slate-100 hover:bg-slate-300 data-[selected]:bg-slate-500";
  return (
    <Limit
      {...props}
      limit={limit}
      setLimit={handleSetLimit}
      className={twMerge(props?.className, "flex gap-1")}
    >
      <Limit.LimitValue className={limitValueClassName}>40</Limit.LimitValue>
      <Limit.LimitValue className={limitValueClassName}>60</Limit.LimitValue>
      <Limit.LimitValue className={limitValueClassName}>80</Limit.LimitValue>
    </Limit>
  );
}

export default PagingLimit;

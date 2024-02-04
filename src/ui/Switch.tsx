import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Switch = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }
>(({ active, className, ...props }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      data-active={active}
      {...props}
      className={twMerge(
        "group h-6 w-11 p-[2px] flex data-[active=true]:justify-end rounded-full transition-all bg-red-500 data-[active=true]:bg-green-500 disabled:bg-slate-500",
        className
      )}
    >
      <div className="h-full aspect-square bg-slate-100 rounded-full transition-all group-data-[active=true]:"></div>
    </button>
  );
});

export default Switch;

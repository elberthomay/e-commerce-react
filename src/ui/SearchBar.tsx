import { ComponentProps, forwardRef } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

const Box = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          "border-2 border-solid border-slate-500 rounded-lg flex items-center pr-2 has-[:focus]:border-governor-bay-800",
          className
        )}
      />
    );
  }
);

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <input
        type="text"
        {...props}
        ref={forwardedRef}
        className={twMerge("focus:outline-none bg-slate-100 grow", className)}
      />
    );
  }
);

const Icon = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        {...props}
        className={twMerge("p-2 h-full text-slate-500 shrink-0", className)}
      >
        <HiMagnifyingGlass className="h-full aspect-square " />
      </span>
    );
  }
);

export default { Box, Input, Icon };

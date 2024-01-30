import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const GutteredBox = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        {...props}
        className={twMerge("p-2 md:p-6 max-w-[80rem] mx-auto", className)}
      />
    );
  }
);

export default GutteredBox;

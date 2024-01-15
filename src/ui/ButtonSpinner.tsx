import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

function ButtonSpinner({ className }: { className?: string }) {
  return (
    <CgSpinner
      sdfsfsef="yeah"
      className={twMerge("h-5 w-5 animate-spin", className)}
    />
  );
}

export default ButtonSpinner;

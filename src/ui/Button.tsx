import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "p-2 bg-governor-bay-800 hover:bg-governor-bay-500 font-bold text-slate-200 rounded-md transition-colors duration-150 active:bg-governor-bay-600 disabled:bg-slate-300 disabled:text-slate-500",
        props?.className
      )}
    >
      {props.children}
    </button>
  );
}

export default Button;

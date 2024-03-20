import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const baseClass =
  "p-2 px-4 border border-transparent rounded-md transition-colors duration-150 font-bold";

const variantClasses = {
  blue: "bg-governor-bay-800 hover:bg-governor-bay-500 text-slate-200 active:bg-governor-bay-600 disabled:bg-slate-300 disabled:text-slate-500",
  grey: "border-slate-400 hover:border-slate-500 bg-slate-50 hover:bg-slate-200 active:bg-slate-300 text-slate-500 disabled:bg-slate-300 disabled:text-slate-500 text-slate-700",
  red: "bg-red-600 hover:bg-red-400 active:bg-red-500 text-slate-100",
  green: "bg-green-600 hover:bg-green-400 active:bg-green-500 text-slate-100",
};

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variantClasses;
  }
>(({ variant = "blue", ...props }, forwardedRef) => {
  return (
    <button
      {...props}
      className={twMerge(baseClass, variantClasses[variant], props?.className)}
      ref={forwardedRef}
    >
      {props.children}
    </button>
  );
});

export default Button;

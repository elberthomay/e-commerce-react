import { InputHTMLAttributes, forwardRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { GrFormCheckmark } from "react-icons/gr";

type checkboxPropsType = InputHTMLAttributes<HTMLInputElement> & {
  boxClassName?: string;
  checkClassName?: string;
};

const Checkbox = forwardRef<HTMLInputElement, checkboxPropsType>(
  (props: checkboxPropsType, forwardedRef) => {
    return (
      <>
        <label
          htmlFor={props?.id}
          className={twMerge(
            "flex justify-center items-center h-6 w-6 border-2 rounded-md bg-slate-100 has-[:checked]:bg-governor-bay-600 has-[:disabled]:bg-slate-300 border-slate-500 hover:border-governor-bay-600 has-[:disabled]:border-slate-500  transition-colors duration-100",
            props?.boxClassName
          )}
        >
          <input
            {...props}
            className={twJoin("peer hidden", props?.className)}
            type="checkbox"
            ref={forwardedRef}
          />
          <GrFormCheckmark
            className={twMerge(
              "h-5 w-5 text-slate-100 peer-[:disabled]:text-slate-500 transition-transform duration-100 scale-0 peer-[:checked]:scale-100 origin-center",
              props?.checkClassName
            )}
          />
        </label>
      </>
    );
  }
);

export default Checkbox;

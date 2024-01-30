import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props: InputHTMLAttributes<HTMLInputElement>, forwardRef) => {
  return (
    <input
      {...props}
      ref={forwardRef}
      className={twMerge(
        "p-1.5 border border-slate-300 focus:border-governor-bay-500 rounded-md data-[error=true]:border-red-400",
        props.className
      )}
    />
  );
});

export default TextInput;

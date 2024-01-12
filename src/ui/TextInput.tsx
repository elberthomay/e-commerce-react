import { InputHTMLAttributes, forwardRef } from "react";

const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props: InputHTMLAttributes<HTMLInputElement>, forwardRef) => {
  return (
    <input
      {...props}
      ref={forwardRef}
      className="p-1.5 border-2 border-slate-300 focus:border-governor-bay-500 rounded-md data-[error=true]:border-red-400"
    />
  );
});

export default TextInput;

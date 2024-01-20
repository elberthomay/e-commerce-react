import { TextareaHTMLAttributes, forwardRef } from "react";

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, forwardRef) => {
  return (
    <textarea
      rows={5}
      {...props}
      ref={forwardRef}
      className="p-1.5 border-2 border-slate-300 focus:border-governor-bay-500 rounded-md data-[error=true]:border-red-400"
    />
  );
});

export default TextArea;

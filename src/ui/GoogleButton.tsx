import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function GoogleButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "px-3 py-1 flex justify-between items-center bg-slate-50 border border-slate-300 rounded-md hover:border-slate-400 hover:text-governor-bay-800 transition-colors duration-150",
        props.className
      )}
    >
      <img src="google.png" alt="google icon" className=" h-5 w-5" />
      <p className="text-sm font-bold">{props.children}</p>
      <div className="h-5 w-5"></div>
    </button>
  );
}

export default GoogleButton;

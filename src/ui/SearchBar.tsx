import { InputHTMLAttributes, HTMLAttributes } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

function SearchBar({
  inputProp,
  divProp,
}: {
  inputProp: InputHTMLAttributes<HTMLInputElement>;
  divProp?: HTMLAttributes<HTMLDivElement>;
}) {
  const divClass =
    "border-2 border-solid border-slate-500 rounded-lg flex items-center pr-2 has-[:focus]:border-governor-bay-800";
  const inputClass = "focus:outline-none bg-slate-100 grow";
  return (
    <div {...divProp} className={twMerge(divClass, divProp?.className)}>
      <span className="p-2">
        <HiMagnifyingGlass className="h-5 w-5 text-slate-500" />
      </span>
      <input
        {...inputProp}
        className={twMerge(inputClass, inputProp?.className)}
      />
    </div>
  );
}

export default SearchBar;

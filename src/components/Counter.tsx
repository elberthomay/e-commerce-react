import { ChangeEvent } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

function Counter({
  value,
  step = 1,
  onChange,
  disabled,
  min,
  max,
  className,
}: {
  value: number;
  step?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
}) {
  function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = Number(e.target.value);
    onChange(newValue);
  }

  const handleInc = () => onChange(value + step);
  const handleDec = () => onChange(value - step);
  return (
    <div
      className={twMerge(
        "flex items-center border border-slate-400 rounded-lg has-[:focus]:border-governor-bay-800",
        className
      )}
    >
      <button
        className="group h-8 w-8 flex justify-center items-center text-lg disabled:cursor-not-allowed"
        onClick={handleDec}
        disabled={disabled || (min !== undefined && value <= min)}
      >
        <FiMinus className="h-4 w-4 text-governor-bay-800 group-disabled:text-slate-300" />
      </button>
      <input
        className="w-10 appearance-none text-center"
        type="number"
        disabled={disabled}
        value={value}
        onChange={handleValueChange}
        min={min}
        max={max}
      />
      <button
        className="h-8 w-8 flex justify-center items-center text-lg disabled:cursor-not-allowed"
        onClick={handleInc}
        disabled={disabled || (max !== undefined && value >= max)}
      >
        <FiPlus className="h-4 w-4 text-governor-bay-800 group-disabled:text-slate-300" />
      </button>
    </div>
  );
}

export default Counter;

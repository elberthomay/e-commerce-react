import { FiMinus, FiPlus } from "react-icons/fi";

function Counter({
  onInc,
  onDec,
  value,
  onChange,
  disabled,
  min,
  max,
}: {
  onInc: () => void;
  onDec: () => void;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center border border-slate-400 rounded-lg has-[:focus]:border-governor-bay-800">
      <button
        className="group h-8 w-8 flex justify-center items-center text-lg"
        onClick={onDec}
        disabled={disabled || (min !== undefined && value <= min)}
      >
        <FiMinus className="h-4 w-4 text-governor-bay-800 group-disabled:text-slate-300" />
      </button>
      <input
        className="w-10 appearance-none text-center"
        type="number"
        disabled={disabled}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      <button
        className="h-8 w-8 flex justify-center items-center text-lg"
        onClick={onInc}
        disabled={disabled || (max !== undefined && value >= max)}
      >
        <FiPlus className="h-4 w-4 text-governor-bay-800 group-disabled:text-slate-300" />
      </button>
    </div>
  );
}

export default Counter;

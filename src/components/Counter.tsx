function Counter({
  onInc,
  onDec,
  value,
  onChange,
  disabled,
  min,
  max,
}: {
  onInc: () => any;
  onDec: () => any;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  disabled?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <button
        onClick={onDec}
        disabled={disabled || (min !== undefined && value <= min)}
      >
        -
      </button>
      <input
        type="number"
        disabled={disabled}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      <button
        onClick={onInc}
        disabled={disabled || (max !== undefined && value >= max)}
      >
        +
      </button>
    </div>
  );
}

export default Counter;

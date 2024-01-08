import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
} from "react";

const LimitContext = createContext<{
  limit: number;
  setLimit: (limit: number) => void;
} | null>(null);

function Limit({
  limit,
  setLimit,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  limit: number;
  setLimit: (limit: number) => void;
}) {
  return (
    <div {...props}>
      <LimitContext.Provider value={{ limit, setLimit }}>
        {props?.children}
      </LimitContext.Provider>
    </div>
  );
}

function LimitValue({
  limit,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | {
        limit: number;
        children: ReactNode;
      }
    | {
        limit?: number;
        children: string | number;
      }
  )) {
  const { limit: currentLimit, setLimit } = useLimit();
  const limitValue = limit ?? Number(props?.children);
  const selected = limitValue === currentLimit;

  return (
    <button
      {...props}
      onClick={() => setLimit(limitValue)}
      data-selected={selected ? true : undefined}
    >
      {props?.children}
    </button>
  );
}

function useLimit() {
  const context = useContext(LimitContext);
  if (!context) throw new Error("LimitContext used outside scope");
  else return context;
}

Limit.LimitValue = LimitValue;

export default Limit;

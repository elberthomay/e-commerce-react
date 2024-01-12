import { ReactNode } from "react";

function TextBetweenDash({ children }: { children: ReactNode }) {
  return (
    <div className="w-full grid grid-cols-[1fr_max-content_1fr] items-center gap-3">
      <div className="h-[1px] bg-slate-300"></div>
      {children}
      <div className="h-[1px] bg-slate-300"></div>
    </div>
  );
}

export default TextBetweenDash;

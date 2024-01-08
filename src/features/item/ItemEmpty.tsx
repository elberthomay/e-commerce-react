import { ReactNode } from "react";

function ItemEmpty({ children }: { children: ReactNode }) {
  return (
    <div>
      <h3>Item not found</h3>
      <p>{children}</p>
    </div>
  );
}

export default ItemEmpty;

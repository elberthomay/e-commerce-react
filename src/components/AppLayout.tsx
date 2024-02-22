import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { ReactNode } from "react";
function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children ? children : <Outlet />}</main>
    </>
  );
}

export default AppLayout;

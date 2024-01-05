import { Outlet } from "react-router-dom";
import Header from "./Header";
function AppLayout() {
  return (
    <>
      <Header />
      <main id="main" className="relative z-0">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

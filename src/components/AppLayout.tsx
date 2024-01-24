import { Outlet } from "react-router-dom";
import Header from "./header/Header";
function AppLayout() {
  return (
    <>
      <Header />
      <main id="main" className="p-2 md:p-6 max-w-[80rem] mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

import { Outlet } from "react-router-dom";
import Header from "./header/Header";
function AppLayout() {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

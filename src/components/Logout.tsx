import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/user/useLogout";
import toast from "react-hot-toast";
import { ReactElement, cloneElement } from "react";

function Logout({ children }: { children: ReactElement }) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const clonedChildren = cloneElement(children, {
    ...children.props,
    onClick: handleLogout,
  });
  async function handleLogout() {
    const logoutPromise = logout();
    toast.promise(logoutPromise, {
      loading: "Logging out",
      success: () => {
        navigate("/");
        return "Logout successful";
      },
      error: "Error logging out",
    });
    await logoutPromise;
  }
  return clonedChildren;
}

export default Logout;

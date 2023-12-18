import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/user/useLogout";
import toast from "react-hot-toast";

function Logout({ children }: { children: React.ReactNode }) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  async function handleLogout() {
    const logoutPromise = logout(undefined, { onSuccess: () => navigate("/") });
    toast.promise(logoutPromise, {
      loading: "Logging out",
      success: "Logout successful",
      error: "Error logging out",
    });
    await logoutPromise;
  }
  return <button onClick={handleLogout}>{children}</button>;
}

export default Logout;

import { useNavigate } from "react-router-dom";
import useLogout from "../features/user/useLogout";

function Logout({ children }: { children: React.ReactNode }) {
  const { isLoading, logout } = useLogout();
  const navigate = useNavigate();
  return (
    <button
      onClick={() => logout(undefined, { onSuccess: (data) => navigate("/") })}
    >
      {children}
    </button>
  );
}

export default Logout;

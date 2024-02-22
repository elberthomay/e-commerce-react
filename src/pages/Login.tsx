import LoginForm from "../features/user/LoginForm";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import Spinner from "../components/Spinner";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import GutteredBox from "../ui/GutteredBox";
import useSetTitle from "../hooks/useSetTitle";

function Login() {
  const { isLoading, error, isAuthenticated } = useGetCurrentUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useSetTitle((defaultTitle) => `Login | ${defaultTitle}`);
  const loginRedirect = searchParams.get("loginRedirect");

  function onLogin() {
    navigate(loginRedirect ?? "/", { replace: true });
  }

  return (
    <GutteredBox>
      {isLoading && <Spinner />}
      {!isLoading && !error && isAuthenticated && (
        <Navigate to={loginRedirect ?? "/"} />
      )}
      {!isLoading && !error && !isAuthenticated && (
        <main className="flex justify-center mt-8">
          <div className=" flex flex-col gap-6 w-full max-w-md p-8 border shadow-sm border-slate-300 rounded-lg">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <LoginForm onLogin={onLogin} />
          </div>
        </main>
      )}
    </GutteredBox>
  );
}

export default Login;

import LoginForm from "../features/user/LoginForm";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import Spinner from "../components/Spinner";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import GoogleAuthComponent from "../features/auth/GoogleAuthComponent";
import TextBetweenDash from "../ui/TextBetweenDash";
import GoogleButton from "../ui/GoogleButton";
import GutteredBox from "../ui/GutteredBox";

function Login() {
  const { isLoading, error, currentUser, isAuthenticated } =
    useGetCurrentUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const loginRedirect = searchParams.get("loginRedirect");

  function onLogin() {
    navigate(loginRedirect ?? "/");
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
            <TextBetweenDash>
              <p className="text-slate-400 text-sm">Other Login Method</p>
            </TextBetweenDash>
            <GoogleAuthComponent onLogin={onLogin}>
              <GoogleButton>Register or Login with Google</GoogleButton>
            </GoogleAuthComponent>
          </div>
        </main>
      )}
    </GutteredBox>
  );
}

export default Login;

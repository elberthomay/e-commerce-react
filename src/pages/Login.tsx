import LoginForm from "../features/user/LoginForm";
import useGetCurrentUser from "../features/user/useGetCurrentUser";
import Spinner from "../components/Spinner";
import { Navigate, useSearchParams } from "react-router-dom";

function Login() {
  const { isLoading, error, currentUser, isAuthenticated } =
    useGetCurrentUser();
  const [searchParams] = useSearchParams();
  const loginRedirect = searchParams.get("loginRedirect");
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && !error && isAuthenticated && (
        <Navigate to={loginRedirect ?? "/"} />
      )}
      {!isLoading && !error && !isAuthenticated && (
        <div>
          <h1>Login</h1>
          <LoginForm />
        </div>
      )}
    </>
  );
}

export default Login;

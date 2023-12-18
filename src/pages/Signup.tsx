import { Navigate } from "react-router-dom";
import SignupForm from "../features/user/SignupForm";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";

function Signup() {
  const { isAuthenticated } = useGetCurrentUser();
  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <div>
      <h1>Signup</h1>
      <SignupForm />
    </div>
  );
}

export default Signup;

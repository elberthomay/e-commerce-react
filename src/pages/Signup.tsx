import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SignupForm from "../features/user/SignupForm";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import ShopHubHeader from "../ui/ShopHubHeader";
import TextBetweenDash from "../ui/TextBetweenDash";
import GoogleButton from "../ui/GoogleButton";
import GoogleAuthComponent from "../features/auth/GoogleAuthComponent";
import GutteredBox from "../ui/GutteredBox";

function Signup() {
  const { isAuthenticated } = useGetCurrentUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginRedirect = searchParams.get("loginRedirect");
  const onLogin = () => navigate(loginRedirect ?? "/");
  return isAuthenticated ? (
    <Navigate to={loginRedirect ?? "/"} />
  ) : (
    <GutteredBox>
      <ShopHubHeader />
      <main className="flex justify-center mt-8">
        <div className=" flex flex-col gap-6 w-full max-w-md p-8 border shadow-sm border-slate-300 rounded-lg">
          <h1 className="text-center text-2xl font-bold">Signup</h1>
          <SignupForm />
          <TextBetweenDash>
            <p className="text-slate-400 text-sm">Other Method</p>
          </TextBetweenDash>
          <GoogleAuthComponent onLogin={onLogin}>
            <GoogleButton>Signup with Google</GoogleButton>
          </GoogleAuthComponent>
        </div>
      </main>
    </GutteredBox>
  );
}

export default Signup;

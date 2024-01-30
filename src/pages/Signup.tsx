import { Navigate } from "react-router-dom";
import SignupForm from "../features/user/SignupForm";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import ShopHubHeader from "../ui/ShopHubHeader";
import TextBetweenDash from "../ui/TextBetweenDash";
import GoogleButton from "../ui/GoogleButton";
import GoogleAuthComponent from "../features/auth/GoogleAuthComponent";
import GutteredBox from "../ui/GutteredBox";

function Signup() {
  const { isAuthenticated } = useGetCurrentUser();
  return isAuthenticated ? (
    <Navigate to={"/"} />
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
          <GoogleAuthComponent>
            <GoogleButton>Signup with Google</GoogleButton>
          </GoogleAuthComponent>
        </div>
      </main>
    </GutteredBox>
  );
}

export default Signup;

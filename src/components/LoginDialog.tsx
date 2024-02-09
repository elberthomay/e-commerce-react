import { MdClose } from "react-icons/md";
import CustomDialog, {
  CustomDialogPropsType,
  useCustomDialogContext,
} from "./CustomDialog";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../features/user/LoginForm";
import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function LoginDialog({
  onLogin,
  ...dialogProps
}: Omit<CustomDialogPropsType, "children"> & { onLogin: () => void }) {
  return (
    <CustomDialog {...dialogProps}>
      <LoginDialogBody onLogin={onLogin} />
    </CustomDialog>
  );
}

const LoginDialogBody = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & { onLogin: () => void }
>(({ onLogin, className, ...props }, forwardedRef) => {
  const { close } = useCustomDialogContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toSignUp = () =>
    navigate(`/signup?loginRedirect=${encodeURIComponent(pathname)}`);

  function handleAfterLogin() {
    close();
    onLogin();
  }
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(
        className,
        "max-w-[min(50rem,95vw)] p-8 flex flex-col gap-6"
      )}
    >
      <button onClick={close} className="flex justify-end">
        <MdClose className="w-8 h-8" />
      </button>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Login</h1>
        <button onClick={toSignUp} className="text-sm text-governor-bay-800">
          Sign Up
        </button>
      </div>
      <LoginForm onLogin={handleAfterLogin} />
    </div>
  );
});

export default LoginDialog;

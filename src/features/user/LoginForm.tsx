import FormRow from "../../components/FormRow";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/user/useLogin";
import toast from "react-hot-toast";
import { RequestError } from "../../error/RequestError";
import { UserLoginType } from "../../type/userType";
import TextInput from "../../ui/TextInput";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import TextBetweenDash from "../../ui/TextBetweenDash";
import GoogleAuthComponent from "../auth/GoogleAuthComponent";
import GoogleButton from "../../ui/GoogleButton";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function LoginForm({
  onLogin,
  className,
  ...props
}: ComponentProps<"div"> & { onLogin: () => void }) {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLoginType>();

  const { isLoading, error, login } = useLogin();

  async function onSubmit(formData: UserLoginType) {
    const loginPromise = login({
      email: formData.email,
      password: formData.password,
    });
    toast.promise(loginPromise, {
      loading: "Logging in",
      success: (data) => {
        onLogin();
        return "Login successful";
      },
      error: (error) => {
        if (error instanceof RequestError) {
          if (error.status === 401) return "Invalid email or password";
          else if (error.status === 409)
            return "Password is not set, please login using Oauth";
          else return "Failed logging in";
        } else return "Failed logging in";
      },
    });
    try {
      await loginPromise;
    } catch (e) {
      reset({ password: "" });
    }
  }

  return (
    <div {...props} className={twMerge("flex flex-col gap-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormRow label="Email" formErrors={errors}>
          <TextInput
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}
          />
        </FormRow>
        <FormRow label="password" formErrors={errors}>
          <TextInput
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
        </FormRow>
        <div className="flex items-center gap-2">
          <Checkbox {...register("rememberMe")} id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <Button className="w-full">Submit</Button>
      </form>
      <TextBetweenDash>
        <p className="text-slate-400 text-sm">Other Login Method</p>
      </TextBetweenDash>
      <GoogleAuthComponent onLogin={onLogin}>
        <GoogleButton>Register or Login with Google</GoogleButton>
      </GoogleAuthComponent>
    </div>
  );
}

export default LoginForm;

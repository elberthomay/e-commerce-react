import { useEffect } from "react";
import FormRow from "../../components/formRow";
import { useForm, FieldValues } from "react-hook-form";
import useLogin from "../../hooks/user/useLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RequestError } from "../../error/RequestError";
import { UserLoginType } from "../../type/userType";

function LoginForm() {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLoginType>();
  const navigate = useNavigate();

  const { isLoading, error, login } = useLogin();

  async function onSubmit(formData: UserLoginType) {
    const loginPromise = login({
      email: formData.email,
      password: formData.password,
    });
    toast.promise(loginPromise, {
      loading: "Logging in",
      success: (data) => {
        navigate("/");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" formErrors={errors}>
        <input
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
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </FormRow>
      <input type="checkbox" {...register("rememberMe")} />
      <label htmlFor="rememberMe">Remember me</label>
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;

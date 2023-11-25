import { useEffect } from "react";
import FormRow from "../../components/formRow";
import { useForm, FieldValues } from "react-hook-form";
import useLogin from "./useLogin";

function LoginForm() {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { isLoading, error, login } = useLogin();

  async function onSubmit(formData: FieldValues) {
    login({ email: formData.email, password: formData.password });
  }

  useEffect(() => {
    if (!isLoading && error) {
      reset();
    }
  }, [isLoading, error, reset]);

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
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;

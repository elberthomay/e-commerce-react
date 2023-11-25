import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import useSignup from "./useSignup";
import FormRow from "../../components/formRow";

function SignupForm() {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { isLoading, error, signup } = useSignup();

  async function onSubmit(formData: FieldValues) {
    signup({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    });
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
      <FormRow label="Name" formErrors={errors}>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^\w+$/,
              message: "Name must only contain letter, number or underscore",
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
            minLength: {
              value: 8,
              message: "Password must be more than 8 character",
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat password" formErrors={errors}>
        <input
          type="password"
          id="repeatPassword"
          {...register("repeatPassword", {
            validate: (value, formValue) => {
              if (formValue.password === value) return true;
              else return "Password does not match";
            },
          })}
        />
      </FormRow>
      <button>Submit</button>
    </form>
  );
}

export default SignupForm;

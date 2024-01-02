import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import useSignup from "../../hooks/user/useSignup";
import FormRow from "../../components/formRow";
import { UserRegisterType } from "../../type/userType";
import { pick } from "lodash";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RequestError } from "../../error/RequestError";

function SignupForm() {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserRegisterType & { repeatPassword: string }>();
  const navigate = useNavigate();
  const { isLoading, error, signup } = useSignup();

  async function onSubmit(
    formData: UserRegisterType & { repeatPassword: string }
  ) {
    const registerData = pick(formData, ["email", "name", "password"]);
    const signupPromise = signup(registerData);
    toast.promise(signupPromise, {
      loading: "Signing up",
      success: "Signup is successful",
      error: "Error signing up",
    });
    try {
      await signupPromise;
      navigate("/login");
    } catch (e) {
      reset({ password: "", repeatPassword: "" });
      if (e instanceof RequestError) {
        const inputErrors = e.body.errors as {
          field: keyof UserRegisterType;
          message: string;
        }[];
        inputErrors.forEach(({ field, message }) =>
          setError(field, { message })
        );
      }
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
      <FormRow label="Name" formErrors={errors}>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
            maxLength: 60,
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
              message: "Password must be more than 8 characters",
            },
            maxLength: {
              value: 90,
              message: "Password must be shorter than 90 characters",
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

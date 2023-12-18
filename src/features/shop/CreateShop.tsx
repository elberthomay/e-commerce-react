import { useForm } from "react-hook-form";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import FormRow from "../../components/formRow";
import useCheckShopName from "../../hooks/shop/useCheckShopName";
import { useState } from "react";
import useActivateShop from "../../hooks/shop/useActivateShop";
import toast from "react-hot-toast";
import { RequestError } from "../../error/RequestError";

function CreateShop() {
  const { currentUser } = useGetCurrentUser();
  const { checkShopName } = useCheckShopName();
  const { isLoading, error, activateShop } = useActivateShop();
  const [inputStage, setInputStage] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
    trigger,
  } = useForm();

  async function handleNameCheck() {
    const validationResult = await trigger("name");
    if (validationResult && inputStage === 0) setInputStage(1);
  }

  function handleCreateShop(formData: any) {
    if (inputStage === 1) {
      const activateShopPromise = activateShop(formData);
      toast.promise(activateShopPromise, {
        loading: "Activating shop",
        success: "Shop successfully activated",
        error: (error) => {
          if (error instanceof RequestError && error.status === 409)
            return "Shop name already exist";
          else return "Failed creating shop";
        },
      });
    }
  }

  return (
    <div>
      <p>Hello {currentUser?.name} create your shop here</p>
      <form onSubmit={handleSubmit(handleCreateShop)}>
        <FormRow label="Enter name of your Shop" formErrors={errors}>
          <input
            type="text"
            id="name"
            maxLength={60}
            {...register("name", {
              maxLength: 60,
              minLength: 5,
              pattern: {
                value: /^[a-zA-Z0-9][a-zA-Z0-9_ \-,]*$/,
                message:
                  "Shop name could only contain letter, number, underscore, space, or dash",
              },
              validate: async (value) => {
                const { exist } = await checkShopName(value);
                if (!exist) return true;
                else return "Name already exist";
              },
              onBlur: handleNameCheck,
            })}
            onKeyDown={(e) => (e.key === "Enter" ? handleNameCheck() : null)}
          />
        </FormRow>
        {isValidating && <p>Loading</p>}
        {inputStage > 0 && (
          <>
            <FormRow
              label="Enter a short description of your shop"
              formErrors={errors}
            >
              <textarea
                id="description"
                cols={30}
                rows={10}
                {...register("description", {
                  maxLength: 1000,
                })}
              ></textarea>
            </FormRow>
            <button type="submit">Create new Shop</button>
          </>
        )}
      </form>
    </div>
  );
}

export default CreateShop;

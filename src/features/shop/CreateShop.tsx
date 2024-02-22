import { useForm } from "react-hook-form";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import FormRow from "../../components/FormRow";
import useCheckShopName from "../../hooks/shop/useCheckShopName";
import { ReactElement, useEffect, useState } from "react";
import useActivateShop from "../../hooks/shop/useActivateShop";
import toast from "react-hot-toast";
import { RequestError } from "../../error/RequestError";
import TextInput from "../../ui/TextInput";
import { FaCheck } from "react-icons/fa6";
import ButtonSpinner from "../../ui/ButtonSpinner";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";
import GutteredBox from "../../ui/GutteredBox";
import useSetTitle from "../../hooks/useSetTitle";

function CreateShop() {
  const { currentUser } = useGetCurrentUser();
  const { checkShopName } = useCheckShopName();
  const { activateShop } = useActivateShop();
  useSetTitle((defaultTitle) => `Create your shop | ${defaultTitle}`);
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, isDirty },
    trigger,
    watch,
  } = useForm({ defaultValues: { name: "", description: "" } });

  async function handleNameCheck() {
    const validationResult = await trigger("name");
    if (validationResult && step === 1) setStep(2);
  }

  function handleCreateShop(formData: { name: string; description: string }) {
    if (step === 2) {
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

  useEffect(() => {
    const timeOutId = setTimeout(() => trigger("name"), 500);
    return () => clearTimeout(timeOutId);
  }, [trigger]);

  return (
    <GutteredBox>
      <div className="mx-auto border p-8 border-slate-300 rounded-xl max-w-2xl">
        <p>
          Hello{" "}
          <span className="font-bold">{currentUser?.name.slice(0, 25)}</span>{" "}
          please complete your shop detail!
        </p>
        <form
          onSubmit={handleSubmit(handleCreateShop)}
          className="grid grid-cols-[auto_1fr] gap-x-4 items-center"
        >
          <CreateShopStepsItem
            step={1}
            currentStep={step}
            title="Enter Your Shop Name"
          >
            {step > 1 ? (
              <p className="py-4">{watch("name")}</p>
            ) : (
              <div className="flex flex-col items-start gap-4 py-2">
                <FormRow
                  name="name"
                  label="Shop name"
                  formErrors={errors}
                  countString={`${watch("name")?.length}/60`}
                  className="w-full"
                >
                  <div className="group flex items-stretch border border-slate-300 duration-150 has-[:focus]:border-governor-bay-500 rounded-md data-[error=true]:border-red-400">
                    <TextInput
                      type="text"
                      id="name"
                      maxLength={60}
                      {...register("name", {
                        maxLength: {
                          value: 60,
                          message:
                            "Shop name must be contain less than 60 characters",
                        },
                        minLength: {
                          value: 5,
                          message:
                            "Shop name must be contain at least 5 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9][a-zA-Z0-9_ \-,]*$/,
                          message:
                            "Shop name could only contain letter, number, underscore, space, or dash",
                        },
                        validate: async (value) => {
                          try {
                            const { exist } = await checkShopName(value);
                            if (!exist) return true;
                            else return "Shop name already exist";
                          } catch (e) {
                            if (e instanceof RequestError) return true;
                            else return false;
                          }
                        },
                        onChange: () => trigger("name"),
                      })}
                      onKeyDown={(e) =>
                        e.key === "Enter" ? handleNameCheck() : null
                      }
                      className="border-0 grow"
                    />
                    <div className="w-8 flex justify-center items-center">
                      {isValidating && <ButtonSpinner className="h-6 w-6" />}
                    </div>
                  </div>
                </FormRow>
                <Button
                  disabled={!!errors["name"] || !isDirty}
                  onClick={handleNameCheck}
                >
                  Next
                </Button>
              </div>
            )}
          </CreateShopStepsItem>

          <CreateShopStepsItem
            step={2}
            currentStep={step}
            title="Fill a Short Description of Your Shop"
          >
            {step < 2 ? (
              <p className="py-4">{watch("description")}</p>
            ) : (
              <div>
                <FormRow
                  label="Enter a short description of your shop"
                  formErrors={errors}
                  countString={`${watch("description")?.length}/1000`}
                >
                  <TextArea
                    id="description"
                    cols={30}
                    rows={10}
                    {...register("description", {
                      maxLength: {
                        value: 1000,
                        message:
                          "description cannot be more than 1000 characters",
                      },
                    })}
                  ></TextArea>
                </FormRow>
                <div className="flex gap-3">
                  <Button
                    className="bg-slate-100 hover:bg-slate-300 text-governor-bay-800 hover:text-governor-bay-800 border border-slate-500 hover:border-slate-300"
                    disabled={!!errors["name"]}
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!!errors["description"]}
                    onClick={handleNameCheck}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </CreateShopStepsItem>
        </form>
      </div>
    </GutteredBox>
  );
}

function CreateShopStepsItem({
  title,
  step,
  currentStep,
  children,
}: {
  title: string;
  step: number;
  currentStep: number;
  children: ReactElement;
}) {
  const isCompleted = currentStep > step;
  const isOngoing = currentStep >= step;
  return (
    <>
      <div
        data-ongoing={isOngoing}
        data-completed={isCompleted}
        className="h-8 w-8 rounded-full flex justify-center items-center bg-slate-300 data-[ongoing=true]:bg-slate-100 border border-slate-300 data-[ongoing=true]:border-governor-bay-800 data-[completed=true]:bg-governor-bay-800"
      >
        {isCompleted ? (
          <FaCheck className="h-4 w-4 text-governor-bay-800" />
        ) : (
          <span
            data-ongoing={isOngoing}
            className="font-bold text-md text-slate-100 data-[ongoing=true]:text-governor-bay-800"
          >
            {step}
          </span>
        )}
      </div>
      <p className="text-lg font-bold">{title}</p>
      {currentStep >= step && (
        <>
          <div
            data-completed={isCompleted}
            className="w-[2px] h-full bg-slate-200 data-[completed=true]:bg-governor-bay-800 justify-self-center"
          ></div>
          {children}
        </>
      )}
    </>
  );
}

export default CreateShop;

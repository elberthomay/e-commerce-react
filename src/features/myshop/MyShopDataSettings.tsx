import {
  ChangeEvent,
  DragEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { createImageUrl } from "../../api/image";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import { resizeImageFile } from "../../utilities/imageUtils";
import toast from "react-hot-toast";
import Modal, { useModal } from "../../components/Modal";
import FormRow from "../../components/FormRow";
import { useForm } from "react-hook-form";
import useCheckShopName from "../../hooks/shop/useCheckShopName";
import { useUpdateShop } from "../../hooks/shop/useUpdateCurrentShop";
import { debounce } from "lodash";
import useChangeShopAvatar from "../../hooks/shop/useChangeShopAvatar";
import CustomDialog, {
  useCustomDialogContext,
} from "../../components/CustomDialog";
import TextInput from "../../ui/TextInput";
import Button from "../../ui/Button";
import { twMerge } from "tailwind-merge";

function MyShopDataSettings() {
  const { currentShop } = useGetCurrentShop();
  const { changeShopAvatar } = useChangeShopAvatar();
  const { id, avatar, name } = currentShop ?? {};

  async function handleChangeAvatar(
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>
  ) {
    const selectedFiles =
      "files" in e.target
        ? (e as ChangeEvent<HTMLInputElement>).target.files
        : (e as DragEvent<HTMLLabelElement>).dataTransfer.files;

    if (selectedFiles) {
      const image = await resizeImageFile(selectedFiles[0]);
      if (image) {
        const changeUserAvatarPromise = changeShopAvatar(image.image);
        toast.promise(changeUserAvatarPromise, {
          loading: "Changing shop avatar",
          success: "Avatar successfuly changed",
          error: "Error changing shop avatar",
        });
      } else toast.error("Invalid image");
    }
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Shop Information</h2>
        <div className="p-2 flex flex-col gap-3">
          <div>
            <p className="text-sm font-bold text-slate-500">Shop name</p>
            <p className=" font-bold text-slate-500">{name}</p>
          </div>
          <CustomDialog
            trigger={
              <button className="w-32 p-1.5 border-2 border-slate-300 hover:border-slate-500 bg-slate-100 rounded-md">
                Change
              </button>
            }
          >
            <ShopNameChangeDialog shopId={id ?? ""} name={name ?? ""} />
          </CustomDialog>
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4 items-start">
        <h2 className="text-xl font-bold">Shop Avatar</h2>
        <div className="grid grid-cols-[max-content] justify-items-center gap-2">
          <div className="h-28 w-28 rounded-md border border-slate-300 overflow-clip ">
            <img
              src={createImageUrl(avatar ?? "defaultAvatar.webp", {
                height: 100,
              })}
              alt={`${name}'s avatar`}
              className="h-full w-full"
            />
          </div>
          <label
            htmlFor="browse"
            className="inline-block p-1.5 px-3 border-2 border-slate-300 hover:border-slate-500 bg-slate-100 rounded-md font-bold text-slate-500"
            onDrop={handleChangeAvatar}
          >
            Change avatar image
          </label>
        </div>
        <input
          hidden
          type="file"
          name="image"
          id="browse"
          accept=".png, .jpg, .jpeg .webp"
          onChange={handleChangeAvatar}
        />
      </div>
    </div>
  );
}

const ShopNameChangeDialog = forwardRef<
  HTMLDivElement,
  {
    shopId: string;
    name: string;
  } & HTMLAttributes<HTMLDivElement>
>(({ shopId, name, className, ...props }, forwardedRef) => {
  const [shopNameNotChecked, setShopNameNotChecked] = useState<boolean>(false);
  const { updateShop } = useUpdateShop(shopId);
  const { checkShopName } = useCheckShopName();
  const { close } = useCustomDialogContext();
  const {
    register,
    formState: { errors, isDirty, isValidating },
    handleSubmit,
    trigger,
    setError,
    getFieldState,
    clearErrors,
    watch,
  } = useForm<{ name: string }>({ defaultValues: { name } });

  const checkNameDebouncedFn = useCallback(
    debounce(async (value: string) => {
      console.log("validation run");
      const { error } = getFieldState("name");
      const { exist } = await checkShopName(value);
      if (exist) {
        if (!error)
          setError("name", {
            type: "userNameCheck",
            message: "Shop name already exist",
          });
      } else {
        if (error?.type === "userNameCheck") clearErrors("name");
      }
      setShopNameNotChecked(false);
    }, 500),
    []
  );

  function handleChangeName(formData: { name: string }) {
    const changeNamePromise = updateShop(formData);
    toast.promise(changeNamePromise, {
      loading: "Changing name",
      success: "Name changed successfuly",
      error: "Error changing name",
    });
    close();
  }

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(className, "flex flex-col gap-3")}
    >
      <h1 className="font-bold text-xl text-center">Change shop Name</h1>
      <p>Make sure you have typed your shop name properly</p>
      <form onSubmit={handleSubmit(handleChangeName)}>
        <FormRow
          label="name"
          countString={`${watch("name").length}/60`}
          formErrors={errors}
        >
          <TextInput
            type="text"
            maxLength={60}
            {...register("name", {
              required: { value: true, message: "Shop name cannot be empty" },
              minLength: {
                value: 5,
                message: "Shop name must be longer than 4 characters",
              },
              maxLength: {
                value: 60,
                message: "Shop name must be shorter than 60 characters",
              },
              validate: (value: string) => {
                if (value !== name) {
                  setShopNameNotChecked(true);
                  checkNameDebouncedFn(value);
                }
                return true;
              },
              onChange: () => trigger(),
            })}
          />
        </FormRow>
        {shopNameNotChecked && <p>Loading...</p>}
        <Button
          disabled={
            Object.keys(errors).length !== 0 ||
            !isDirty ||
            isValidating ||
            shopNameNotChecked
          }
          className="w-full"
        >
          Save
        </Button>
      </form>
    </div>
  );
});

export default MyShopDataSettings;

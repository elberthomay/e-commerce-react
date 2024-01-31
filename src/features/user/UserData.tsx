import { ChangeEvent, DragEvent, HTMLAttributes, forwardRef } from "react";
import { createImageUrl } from "../../api/image";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { resizeImageFile } from "../../utilities/imageUtils";
import toast from "react-hot-toast";
import useChangeUserAvatar from "../../hooks/user/useChangeUserAvatar";
import FormRow from "../../components/FormRow";
import { useForm } from "react-hook-form";
import useUpdateCurrentUser from "../../hooks/user/useUpdateCurrentUser";
import { useMaxBreakpoints } from "../../hooks/useWindowSize";
import CustomDialog, {
  useCustomDialogContext,
} from "../../components/CustomDialog";
import { HiChevronRight } from "react-icons/hi2";
import Button from "../../ui/Button";
import { twMerge } from "tailwind-merge";
import TextInput from "../../ui/TextInput";

function UserData() {
  const { currentUser } = useGetCurrentUser();
  const { name } = currentUser ?? {};
  const { changeUserAvatar } = useChangeUserAvatar();
  const { isSm } = useMaxBreakpoints();
  const { avatar } = currentUser ?? {};

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
        const changeUserAvatarPromise = changeUserAvatar(image.image);
        toast.promise(changeUserAvatarPromise, {
          loading: "Changing user avatar",
          success: "Avatar successfuly changed",
          error: "Error changing user avatar",
        });
      } else toast.error("Invalid image");
    }
  }
  return (
    <div className="p-3 sm:p-4 md:p-8 flex flex-col items-stretch sm:items-start sm:flex-row gap-4">
      <div className="flex flex-col gap-3 items-center">
        <img
          src={createImageUrl(avatar ?? "defaultAvatar.webp", {
            height: 300,
          })}
          alt="user avatar"
          className="h-64 w-64 border border-slate-300 rounded-lg"
        />
        <input
          hidden
          type="file"
          name="image"
          id="browse"
          accept=".png, .jpg, .jpeg .webp"
          onChange={handleChangeAvatar}
        />
        <label
          htmlFor="browse"
          onDrop={handleChangeAvatar}
          className="inline-block text-center border border-slate-400 bg-slate-100 w-full p-3 rounded-xl font-bold text-slate-500 hover:text-governor-bay-500 hover:border-governor-bay-800 transition-colors duration-100"
        >
          Change avatar image
        </label>
      </div>
      <div className="grid grid-cols-[6rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)] gap-3">
        <p className=" col-span-2 text text-slate-500 font-bold">
          Update personal data
        </p>
        <p>name</p>{" "}
        <div className="flex gap-4 w-full items-center">
          <p className="text-ellipsis overflow-hidden">{name}</p>
          <CustomDialog
            trigger={
              <button className=" shrink-0 text-sm font-bold text-governor-bay-500 hover:text-governor-bay-800">
                {isSm ? "Change" : <HiChevronRight className="h-6 w-6" />}
              </button>
            }
          >
            <UserNameChangeDialog name={name} />
          </CustomDialog>
        </div>
      </div>
    </div>
  );
}

const UserNameChangeDialog = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { name: string }
>(({ name, className, ...props }, forwardedRef) => {
  const { updateCurrentUser } = useUpdateCurrentUser();
  const { close } = useCustomDialogContext();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    trigger,
  } = useForm<{ name: string }>({ defaultValues: { name } });
  function handleChangeName(formData: { name: string }) {
    const changeNamePromise = updateCurrentUser(formData);
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
      className={twMerge(className, "w-[min(25rem,95vw)] text-center")}
    >
      <form
        onSubmit={handleSubmit(handleChangeName)}
        className="flex flex-col gap-2"
      >
        <h1 className="text-xl font-bold">Change Name</h1>
        <p>Make sure you have typed your name properly</p>
        <FormRow formErrors={errors}>
          <TextInput
            type="text"
            maxLength={60}
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 60,
              onChange: () => trigger(),
            })}
          />
        </FormRow>
        <Button
          className="w-full"
          disabled={Object.keys(errors).length !== 0 || !isDirty}
        >
          Save
        </Button>
      </form>
    </div>
  );
});

export default UserData;

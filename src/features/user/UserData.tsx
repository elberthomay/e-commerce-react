import { ChangeEvent, DragEvent } from "react";
import { createImageUrl } from "../../api/image";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { resizeImageFile } from "../../utilities/imageUtils";
import toast from "react-hot-toast";
import useChangeUserAvatar from "../../hooks/user/useChangeUserAvatar";
import Modal, { useModal } from "../../components/Modal";
import FormRow from "../../components/formRow";
import { useForm } from "react-hook-form";
import useUpdateCurrentUser from "../../hooks/user/useUpdateCurrentUser";

function UserData() {
  const { currentUser } = useGetCurrentUser();
  const { name } = currentUser ?? {};
  const { changeUserAvatar } = useChangeUserAvatar();
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
    <div>
      <h1>User Data</h1>
      <img
        src={createImageUrl(avatar ?? "defaultAvatar.webp", {
          height: 100,
        })}
        alt=""
      />
      <label htmlFor="browse" onDrop={handleChangeAvatar}>
        Change avatar image
      </label>
      <input
        hidden
        type="file"
        name="image"
        id="browse"
        accept=".png, .jpg, .jpeg .webp"
        onChange={handleChangeAvatar}
      />
      name: {name}
      <Modal>
        <Modal.Open id="changeUsername">
          <button>Change</button>
        </Modal.Open>
        <Modal.Window id="changeUsername">
          <UserNameChangeDialog name={name} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

function UserNameChangeDialog({ name }: { name: string }) {
  const { updateCurrentUser } = useUpdateCurrentUser();
  const { close } = useModal();
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
    <div>
      <h1>Change Name</h1>
      <p>Make sure you have typed your name properly</p>
      <form onSubmit={handleSubmit(handleChangeName)}>
        <FormRow label="name" formErrors={errors}>
          <input
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
        <button disabled={Object.keys(errors).length !== 0 || !isDirty}>
          Save
        </button>
      </form>
    </div>
  );
}

export default UserData;

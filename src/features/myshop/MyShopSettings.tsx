import { ChangeEvent, DragEvent, useCallback, useState } from "react";
import { createImageUrl } from "../../api/image";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import { resizeImageFile } from "../../utilities/imageUtils";
import toast from "react-hot-toast";
import Modal, { useModal } from "../../components/Modal";
import FormRow from "../../components/formRow";
import { useForm } from "react-hook-form";
import useCheckShopName from "../../hooks/shop/useCheckShopName";
import { useUpdateShop } from "../../hooks/shop/useUpdateCurrentShop";
import { debounce } from "lodash";
import useChangeShopAvatar from "../../hooks/shop/useChangeShopAvatar";

function MyShopSettings() {
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
    <div>
      <h1>Shop settings</h1>
      <img
        src={createImageUrl(avatar ?? "defaultAvatar.webp", { height: 100 })}
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
          <ShopNameChangeDialog shopId={id ?? ""} name={name ?? ""} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

function ShopNameChangeDialog({
  shopId,
  name,
}: {
  shopId: string;
  name: string;
}) {
  const [shopNameNotChecked, setShopNameNotChecked] = useState<boolean>(false);
  const { updateShop } = useUpdateShop(shopId);
  const { checkShopName } = useCheckShopName();
  const { close } = useModal();
  const {
    register,
    formState: { errors, isDirty, isValidating },
    handleSubmit,
    trigger,
    setError,
    getFieldState,
    clearErrors,
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
    <div>
      <h1>Change shop Name</h1>
      <p>Make sure you have typed your shop name properly</p>
      <form onSubmit={handleSubmit(handleChangeName)}>
        <FormRow label="name" formErrors={errors}>
          <input
            type="text"
            maxLength={60}
            {...register("name", {
              required: true,
              minLength: 5,
              maxLength: 60,
              validate: (value: string) => {
                setShopNameNotChecked(true);
                checkNameDebouncedFn(value);
                return true;
              },
              onChange: () => trigger(),
            })}
          />
        </FormRow>
        {shopNameNotChecked && <p>Loading...</p>}
        <button
          disabled={
            Object.keys(errors).length !== 0 ||
            !isDirty ||
            isValidating ||
            shopNameNotChecked
          }
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default MyShopSettings;

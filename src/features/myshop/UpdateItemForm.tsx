import { ComponentProps, forwardRef, useState } from "react";
import useUpdateItem from "../../hooks/item/useUpdateItem";
import useGetItem from "../../hooks/item/useGetItem";
import toast from "react-hot-toast";
import { ItemDetailsOutputType } from "../../type/itemType";
import Spinner from "../../components/Spinner";
import ItemForm from "./ItemForm";
import { twMerge } from "tailwind-merge";
import { useCustomDialogContext } from "../../components/CustomDialog";

const UpdateItemForm = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & { id: string }
>(({ id, ...props }, forwardedRef) => {
  const { isLoading: itemIsLoading, error: itemError, item } = useGetItem(id);
  const { updateItem } = useUpdateItem(id);

  const [imagesToAdd, setImagesToAdd] = useState<
    { image: Blob; order: number; id: string }[]
  >([]);

  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [imagesOrder, setImagesOrder] = useState<number[] | null>(null);

  const { close } = useCustomDialogContext();

  async function update(
    isDirty: boolean,
    formData: Partial<
      Pick<ItemDetailsOutputType, "name" | "description" | "price" | "quantity">
    >
  ) {
    await updateItem({
      updateData: {
        ...(isDirty ? formData : {}),
        imagesDelete: imagesToDelete.length > 0 ? imagesToDelete : undefined,
        imagesReorder: imagesOrder ? imagesOrder : undefined,
      },
      newImages:
        imagesToAdd.length > 0
          ? imagesToAdd.map((img) => img.image)
          : undefined,
    });
  }

  function handleUpdate({
    isDirty,
    formData,
    dirtyFields,
  }: {
    isDirty: boolean;
    formData: Pick<
      ItemDetailsOutputType,
      "name" | "description" | "price" | "quantity"
    >;
    dirtyFields: Partial<{
      name?: boolean | undefined;
      description?: boolean | undefined;
      price?: boolean | undefined;
      quantity?: boolean | undefined;
    }>;
  }) {
    if (
      isDirty ||
      imagesToAdd.length > 0 ||
      imagesToDelete.length > 0 ||
      imagesOrder
    ) {
      const filteredEntries = Object.entries(formData).filter(
        (item) => dirtyFields[item[0] as keyof typeof formData]
      );
      const updatePromise = update(
        isDirty,
        Object.fromEntries(filteredEntries)
      );
      toast.promise(updatePromise, {
        loading: "Updating item",
        success: () => {
          close();
          return "Item successfully updated";
        },
        error: "Failed updating item",
      });
    } else close();
  }

  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(
        props.className,
        "w-[min(40rem,95vw)] flex flex-col gap-4"
      )}
    >
      {itemIsLoading && <Spinner />}
      {!itemIsLoading && itemError && <p>Error fetching item data</p>}
      {!itemIsLoading && item && (
        <div className="h-full overflow-y-auto pb-2">
          <h1 className="text-xl font-bold">Update Item</h1>
          <ItemForm
            {...{
              item,
              setImagesToAdd,
              setImagesOrder,
              setImagesToDelete,
              onSubmit: handleUpdate,
              onCancel: close,
              buttonText: "Update Item",
            }}
          />
        </div>
      )}
    </div>
  );
});

export default UpdateItemForm;

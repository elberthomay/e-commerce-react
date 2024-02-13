import { ComponentProps, forwardRef, useState } from "react";
import useCreateItem from "../../hooks/item/useCreateItem";
import toast from "react-hot-toast";
import { ItemDetailsOutputType } from "../../type/itemType";
import ItemForm from "./ItemForm";
import { useCustomDialogContext } from "../../components/CustomDialog";
import { twMerge } from "tailwind-merge";

const CreateItemForm = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, forwardedRef) => {
    const { createItem } = useCreateItem();
    const [imagesToAdd, setImagesToAdd] = useState<
      { image: Blob; order: number; id: string }[]
    >([]);

    const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
    const [imagesOrder, setImagesOrder] = useState<number[] | null>(null);

    function handleCreate(
      isDirty: boolean,
      formData: Pick<
        ItemDetailsOutputType,
        "name" | "description" | "price" | "quantity"
      >
    ) {
      const sortedNewImages = [...imagesToAdd]
        .sort((a, b) => a.order - b.order)
        .map((image) => image.image);
      const createPromise = createItem({
        itemData: formData,
        images: sortedNewImages,
      });
      toast.promise(createPromise, {
        loading: "Creating item",
        success: () => {
          close();
          return "Item created successfully";
        },
        error: "Failed creating item",
      });
    }
    const { close } = useCustomDialogContext();
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          className,
          "w-[min(40rem,95vw)] flex flex-col gap-4"
        )}
      >
        <h1 className="text-xl font-bold">Create New Item</h1>
        <ItemForm
          {...{
            setImagesToAdd,
            setImagesOrder,
            setImagesToDelete,
            onSubmit: handleCreate,
            onCancel: close,
            buttonText: "Create Item",
          }}
        />
      </div>
    );
  }
);

export default CreateItemForm;

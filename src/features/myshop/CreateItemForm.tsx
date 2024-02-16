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
    const [, setImagesToDelete] = useState<number[]>([]);
    const [imageOrder, setImagesOrder] = useState<number[] | null>(null);

    function handleCreate(
      _: unknown,
      formData: Pick<
        ItemDetailsOutputType,
        "name" | "description" | "price" | "quantity"
      >
    ) {
      // reorder image before creating item
      const sortedNewImages = imageOrder
        ? imageOrder.map((index) => imagesToAdd[index].image)
        : imagesToAdd.map((newImage) => newImage.image);

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
        <div className="h-full overflow-y-auto pb-2">
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
      </div>
    );
  }
);

export default CreateItemForm;

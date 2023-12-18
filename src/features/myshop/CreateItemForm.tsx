import { useState } from "react";
import useCreateItem from "../../hooks/item/useCreateItem";
import toast from "react-hot-toast";
import { ItemDetailsOutputType } from "../../type/itemType";
import ItemForm from "./ItemForm";
import { useModal } from "../../components/Modal";

function CreateItemForm() {
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
  const { close } = useModal();
  return (
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
  );
}

export default CreateItemForm;

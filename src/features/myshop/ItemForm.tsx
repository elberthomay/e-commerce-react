import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import ItemImageForm from "./ItemImageForm";
import { pick } from "lodash";
import { Dispatch } from "react";
import { ItemDetailsOutputType } from "../../type/itemType";
import TextInput from "../../ui/TextInput";
import TextArea from "../../ui/TextArea";
import Button from "../../ui/Button";

function ItemForm({
  item,
  setImagesToAdd,
  setImagesToDelete,
  setImagesOrder,
  onSubmit,
  onCancel,
  buttonText,
}: {
  item?: ItemDetailsOutputType;
  setImagesToAdd: Dispatch<
    React.SetStateAction<
      {
        image: Blob;
        order: number;
        id: string;
      }[]
    >
  >;
  setImagesToDelete: Dispatch<React.SetStateAction<number[]>>;
  setImagesOrder: Dispatch<React.SetStateAction<number[] | null>>;
  onSubmit: (data: {
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
  }) => void;
  onCancel: () => void;
  buttonText: string;
}) {
  const fieldValue = item
    ? pick(item, ["name", "description", "price", "quantity"])
    : { name: "", description: "", price: 0, quantity: 1 };
  const { images } = item ?? {};

  const orderedImages = [...(images ?? [])].sort((a, b) => a.order - b.order);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ defaultValues: fieldValue });

  return (
    <form
      onSubmit={handleSubmit((formData) =>
        onSubmit({ isDirty, formData, dirtyFields })
      )}
    >
      <FormRow
        label="name"
        formErrors={errors}
        countString={`${watch("name").length}/200`}
      >
        <TextInput
          type="text"
          {...register("name", { required: true, maxLength: 200 })}
        />
      </FormRow>
      <FormRow label="price" formErrors={errors}>
        <TextInput
          type="number"
          {...register("price", {
            required: true,
            min: 0,
            max: 1000000000,
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow label="quantity" formErrors={errors}>
        <TextInput
          type="number"
          {...register("quantity", {
            required: true,
            min: 0,
            max: 9999,
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow
        label="description"
        formErrors={errors}
        countString={`${watch("description").length}/2000`}
      >
        <TextArea
          {...register("description", {
            required: true,
            maxLength: 2000,
          })}
        />
      </FormRow>
      <ItemImageForm
        images={orderedImages}
        setImagesToAdd={setImagesToAdd}
        setImagesToDelete={setImagesToDelete}
        setImagesOrder={setImagesOrder}
      />
      <div className="flex justify-between">
        <Button>{buttonText}</Button>
        <Button variant="grey" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ItemForm;

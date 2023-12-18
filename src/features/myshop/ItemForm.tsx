import { useForm } from "react-hook-form";
import FormRow from "../../components/formRow";
import ItemImageForm from "./ItemImageForm";
import { pick } from "lodash";
import { Dispatch } from "react";
import { ItemDetailsOutputType } from "../../type/itemType";

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
  onSubmit: (
    isDirty: boolean,
    formData: Pick<
      ItemDetailsOutputType,
      "name" | "description" | "price" | "quantity"
    >
  ) => void;
  onCancel: () => void;
  buttonText: string;
}) {
  const fieldValue = item
    ? pick(item, ["name", "description", "price", "quantity"])
    : undefined;
  const { images } = item ?? {};

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm({ values: fieldValue, defaultValues: fieldValue });

  return (
    <div>
      <form onSubmit={handleSubmit((formData) => onSubmit(isDirty, formData))}>
        <FormRow label="name" formErrors={errors}>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 255 })}
          />
        </FormRow>
        <FormRow label="price" formErrors={errors}>
          <input
            type="number"
            {...register("price", {
              required: true,
              min: 0,
              max: 1000000000,
            })}
          />
        </FormRow>
        <FormRow label="quantity" formErrors={errors}>
          <input
            type="number"
            {...register("quantity", { required: true, min: 0, max: 9999 })}
          />
        </FormRow>
        <FormRow label="description" formErrors={errors}>
          <textarea
            {...register("description", {
              required: true,
              maxLength: 2000,
            })}
          />
        </FormRow>
        <ItemImageForm
          images={images}
          setImagesToAdd={setImagesToAdd}
          setImagesToDelete={setImagesToDelete}
          setImagesOrder={setImagesOrder}
        />
        <button>{buttonText}</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default ItemForm;

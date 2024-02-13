import { ChangeEvent, Dispatch, DragEvent, useState } from "react";
import { ItemDetailsOutputType } from "../../type/itemType";
import toast from "react-hot-toast";
import { createImageUrl } from "../../api/image";
import { v4 as uuid } from "uuid";
import { resizeImageFile } from "../../utilities/imageUtils";
import { RxCross2 } from "react-icons/rx";

function ItemImageForm({
  images,
  setImagesToAdd,
  setImagesToDelete,
  setImagesOrder,
}: {
  images?: ItemDetailsOutputType["images"];
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
}) {
  const [imageList, setImageList] = useState<
    (
      | {
          imageName: string;
          order: number;
          id: string;
        }
      | {
          image: Blob;
          imageUrl: string;
          order: number;
          id: string;
        }
    )[]
  >(images?.map((img) => ({ ...img, id: uuid() })) ?? []);
  console.log(imageList);

  const highestIndex = imageList.reduce(
    (acc, image) => (image.order > acc ? image.order : acc),
    -1
  );

  async function handleAddImages(
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>
  ) {
    e.preventDefault();
    const selectedFile =
      "files" in e.target
        ? (e as ChangeEvent<HTMLInputElement>).target.files
        : (e as DragEvent<HTMLLabelElement>).dataTransfer.files;

    if (selectedFile) {
      // image count must not exceed 10
      if (selectedFile.length + imageList.length <= 10) {
        //would throw error if image is invalid
        const newImages = (
          await Promise.all(
            Array.from(selectedFile).map((file) => resizeImageFile(file))
          )
        )
          .filter((i): i is Exclude<typeof i, null> => !!i)
          .map((image, index) => ({
            ...image,
            order: highestIndex + index + 1,
            id: uuid(),
          }));

        if (newImages.length === 0) toast.error("Image(s) are invalid");
        else {
          setImageList((images) => [...images, ...newImages]);
          setImagesToAdd((images) => [...images, ...newImages]);
        }
      } else toast.error("Item cannot have more than 10 images");
    }
  }

  //
  function handleDeleteImage(id: string) {
    //check if image with given id exist
    const imageToDelete = imageList.find((image) => image.id === id);
    if (imageToDelete) {
      const { order, id } = imageToDelete;
      //delete image with given id from display list
      setImageList((images) =>
        images
          .filter((image) => image.order !== order)
          .map((image) =>
            image.order > order ? { ...image, order: image.order - 1 } : image
          )
      );
      //having imageName property means image is in server and needs to be deleted
      if ("imageName" in imageToDelete) {
        const originalOrder =
          images?.find((img) => img.imageName === imageToDelete.imageName)
            ?.order ?? 0; //this should never be undefined
        setImagesToDelete((orders) => [...orders, originalOrder]);
      } else {
        // remove image from toAdd list otherwise
        setImagesToAdd((images) =>
          images
            .filter((image) => image.id !== id)
            .map((image) =>
              image.order > order ? { ...image, order: image.order - 1 } : image
            )
        );
      }
    }
  }

  //reorder happens after image create and delete
  function handleReorderImage(from: number, to: number) {
    // swap order of image in imageDisplay
    setImageList((images) =>
      images.map((image) => ({
        ...image,
        order:
          image.order === from ? to : image.order === to ? from : image.order,
      }))
    );
    // set new server image order to changed image display
    setImagesOrder(imageList.map((image) => image.order));
  }

  const sortedImageList = [...imageList].sort((a, b) => a.order - b.order);

  const [imageInputHovered, setImageInputHovered] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="browse"
        onDrop={(e) => {
          e.preventDefault();
          setImageInputHovered(false);
          handleAddImages(e);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setImageInputHovered(true);
        }}
        onDragLeave={() => setImageInputHovered(false)}
        data-draghovered={imageInputHovered}
        className=" h-16 w-[min(20rem,90%)] border-4 border-dashed rounded-lg border-slate-300 flex justify-center items-center data-[draghovered=true]:scale-105 transition-all"
      >
        <span className="text-lg font-bold text-slate-500 pointer-events-none">
          {imageInputHovered ? "Drop Your Images Here!" : "Add New Image Here!"}
        </span>
      </label>
      <input
        hidden
        type="file"
        name="image"
        id="browse"
        accept=".png, .jpg, .jpeg .webp"
        onChange={handleAddImages}
        multiple
      />

      <div className="p-4 grid grid-cols-[repeat(2,max-content)] justify-items-center items-center gap-y-3 gap-x-5">
        {sortedImageList.map((image) => (
          <div key={image.order} className="contents">
            <div
              className="relative flex justify-center items-center min-w-8 w-max border-2 border-slate-300 rounded-md overflow-clip"
              onClick={() => handleDeleteImage(image.id)}
            >
              <img
                {...("imageName" in image
                  ? { src: createImageUrl(image.imageName, { height: 80 }) }
                  : { src: image.imageUrl })}
                className="h-14"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-all flex justify-center items-center">
                <RxCross2 className="h-7 w-7 text-white" />
              </div>
            </div>
            {sortedImageList.length > 1 && (
              <select
                name={"imageOrder" + image.order}
                id={"imageOrder" + image.order}
                value={image.order}
                onChange={(e) =>
                  handleReorderImage(image.order, Number(e.target.value))
                }
                className="p-1 border border-slate-400 rounded-md"
              >
                {Array.from(
                  { length: sortedImageList.length },
                  (_, i) => i
                ).map((i) => (
                  <option value={i} key={i}>
                    {i}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemImageForm;

import { ChangeEvent, Dispatch, DragEvent, useState } from "react";
import { ItemDetailsOutputType } from "../../type/itemType";
import toast from "react-hot-toast";
import pica from "pica";
import { MAX_HEIGHT as MAX_LENGTH } from "../../helper/constant";
import { createImageUrl } from "../../api/image";
import { v4 as uuid } from "uuid";

const picaInstance = pica();

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
        try {
          const newImages = await Promise.all(
            Array.from(selectedFile).map(async (file, index) => {
              const image = await createImageBitmap(file);

              let size: { width: number; height: number } = {
                width: image.width,
                height: image.height,
              };
              // resize if width or height exceed MAX_LENGTH, keep aspect ratio
              if (size.height > MAX_LENGTH || size.width > MAX_LENGTH) {
                size =
                  size.height > size.width
                    ? {
                        height: MAX_LENGTH,
                        width: Math.floor(
                          (size.width * MAX_LENGTH) / size.height
                        ),
                      }
                    : {
                        height: Math.floor(
                          (size.height * MAX_LENGTH) / size.width
                        ),
                        width: MAX_LENGTH,
                      };
              }

              //create new canvas, resize
              const canvas = document.createElement("canvas");
              canvas.width = size.width;
              canvas.height = size.height;

              const resultCanvas = await picaInstance.resize(image, canvas);

              //create blob for upload, dataURL for temporary display
              const resultBlob = await picaInstance.toBlob(
                resultCanvas,
                "image/webp"
              );
              const resultDataUrl = resultCanvas.toDataURL("image/webp");
              return {
                image: resultBlob,
                imageUrl: resultDataUrl,
                order: highestIndex + index + 1,
                id: uuid(),
              };
            })
          );
          setImageList((images) => [...images, ...newImages]);
          setImagesToAdd((images) => [...images, ...newImages]);
        } catch (e) {
          toast.error("Invalid input image");
        }
      } else toast.error("Item cannot have more than 10 images");
    }
  }

  //
  function handleDeleteImage(id: string) {
    const imageToDelete = imageList.find((image) => image.id === id);
    if (imageToDelete) {
      const { order, id } = imageToDelete;
      setImageList((images) =>
        images
          .filter((image) => image.order !== order)
          .map((image) =>
            image.order > order ? { ...image, order: image.order - 1 } : image
          )
      );
      if ("imageName" in imageToDelete) {
        const originalIndex =
          images?.findIndex(
            (img) => img.imageName === imageToDelete.imageName
          ) ?? 0; //this should never be undefined
        setImagesToDelete((orders) => [...orders, originalIndex]);
      } else {
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

  function handleReorderImage(from: number, to: number) {
    setImageList((images) =>
      images.map((image) => ({
        ...image,
        order:
          image.order === from ? to : image.order === to ? from : image.order,
      }))
    );
    setImagesOrder(
      imageList
        .map((image) => image.order)
        .map((order) => (order === from ? to : order === to ? from : order))
    );
  }

  const sortedImageList = [...imageList].sort((a, b) => a.order - b.order);
  return (
    <div>
      <label
        htmlFor="browse"
        onDrop={handleAddImages}
        onDragOver={(e) => e.preventDefault()}
      >
        Add Image
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
      <div>
        {sortedImageList.map((image) => (
          <div key={image.order}>
            <img
              {...("imageName" in image
                ? { src: createImageUrl(image.imageName, { height: 30 }) }
                : { src: image.imageUrl, width: 30 })}
              onClick={() => handleDeleteImage(image.id)}
            />
            {sortedImageList.length > 1 && (
              <select
                name={"imageOrder" + image.order}
                id={"imageOrder" + image.order}
                value={image.order}
                onChange={(e) =>
                  handleReorderImage(image.order, Number(e.target.value))
                }
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

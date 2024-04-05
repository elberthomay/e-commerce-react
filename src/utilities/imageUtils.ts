import pica from "pica";
import {
  MAX_IMAGE_HEIGHT,
  MAX_IMAGE_SIZE,
  MIN_IMAGE_HEIGHT,
} from "../variables/constant";

const picaInstance = pica();
export async function resizeImageFile(
  file: File,
  initialMaxLength: number = MAX_IMAGE_HEIGHT
) {
  try {
    if (initialMaxLength < MIN_IMAGE_HEIGHT)
      throw Error("initialMaxLength too small");
    const image = await createImageBitmap(file);

    let size: { width: number; height: number } = {
      width: image.width,
      height: image.height,
    };

    for (let retry = 0; retry < 5; retry++) {
      console.log(`retry: ${retry}`);
      // try reducing target height if image is still too large
      const maxLength =
        initialMaxLength -
        Math.floor(((initialMaxLength - MIN_IMAGE_HEIGHT) * retry) / 4);

      // resize if width or height exceed MAX_LENGTH, keep aspect ratio
      if (size.height > maxLength || size.width > maxLength) {
        size =
          size.height > size.width
            ? {
                height: maxLength,
                width: Math.floor((size.width * maxLength) / size.height),
              }
            : {
                height: Math.floor((size.height * maxLength) / size.width),
                width: maxLength,
              };
      }

      //create new canvas, resize
      const canvas = document.createElement("canvas");
      canvas.width = size.width;
      canvas.height = size.height;

      const resultCanvas = await picaInstance.resize(image, canvas);

      //create blob for upload, dataURL for temporary display
      const resultBlob = await picaInstance.toBlob(resultCanvas, "image/webp");
      if (resultBlob.size > MAX_IMAGE_SIZE) continue;
      else {
        const resultDataUrl = resultCanvas.toDataURL("image/webp");
        return {
          image: resultBlob,
          imageUrl: resultDataUrl,
        };
      }
    }
    throw Error("Image too detailed");
  } catch (e) {
    if (e instanceof Error) return e.message;
    else return null;
  }
}

export async function processImageFiles(files: FileList) {
  //would throw error if image is invalid
  const imagesOrError = await Promise.all(
    Array.from(files).map((file) => resizeImageFile(file))
  );
  const errors = imagesOrError.filter(
    (imageOrError): imageOrError is string | null =>
      imageOrError === null || typeof imageOrError === "string"
  );
  const images = imagesOrError.filter(
    (
      imageOrError
    ): imageOrError is {
      image: Blob;
      imageUrl: string;
    } => typeof imageOrError === "object"
  );

  return { images, errors };
}

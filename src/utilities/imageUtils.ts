import pica from "pica";
import { MAX_HEIGHT } from "../helper/constant";

const picaInstance = pica();
export async function resizeImageFile(
  file: File,
  maxLength: number = MAX_HEIGHT
) {
  try {
    const image = await createImageBitmap(file);

    let size: { width: number; height: number } = {
      width: image.width,
      height: image.height,
    };
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
    const resultDataUrl = resultCanvas.toDataURL("image/webp");
    return {
      image: resultBlob,
      imageUrl: resultDataUrl,
    };
  } catch (e) {
    return null;
  }
}

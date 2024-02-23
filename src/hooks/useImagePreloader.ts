import { useEffect, useState } from "react";

function preloadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = img.onabort = () => {
      reject(src);
    };
    img.src = src;
  });
}

export default function useImagePreloader(imageUrls: string[] = []) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList = imageUrls.map((url) => preloadImage(url));

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  return { imagesPreloaded };
}

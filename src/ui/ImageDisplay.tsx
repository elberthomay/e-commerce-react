import {
  CSSProperties,
  ComponentRef,
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createImageUrl } from "../api/image";
import { twMerge } from "tailwind-merge";
import useImagePreloader from "../hooks/useImagePreloader";

function ImageDisplay({
  images,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { images: { imageName: string }[] }) {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const imageDivRef = useRef<ComponentRef<"div"> | null>(null);
  const [imageHovered, setImageHovered] = useState<boolean>(false);
  useImagePreloader(
    images.map((image) =>
      createImageUrl(image.imageName, {
        height: 700,
      })
    )
  );

  const trackPosition = useCallback((e: MouseEvent) => {
    const rect = imageDivRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const h = rect.height;
      const w = rect.width;
      imageDivRef.current?.style.setProperty(
        "--x-percent",
        `${((x / w) * 100).toFixed(2)}%`
      );
      imageDivRef.current?.style.setProperty(
        "--y-percent",
        `${((y / h) * 100).toFixed(2)}%`
      );
    }
  }, []);

  useEffect(() => {
    const imageRef = imageDivRef.current;
    if (imageHovered) {
      imageRef?.addEventListener("mousemove", trackPosition);
    }
    return () => imageRef?.removeEventListener("mousemove", trackPosition);
  }, [imageHovered, trackPosition]);

  if (images.length === 0) images = [{ imageName: "image-not-found.webp" }];

  const imageUrlStyle = {
    "--image-url": `url("${createImageUrl(images[imageIndex]?.imageName, {
      height: 700,
    })}")`,
  } as CSSProperties;

  return (
    <div {...props} className={twMerge("flex flex-col gap-1", className)}>
      <div
        ref={imageDivRef}
        style={imageUrlStyle}
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
        className="rounded-md bg-[image:var(--image-url)] bg-cover hover:bg-auto bg-[50%_50%] hover:bg-[position:var(--x-percent)_var(--y-percent)] w-full aspect-square overflow-clip"
      ></div>
      <div className="w-full flex justify-start *:shrink-0 overflow-x-auto gap-1 scrollbar-small">
        {images.map((image, i) => (
          <img
            onClick={() => setImageIndex(i)}
            key={image.imageName}
            data-selected={i === imageIndex}
            src={createImageUrl(image?.imageName, { height: 100 })}
            className="h-16 border-2 aspect-square object-cover object-center border-slate-300 data-[selected=true]:border-governor-bay-800 rounded-md overflow-clip transition-all"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageDisplay;

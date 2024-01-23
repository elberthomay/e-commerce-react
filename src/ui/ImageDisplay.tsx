import { HTMLAttributes, useState } from "react";
import { createImageUrl } from "../api/image";

function ImageDisplay({
  images,
  ...props
}: HTMLAttributes<HTMLDivElement> & { images: { imageName: string }[] }) {
  // images = [
  //   { imageName: "image-1.webp" },
  //   { imageName: "image-2.webp" },
  //   { imageName: "image-1.webp" },
  //   { imageName: "image-2.webp" },
  //   { imageName: "image-1.webp" },
  //   { imageName: "image-2.webp" },
  // ];
  const [imageIndex, setImageIndex] = useState<number>(0);
  if (images.length === 0) images = [{ imageName: "image-not-found.webp" }];
  return (
    <div {...props}>
      <img
        src={createImageUrl(images[imageIndex]?.imageName, { height: 300 })}
        alt=""
        className="w-full"
      />
      <ul>
        {images.map((image, i) => (
          <img
            onClick={() => setImageIndex(i)}
            key={image.imageName}
            src={createImageUrl(image?.imageName, { height: 50 })}
          />
        ))}
      </ul>
    </div>
  );
}

export default ImageDisplay;

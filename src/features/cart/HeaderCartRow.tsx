import { HTMLAttributes } from "react";
import { createAvatarImageUrl } from "../../api/image";
import { cartOutputType } from "../../type/cartType";
import { formatPrice } from "../../utilities/intlUtils";
import { twMerge } from "tailwind-merge";

function HeaderCartRow({
  item,
  ...props
}: HTMLAttributes<HTMLDivElement> & { item: cartOutputType }) {
  const { name, quantity, price, image } = item;
  return (
    <div
      {...props}
      className={twMerge("flex gap-3 items-center py-2", props?.className)}
    >
      <img
        src={createAvatarImageUrl(image ?? "image-not-found.webp")}
        alt={name + " image"}
        className=" h-12 w-12"
      />
      <div className=" w-48">
        <p className="truncate font-bold">{name}</p>
        <p className="text-sm text-slate-500">
          {quantity} item{quantity > 1 ? "s" : ""}
        </p>
      </div>
      <p>{formatPrice(price)}</p>
    </div>
  );
}

export default HeaderCartRow;

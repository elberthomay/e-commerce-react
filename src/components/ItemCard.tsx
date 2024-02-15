import {
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { createItemCardImageUrl } from "../api/image";
import { twJoin, twMerge } from "tailwind-merge";
import { formatPrice } from "../utilities/intlUtils";

const ItemCardContext = createContext<{
  hovered: boolean;
  quantity: number;
} | null>(null);

function ItemCard({
  itemName,
  quantity,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  itemName: string;
  quantity: number;
  children: ReactNode;
}) {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <ItemCardContext.Provider value={{ hovered, quantity }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title={itemName}
        {...props}
        className={twMerge(
          "rounded-lg h-full w-48 overflow-hidden shadow-sm shadow-black/40",
          className
        )}
      >
        {children}
      </div>
    </ItemCardContext.Provider>
  );
}

function Image({
  image,
  name,
  children,
}: {
  image?: string | null;
  name?: string;
  children?: ReactNode;
}) {
  const { quantity } = useItemCardContext();
  const brightnessClassName = quantity === 0 && "brightness-75";
  return (
    <div className={twJoin(brightnessClassName, "h-48 w-full relative")}>
      <img
        src={createItemCardImageUrl(image)}
        alt={name}
        className="h-full w-full object-cover"
      />
      {/* could consider internationalization */}
      {quantity === 0 && <ImageTag>Sold out</ImageTag>}
      {children}
    </div>
  );
}

function ImageTag({
  color = "black",
  position = "bottom-left",
  children,
}: {
  color?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  children: string;
}) {
  const positionXClassName =
    position === "bottom-left" || position === "top-left"
      ? "left-2"
      : "right-2";

  const positionYClassName =
    position === "bottom-left" || position === "bottom-right"
      ? "bottom-2"
      : "top-2";
  return (
    <div
      className={twJoin(
        positionXClassName,
        positionYClassName,
        `px-1.5 py-1 rounded-md bg-${color}/50 font-bold text-xs absolute text-slate-100`
      )}
    >
      {children}
    </div>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <div className="p-3 flex flex-col gap-1">{children}</div>;
}

function Name({ children }: { children: string }) {
  return <p className="text-sm line-clamp-2 text-elipsis">{children}</p>;
}

function Price({ children }: { children: number }) {
  //consider internationalization
  const priceText = formatPrice(children);
  return <p className="text-md font-bold">{priceText}</p>;
}

function Shop({ children }: { children: string }) {
  return <p className=" text-slate-500 text-xs">{children}</p>;
}
// function PreviousPrice(){}

function Rating() {
  return <p className="text-sm">5 star</p>;
}

export function useItemCardContext() {
  const context = useContext(ItemCardContext);
  if (!context) throw new Error("ItemCardContext used outside scope");
  else return context;
}

ItemCard.Body = Body;
ItemCard.Image = Image;
ItemCard.Name = Name;
ItemCard.Price = Price;
ItemCard.Shop = Shop;
ItemCard.Rating = Rating;

export default ItemCard;

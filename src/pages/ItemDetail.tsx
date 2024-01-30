import { Link, useParams } from "react-router-dom";
import useGetItem from "../hooks/item/useGetItem";
import Spinner from "../components/Spinner";
import AddToCartBox from "../features/item/AddToCartBox";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import ImageDisplay from "../ui/ImageDisplay";
import useGetShop from "../hooks/shop/useGetShop";
import ShopBadge from "../components/ShopBadge";
import useCreateCart from "../hooks/cart/useCreateCart";
import CustomDialog, {
  CustomDialogContextType,
} from "../components/CustomDialog";
import { ItemDetailsOutputType } from "../type/itemType";
import Button from "../ui/Button";
import { HTMLAttributes, forwardRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { createImageUrl } from "../api/image";
import { formatPrice } from "../utilities/intlUtils";
import { useMaxBreakpoints } from "../hooks/useWindowSize";
import { AddtoCartFooter } from "../features/item/AddToCartDrawer";
import GutteredBox from "../ui/GutteredBox";
function ItemDetail() {
  const { itemId } = useParams();
  const { isLoading, error, item } = useGetItem(itemId ?? "");
  const { createCart } = useCreateCart();
  const { isSm } = useMaxBreakpoints();
  const { shop } = useGetShop(item?.shopId);
  const { isAuthenticated } = useGetCurrentUser();
  const { id, name, shopId, shopName, description, price, quantity, images } =
    item ?? {};

  const dialogContextRef = useRef<CustomDialogContextType | null>(null);

  const [popupQuantity, setPopupQuantity] = useState<number>(0);

  async function handleCreateCart(itemId: string, quantity: number) {
    try {
      await createCart({ itemId, quantity });
      setPopupQuantity(quantity);
      dialogContextRef.current?.open();
    } catch (e) {
      toast.error("Error adding item to cart");
    }
  }

  async function handleCreateCartDialog(itemId: string, quantity: number) {
    try {
      await createCart({ itemId, quantity });
      setPopupQuantity(quantity);
      toast.success("Item added to cart");
    } catch (e) {
      toast.error("Error adding item to cart");
    }
  }

  return (
    <GutteredBox>
      {isLoading && <Spinner />}

      {!isLoading && item && shop && (
        <>
          <div className=" w-full max-w- p-4 pt-8 flex flex-col items-stretch sm:grid sm:grid-cols-[1fr,1fr,auto] sm:items-start gap-x-4">
            <ImageDisplay images={item.images} />
            <div className="flex flex-col gap-4 h-[200rem]">
              <h1 className="font-bold text-xl">{name}</h1>
              {!isSm && (
                <p className=" text-2xl font-bold">{formatPrice(item.price)}</p>
              )}
              <p className="font-bold text-lg">Description:</p>
              <p className="">{description}</p>

              <ShopBadge
                id={item.shopId}
                avatar={shop.avatar}
                name={shop.name}
              />
            </div>
            {isAuthenticated &&
              (isSm ? (
                <AddToCartBox
                  itemId={item.id}
                  price={item.price}
                  inventory={item.quantity}
                  onAddToCart={handleCreateCart}
                />
              ) : (
                <AddtoCartFooter
                  itemId={item.id}
                  price={item.price}
                  inventory={item.quantity}
                  onAddToCart={handleCreateCartDialog}
                />
              ))}
          </div>
          <CustomDialog contextRef={dialogContextRef}>
            <AddedToCartBody item={item} quantity={popupQuantity} />
          </CustomDialog>
        </>
      )}
    </GutteredBox>
  );
}

const AddedToCartBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    item: ItemDetailsOutputType;
    quantity: number;
  }
>(({ item, quantity, ...props }, forwardedRef) => {
  const { name, price, images } = item;
  return (
    <div
      {...props}
      className={twMerge(
        "p-8 flex flex-col gap-3 items-stretch text-center min-w-96 max-w-[95vh]",
        props.className
      )}
      ref={forwardedRef}
    >
      <h2 className="font-bold text-lg">Item has been added to cart</h2>
      {images.length > 0 && (
        <img
          src={createImageUrl(images[0].imageName, { height: 100 })}
          alt=""
        />
      )}
      <p className="">{name}</p>
      <p className="font-bold text-xl">{`${quantity} x ${formatPrice(
        price
      )}`}</p>
      <Link to="/cart">
        <Button>Go to cart</Button>
      </Link>
    </div>
  );
});

export default ItemDetail;

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
import LoginDialog from "../components/LoginDialog";
import useSetTitle from "../hooks/useSetTitle";
import useImagePreloader from "../hooks/useImagePreloader";

function ItemDetail() {
  const { itemId } = useParams();
  const { isLoading: itemIsLoading, error, item } = useGetItem(itemId ?? "");
  const { imagesPreloaded } = useImagePreloader(
    item?.images.map((image) =>
      createImageUrl(image.imageName, {
        height: 700,
      })
    )
  );

  const { isAuthenticated } = useGetCurrentUser();
  const { shop } = useGetShop(item?.shopId);
  useSetTitle(item ? `Shopping ${item.name} from ${item.shopName}` : item);

  const { createCart } = useCreateCart();
  const { isSm } = useMaxBreakpoints();

  const AddedToCartDialogRef = useRef<CustomDialogContextType | null>(null);
  const loginDialogRef = useRef<CustomDialogContextType | null>(null);

  const [popupQuantity, setPopupQuantity] = useState<number>(0);
  const [unauthenticatedOnLogin, setUnauthenticatedOnLogin] = useState<
    () => void
  >(() => {
    return;
  });

  const openLoginDialogToCreateCart =
    (createCartFunction: (itemId: string, quantity: number) => void) =>
    (itemId: string, quantity: number) => {
      if (isAuthenticated) createCartFunction(itemId, quantity);
      else {
        setUnauthenticatedOnLogin(
          (_) => () => createCartFunction(itemId, quantity)
        );
        loginDialogRef.current?.open();
      }
    };

  async function handleCreateCart(itemId: string, quantity: number) {
    try {
      await createCart({ itemId, quantity });
      setPopupQuantity(quantity);
      AddedToCartDialogRef.current?.open();
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

  const orderedImages = [...(item?.images ?? [])].sort(
    (a, b) => a.order - b.order
  );

  const isLoading = itemIsLoading || !imagesPreloaded;

  return (
    <GutteredBox>
      {isLoading && <Spinner />}
      {!isLoading && error && (
        <div className="mt-6 w-[min(40rem,59vw)] rounded-lg border border-slate-300 shadow mx-auto">
          <p>Oops. Looks like the item you're trying to access doesn't exist</p>
          <Link to="/">
            <Button>Return</Button>
          </Link>
        </div>
      )}
      {!isLoading && item && shop && (
        <>
          <div className=" w-full max-w- p-4 pt-8 flex justify-center flex-col items-stretch sm:grid sm:grid-cols-[minmax(18rem,0.7fr),minmax(20rem,1fr),minmax(15rem,17rem)] sm:items-start gap-x-6">
            <ImageDisplay images={orderedImages} className="w-full" />
            <div className="flex flex-col gap-4 h-[200rem]">
              <h1 className="font-bold text-xl">{item.name}</h1>
              {!isSm && (
                <p className=" text-2xl font-bold">{formatPrice(item.price)}</p>
              )}
              <p className="font-bold text-lg">Description:</p>
              <p className="">{item.description}</p>

              <ShopBadge
                id={item.shopId}
                avatar={shop.avatar}
                name={shop.name}
              />
            </div>
            {isSm ? (
              <AddToCartBox
                itemId={item.id}
                price={item.price}
                inventory={item.quantity}
                onAddToCart={openLoginDialogToCreateCart(handleCreateCart)}
              />
            ) : (
              <AddtoCartFooter
                itemId={item.id}
                price={item.price}
                inventory={item.quantity}
                onAddToCart={openLoginDialogToCreateCart(
                  handleCreateCartDialog
                )}
              />
            )}
          </div>
          <CustomDialog contextRef={AddedToCartDialogRef}>
            <AddedToCartBody item={item} quantity={popupQuantity} />
          </CustomDialog>

          <LoginDialog
            contextRef={loginDialogRef}
            onLogin={unauthenticatedOnLogin}
          />
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

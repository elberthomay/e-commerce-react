import { Link, useNavigate } from "react-router-dom";
import { createAvatarImageUrl } from "../../api/image";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import CustomHoverCard, { useCustomHoverCardContext } from "../CustomHoverCard";
import Button from "../../ui/Button";

export const HeaderShopButton = React.forwardRef<HTMLButtonElement>(
  (props: ButtonHTMLAttributes<HTMLButtonElement>, forwardedRef) => {
    const { currentShop, hasShop } = useGetCurrentShop();

    return (
      <button
        {...props}
        ref={forwardedRef}
        className={twJoin(
          "p-1 rounded-md flex items-center gap-2 data-[state=open]:bg-slate-300",
          props?.className
        )}
      >
        <img
          src={createAvatarImageUrl(currentShop?.avatar)}
          alt="Shop image"
          className="h-10 w-10 rounded-full"
        />
        <span className="truncate">{hasShop ? currentShop?.name : "Shop"}</span>
      </button>
    );
  }
);

const HeaderShopBody = React.forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const { setOpen } = useCustomHoverCardContext();
    const { hasShop, currentShop } = useGetCurrentShop();

    return hasShop ? (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          "grid grid-cols-[3rem_1fr] justify-center items-center text-center p-5 bg-white rounded-md",
          props?.className
        )}
      >
        <div className="w-full"></div>
        <div className="flex flex-col gap-1 w-full border-l border-slate-400 text-bold pl-2">
          <Link
            to={"/myshop"}
            className="font-bold text-ellipsis line-clamp-2 hover:text-slate-800"
            onClick={() => setOpen(false)}
          >
            {currentShop!.name}
          </Link>
          <div className="flex flex-col items-start pl-1 text-sm text-slate-400 ">
            <Link
              to={"/myshop/items"}
              className="hover:text-slate-600"
              onClick={() => setOpen(false)}
            >
              Items
            </Link>
            <Link
              to={"/myshop/orders/"}
              className="hover:text-slate-600"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>
            <Link
              to={"/myshop/settings/"}
              className="hover:text-slate-600"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <NoShopBody {...props} ref={forwardedRef} />
    );
  }
);

const NoShopBody = React.forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const navigate = useNavigate();
    const { setOpen } = useCustomHoverCardContext();
    const handleMyShopNavigation = () => {
      navigate("/myshop");
      setOpen(false);
    };

    return (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          "text-center p-5 bg-white rounded-md",
          props?.className
        )}
      >
        <p className="text-sm text-slate-500 mb-6">
          You have yet to create your shop
        </p>
        <Button className="w-full" onClick={handleMyShopNavigation}>
          Open your shop
        </Button>
      </div>
    );
  }
);

function HeaderShop(buttonProps: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <CustomHoverCard trigger={<HeaderShopButton {...buttonProps} />}>
      <HeaderShopBody />
    </CustomHoverCard>
  );
}

export default HeaderShop;

import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { setOpen } = useCustomHoverCardContext();
    const { currentShop } = useGetCurrentShop();
    const handleMyShopNavigation = (link: string) => {
      navigate(link);

      console.log(link);
      setOpen(false);
    };

    return currentShop ? (
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
          <button
            className="font-bold text-ellipsis line-clamp-2 hover:text-slate-800"
            onClick={() => handleMyShopNavigation("/myshop")}
          >
            {currentShop.name}
          </button>
          <div className="flex flex-col items-start pl-1 text-sm text-slate-400 ">
            <button
              className="hover:text-slate-600"
              onClick={() => handleMyShopNavigation("/myshop/items")}
            >
              Items
            </button>
            <button
              className="hover:text-slate-600"
              onClick={() => handleMyShopNavigation("/myshop/orders/")}
            >
              Orders
            </button>
            <button
              className="hover:text-slate-600"
              onClick={() => handleMyShopNavigation("/myshop/settings/")}
            >
              Settings
            </button>
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

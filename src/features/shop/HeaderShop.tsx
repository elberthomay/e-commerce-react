import { Link, useNavigate } from "react-router-dom";
import { createAvatarImageUrl } from "../../api/image";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import CustomHoverCard, {
  useCustomHoverCardContext,
} from "../../components/CustomHoverCard";
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
    const { hasShop } = useGetCurrentShop();
    const handleMyShopNavigation = () => {
      navigate("/myshop");
      setOpen(false);
    };

    return hasShop ? (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          "text-center p-5 bg-white rounded-md h-40 flex justify-center items-center",
          props?.className
        )}
        onClick={handleMyShopNavigation}
      >
        <p className="text-bold">Shop has been created</p>
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

import { Link } from "react-router-dom";
import { createAvatarImageUrl } from "../../api/image";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import * as HoverCard from "@radix-ui/react-hover-card";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
import CustomHoverCard, {
  useCustomHoverCardContext,
} from "../../components/CustomHoverCard";

export const HeaderShopButton = React.forwardRef<HTMLButtonElement>(
  (props: ButtonHTMLAttributes<HTMLButtonElement>, forwardedRef) => {
    const { currentShop, hasShop } = useGetCurrentShop();

    return (
      <button
        {...props}
        ref={forwardedRef}
        className={twJoin("flex items-center gap-2", props?.className)}
      >
        <img
          src={createAvatarImageUrl(currentShop?.avatar)}
          alt="Shop image"
          className="h-10 w-10"
        />
        <span className="truncate">{hasShop ? currentShop?.name : "Shop"}</span>
      </button>
    );
  }
);

const HeaderShopBody = React.forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const { hasShop } = useGetCurrentShop();
    const { setOpen } = useCustomHoverCardContext();
    return (
      <div {...props} ref={forwardedRef}>
        {hasShop ? (
          <p>Shop has been created</p>
        ) : (
          <Link to="/myshop" onClick={() => setOpen(false)}>
            Open your shop
          </Link>
        )}
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

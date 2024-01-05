import * as HoverCard from "@radix-ui/react-hover-card";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import HeaderCartBody from "./HeaderCartBody";
import React, { ButtonHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";
import CustomHoverCard from "../../components/CustomHoverCard";

export const HeaderCartButton = React.forwardRef<HTMLButtonElement>(
  (props: ButtonHTMLAttributes<HTMLButtonElement>, forwardedRef) => {
    const { currentUser } = useGetCurrentUser();
    return (
      <button
        {...props}
        ref={forwardedRef}
        className={twJoin("relative group", props?.className)}
      >
        <HiOutlineShoppingCart className="group-data-[state=open]:text-slate-500 h-7 w-7" />
        {currentUser?.cartCount !== undefined && currentUser.cartCount > 0 && (
          <div className=" absolute top-0 right-0 h-4 w-4 text-[0.5rem] bg-red-600 text-slate-100 rounded-full flex justify-center items-center translate-x-2 -translate-y-2">
            {currentUser?.cartCount}
          </div>
        )}
      </button>
    );
  }
);

function HeaderCart(buttonProps: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <CustomHoverCard trigger={<HeaderCartButton {...buttonProps} />}>
      <HeaderCartBody />
    </CustomHoverCard>
  );
}

export default HeaderCart;

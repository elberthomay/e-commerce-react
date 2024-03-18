import { Link, useNavigate } from "react-router-dom";
import { createAvatarImageUrl } from "../../api/image";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import Logout from "../Logout";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import CustomHoverCard, { useCustomHoverCardContext } from "../CustomHoverCard";

export const HeaderUserButton = React.forwardRef<HTMLButtonElement>(
  (props: ButtonHTMLAttributes<HTMLButtonElement>, forwardedRef) => {
    const { currentUser } = useGetCurrentUser();
    const navigate = useNavigate();
    //take first word of name, maximum 10 characters
    const nameFirstWord = currentUser?.name.split(" ")[0].slice(0, 10);
    const toSetting = () => navigate("/user/settings");
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={toSetting}
        className={twJoin("flex items-center gap-2", props?.className)}
      >
        <img
          src={createAvatarImageUrl(currentUser?.avatar)}
          className="h-10 w-10 rounded-full"
          alt="User avatar"
        />
        <span className="truncate">{nameFirstWord}</span>
      </button>
    );
  }
);

const HeaderUserBody = React.forwardRef<HTMLDivElement>(
  ({ className, ...props }: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const { setOpen } = useCustomHoverCardContext();
    const closeHoverCard = () => setOpen(false);
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(className, "w-40 p-1")}
      >
        <ul>
          <Link to="/user/settings">
            <li
              onClick={closeHoverCard}
              className="p-2 rounded-md hover:bg-slate-300"
            >
              Setting
            </li>
          </Link>
          <Link to="/orders">
            <li
              onClick={closeHoverCard}
              className="p-2 rounded-md hover:bg-slate-300"
            >
              Orders
            </li>
          </Link>
          <Logout>
            <li
              onClick={closeHoverCard}
              className="p-2 rounded-md hover:bg-slate-300 cursor-pointer"
            >
              Logout
            </li>
          </Logout>
        </ul>
      </div>
    );
  }
);

function HeaderUser(buttonProps: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <CustomHoverCard trigger={<HeaderUserButton {...buttonProps} />}>
      <HeaderUserBody />
    </CustomHoverCard>
  );
}

export default HeaderUser;

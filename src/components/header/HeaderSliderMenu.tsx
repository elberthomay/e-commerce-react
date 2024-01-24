import { RxHamburgerMenu } from "react-icons/rx";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "../../../@/components/ui/drawer";
import { HTMLAttributes, forwardRef } from "react";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";
import { createAvatarImageUrl } from "../../api/image";
import { BsGear } from "react-icons/bs";
import { Link, LinkProps } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";
import { DialogClose } from "@radix-ui/react-dialog";
import Logout from "../Logout";
import { PiDoorOpenThin } from "react-icons/pi";
function HeaderDrawerMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>
          <RxHamburgerMenu className="h-7 w-7" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[100dvh]">
        <HeaderDrawerBody />
      </DrawerContent>
    </Drawer>
  );
}

const HeaderDrawerBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { currentUser } = useGetCurrentUser();
  const { hasShop, currentShop } = useGetCurrentShop();
  console.log(currentShop);
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge("p-5", props.className)}
    >
      <div className="flex gap-2 items-center mb-4">
        <DrawerClose asChild>
          <button className="p-1">
            <IoClose className="h-9 w-9" />
          </button>
        </DrawerClose>
        <p className="text-md font-bold">Main Menu</p>
      </div>
      <div className="flex flex-col gap-6 pb-4 border-b border-slate-300">
        <div className="w-full grid grid-cols-[max-content,1fr,max-content] gap-3 items-center">
          <img
            src={createAvatarImageUrl(currentUser?.avatar)}
            alt="User avatar"
            className="h-16 w-16 rounded-full"
          />
          <p className="font-bold text md overflow-auto break-words line-clamp-2">
            {currentUser?.name}
          </p>
          <LinkWithCloseDialog to="/user/settings" className="rounded-full">
            <BsGear className="h-7 w-7" />
          </LinkWithCloseDialog>
        </div>
        {hasShop ? (
          <div className="w-full grid grid-cols-[max-content,1fr,max-content] gap-3 items-center">
            <LinkWithCloseDialog to="/myshop">
              <img
                src={createAvatarImageUrl(currentShop?.avatar)}
                alt="Shop avatar"
                className="h-16 w-16 rounded-full"
              />
            </LinkWithCloseDialog>
            <LinkWithCloseDialog to="/myshop">
              <p className="font-bold text md overflow-auto break-words">
                {currentShop?.name}
              </p>
            </LinkWithCloseDialog>
          </div>
        ) : (
          <LinkWithCloseDialog to="/myshop">
            <div className="w-full flex justify-between items-center">
              <span className="font-bold text-md">Create your free shop</span>{" "}
              <HiChevronRight className="h-8 w-8" />
            </div>
          </LinkWithCloseDialog>
        )}
      </div>
      <div>
        <Logout>
          <div className="py-4 flex items-center gap-4">
            <PiDoorOpenThin className="h-8 w-8 text-slate-500" />
            Logout
          </div>
        </Logout>
      </div>
    </div>
  );
});

function LinkWithCloseDialog(
  props: LinkProps & React.RefAttributes<HTMLAnchorElement>
) {
  return (
    <DialogClose asChild>
      <Link {...props} />
    </DialogClose>
  );
}

export default HeaderDrawerMenu;

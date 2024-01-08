import * as HoverCard from "@radix-ui/react-hover-card";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const CustomHoverCardContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function HoverCardOverlay() {
  const body = document.getElementsByTagName("body");
  return createPortal(
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-0"></div>,
    body[0]
  );
}

function CustomHoverCard({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (open: boolean) => setOpen(open);

  return (
    <CustomHoverCardContext.Provider value={{ open, setOpen: handleOpen }}>
      <HoverCard.Root
        open={open}
        onOpenChange={setOpen}
        openDelay={100}
        closeDelay={100}
      >
        <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            hideWhenDetached={false}
            className="origin-[var(--radix-hover-card-content-transform-origin)] animate-[fadeInDown_0.25s_linear] z-20"
            asChild
          >
            {children}
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
      {open && <HoverCardOverlay />}
    </CustomHoverCardContext.Provider>
  );
}

export function useCustomHoverCardContext() {
  const context = useContext(CustomHoverCardContext);
  if (!context) throw Error("CustomHoverCardContext used outside context");
  return context;
}

export default CustomHoverCard;

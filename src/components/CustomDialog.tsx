import * as Dialog from "@radix-ui/react-dialog";
import { ReactElement, createContext, useContext, useState } from "react";

const CustomDialogContext = createContext<{
  closeDialog: () => void;
  closeConfirmation: () => void;
  close: () => void;
} | null>(null);

function CustomDialog({
  children,
  trigger,
  confirmation,
}: {
  children: ReactElement;
  trigger: ReactElement;
  confirmation?: ReactElement;
}) {
  const [status, setStatus] = useState<"closed" | "main" | "confirmation">(
    "closed"
  );

  function handleOpen(open: boolean) {
    console.log(open);
    if (open) setStatus("main"); // open signal could only when dialog is closed
    else if (!open && status === "main" && confirmation)
      setStatus("confirmation"); //open confirmation
    else if (!open && status === "confirmation")
      setStatus("main"); // can only close by calling closeDialog
    else setStatus("closed"); // if confirm dialog is open, or element not provided
  }

  const closeDialog = () => setStatus("closed");
  const closeConfirmation = () => setStatus("main");
  const close = () => handleOpen(false);

  const isOpen = status !== "closed";
  return (
    <CustomDialogContext.Provider
      value={{ closeDialog, closeConfirmation, close }}
    >
      <Dialog.Root open={isOpen} onOpenChange={handleOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed left-0 right-0 top-0 bottom-0 bg-black/50 z-10" />
          <Dialog.Content
            asChild
            className="z-10 max-w-full bg-slate-100 rounded-2xl p-8 dark:bg-slate-700 overflow-clip fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            {status === "confirmation" ? confirmation : children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CustomDialogContext.Provider>
  );
}
export function useCustomDialogContext() {
  const context = useContext(CustomDialogContext);
  if (!context) throw new Error("CustomDialogContext used outside scope");
  else return context;
}

export default CustomDialog;

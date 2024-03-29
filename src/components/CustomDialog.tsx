import * as Dialog from "@radix-ui/react-dialog";
import {
  MutableRefObject,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type CustomDialogContextType = {
  closeDialog: () => void;
  closeConfirmation: () => void;
  close: () => void;
  open: () => void;
};

const CustomDialogContext = createContext<CustomDialogContextType | null>(null);

export type CustomDialogPropsType = {
  children: ReactElement;
  trigger?: ReactElement;
  confirmation?: ReactElement;
  contextRef?: MutableRefObject<CustomDialogContextType | null>;
};

function CustomDialog({
  children,
  trigger,
  confirmation,
  contextRef,
}: CustomDialogPropsType) {
  const [status, setStatus] = useState<"closed" | "main" | "confirmation">(
    "closed"
  );

  const handleOpen = useCallback(
    (open: boolean) => {
      if (open)
        setStatus("main"); // open signal could only when dialog is closed
      else if (!open && status === "main" && confirmation)
        setStatus("confirmation"); //open confirmation
      else if (!open && status === "confirmation")
        setStatus("main"); // can only close by calling closeDialog
      else setStatus("closed"); // if confirm dialog is open, or element not provided
    },
    [confirmation, status]
  );

  const closeDialog = () => setStatus("closed");
  const closeConfirmation = () => setStatus("main");
  const close = useCallback(() => handleOpen(false), [handleOpen]);
  const open = useCallback(() => handleOpen(true), [handleOpen]);

  const isOpen = status !== "closed";

  useEffect(() => {
    if (contextRef)
      contextRef.current = { closeDialog, closeConfirmation, close, open };
  }, [contextRef, open, close]);

  return (
    <CustomDialogContext.Provider
      value={{ closeDialog, closeConfirmation, close, open }}
    >
      <Dialog.Root open={isOpen} onOpenChange={handleOpen}>
        <Dialog.Trigger asChild>{trigger ?? null}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed left-0 right-0 top-0 bottom-0 bg-black/50 z-10" />
          <Dialog.Content
            asChild
            className="z-10 max-w-[95vw] max-h-[95dvh] bg-slate-100 rounded-2xl p-8 dark:bg-slate-700 overflow-clip fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
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

import { HTMLAttributes, forwardRef, useState } from "react";
import Button from "../../ui/Button";
import { useCustomDialogContext } from "../../components/CustomDialog";
import { twMerge } from "tailwind-merge";
import TextInput from "../../ui/TextInput";

const OrderConfirmationBody = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    message: string;
    confirmationString: string;
    onConfirm: () => void;
  }
>(
  (
    { message, confirmationString, onConfirm: onDelete, ...props },
    forwardedRef
  ) => {
    const { closeDialog } = useCustomDialogContext();
    const [confirmationField, setConfirmationField] = useState("");
    function handleDelete() {
      onDelete();
      closeDialog();
    }
    return (
      <div
        {...props}
        ref={forwardedRef}
        className={twMerge(
          props.className,
          "flex flex-col gap-4 max-w-80 text-center"
        )}
      >
        <p className="text-xl font-bold text-center">Deleting Address</p>
        <p>{message}</p>
        <p>
          Type <span className="font-bold">{confirmationString}</span> to
          confirm
        </p>
        <TextInput
          placeholder={confirmationString}
          value={confirmationField}
          onChange={(e) => setConfirmationField(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2 justify-center">
          <Button
            className="w-full bg-slate-100 border-governor-bay-800 text-governor-bay-800 hover:border-governor-bay-500 hover:border-l-governor-bay-500"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={confirmationField !== confirmationString}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  }
);

export default OrderConfirmationBody;

import { twMerge } from "tailwind-merge";
import Button from "../../ui/Button";
import { useCustomDialogContext } from "../../components/CustomDialog";
import { HTMLAttributes, forwardRef } from "react";

const AddressDeleteConfirmation = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    itemName: string;
    onDelete: () => void;
  }
>(({ itemName, onDelete, ...props }, forwardedRef) => {
  const { closeDialog } = useCustomDialogContext();
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
      <p>Are you sure you want to delete address "{itemName}"?</p>
      <p>This action is irreversible.</p>
      <div className="grid grid-cols-2 gap-2 justify-center">
        <Button
          className="w-full bg-slate-100 border-governor-bay-800 text-governor-bay-800 hover:border-governor-bay-500 hover:border-l-governor-bay-500"
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button className="w-full" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
});

export default AddressDeleteConfirmation;

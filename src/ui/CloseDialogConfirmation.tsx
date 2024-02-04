import { HTMLAttributes, forwardRef } from "react";
import { useCustomDialogContext } from "../components/CustomDialog";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

const CloseDialogConfirmation = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
  const { closeDialog, closeConfirmation } = useCustomDialogContext();
  return (
    <div
      {...props}
      ref={forwardedRef}
      className={twMerge(
        "flex flex-col gap-3 w-[min(20rem,95vh)]",
        props.className
      )}
    >
      <div className="text-center">
        <p>Are you sure you want to quit?</p>
        <p>Your progress will not be saved</p>
      </div>
      <div className="grid grid-cols-2 gap-2 justify-center">
        <Button
          className="w-full bg-slate-100 border-governor-bay-800 text-governor-bay-800 hover:border-governor-bay-500 hover:border-l-governor-bay-500"
          onClick={closeConfirmation}
        >
          Continue
        </Button>
        <Button className="w-full" onClick={closeDialog}>
          Close
        </Button>
      </div>
    </div>
  );
});

export default CloseDialogConfirmation;

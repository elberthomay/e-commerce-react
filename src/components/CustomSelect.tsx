import * as Select from "@radix-ui/react-select";
import { ReactNode, useState, forwardRef } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { twJoin, twMerge } from "tailwind-merge";

export function CustomSelect({
  value,
  onValueChange,
  name,
  triggerClassName,
  children,
}: {
  value: string;
  onValueChange: (newValue: string) => void;
  name: string;
  triggerClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  return (
    <Select.Root
      {...{
        open,
        onOpenChange: handleOpenChange,
        onValueChange,
        value,
        name,
      }}
    >
      <Select.Trigger
        className={twMerge(
          "group flex items-center justify-between px-2 py-1 w-40 border-2 border-slate-300 rounded-lg",
          triggerClassName
        )}
      >
        <Select.Value />
        <Select.Icon asChild>
          <HiChevronRight className="h-4 w-4 text-xl  transition-all duration-200 origin-center rotate-90 group-data-[state=open]:-rotate-90" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={5}
          collisionPadding={0}
          className="py-1.5 pr-1 bg-white border border-slate-300 rounded-lg animate-[fadeIn_0.15s_linear] w-[var(--radix-select-trigger-width)] z-10"
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export const CustomSelectItem = forwardRef<
  HTMLDivElement,
  Select.SelectItemProps
>(({ children, ...props }: Select.SelectItemProps, forwardedRef) => {
  return (
    <Select.Item {...props} ref={forwardedRef} asChild>
      <div
        className={twJoin(
          "group border-l-4 p-0.5 border-transparent data-[state=checked]:border-l-governor-bay-700",
          props?.className
        )}
      >
        <div className="p-1 w-full rounded-sm group-data-[highlighted]:bg-slate-300">
          <Select.ItemText>{children}</Select.ItemText>
        </div>
      </div>
    </Select.Item>
  );
});

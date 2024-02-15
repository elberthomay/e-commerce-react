import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { ReactElement, useState } from "react";

function CustomCombobox({
  open,
  onChangeOpen,
  children,
  datas,
  setValue,
}: {
  open?: boolean;
  onChangeOpen?: (open: boolean) => void;
  children: ReactElement;
  datas: { value: string; key?: string; label: string }[];
  currentValue: string;
  setValue: (value: string) => void;
}) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  function handleChangeValue(value: string) {
    setValue(value);
    onChangeOpen ? onChangeOpen(false) : setInternalOpen(false);
  }

  return (
    <Popover
      open={open ?? internalOpen}
      onOpenChange={onChangeOpen ?? setInternalOpen}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className=" p-1 min-w-[var(--radix-popover-trigger-width)] border border-slate-300 rounded-lg z-10">
        <Command className="min-w-full p-0">
          <CommandInput placeholder="Search country code" />
          <CommandEmpty>Country code not found</CommandEmpty>
          <CommandGroup className=" max-h-64 overflow-y-auto scrollbar scrollbar-small">
            {datas.map(({ value, key, label }) => (
              <CommandItem
                key={key ?? value}
                value={value}
                onSelect={() => handleChangeValue(key ?? value)}
                className="hover:bg-slate-300 rounded-md"
              >
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CustomCombobox;

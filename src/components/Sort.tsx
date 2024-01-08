import { useSearchParams } from "react-router-dom";
import { CustomSelect, CustomSelectItem } from "./CustomSelect";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function Sort(props: HTMLAttributes<HTMLDivElement>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ?? "relevant";

  function handleValueChange(value: string) {
    if (value === "relevant") searchParams.delete("sort");
    else searchParams.set("sort", value);
    setSearchParams(searchParams);
  }
  return (
    <div
      {...props}
      className={twMerge("flex gap-2 items-center", props?.className)}
    >
      <span className="font-bold">Sort By : </span>
      <CustomSelect
        {...{
          open,
          onValueChange: handleValueChange,
          value: sortBy,
          name: "sort",
        }}
      >
        <CustomSelectItem value="relevant">Most relevant</CustomSelectItem>
        <CustomSelectItem value="cheapest">Lowest price</CustomSelectItem>
        <CustomSelectItem value="mostExpensive">Highest price</CustomSelectItem>
        <CustomSelectItem value="oldest">Oldest</CustomSelectItem>
        <CustomSelectItem value="newest">newest</CustomSelectItem>
      </CustomSelect>
    </div>

    // <Select.Root
    //   {...{
    //     open,
    //     onOpenChange: handleOpenChange,
    //     onValueChange: handleValueChange,
    //     value: sortBy,
    //     name: "sort",
    //   }}
    // >
    //   <Select.Trigger/>
    //   <Select.Arrow asChild> </Select.Arrow>
    // </Select.Root>

    // <select value={sortBy} onChange={handleChange}>
    //   <option value="">Most relevant</option>
    //   <option value="cheapest">Lowest price</option>
    //   <option value="mostExpensive">Highest price</option>
    //   <option value="oldest">Oldest</option>
    //   <option value="newest">newest</option>
    // </select>
  );
}

export default Sort;

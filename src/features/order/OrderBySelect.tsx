import { useSearchParams } from "react-router-dom";
import { CustomSelect, CustomSelectItem } from "../../components/CustomSelect";

function OrderBySelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sortBy", value);
    setSearchParams(newSearchParams);
  }
  return (
    <CustomSelect
      {...{
        open,
        onValueChange: handleValueChange,
        value: searchParams.get("sortBy") ?? "newest",
        name: "sortBy",
        triggerClassName: "data-[state=open]:border-governor-bay-800",
      }}
    >
      <CustomSelectItem value="newest">Newest</CustomSelectItem>
      <CustomSelectItem value="oldest">Oldest</CustomSelectItem>
    </CustomSelect>
  );
}

export default OrderBySelect;

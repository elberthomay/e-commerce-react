import { useSearchParams } from "react-router-dom";
import { CustomSelect, CustomSelectItem } from "../../components/CustomSelect";

function OrderNewerThanSelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleValueChange(value: string) {
    if (value !== "all") {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("newerThan", value);
      setSearchParams(newSearchParams);
    } else {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("newerThan");
      setSearchParams(newSearchParams);
    }
  }
  return (
    <CustomSelect
      {...{
        open,
        onValueChange: handleValueChange,
        value: searchParams.get("newerThan") ?? "all",
        name: "newerThan",
        triggerClassName: "data-[state=open]:border-governor-bay-800",
      }}
    >
      <CustomSelectItem value="7">1 Week Ago</CustomSelectItem>
      <CustomSelectItem value="30">1 Month Ago</CustomSelectItem>
      <CustomSelectItem value="183">6 Month Ago</CustomSelectItem>
      <CustomSelectItem value="all">All Orders</CustomSelectItem>
    </CustomSelect>
  );
}

export default OrderNewerThanSelect;

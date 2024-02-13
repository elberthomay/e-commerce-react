import { FaPlus } from "react-icons/fa6";
import CustomDialog from "../../components/CustomDialog";
import Button from "../../ui/Button";
import CreateItemForm from "./CreateItemForm";
import MyshopItemsList from "./MyshopItemsList";

function MyShopItems() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">shop items</h1>
      <CustomDialog
        trigger={
          <Button className="self-end flex gap-2 items-center">
            <FaPlus className="h-3 w-3" /> Create New Item
          </Button>
        }
      >
        <CreateItemForm />
      </CustomDialog>
      <MyshopItemsList />
    </div>
  );
}

export default MyShopItems;

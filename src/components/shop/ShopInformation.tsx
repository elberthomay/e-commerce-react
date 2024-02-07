import { format } from "date-fns";
import { createAvatarImageUrl } from "../../api/image";
import { ShopGetOutputType } from "../../type/shopType";
import Button from "../../ui/Button";
import CustomDialog from "../CustomDialog";
import { BiSolidDoorOpen } from "react-icons/bi";

function ShopInformation({ shop }: { shop: ShopGetOutputType }) {
  const { name, description, avatar, createdAt } = shop;
  return (
    <div className="flex items-center gap-3 p-4 border border-slate-300 rounded-xl shadow">
      <img
        src={createAvatarImageUrl(avatar, 100)}
        alt={`${name}'s avatar`}
        className="w-20 aspect-square"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{name}</h1>
        <CustomDialog
          trigger={
            <Button className=" py-1 px-2.5 bg-slate-100 text-slate-500 font-bold border border-slate-500 hover:border-slate-800  hover:bg-slate-200 text-sm">
              Shop information
            </Button>
          }
        >
          <div className=" flex flex-col gap-3">
            <h2 className="text-xl font-bold text-center">Shop Description</h2>
            <p className="text-center">{description}</p>
            <div className="flex">
              <div className="flex gap-2 text-slate-400">
                <BiSolidDoorOpen className="h-4 w-4 shrink-0" />
                <span className="text-sm">
                  Open since: {format(new Date(createdAt), "MMM y")}
                </span>
              </div>
            </div>
          </div>
        </CustomDialog>
      </div>
    </div>
  );
}

export default ShopInformation;

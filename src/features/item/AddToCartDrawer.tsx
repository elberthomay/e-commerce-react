import Button from "../../ui/Button";
import {
  Drawer,
  DrawerContent,
  DrawerPulltab,
  DrawerTrigger,
} from "../../../@/components/ui/drawer";
import AddToCartBox from "./AddToCartBox";

export function AddtoCartFooter(boxProp: {
  itemId: string;
  price: number;
  inventory: number;
  onAddToCart: (itemId: string, quantity: number) => void;
}) {
  return (
    <>
      <div className="fixed w-full bottom-0 left-0 right-0 p-8 bg-slate-200">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full py-3">Add to Cart</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div>
              <DrawerPulltab />
              <AddToCartBox {...boxProp} className="border-0" />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

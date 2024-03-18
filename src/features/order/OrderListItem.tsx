import { z } from "zod";
import { createItemCardImageUrl } from "../../api/image";
import { orderOutputSchema } from "@elycommerce/common";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { formatPrice } from "../../utilities/intlUtils";
import { twMerge } from "tailwind-merge";
import { orderStatusBoxClassName } from "../../variables/orderStatusBoxClassName";

function OrderListItem({
  orderItem,
}: {
  orderItem: z.infer<typeof orderOutputSchema>;
}) {
  const { id, name, shopId, shopName, totalPrice, image, createdAt, status } =
    orderItem;
  const navigate = useNavigate();
  return (
    <Link to={`/order/${id}`}>
      <div className="grid grid-cols-[auto_1fr_auto] items-stretch h-min gap-x-2 p-3 rounded-md border border-slate-300">
        <img
          src={createItemCardImageUrl(image)}
          alt={name}
          className="h-28 min-h-full rounded-md object-cover border border-slate-300 aspect-square"
        />

        <div className="flex flex-col self-start">
          <p className="text-md line-clamp-2 text-ellipsis font-bold">{name}</p>
          <span
            className="text text-slate-400 cursor-pointer"
            onClick={() => navigate(`/shop/${shopId}`)}
          >
            {shopName}
          </span>

          <p className="text-sm text-slate-400">
            Created: {format(new Date(createdAt), "E,d-MMMM-Y, k:m")}
          </p>
        </div>
        <div className="relative flex flex-col justify-center items-end">
          <p
            className={twMerge(
              "absolute top-0 right-0 justify-self-start p-1 rounded-md capitalize font-bold text-sm",
              orderStatusBoxClassName[status]
            )}
          >
            {status}
          </p>
          <p className="font-bold text-lg">{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </Link>
  );
}

export default OrderListItem;

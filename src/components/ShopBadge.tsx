import { Link } from "react-router-dom";
import { createAvatarImageUrl } from "../api/image";

function ShopBadge({
  id,
  avatar,
  name,
}: {
  id: string;
  avatar?: string | null;
  name: string;
}) {
  return (
    <div className="py-4 grid grid-cols-[auto,1fr] items-center gap-x-3">
      <Link to={`/shop/${id}`}>
        <img
          src={createAvatarImageUrl(avatar ?? "defaultAvatar.webp")}
          alt={`${name}'s shop avatar`}
          className=" col-span-2 h-12 w-12 rounded-full"
        />
      </Link>
      <Link to={`/shop/${id}`} className="font-bold">
        {name}
      </Link>
    </div>
  );
}

export default ShopBadge;

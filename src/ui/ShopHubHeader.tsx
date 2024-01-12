import { Link } from "react-router-dom";

function ShopHubHeader() {
  return (
    <header className="p-8 flex justify-center">
      <Link to="/" className=" flex items-center gap-2">
        <span className="font-pacifico text-4xl text-governor-bay-800 dark:text-governor-bay-300">
          Shop Hub
        </span>
      </Link>
    </header>
  );
}

export default ShopHubHeader;

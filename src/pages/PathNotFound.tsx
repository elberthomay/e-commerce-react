import { Link, useLocation } from "react-router-dom";
import GutteredBox from "../ui/GutteredBox";
import Button from "../ui/Button";

function PathNotFound() {
  const { pathname } = useLocation();
  return (
    <GutteredBox className="p-8 flex flex-col gap-4 rounded-lg max-w-[100vw] shadow-lg">
      Ooops, path {pathname} does not exist on this website
      <Link to="/">
        <Button className="w-full">Return to Main page</Button>
      </Link>
    </GutteredBox>
  );
}

export default PathNotFound;

import { Link, useLocation } from "react-router-dom";
import GutteredBox from "../ui/GutteredBox";
import Button from "../ui/Button";
import useSetTitle from "../hooks/useSetTitle";

function PathNotFound() {
  const { pathname } = useLocation();
  useSetTitle(`E-commerce/${pathname}`);
  return (
    <GutteredBox className="h-dvh flex justify-center items-center">
      <div className="w-[min(32rem,95vw)] p-8 flex flex-col gap-4 rounded-lg border border-slate-300 max-w-[100vw] shadow-lg">
        Ooops, path {pathname} does not exist on this website
        <Link to="/">
          <Button className="w-full">Return to Main page</Button>
        </Link>
      </div>
    </GutteredBox>
  );
}

export default PathNotFound;

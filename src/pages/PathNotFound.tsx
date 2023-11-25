import { Link, useLocation } from "react-router-dom";

function PathNotFound() {
  const { pathname } = useLocation();
  return (
    <div>
      Ooops, path {pathname} does not exist on this website
      <Link to="/">Return to Main page</Link>
    </div>
  );
}

export default PathNotFound;

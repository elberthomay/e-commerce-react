import { Link } from "react-router-dom";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import HeaderSearchBar from "./HeaderSearchBar";
import CartHeader, { HeaderCartButton } from "../../features/cart/HeaderCart";
import HeaderUser, { HeaderUserButton } from "./HeaderUser";
import HeaderShop, { HeaderShopButton } from "./HeaderShop";
import { useMaxBreakpoints } from "../../hooks/useWindowSize";
import HeaderDrawerMenu from "./HeaderSliderMenu";
import Button from "../../ui/Button";

function Header() {
  const { isLoading, error, isAuthenticated } = useGetCurrentUser();
  const { isXl, isMd, isSm } = useMaxBreakpoints();
  return (
    <>
      {!isLoading && !error && (
        <header className="flex p-5 pl-8 sticky top-0 bg-slate-100 dark:bg-slate-800 items-center gap-8 z-10">
          <Link to="/" className=" flex items-center gap-2">
            <img
              src="/shopping.png"
              alt="ecommerce logo"
              className="w-10 h-10 dark:border-2 border-solid border-governor-bay-800"
            />
            {isXl && (
              <span className="font-pacifico text-2xl text-governor-bay-800 dark:text-governor-bay-300">
                Shop Hub
              </span>
            )}
          </Link>
          <HeaderSearchBar />
          {isAuthenticated ? (
            <>
              {isMd ? (
                <>
                  <CartHeader />
                  <div className="grid grid-cols-2 gap-1">
                    <HeaderShop />
                    <HeaderUser />
                  </div>
                </>
              ) : (
                <>
                  <Link to="/cart">
                    <HeaderCartButton />
                  </Link>
                  {isSm ? (
                    <div className="grid grid-cols-2">
                      <Link to="/myshop">
                        <HeaderShopButton />
                      </Link>
                      <Link to="/settings">
                        <HeaderUserButton />
                      </Link>
                    </div>
                  ) : (
                    <HeaderDrawerMenu />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="px-3 py-1.5 text-sm bg-white border-2 border-governor-bay-800 hover:border-slate-500 text-governor-bay-800 hover:text-slate-200">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className=" px-3 py-1.5 text-sm hover:text-governor-bay-800">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </header>
      )}
    </>
  );
}

export default Header;

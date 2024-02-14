import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import HeaderCartRow from "./HeaderCartRow";
import useGetCart from "../../hooks/cart/useGetCart";
import React, { HTMLAttributes } from "react";
import { useCustomHoverCardContext } from "../../components/CustomHoverCard";
import Button from "../../ui/Button";

const HeaderCartBody = React.forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const { isLoading, error, cart } = useGetCart();
    const { setOpen } = useCustomHoverCardContext();
    const navigate = useNavigate();
    return (
      <div {...props} ref={forwardedRef}>
        {isLoading && <Spinner />}
        {!isLoading && error && <p>error has occured</p>}
        {!isLoading &&
          cart &&
          (cart.length !== 0 ? (
            <div
              onClick={() => {
                navigate("/cart");
                setOpen(false);
              }}
              className="overflow-clip bg-white border-1 border-slate-500 rounded-md  cursor-pointer"
            >
              <div className="p-3 bg-slate-200 font-bold">
                Cart({cart.length})
              </div>
              <div className="p-3 max-h-[15rem] overflow-y-scroll">
                {cart.map((item) => (
                  <HeaderCartRow
                    key={item.itemId}
                    item={item}
                    className=" border-b border-slate-300 last:border-b-0"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-80 overflow-clip bg-white border-1 border-slate-500 rounded-md shadow">
              <div className="w-full border-b border-slate-300 p-4 py-2 flex justify-between">
                <span className="text-lg font-bold">Cart</span>
                <button
                  className="text-md font-bold text-governor-bay-800"
                  onClick={() => {
                    navigate("/cart");
                    setOpen(false);
                  }}
                >
                  View
                </button>
              </div>
              <div className="p-6 flex flex-col items-center gap-4">
                <img
                  src="/basket.webp"
                  alt="empty cart icon"
                  className="w-24"
                />
                <p className="text-xl font-bold">Your cart is empty</p>
                <Link
                  to="/"
                  onClick={() => {
                    navigate("/");
                    setOpen(false);
                  }}
                >
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    );
  }
);

export default HeaderCartBody;

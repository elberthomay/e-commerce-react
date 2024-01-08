import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import HeaderCartRow from "./HeaderCartRow";
import useGetCart from "../../hooks/cart/useGetCart";
import React, { HTMLAttributes } from "react";
import { useCustomHoverCardContext } from "../../components/CustomHoverCard";

const HeaderCartBody = React.forwardRef<HTMLDivElement>(
  (props: HTMLAttributes<HTMLDivElement>, forwardedRef) => {
    const { isLoading, error, cart } = useGetCart();
    const { setOpen } = useCustomHoverCardContext();
    const navigate = useNavigate();
    return (
      <div {...props} ref={forwardedRef}>
        {isLoading && <Spinner />}
        {!isLoading && error && <p>error has occured</p>}
        {!isLoading && cart && cart.length !== 0 ? (
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
          <p>No item in cart</p>
        )}
      </div>
    );
  }
);

export default HeaderCartBody;

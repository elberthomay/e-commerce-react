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
          >
            <div>Cart({cart.length})</div>
            {cart.map((item) => (
              <HeaderCartRow key={item.itemId} item={item} />
            ))}
          </div>
        ) : (
          <p>No item in cart</p>
        )}
      </div>
    );
  }
);

export default HeaderCartBody;

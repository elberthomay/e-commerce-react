import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import HeaderCartRow from "./HeaderCartRow";
import useGetCart from "../../hooks/cart/useGetCart";
import { DropdownContextType, useDropdown } from "../../components/Dropdown";

function HeaderCartBody() {
  const { isLoading, error, cart } = useGetCart();
  const { toggleIsOpen } = useDropdown();
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && <p>error has occured</p>}
      {!isLoading && cart && cart.length !== 0 ? (
        <div
          onClick={() => {
            toggleIsOpen();
            navigate("/cart");
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
    </>
  );
}

export default HeaderCartBody;

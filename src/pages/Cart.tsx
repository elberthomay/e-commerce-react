import Spinner from "../components/Spinner";
import CartList from "../features/cart/CartList";
import CartSummary from "../features/cart/CartSummary";
import useGetCart from "../features/cart/useGetCart";

function Cart() {
  const { isLoading, error, cart } = useGetCart();

  console.log(cart);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && <p>Error displaying cart</p>}
      {!isLoading && cart && (
        <div>
          <h1>Cart</h1>
          <CartList cart={cart} />
          <CartSummary cart={cart} />
        </div>
      )}
    </>
  );
}

export default Cart;

import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import CartList from "../features/cart/CartList";
import CartSummary from "../features/cart/CartSummary";
import useGetCart from "../hooks/cart/useGetCart";
import Button from "../ui/Button";

function Cart() {
  const { isLoading, error, cart } = useGetCart();

  console.log(cart);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && error && <p>Error displaying cart</p>}
      {!isLoading && cart && (
        <>
          <h1 className="font-bold text-4xl mb-6">Cart</h1>
          <div className="w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[7fr_3fr] items-start sm:flex-row gap-2 lg:gap-4 2xl:gap-8">
            {cart.length === 0 ? (
              <EmptyCartMessage />
            ) : (
              <CartList cart={cart} />
            )}
            <CartSummary cart={cart} />
          </div>
        </>
      )}
    </>
  );
}

function EmptyCartMessage() {
  return (
    <div className=" p-10 rounded-lg flex justify-center ">
      <div className="grid grid-rows-3 grid-cols-[auto_1fr] gap-1 gap-x-3">
        <img
          src="basket.webp"
          alt="empty cart icon"
          className="h-full row-span-3"
        />
        <p className="text-xl font-bold">There's no item in cart</p>
        <p className="text-slate-500 text-sm">
          Fill your cart and enjoy our incredible discounts
        </p>
        <Link to="/">
          <Button>Start Browsing</Button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;

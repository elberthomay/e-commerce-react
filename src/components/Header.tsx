import styled from "styled-components";
import { Link } from "react-router-dom";
import useGetCurrentUser from "../hooks/user/useGetCurrentUser";
import SearchBar from "./SearchBar";
import CartHeader from "../features/cart/HeaderCart";
import HeaderUser from "../features/user/HeaderUser";
import HeaderShop from "../features/shop/HeaderShop";

const StyledHeader = styled.div`
  display: flex;
`;

function Header() {
  const { isLoading, error, currentUser, isAuthenticated } =
    useGetCurrentUser();
  return (
    <>
      {!isLoading && !error && (
        <StyledHeader>
          <Link to="/">main</Link>
          <SearchBar />
          {isAuthenticated ? (
            <>
              <CartHeader />
              <HeaderShop />
              <HeaderUser />
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </StyledHeader>
      )}
    </>
  );
}

export default Header;

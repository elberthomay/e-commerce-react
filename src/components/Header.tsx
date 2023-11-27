import styled from "styled-components";
import { Link } from "react-router-dom";
import useGetCurrentUser from "../features/user/useGetCurrentUser";
import Logout from "./Logout";
import SearchBar from "./SearchBar";

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
              <Link to="/cart">cart</Link>
              <Link to="/MyShop">Shop</Link>
              <Link to="/user/settings">Setting</Link>
              <Logout>Logout</Logout>
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

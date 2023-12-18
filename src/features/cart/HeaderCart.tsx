import Dropdown, { DropdownContextType } from "../../components/Dropdown";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import { HiMiniShoppingCart } from "react-icons/hi2";
import CartHeaderBody from "./HeaderCartBody";

function HeaderCart() {
  const { currentUser } = useGetCurrentUser();
  const RenderCartHeaderButton = (arg: DropdownContextType) => {
    const { isOpen } = arg;
    return (
      <>
        <div style={{ color: isOpen ? "grey" : undefined }}>
          <HiMiniShoppingCart />
          {currentUser?.cartCount}
        </div>
      </>
    );
  };
  return (
    <Dropdown>
      <Dropdown.Button body={RenderCartHeaderButton} />
      <Dropdown.Content>
        <CartHeaderBody />
      </Dropdown.Content>
    </Dropdown>
  );
}

export default HeaderCart;

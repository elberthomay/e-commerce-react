import { Link, useNavigate } from "react-router-dom";
import { createImageUrl } from "../../api/image";
import Dropdown, {
  DropdownContextType,
  useDropdown,
} from "../../components/Dropdown";
import useGetCurrentShop from "../../hooks/shop/useGetCurrentShop";

function HeaderShopButton(dropdownContextValue: DropdownContextType) {
  const { currentShop, hasShop } = useGetCurrentShop();
  const navigate = useNavigate();
  function handleNavigate() {
    if (currentShop) {
      dropdownContextValue.toggleIsOpen();
      navigate("/myshop");
    }
  }
  return (
    <div onClick={handleNavigate}>
      <img src={createImageUrl("defaultAvatar.webp", { height: 30 })} alt="" />
      {hasShop ? currentShop?.name : "Shop"}
    </div>
  );
}

function HeaderShopBody() {
  const { currentShop, hasShop } = useGetCurrentShop();
  return (
    <div>
      {hasShop ? (
        <p>Shop has been created</p>
      ) : (
        <Link to="/myshop">Open your shop</Link>
      )}
    </div>
  );
}

function HeaderShop() {
  return (
    <Dropdown>
      <Dropdown.Button body={HeaderShopButton} />
      <Dropdown.Content>
        <HeaderShopBody />
      </Dropdown.Content>
    </Dropdown>
  );
}

export default HeaderShop;

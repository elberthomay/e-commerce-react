import { Link } from "react-router-dom";
import { createImageUrl } from "../../api/image";
import Dropdown, { DropdownContextType } from "../../components/Dropdown";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";
import Logout from "../../components/Logout";

function HeaderUserButton(dropdownContextValue: DropdownContextType) {
  const { currentUser } = useGetCurrentUser();
  //take first word of name, maximum 20 characters
  const nameFirstWord = currentUser?.name.split(" ")[0].slice(0, 20);
  const { isOpen, toggleIsOpen } = dropdownContextValue;
  return (
    <Link to="/user/settings">
      <div
        style={{ backgroundColor: isOpen ? "grey" : undefined }}
        onClick={toggleIsOpen}
      >
        <img
          src={createImageUrl(currentUser?.avatar ?? "defaultAvatar.webp", {
            height: 30,
          })}
          alt=""
        />
        {nameFirstWord}
      </div>
    </Link>
  );
}

function HeaderUserBody() {
  return (
    <ul>
      <li>
        <Link to="/user/settings">Setting</Link>
      </li>
      <li>
        <Logout>Logout</Logout>
      </li>
    </ul>
  );
}

function HeaderUser() {
  return (
    <Dropdown>
      <Dropdown.Button body={HeaderUserButton} />
      <Dropdown.Content>
        <HeaderUserBody />
      </Dropdown.Content>
    </Dropdown>
  );
}

export default HeaderUser;

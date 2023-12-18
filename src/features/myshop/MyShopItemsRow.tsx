import { createImageUrl } from "../../api/image";
import { ShopItemRowType } from "../../type/shopType";
import Menus, { useMenus } from "../../components/Menus";
import useDeleteItem from "../../hooks/item/useDeleteItem";
import toast from "react-hot-toast";
import Modal, { useModal } from "../../components/Modal";
import ItemForm from "./ItemForm";
import UpdateItemForm from "./UpdateItemForm";

function DeleteConfirmationWindow({ item }: { item: ShopItemRowType }) {
  const { id, name } = item;
  const truncatedName = name.length > 20 ? name.slice(0, 20) + "..." : name;
  const { isLoading, error, deleteItem } = useDeleteItem(id);
  const { close } = useModal();
  function handleDelete() {
    const deletePromise = deleteItem();
    toast.promise(deletePromise, {
      loading: "Deleting item",
      success: () => {
        close();
        return "Item successfully deleted";
      },
      error: "Failed deleting item",
    });
  }
  return (
    <>
      <p>Are you sure you want to delete {truncatedName} ?</p>
      <button onClick={handleDelete} disabled={isLoading}>
        Delete
      </button>
    </>
  );
}

function ItemRowAction({ item }: { item: ShopItemRowType }) {
  const { id } = item;
  const { close } = useMenus();

  return (
    <>
      <Menus.Open id={id}>
        <p>action</p>
      </Menus.Open>
      <Menus.Content id={id}>
        <ul onClick={close}>
          <li>
            <Modal.Open id={id + "update"}>
              <button>Edit</button>
            </Modal.Open>
          </li>
          <li>
            <Modal.Open id={id + "delete"}>
              <button>Delete</button>
            </Modal.Open>
          </li>
        </ul>
      </Menus.Content>
    </>
  );
}

function MyShopItemsRow({ item }: { item: ShopItemRowType }) {
  const { id, name, price, quantity, image } = item;
  return (
    <div>
      <img src={createImageUrl(image ?? "image-not-found.webp")} alt="" />
      <p>{name}</p>
      <p>{price}</p>
      <p>{quantity}</p>
      <ItemRowAction item={item} />
      <Modal.Window id={id + "update"}>
        <UpdateItemForm id={id} />
      </Modal.Window>
      <Modal.Window id={id + "delete"}>
        <DeleteConfirmationWindow item={item} />
      </Modal.Window>
    </div>
  );
}

export default MyShopItemsRow;

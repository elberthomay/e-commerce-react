import Modal from "../../components/Modal";
import CreateItemForm from "./CreateItemForm";
import MyshopItemsTable from "./MyshopItemsTable";

function MyShopItems() {
  return (
    <div>
      <h1>shop items</h1>
      <Modal>
        <Modal.Open id="createItem">
          <button>New Item</button>
        </Modal.Open>
        <Modal.Window id="createItem">
          <CreateItemForm />
        </Modal.Window>
      </Modal>
      <MyshopItemsTable />
    </div>
  );
}

export default MyShopItems;

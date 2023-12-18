import { InView, useInView } from "react-intersection-observer";
import { ShopItemRowType } from "../../type/shopType";
import MyShopItemsRow from "./MyShopItemsRow";
import { useEffect } from "react";
import Menus from "../../components/Menus";
import Modal from "../../components/Modal";

function MyShopItemsList({
  shopItem,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: {
  shopItem: ShopItemRowType[];
  fetchNextPage: () => any;
  hasNextPage: boolean;
  isFetching: boolean;
}) {
  console.log(shopItem);

  return (
    <div>
      <Menus>
        <Modal>
          {shopItem.map((item) => (
            <MyShopItemsRow key={item.id} item={item} />
          ))}
        </Modal>
      </Menus>
      {shopItem.length > 0 && (
        <InView
          onChange={(inView, entry) =>
            inView && hasNextPage && !isFetching ? fetchNextPage() : null
          }
        >
          <div>{isFetching ? <p>Loading...</p> : null}</div>
        </InView>
      )}
    </div>
  );
}

export default MyShopItemsList;

import { ItemRowType } from "./itemType";

export interface ShopGetOutputType {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CurrentShopGetOutputType = ShopGetOutputType;

export interface GetShopItemOptions {
  search?: string;
  shopId: string;
  limit?: number;
  page?: number;
  orderBy?: string;
}

export type ShopItemRowType = Omit<ItemRowType, "shopId" | "shopName">;

export interface ShopGetItemType {
  count: number;
  rows: ShopItemRowType[];
}

export type ShopUpdateType = {
  name?: string;
};

import { ItemRowType } from "./itemType";

export interface ShopGetOutputType {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CurrentShopGetOutputType =
  | ShopGetOutputType
  | Record<string, never>;

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

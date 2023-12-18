export interface ItemGetType {
  count: number;
  rows: ItemRowType[];
}

export interface ItemUpdateType {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface ItemRowType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  shopId: string;
  shopName: string;
}

export interface ItemCreateType {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ItemDetailsOutputType {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  shopId: string;
  shopName: string;
  tags: { id: number; name: string }[];
  images: { imageName: string; order: number }[];
}

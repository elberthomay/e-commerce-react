export interface cartOutputType {
  inventory: number;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  selected: boolean;
  shopId: string;
  shopName: string;
}

export type cartUpdateType = { quantity: number } | { selected: boolean };

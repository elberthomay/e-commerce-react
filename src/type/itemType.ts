export interface itemGetType {
  count: number;
  rows: itemRowType[];
}

export interface itemRowType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  shopId: string;
  shopName: string;
}

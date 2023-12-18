import { RequestError } from "../error/RequestError";
import { BASE_API_URL, DEFAULT_CLIENT_LIMIT } from "../helper/constant";
import {
  CurrentShopGetOutputType,
  GetShopItemOptions,
  ShopGetItemType,
  ShopGetOutputType,
} from "../type/shopType";

const BASE_URL = BASE_API_URL + "shop/";

export async function getShop(shopId: string): Promise<ShopGetOutputType> {
  const url = BASE_URL + shopId;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getCurrentShop(): Promise<CurrentShopGetOutputType> {
  const url = BASE_URL + "myShop";
  const response = await fetch(url, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getShopItems(
  options?: GetShopItemOptions
): Promise<ShopGetItemType> {
  const { search, shopId, limit, page, orderBy } = options ?? {};
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (orderBy) queryParams.append("orderBy", orderBy);
  queryParams.append(
    "limit",
    limit ? limit.toString() : DEFAULT_CLIENT_LIMIT.toString()
  );
  if (page) queryParams.append("page", page.toString());

  const url = BASE_URL + `${shopId}/item?${queryParams.toString()}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function checkShopName(
  shopName: string
): Promise<{ exist: boolean }> {
  const url = BASE_URL + `checkName/${shopName}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function activateShop(shopData: {
  name: string;
  description: string;
}): Promise<ShopGetOutputType> {
  console.log(shopData);
  const url = BASE_URL;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shopData),
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

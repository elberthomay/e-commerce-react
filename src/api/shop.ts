import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";

export async function getShop(shopId: string) {
  const url = BASE_API_URL + `shop/${shopId}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getShopItems(
  shopId: string,
  limit: number,
  page: number
) {
  const url = BASE_API_URL + `shop/${shopId}/item`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

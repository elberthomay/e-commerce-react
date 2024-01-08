import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import { cartOutputType } from "../type/cartType";

export async function getCart(): Promise<cartOutputType[]> {
  const url = BASE_API_URL + "cart/";
  const response = await fetch(url, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function createCart(cartData: {
  itemId: string;
  quantity: number;
}) {
  const url = BASE_API_URL + "cart/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(cartData),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function updateCart(cartData: {
  itemId: string;
  quantity?: number;
  selected?: boolean;
}) {
  const url = BASE_API_URL + "cart/";
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(cartData),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function deleteCart(cartData: { itemId: string }) {
  const url = BASE_API_URL + "cart/";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(cartData),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

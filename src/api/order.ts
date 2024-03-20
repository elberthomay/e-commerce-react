import {
  getOrderDetailOutputSchema,
  getOrdersOutputSchema,
  getOrdersQuery,
  orderItemOutputSchema,
} from "@elycommerce/common";
import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import { z } from "zod";

const API_URL = new URL("order/", BASE_API_URL).toString();

async function getOrders(
  type: "shop" | "user",
  id: string,
  queryData: Partial<Record<keyof z.infer<typeof getOrdersQuery>, string>>
): Promise<z.infer<typeof getOrdersOutputSchema>> {
  const url = API_URL + `${type}/${id}`;

  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(queryData)) {
    if (value !== undefined) queryParams.append(key, value);
  }

  const response = await fetch(`${url}?${queryParams.toString()}`, {
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export const getUserOrders = (
  userId: string,
  queryData: Partial<Record<keyof z.infer<typeof getOrdersQuery>, string>>
) => getOrders("user", userId, queryData);

export const getShopOrders = (
  shopId: string,
  queryData: Partial<Record<keyof z.infer<typeof getOrdersQuery>, string>>
) => getOrders("shop", shopId, queryData);

export async function getOrderItem(
  orderId: string,
  itemId: string
): Promise<z.infer<typeof orderItemOutputSchema>> {
  const url = API_URL + `${orderId}/item/${itemId}`;

  const response = await fetch(url, {
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getOrderDetail(
  orderId: string
): Promise<z.infer<typeof getOrderDetailOutputSchema>> {
  const url = API_URL + orderId;

  const response = await fetch(url, {
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function processOrder(): Promise<
  z.infer<typeof getOrdersOutputSchema>
> {
  const url = API_URL + "process";

  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function deliverOrder(
  orderId: string
): Promise<z.infer<typeof getOrdersOutputSchema>[number]> {
  const url = API_URL + `${orderId}/deliver`;

  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function confirmOrder(
  orderId: string
): Promise<z.infer<typeof getOrdersOutputSchema>[number]> {
  const url = API_URL + `${orderId}/confirm`;

  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function cancelOrder(
  orderId: string
): Promise<z.infer<typeof getOrdersOutputSchema>[number]> {
  const url = API_URL + `${orderId}/cancel`;

  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

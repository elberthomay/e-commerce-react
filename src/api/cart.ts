import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import { z } from "zod";
import {
  cartCreateSchema,
  cartDeleteSchema,
  cartOutputListSchema,
  cartUpdateSchema,
} from "@elycommerce/common";

export async function getCart(): Promise<z.infer<typeof cartOutputListSchema>> {
  const url = BASE_API_URL + "cart/";
  const response = await fetch(url, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function createCart(cartData: z.input<typeof cartCreateSchema>) {
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

export async function updateCart(cartData: z.input<typeof cartUpdateSchema>) {
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

export async function deleteCart(cartData: z.input<typeof cartDeleteSchema>) {
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

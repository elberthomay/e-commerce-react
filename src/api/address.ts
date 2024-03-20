import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import {
  addressCreateSchema,
  addressOutputArraySchema,
  addressOutputSchema,
  addressUpdateSchema,
} from "@elycommerce/common";
import { z } from "zod";

const BASE_URL = BASE_API_URL + "address/";

const getAddresses =
  (type: "shop" | "user") =>
  async (): Promise<z.infer<typeof addressOutputArraySchema>> => {
    const url = BASE_URL + type;

    const response = await fetch(url, { credentials: "include" });
    const body = await response.json();

    if (response.ok) return body;
    else throw new RequestError(response.status, body);
  };

export async function getUserAddresses() {
  return await getAddresses("user")();
}

export async function getShopAddresses() {
  return await getAddresses("shop")();
}

const createAddress =
  (type: "shop" | "user") =>
  async (
    addressData: z.infer<typeof addressCreateSchema>
  ): Promise<z.infer<typeof addressOutputSchema>> => {
    const url = BASE_URL + type;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(addressData),
    });
    const body = await response.json();

    if (response.ok) return body;
    else throw new RequestError(response.status, body);
  };

export async function createUserAddress(
  addressData: z.infer<typeof addressCreateSchema>
): Promise<z.infer<typeof addressOutputSchema>> {
  return await createAddress("user")(addressData);
}

export async function createShopAddress(
  addressData: z.infer<typeof addressCreateSchema>
): Promise<z.infer<typeof addressOutputSchema>> {
  return await createAddress("shop")(addressData);
}

export async function updateAddress(
  addressId: string,
  updateData: z.infer<typeof addressUpdateSchema>
): Promise<z.infer<typeof addressOutputSchema>> {
  const url = BASE_URL + addressId;

  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updateData),
  });
  const body = await response.json();

  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function deleteAddress(
  addressId: string
): Promise<{ status: "success" }> {
  const url = BASE_URL + addressId;

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  const body = await response.json();

  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function selectAddress(
  addressId: string
): Promise<{ status: "success" }> {
  const url = BASE_URL + "select/" + addressId;

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  const body = await response.json();

  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function toggleAddress(
  addressId: string
): Promise<{ status: "success" }> {
  const url = BASE_URL + "toggle/" + addressId;

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
  });
  const body = await response.json();

  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

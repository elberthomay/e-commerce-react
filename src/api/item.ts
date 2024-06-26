import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import {
  itemCreateSchema,
  itemDetailsOutputSchema,
  itemGetOutputSchema,
  itemUpdateSchema,
} from "@elycommerce/common";
import { z } from "zod";

const API_URL = new URL("item/", BASE_API_URL).toString();

export async function getItems({
  search,
  orderBy,
  limit,
  page,
}: {
  search?: string | null;
  orderBy?: string | null;
  limit?: number | null;
  page?: number | null;

  tags?: number[];
}): Promise<z.infer<typeof itemGetOutputSchema>> {
  const url = API_URL;
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (orderBy) queryParams.append("orderBy", orderBy);
  queryParams.append("limit", limit ? limit.toString() : "40");
  if (page) queryParams.append("page", page.toString());

  const response = await fetch(`${url}?${queryParams.toString()}`);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getItem(
  itemId: string
): Promise<z.infer<typeof itemDetailsOutputSchema>> {
  const url = new URL(`${itemId}/`, API_URL).toString();
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function updateItem(
  itemId: string,
  {
    updateData,
    newImages,
  }: { updateData: z.infer<typeof itemUpdateSchema>; newImages?: Blob[] }
): Promise<z.infer<typeof itemDetailsOutputSchema>> {
  const url = new URL(`${itemId}/`, API_URL).toString();
  let body: string | FormData;
  if (newImages) {
    body = new FormData();
    body.append("body", JSON.stringify(updateData));
    for (const image of newImages) body.append("images", image);
  } else body = JSON.stringify(updateData);
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: newImages
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body,
  });
  const responseBody = await response.json();
  if (response.ok) return responseBody;
  else throw new RequestError(response.status, responseBody);
}

export async function deleteItem(
  itemId: string
): Promise<{ status: "success" }> {
  const url = new URL(`${itemId}/`, API_URL).toString();
  const response = await fetch(url, {
    method: "delete",
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function createItem({
  itemData,
  images,
}: {
  itemData: z.input<typeof itemCreateSchema>;
  images: Blob[];
}): Promise<z.infer<typeof itemDetailsOutputSchema>> {
  const url = API_URL;
  const formData = new FormData();
  formData.append("body", JSON.stringify(itemData));
  for (const image of images) formData.append("images", image);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function addItemImage(
  itemId: string,
  images: Blob[]
): Promise<{ status: "success" }> {
  const url = new URL(`${itemId}/images/`, API_URL).toString();
  const formData = new FormData();
  for (const image of images) formData.append("images", image);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function reorderItemImage(
  itemId: string,
  order: number[]
): Promise<{ status: "success" }> {
  const url = new URL(`${itemId}/images/`, API_URL).toString();

  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function deleteItemImage(
  itemId: string,
  indexes: number[]
): Promise<{ status: "success" }> {
  const url = new URL(`${itemId}/images/`, API_URL).toString();

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(indexes),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

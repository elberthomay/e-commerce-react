import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";
import {
  ItemCreateType,
  ItemDetailsOutputType,
  ItemGetType,
  ItemUpdateType,
} from "../type/itemType";

const API_URL = BASE_API_URL + "item/";

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
}): Promise<ItemGetType> {
  const url = API_URL;
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search);
  if (orderBy) queryParams.append("orderBy", orderBy);
  queryParams.append("limit", limit ? limit.toString() : "40");
  if (page) queryParams.append("page", page.toString());

  const response = await fetch(`${url}?${queryParams.toString()}`);
  const body = await response.json();
  console.log(body);
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getItem(itemId: string): Promise<ItemDetailsOutputType> {
  const url = API_URL + `${itemId}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function updateItem(
  itemId: string,
  updateData: ItemUpdateType
): Promise<ItemDetailsOutputType> {
  const url = API_URL + `${itemId}`;
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function deleteItem(
  itemId: string
): Promise<{ status: "success" }> {
  const url = API_URL + `${itemId}`;
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
  itemData: ItemCreateType;
  images: Blob[];
}): Promise<ItemDetailsOutputType> {
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
  const url = `${API_URL}${itemId}/images`;
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
  const url = `${API_URL}${itemId}/images`;

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
  const url = `${API_URL}${itemId}/images`;

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

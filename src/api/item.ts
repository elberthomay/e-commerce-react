import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";
import { itemGetType } from "../type/itemType";

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
}): Promise<itemGetType> {
  const url = BASE_API_URL + "item";
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

export async function getItem(itemId: string) {
  const url = BASE_API_URL + `item/${itemId}`;
  const response = await fetch(url);
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

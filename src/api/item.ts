import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";
import { itemGetType } from "../type/itemType";

export async function getItems(
  limit: number,
  page: number,
  tags: number[]
): Promise<itemGetType> {
  const url = BASE_API_URL + "item";
  const response = await fetch(
    `${url}?${new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    })}`
  );
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

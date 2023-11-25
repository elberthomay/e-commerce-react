import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";

export async function login(loginData: {
  email: string;
  password: string;
}): Promise<{ status: "success" }> {
  const url = BASE_API_URL + "user/login";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include",
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function signup(userData: {
  email: string;
  name: string;
  password: string;
}): Promise<{ status: "success"; email: string }> {
  const url = BASE_API_URL + "user/register";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function getCurrentUser() {
  const url = BASE_API_URL + "user/";
  const response = await fetch(url, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function logout(): Promise<{ status: "success" }> {
  const url = BASE_API_URL + "user/logout/";
  const response = await fetch(url, { method: "POST", credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

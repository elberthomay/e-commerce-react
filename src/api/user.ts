import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../helper/constant";
import { CurrentUserOutputType, UserUpdateType } from "../type/userType";

const API_URL = BASE_API_URL + "user/";

export async function login(loginData: {
  email: string;
  password: string;
}): Promise<{ status: "success" }> {
  const url = API_URL + "login/password";
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
  const url = API_URL + "register";
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

export async function getCurrentUser(): Promise<CurrentUserOutputType> {
  const response = await fetch(API_URL, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function changeUserAvatar(
  image: Blob
): Promise<{ status: "success" }> {
  const url = API_URL + "avatar";
  const formData = new FormData();
  formData.append("images", image);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function updateCurrentUser(updateData: UserUpdateType) {
  const url = API_URL;

  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(updateData),
    headers: {
      "Content-Type": "application/json",
    },
  });

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

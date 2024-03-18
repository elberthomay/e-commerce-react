import { RequestError } from "../error/RequestError";
import { BASE_API_URL } from "../variables/constant";
import {
  currentUserOutputSchema,
  loginSchema,
  registerSchema,
  userUpdateSchema,
} from "@elycommerce/common";
import { z } from "zod";

const API_URL = new URL("user/", BASE_API_URL).toString();

export async function login(
  loginData: z.input<typeof loginSchema>
): Promise<{ status: "success" }> {
  const url = new URL("login/password", API_URL).toString();
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

export async function signup(
  userData: z.input<typeof registerSchema>
): Promise<{ status: "success"; email: string }> {
  const url = new URL("register/", API_URL).toString();
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

export async function getCurrentUser(): Promise<
  z.infer<typeof currentUserOutputSchema>
> {
  const response = await fetch(API_URL, { credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

export async function changeUserAvatar(
  image: Blob
): Promise<{ status: "success" }> {
  const url = new URL("avatar/", API_URL).toString();
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

export async function updateCurrentUser(
  updateData: z.input<typeof userUpdateSchema>
) {
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
  const url = new URL("logout/", API_URL);
  const response = await fetch(url, { method: "POST", credentials: "include" });
  const body = await response.json();
  if (response.ok) return body;
  else throw new RequestError(response.status, body);
}

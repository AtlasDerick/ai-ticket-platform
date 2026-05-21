import api from "./api";
import { removeAuthToken, saveAuthToken } from "./tokenService";

export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  const token = response.data?.access_token;

  if (!token) {
    throw new Error("Login succeeded, but no token was returned.");
  }

  saveAuthToken(token);

  return token;
}

export function logout() {
  removeAuthToken();
}

import { apiRequest } from "./api";

export async function loginUser(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function saveToken(token) {
  localStorage.setItem("auth_token", token);
}

export function logout() {
  localStorage.removeItem("auth_token");
  window.location.href = "/login";
}

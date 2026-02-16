const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5001";

export async function apiRequest(path, options = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

async function request(url, options) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authClient = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),
};

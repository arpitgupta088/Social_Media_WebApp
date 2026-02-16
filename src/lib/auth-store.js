const KEY = "hyprr-user"

export function saveUser(user) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(user))
}

export function getUser() {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
}

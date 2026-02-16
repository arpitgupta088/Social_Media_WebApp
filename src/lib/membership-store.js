const KEY = "hyprr_memberships"

export function isMember(username) {
  if (typeof window === "undefined") return false
  const raw = localStorage.getItem(KEY)
  const data = raw ? JSON.parse(raw) : []
  return data.includes(username)
}

export function joinMembership(username) {
  const raw = localStorage.getItem(KEY)
  const data = raw ? JSON.parse(raw) : []

  if (!data.includes(username)) {
    data.push(username)
    localStorage.setItem(KEY, JSON.stringify(data))
  }

  return true
}

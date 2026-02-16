export function getFollowedUsers() {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("followedUsers") || "[]")
}

export function isFollowing(username) {
  return getFollowedUsers().includes(username)
}

export function toggleFollow(username) {
  const list = getFollowedUsers()

  let updated
  if (list.includes(username)) {
    updated = list.filter((u) => u !== username)
  } else {
    updated = [...list, username]
  }

  localStorage.setItem("followedUsers", JSON.stringify(updated))
  return updated.includes(username)
}

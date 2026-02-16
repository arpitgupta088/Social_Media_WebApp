// src/services/search.service.js

let controller

export async function smartSearch(query) {
  if (!query || query.length < 2) return []

  try {
    // cancel previous request
    if (controller) controller.abort()
    controller = new AbortController()

    const res = await fetch(
      `http://localhost:5001/api/users/search?q=${encodeURIComponent(query)}&page=1&limit=20`,
      {
        method: "GET",
        signal: controller.signal,
      }
    )

    if (!res.ok) return []

    const data = await res.json()

    let results = []

    // USERS
    if (data.users) {
      results.push(
        ...data.users.map((u) => ({
          id: u.id,
          type: "user",
          username: u.username,
          name: u.name,
          avatar: u.avatar,
          verified: u.is_verified,
          followers: u._count?.followers || 0,
        }))
      )
    }

    // NODES (reels)
    if (data.nodes) {
      results.push(
        ...data.nodes.map((n) => ({
          id: n.id,
          type: "node",
          username: n.title,
          avatar: n.thumbnail,
        }))
      )
    }

    // HASHTAGS
    if (data.hashtags) {
      results.push(
        ...data.hashtags.map((t) => ({
          id: t,
          type: "tag",
          username: "#" + t,
        }))
      )
    }

    return results
  } catch {
    return []
  }
}

// FOLLOW USER
export async function followUser(userId) {
  try {
    const res = await fetch(`/api/follow/${userId}`, {
      method: "POST"
    })

    if (!res.ok) throw new Error("API error")

    return await res.json()
  } catch {
    // fallback
    return { success: true, demo: true }
  }
}


// UNFOLLOW USER
export async function unfollowUser(userId) {
  try {
    const res = await fetch(`/api/follow/${userId}`, {
      method: "DELETE"
    })

    if (!res.ok) throw new Error("API error")

    return await res.json()
  } catch {
    return { success: true, demo: true }
  }
}


// FOLLOW STATUS
export async function getFollowStatus(userId) {
  try {
    const res = await fetch(`/api/follow/${userId}/status`)
    if (!res.ok) throw new Error("API error")

    const data = await res.json()

    // backend kabhi {following:true} deta
    // kabhi {isFollowing:true}
    return data.following ?? data.isFollowing ?? false
  } catch {
    // fallback demo
    return false
  }
}


// FOLLOWERS LIST
export async function getFollowers(userId) {
  try {
    const res = await fetch(`/api/follow/${userId}/followers`)
    if (!res.ok) throw new Error("API error")

    const data = await res.json()
    return data.users || []
  } catch {
    // demo fallback
    return [
      { username: "rohit", name: "Rohit Sharma" },
      { username: "mohit", name: "Mohit" },
      { username: "vaish", name: "Vaishnavi" }
    ]
  }
}


// FOLLOWING LIST
export async function getFollowing(userId) {
  try {
    const res = await fetch(`/api/follow/${userId}/following`)
    if (!res.ok) throw new Error("API error")

    const data = await res.json()
    return data.users || []
  } catch {
    return [
      { username: "aman", name: "Aman" },
      { username: "rahul", name: "Rahul" }
    ]
  }
}

import { getCreatedPosts } from "@hyprr/lib/post-store"

// Filter + sort engine for profile feed
export async function getProfileMedia(username, filter = "latest") {
  await new Promise((r) => setTimeout(r, 300))

  const all = getCreatedPosts()

  // Only this user's posts
  let posts = all.filter(p => p.username === username)

  // Normalize missing fields
  posts = posts.map(p => ({
    visibility: "public",
    createdAt: new Date().toISOString(),
    ...p
  }))

  // Membership filter
  if (filter === "membership") {
    posts = posts.filter(p => p.visibility === "membership")
  }

  // Public filter
  if (filter === "public") {
    posts = posts.filter(p => p.visibility === "public")
  }

  // Latest = sort by time
  if (filter === "latest") {
    posts = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }

  return posts
}

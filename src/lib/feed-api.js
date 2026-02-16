import { getFeedMedia } from "@hyprr/lib/media-store"

const PAGE_SIZE = 3

export async function getFeedPosts(page = 1) {
  await new Promise((res) => setTimeout(res, 300))

  const all = getFeedMedia()

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  return {
    posts: all.slice(start, end),
    hasMore: end < all.length
  }
}

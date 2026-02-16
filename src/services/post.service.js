
// GET POSTS BY USERNAME
export async function getPostsByUsername(username) {
  try {
    const res = await fetch(`/api/posts/user/${username}`)

    if (!res.ok) throw new Error("API not ready")

    const data = await res.json()

    return data.posts || data || []
  } catch {
    // DEMO FALLBACK
    return [
      {
        id: "1",
        mediaUrl: "https://picsum.photos/400",
        mediaType: "image",
        isReel: false
      },
      {
        id: "2",
        mediaUrl: "https://picsum.photos/401",
        mediaType: "image",
        isReel: true
      },
      {
        id: "3",
        mediaUrl: "https://picsum.photos/402",
        mediaType: "image",
        isReel: false
      }
    ]
  }
}

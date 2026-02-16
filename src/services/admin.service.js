const BASE = "http://localhost:5001/api"

export async function hidePost(postId) {
  const token = localStorage.getItem("token")

  await fetch(`${BASE}/admin/posts/${postId}/hide`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function unhidePost(postId) {
  const token = localStorage.getItem("token")

  await fetch(`${BASE}/admin/posts/${postId}/unhide`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

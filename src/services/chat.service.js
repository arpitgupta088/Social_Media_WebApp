const BASE = "http://localhost:5001/api"

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

// ---------------- SAFE FETCH ----------------
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error("API_FAIL")
    return await res.json()
  } catch {
    return null
  }
}

// 📥 conversations
export async function getConversations() {
  const token = getToken()

  const data = await safeFetch(`${BASE}/chat/conversations`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return data?.conversations || null
}

// 💬 thread
export async function getMessages(otherUserId) {
  const token = getToken()

  const data = await safeFetch(
    `${BASE}/chat/conversation/${otherUserId}?page=1&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return data?.messages || null
}

// 📤 send
export async function sendMessage(receiverId, content) {
  const token = getToken()

  const data = await safeFetch(`${BASE}/chat/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ receiverId, content })
  })

  return data?.data || null
}

// 👁 mark read
export async function markConversationRead(otherUserId) {
  const token = getToken()

  await safeFetch(`${BASE}/chat/conversation/${otherUserId}/read`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  })
}

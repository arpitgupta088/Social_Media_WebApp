const BASE = "http://localhost:5001/api"

export async function getReportReasons() {
  const res = await fetch(`${BASE}/reports/reasons`, {
    headers: { "Content-Type": "application/json" }
  })

  if (!res.ok) return []

  const data = await res.json()
  return data.reasons || []
}

export async function submitReport({ reason, postId, userId }) {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("LOGIN_REQUIRED")
  }

  const body = { reason }

  if (postId) body.reportedPostId = postId
  if (userId) body.reportedUserId = userId

  const res = await fetch(`${BASE}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Report failed")
  }

  return await res.json()
}


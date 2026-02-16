import { saveUser } from "../lib/auth-store"

const BASE = "http://localhost:5001/api"

export async function updateProfile(updatedUser) {
  try {
    const res = await fetch(`${BASE}/profile/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    })

    if (!res.ok) throw new Error("API not ready")

    const data = await res.json()

    saveUser(data.user)
    return data.user

  } catch (err) {
    console.log("Using local fallback save")

    saveUser(updatedUser)
    return updatedUser
  }
}

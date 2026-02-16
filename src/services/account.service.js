const BASE = "http://localhost:5001/api"

/* 
   CREATOR REQUEST
 */
export async function requestCreator() {
  try {
    const res = await fetch(`${BASE}/users/request-creator`, {
      method: "POST"
    })
    return await res.json()
  } catch {
    return { success: true, status: "pending" } // demo fallback
  }
}

/* 
   BLOCKED USERS LIST
 */
export async function getBlockedUsers() {
  try {
    const res = await fetch(`${BASE}/account/blocked`)
    const data = await res.json()
    return data.users || []
  } catch {
    return [
      { username: "mohit" },
      { username: "rohit" }
    ]
  }
}

/* 
   BLOCK USER
 */
export async function blockUser(username) {
  try {
    const res = await fetch(`${BASE}/users/block/${username}`, {
      method: "POST"
    })
    return await res.json()
  } catch {
    return { message: "User blocked (demo)" }
  }
}

/* 
   UNBLOCK USER
 */
export async function unblockUser(username) {
  try {
    const res = await fetch(`${BASE}/users/unblock/${username}`, {
      method: "POST"
    })
    return await res.json()
  } catch {
    return { message: "User unblocked (demo)" }
  }
}

/* 
   DEACTIVATE ACCOUNT
 */
export async function deactivateAccount() {
  try {
    const res = await fetch(`${BASE}/users/deactivate`, {
      method: "POST"
    })
    return await res.json()
  } catch {
    return { message: "Account deactivated (demo)" }
  }
}


//    ACTIVATE ACCOUNT
export async function activateAccount() {
  try {
    const res = await fetch(`${BASE}/users/activate`, {
      method: "POST"
    })
    return await res.json()
  } catch {
    return { message: "Account activated (demo)" }
  }
}

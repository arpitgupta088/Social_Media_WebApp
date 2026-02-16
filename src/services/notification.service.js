// GET ALL NOTIFICATIONS
export async function getNotifications(page = 1, limit = 20) {
  try {
    const res = await fetch(`/api/notifications?page=${page}&limit=${limit}`)
    const data = await res.json()
    return data
  } catch {
    // DEMO FALLBACK
    return {
      notifications: [
        {
          id: "1",
          type: "FOLLOW",
          message: "rohit started following you",
          isRead: false,
          sender: {
            username: "rohit",
            name: "Rohit",
            avatar: ""
          },
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          type: "LIKE",
          message: "mohit liked your post",
          isRead: true,
          sender: {
            username: "mohit",
            name: "Mohit",
            avatar: ""
          },
          created_at: new Date().toISOString()
        },
        {
          id: "3",
          type: "COMMENT",
          message: "neha commented: 🔥 Amazing reel",
          isRead: false,
          sender: {
            username: "neha",
            name: "Neha"
          },
          created_at: new Date().toISOString()
        }
      ],
      unreadCount: 2,
      pagination: { page: 1, totalPages: 1 }
    }
  }
}

// UNREAD COUNT
export async function getUnreadCount() {
  try {
    const res = await fetch(`/api/notifications/unread-count`)
    const data = await res.json()
    return data.unreadCount || 0
  } catch {
    return 2
  }
}

// MARK ONE READ
export async function markAsRead(id) {
  try {
    await fetch(`/api/notifications/${id}/read`, { method: "PUT" })
  } catch {}
}

// MARK ALL READ
export async function markAllRead() {
  try {
    await fetch(`/api/notifications/mark-all-read`, { method: "PUT" })
  } catch {}
}

// DELETE
export async function deleteNotification(id) {
  try {
    await fetch(`/api/notifications/${id}`, { method: "DELETE" })
  } catch {}
}

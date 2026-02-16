// ---------------- DEMO DATA (UNCHANGED) ----------------
export const getInbox = async (currentUser) => {
  return [
    {
      username: "aryan_gupta",
      name: "Aryan Gupta",
      lastMessage: "Bhai assignment bhej de",
      time: "1h",
      unread: true,
      avatar: "A"
    },
    {
      username: "sameer_khan",
      name: "Sameer Khan",
      lastMessage: "Reel dekhi?",
      time: "2h",
      unread: false,
      avatar: "S"
    },
    {
      username: "steve",
      name: "Steve",
      lastMessage: "hi there!",
      time: "1h",
      unread: true,
      avatar: "A"
    },
    {
      username: "sameer_khan",
      name: "Sameer Khan",
      lastMessage: "Reel dekhi?",
      time: "2h",
      unread: false,
      avatar: "S"
    },
    {
      username: "aryan_gupta",
      name: "Aryan Gupta",
      lastMessage: "Bhai assignment bhej de",
      time: "1h",
      unread: true,
      avatar: "A"
    },
    {
      username: "xyz",
      name: "X Y Z",
      lastMessage: "Reel dekhi?",
      time: "2h",
      unread: false,
      avatar: "S"
    },
    {
      username: "aryan_gupta",
      name: "Aryan Gupta",
      lastMessage: "Bhai assignment bhej de",
      time: "1h",
      unread: true,
      avatar: "A"
    },
    {
      username: "sameer_khan",
      name: "Sameer Khan",
      lastMessage: "Reel dekhi?",
      time: "2h",
      unread: false,
      avatar: "S"
    }
  ]
}

// ---------------- DEMO THREAD (UNCHANGED) ----------------
export const getThread = async (username) => {
  return [
    {
      id: `${username}-1`,
      from: username,
      text: "Hello 👋",
      time: "10:20"
    },
    {
      id: `${username}-2`,
      from: "me",
      text: "Hi! kya scene?",
      time: "10:21"
    }
  ]
}

// ---------------- DM SHARE SYSTEM (NEW) ----------------
const STORAGE_KEY = "hyprr-dm-shares"

function loadShares() {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveShares(data) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// 🔥 Send Reel/Post as DM
export function sendDMShare({ from, to, post }) {
  const shares = loadShares()

  const payload = {
    id: crypto.randomUUID(),
    type: post.isReel || post.mediaType === "video" ? "reel" : "post",
    from,
    to,
    postId: post.id,
    caption: post.caption,
    mediaUrl: post.mediaUrl,
    time: Date.now()
  }

  shares.push(payload)
  saveShares(shares)

  return payload
}

// 📥 Get shared reels/posts in thread
export function getSharedInThread(username) {
  return loadShares().filter(
    (dm) => dm.to === username || dm.from === username
  )
}

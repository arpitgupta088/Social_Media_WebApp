const STORAGE_KEY = "hyprr_media"

// ---------------- DEMO MEDIA ----------------
const demoMedia = [
  {
    id: "demo1",
    username: "arpit_gupta",
    avatar: "/avatars/avatar1.jpg",
    caption: "Building Hyprr 🚀",
    link: "https://hyprr.app/arpit",
    mediaType: "video",
    mediaUrl: "/posts/post1.jpg",
    isReel: true,
    isStory: false,
    views: 120,
    likes: 73,
    createdAt: Date.now() - 100000
  },
  {
    id: "demo2",
    username: "mohit",
    avatar: "/avatars/avatar2.jpg",
    caption: "Frontend grind 💻",
    link: "",
    mediaType: "image",
    mediaUrl: "https://picsum.photos/500/700?1",
    isReel: false,
    isStory: false,
    views: 50,
    likes: 41,
    createdAt: Date.now() - 200000
  },
  {
    id: "demo3",
    username: "rohit",
    avatar: "/avatars/avatar2.jpg",
    caption: "Frontend grind 💻",
    link: "",
    mediaType: "image",
    mediaUrl: "https://picsum.photos/500/700?1",
    isReel: false,
    isStory: false,
    views: 50,
    likes: 41,
    createdAt: Date.now() - 200000
  },
  {
  id: "demo4",
  username: "harshhh05",
  avatar: "/avatars/avatar2.jpg",
  caption: "New reel drop 🔥",
  mediaType: "image",
  mediaUrl: "https://picsum.photos/500/700?4",
  isReel: false,
  isStory: false,
  views: 90,
  likes: 20,
  createdAt: Date.now() - 50000
}

]

// ---------------- HELPERS ----------------
function load() {
  if (typeof window === "undefined") return demoMedia

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return demoMedia

  try {
    return JSON.parse(raw)
  } catch {
    return demoMedia
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ---------------- API ----------------
export function getAllMedia() {
  return load().sort((a, b) => b.createdAt - a.createdAt)
}

export function getFeedMedia() {
  return getAllMedia().filter(m => !m.isStory)
}

export function getReels() {
  return getAllMedia().filter(m => m.isReel)
}

export function getUserMedia(username) {
  return getAllMedia().filter(m => m.username === username)
}

export function getStories() {
  return getAllMedia().filter(m => m.isStory)
}

export function getReelsBySound(soundId) {
  return getAllMedia().filter(
    m => m.isReel && m.sound === soundId
  )
}

export function addMedia(item) {
  const media = load()

  const newItem = {
  ...item,
  id: crypto.randomUUID(),
  views: 0,
  likes: 0,
  createdAt: Date.now(),
  sound: item.sound || {
    id: "original_" + item.username,
    name: "Original Sound",
    creator: item.username,
    audioUrl: item.mediaUrl
  }
}


  const updated = [newItem, ...media]
  save(updated)

  return newItem
}

// ---------------- SAVED REELS SYSTEM ----------------

const SAVED_KEY = "hyprr_saved_reels"

export function toggleSaveReel(reelId) {
  if (typeof window === "undefined") return false

  const raw = localStorage.getItem(SAVED_KEY)
  const saved = raw ? JSON.parse(raw) : []

  let updated

  if (saved.includes(reelId)) {
    updated = saved.filter(id => id !== reelId)
  } else {
    updated = [...saved, reelId]
  }

  localStorage.setItem(SAVED_KEY, JSON.stringify(updated))
  return updated.includes(reelId)
}

export function getSavedReels() {
  if (typeof window === "undefined") return []

  const raw = localStorage.getItem(SAVED_KEY)
  const savedIds = raw ? JSON.parse(raw) : []

  return getAllMedia().filter(
    m => m.isReel && savedIds.includes(m.id)
  )
}

export function isReelSaved(reelId) {
  if (typeof window === "undefined") return false

  const raw = localStorage.getItem(SAVED_KEY)
  const saved = raw ? JSON.parse(raw) : []

  return saved.includes(reelId)
}

// ---------------- DELETE POST SYSTEM ----------------

export function deleteMedia(postId) {
  if (typeof window === "undefined") return false

  const media = load()
  const updated = media.filter(m => m.id !== postId)

  save(updated)

  
  const rawSaved = localStorage.getItem("hyprr_saved_reels")
  const saved = rawSaved ? JSON.parse(rawSaved) : []
  const cleanSaved = saved.filter(id => id !== postId)
  localStorage.setItem("hyprr_saved_reels", JSON.stringify(cleanSaved))

  return true
}

export function softDeleteMedia(postId) {
  const raw = localStorage.getItem("hyprr_media")
  if (!raw) return null

  const data = JSON.parse(raw)
  const index = data.findIndex(p => p.id === postId)

  if (index === -1) return null

  const [removed] = data.splice(index, 1)
  localStorage.setItem("hyprr_media", JSON.stringify(data))

  return removed
}

export function restoreMedia(post) {
  const raw = localStorage.getItem("hyprr_media")
  const data = raw ? JSON.parse(raw) : []
  data.unshift(post)
  localStorage.setItem("hyprr_media", JSON.stringify(data))
}

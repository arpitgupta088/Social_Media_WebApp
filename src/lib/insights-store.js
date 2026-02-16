const KEY = "hyprr_post_insights"

function getAll() {
  if (typeof window === "undefined") return {}
  return JSON.parse(localStorage.getItem(KEY)) || {}
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

function ensure(postId) {
  const data = getAll()
  if (!data[postId]) {
    data[postId] = {
      views: 0,
      likes: 0,
      comments: 0,
      saves: 0,
      profileVisits: 0
    }
    save(data)
  }
  return data
}

export function trackView(postId) {
  const data = ensure(postId)
  data[postId].views++
  save(data)
}

export function trackLike(postId) {
  const data = ensure(postId)
  data[postId].likes++
  save(data)
}

export function trackComment(postId) {
  const data = ensure(postId)
  data[postId].comments++
  save(data)
}

export function trackSave(postId) {
  const data = ensure(postId)
  data[postId].saves++
  save(data)
}

export function trackProfileVisit(postId) {
  const data = ensure(postId)
  data[postId].profileVisits++
  save(data)
}

export function getInsights(postId) {
  const data = ensure(postId)
  return data[postId]
}

// ---------------- RECENTLY VIEWED ----------------

const RECENT_KEY = "hyprr_recently_viewed"
const MAX_RECENT = 10

export function trackRecent(postId) {
  if (typeof window === "undefined") return

  const raw = localStorage.getItem(RECENT_KEY)
  let recent = raw ? JSON.parse(raw) : []

  // Remove if already exists
  recent = recent.filter(id => id !== postId)

  // Add to top
  recent.unshift(postId)

  // Limit size
  recent = recent.slice(0, MAX_RECENT)

  localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
}

export function getRecentlyViewed() {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(RECENT_KEY)
  return raw ? JSON.parse(raw) : []
}

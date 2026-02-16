const STORAGE_KEY = "hyprr_user_stories"
const VIEWS_KEY = "hyprr_story_views"
const EXPIRY_HOURS = 24

// ---------- HELPERS ----------
function isExpired(story) {
  if (!story.createdAt) return false
  const diff =
    (Date.now() - story.createdAt) / (1000 * 60 * 60)
  return diff >= EXPIRY_HOURS
}

// ---------- GET ----------
export function getUserStories() {
  if (typeof window === "undefined") return []

  let stories =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

  // Auto remove expired stories
  const filtered = stories.filter(
    (story) => !isExpired(story)
  )

  if (filtered.length !== stories.length) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(filtered)
    )
  }

  return filtered
}

// ---------- ADD ----------
export function addUserStory(story) {
  const stories = getUserStories()

  const index = stories.findIndex(
    (s) => s.username === story.username
  )

  const enrichedStory = {
    ...story,
    createdAt: Date.now(),
    filter: story.filter || "None",
    music: story.music || null
  }

  if (index !== -1) {
    // Append new item to existing story
    stories[index].items.unshift(...story.items)
    stories[index].filter = enrichedStory.filter
    stories[index].music = enrichedStory.music
    stories[index].createdAt = Date.now()
  } else {
    stories.unshift(enrichedStory)
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(stories)
  )

  return stories
}

// ---------- CHECK ----------
export function hasUserStory(username) {
  return getUserStories().some(
    (s) => s.username === username
  )
}

// ---------- REMOVE ----------
export function removeUserStory(username) {
  const stories = getUserStories()
  const updated = stories.filter(
    (s) => s.username !== username
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  return updated
}

// ---------- SINGLE ----------
export function getUserStory(username) {
  return getUserStories().find(
    (s) => s.username === username
  )
}

// ---------- VIEWS ----------
export function getStoryViews(id) {
  if (typeof window === "undefined") return 0
  const views =
    JSON.parse(localStorage.getItem(VIEWS_KEY)) || {}
  return views[id] || 0
}

export function addStoryView(id) {
  const views =
    JSON.parse(localStorage.getItem(VIEWS_KEY)) || {}

  views[id] = (views[id] || 0) + 1

  localStorage.setItem(
    VIEWS_KEY,
    JSON.stringify(views)
  )
}

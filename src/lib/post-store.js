// ------------------ STORAGE KEY ------------------
const STORAGE_KEY = "hyprr_created_posts"

// ------------------ LOAD / SAVE ------------------
function loadPosts() {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function savePosts(posts) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

// ------------------ POSTS STORE ------------------
let createdPosts = loadPosts()

export function getCreatedPosts() {
  return createdPosts
}

export function addPost(post) {
  createdPosts = [post, ...createdPosts]
  savePosts(createdPosts)
  return post
}

export function clearPosts() {
  createdPosts = []
  savePosts(createdPosts)
}

// ------------------ LIKES ------------------
const likesStore = new Map()

export function isPostLiked(postId, username) {
  const likes = likesStore.get(postId) || new Set()
  return likes.has(username)
}

export function toggleLike(postId, username) {
  let likes = likesStore.get(postId)

  if (!likes) {
    likes = new Set()
    likesStore.set(postId, likes)
  }

  if (likes.has(username)) {
    likes.delete(username)
  } else {
    likes.add(username)
  }

  return likes.size
}

export function getLikesCount(postId) {
  const likes = likesStore.get(postId)
  return likes ? likes.size : 0
}

// ------------------ COMMENTS ------------------
const commentsStore = new Map()

export function getComments(postId) {
  return commentsStore.get(postId) || []
}

export function addComment(postId, comment) {
  const comments = commentsStore.get(postId) || []
  comments.push(comment)
  commentsStore.set(postId, comments)
  return comments
}

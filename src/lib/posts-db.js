const STORAGE_KEY = "hyprr_posts"

// Default demo posts (tumhara feed-api wala)
const demoPosts = [
  {
    id: 1,
    username: "arpit_gupta",
    avatar: "/avatars/avatar1.jpg",
    caption: "Building Hyprr 🚀",
    likes: 73,
    mediaType: "reel",
    mediaUrl: "/posts/post1.jpg",
    time: "2 min ago",
  },
  {
    id: 2,
    username: "mohit",
    avatar: "/avatars/avatar2.jpg",
    caption: "Frontend grind ",
    likes: 41,
    mediaType: "image",
    mediaUrl: "https://picsum.photos/500/700?1"
  },
  {
    id: 3,
    username: "Harsh Baghel",
    avatar: "/avatars/avatar2.jpg",
    caption: "Creator world",
    likes: 948,
    mediaType: "reel",
    mediaUrl: "https://picsum.photos/500/700?1",
    time: "2 min ago",
  },
  {
    id: 4,
    username: "badal",
    avatar: "B",
    caption: "Creator life 🎥",
    likes: 98,
    mediaType: "reel",
    mediaUrl: "https://picsum.photos/500/700?1"
  },
  {
    id: 5,
    username: "rahul",
    avatar: "B",
    caption: "Creator world",
    likes: 948,
    mediaType: "reel",
    mediaUrl: "https://picsum.photos/500/700?1",
    time: "2 min ago",
  }
]

// -------- HELPERS --------
function load() {
  if (typeof window === "undefined") return demoPosts

  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : demoPosts
}

function save(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

// -------- API --------
export function getAllPosts() {
  return load()
}

export function addPost(post) {
  const posts = load()
  const updated = [post, ...posts]
  save(updated)
  return post
}

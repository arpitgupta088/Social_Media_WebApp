import { getUserStories } from "./story-store"

// Demo stories (never change)
const demoStories = [
    {
    id: "arpit",
    username: "arpit_gupta",
    avatar: "/avatars/avatar1.jpg",
    items: [
      "/posts/post1.jpg",
      "/posts/post2.jpg"
    ]
  },
  {
    id: "pj",
    username: "pjexplained",
    avatar: "/avatars/avatar2.jpg",
    items: [
      "/posts/post2.jpg"
    ]
  },
  {
    id: "Ishu",
    username: "_ishuu",
    avatar: "/avatars/avatar4.jpg",
    items: [
      "/posts/post4.avif"
    ]
  },
  {
    id: "ayush",
    username: "ayush_sharma",
    avatar: "/avatars/avatar3.jpg",
    items: [
      "/posts/post3.jpg"
    ]
  },
  {
    id: "Ronie",
    username: "01_ronie_sharma",
    avatar: "/avatars/avatar5.jpg",
    items: [
      "/posts/post3.jpg"
    ]
  },
  {
    id: "ayush1",
    username: "01_ayush_sharma",
    avatar: "/avatars/avatar3.jpg",
    items: [
      "/posts/post3.jpg"
    ]
  }
  ]

// Always use function export (Turbopack safe)
export function getStories() {
  const userStories = getUserStories()

  // User stories first, then demo
  return [...userStories, ...demoStories]
}

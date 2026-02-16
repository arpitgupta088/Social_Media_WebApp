const USERS = {
  arpit_gupta: {
    name: "Arpit Gupta",
    avatar: "/avatars/avatar1.jpg", 
    bio: "Building HyPRR 🚀\nFrontend Engineer | Creator",
    stats: { posts: 12, followers: 381, following: 495 },
    highlights: ["Work", "Travel ✈️", "Dev 💻", "Life"],
    membership: true
  },
  mohit: {
    name: "Mohit Dubey",
    avatar: "/avatars/avatar2.jpg",
    bio: "Creator | Travel | Fitness",
    stats: { posts: 21, followers: 210, following: 180 },
    highlights: ["Gym 💪", "Trips", "Reels"],
    membership: true
  },

  harshhh05: {
    name: "Harsh Baghel",
    avatar: "/avatars/avatar2.jpg", 
    bio: "Agra 📍\nWHEN YOU HAVE NOTHING TO LOSE YOU BECOME STRONG 💥",
    stats: { posts: 42, followers: 542, following: 401 },
    highlights: ["Me", "yaar ❤️", "Selfie ✨", "POV"],
    membership: true
  },

  
}

export async function getPublicUser(username) {
  await new Promise((r) => setTimeout(r, 400))

  const user = USERS[username]

  if (!user) {
    return {
      username,
      name: username.replace("_", " "),
      avatar: "/avatars/default.jpg",
      bio: "No bio yet",
      stats: { posts: 0, followers: 0, following: 0 },
      highlights: [],
      posts: [],
      membership: true
    }
  }

  return {
    username,
    ...user,
    posts: Array.from({ length: user.stats.posts }).slice(0, 9).map((_, i) => ({
      id: i,
      image: `/posts/post${(i % 5) + 1}.jpg`,
    })),
  }
}

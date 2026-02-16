const fakeUser = {
  id: "u1",
  name: "Arpit Gupta",
  username: "arpit_gupta",
  bio: "Building HYPRR",
  followers: 381,
  following: 495,
  posts: 15
}

export async function getUserProfile() {
  await new Promise(r => setTimeout(r, 300))
  return fakeUser
}

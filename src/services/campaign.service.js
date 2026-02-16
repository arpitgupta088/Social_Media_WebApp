const campaigns = [
  {
    id: "c1",
    brand: "Red Bull",
    title: "Extreme Sports Reel",
    budget: "₹5,000",
    platform: "Instagram Reels",
    niche: "Fitness / Adventure",
    deadline: "2 Days Left",
    applicants: []
  },
  {
    id: "c2",
    brand: "Boat",
    title: "Lifestyle Product Post",
    budget: "₹3,000",
    platform: "Instagram Post",
    niche: "Tech / Lifestyle",
    deadline: "5 Days Left",
    applicants: []
  }
]

export async function getCampaigns() {
  await new Promise(r => setTimeout(r, 400))
  return campaigns
}

export async function applyToCampaign(id, user) {
  const c = campaigns.find(c => c.id === id)
  if (!c.applicants.includes(user)) {
    c.applicants.push(user)
  }
  return true
}

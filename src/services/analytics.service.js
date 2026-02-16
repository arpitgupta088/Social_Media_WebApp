export async function getCreatorAnalytics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          followers: 1284,
          views: 9821,
          engagement: "6.2%",
          posts: 42
        },
        growth: [
          { day: "Mon", value: 120 },
          { day: "Tue", value: 200 },
          { day: "Wed", value: 310 },
          { day: "Thu", value: 280 },
          { day: "Fri", value: 390 },
          { day: "Sat", value: 420 },
          { day: "Sun", value: 510 }
        ]
      })
    }, 800)
  })
}

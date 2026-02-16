const BASE = "http://localhost:5001/api"

let isLive = false
let viewers = 0

let viewersSubs = new Set()
let chatSubs = new Set()

let postId = null

// CREATE LIVE POST (Go Live)
export async function startLive() {
  try {
    const res = await fetch(`${BASE}/live/create-post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption: "Going live now!" })
    })

    const data = await res.json()

    postId = data?.post?.id
    isLive = true
    viewers = Math.floor(Math.random() * 40) + 5

    notifyViewers()

    return data
  } catch (err) {
    console.error("live start error", err)
  }
}

// END LIVE
export async function stopLive() {
  if (!postId) return

  await fetch(`${BASE}/posts/${postId}/end-stream`, {
    method: "PUT"
  })

  isLive = false
  viewers = 0
  notifyViewers()
}

// STATUS
export function getLiveStatus() {
  return { isLive, viewers }
}

// VIEWERS SUB
export function subscribeViewers(cb) {
  viewersSubs.add(cb)
  return () => viewersSubs.delete(cb)
}

// CHAT 
let chat = []

export function subscribeChat(cb) {
  chatSubs.add(cb)
  return () => chatSubs.delete(cb)
}

export function sendChatMessage(msg) {
  const message = {
    id: Date.now(),
    user: "viewer",
    text: msg
  }
  chat.push(message)
  notifyChat()
}

function notifyViewers() {
  viewersSubs.forEach(cb => cb({ isLive, viewers }))
}

function notifyChat() {
  chatSubs.forEach(cb => cb([...chat]))
}

// fake viewer growth
setInterval(() => {
  if (isLive) {
    viewers += Math.floor(Math.random() * 3)
    notifyViewers()
  }
}, 4000)

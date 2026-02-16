import { io } from "socket.io-client"

let socket = null

export function getSocket() {
  if (socket) return socket

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  socket = io("http://localhost:5000", {
    auth: { token }
  })

  return socket
}

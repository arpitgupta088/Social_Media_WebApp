const KEY = "hyprr_blocked"

export function blockUser(username){
  const raw = localStorage.getItem(KEY)
  const arr = raw ? JSON.parse(raw) : []
  if(!arr.includes(username)){
    arr.push(username)
  }
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function getBlocked(){
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

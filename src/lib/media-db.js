const DB_NAME = "hyprr_media_db"
const STORE = "files"

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE)
    }

    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveMediaFile(id, file) {
  const db = await openDB()
  const tx = db.transaction(STORE, "readwrite")
  tx.objectStore(STORE).put(file, id)

  return new Promise((res, rej) => {
    tx.oncomplete = res
    tx.onerror = rej
  })
}

export async function getMediaFile(id) {
  const db = await openDB()
  const tx = db.transaction(STORE, "readonly")
  const req = tx.objectStore(STORE).get(id)

  return new Promise((res, rej) => {
    req.onsuccess = () => res(req.result)
    req.onerror = () => rej(req.error)
  })
}

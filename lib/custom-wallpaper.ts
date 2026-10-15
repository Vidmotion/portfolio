/** One compressed personal image, kept only in this browser's IndexedDB. */
type SavedWallpaper = { blob: Blob; accent: string }
const DB = 'portfolio-os-personalization'
async function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore('wallpaper')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
async function transaction<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest
): Promise<T> {
  const db = await database()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('wallpaper', mode),
      request = action(tx.objectStore('wallpaper'))
    tx.oncomplete = () => {
      db.close()
      resolve(request.result as T)
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
    tx.onabort = () => {
      db.close()
      reject(tx.error)
    }
  })
}
export async function readCustomWallpaper(): Promise<SavedWallpaper | undefined> {
  const value = await transaction<
    { data?: ArrayBuffer; type?: string; blob?: Blob; accent: string } | undefined
  >('readonly', (s) => s.get('current'))
  if (!value) return undefined
  return {
    blob: value.blob ?? new Blob([value.data!], { type: value.type }),
    accent: value.accent,
  }
}
export async function saveCustomWallpaper(value: SavedWallpaper) {
  // ArrayBuffer also works in WebKit environments that cannot persist Blob data.
  const stored = {
    data: await value.blob.arrayBuffer(),
    type: value.blob.type,
    accent: value.accent,
  }
  return transaction('readwrite', (s) => s.put(stored, 'current'))
}
export const deleteCustomWallpaper = () => transaction('readwrite', (s) => s.delete('current'))

export async function prepareCustomWallpaper(file: File): Promise<SavedWallpaper> {
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type))
    throw Error('format')
  if (file.size > 20 * 1024 * 1024) throw Error('size')
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw Error('decode')
  }
  try {
    if (bitmap.width * bitmap.height > 64000000) throw Error('size')
    const scale = Math.min(1, 2560 / Math.max(bitmap.width, bitmap.height)),
      canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const ctx = canvas.getContext('2d')
    if (!ctx) throw Error('canvas')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    let blob: Blob | null = null
    let format = 'image/webp'
    for (const quality of [0.86, 0.76, 0.64]) {
      blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality))
      // Safari can decode WebP without offering a WebP canvas encoder. Its PNG
      // fallback ignores quality, so explicitly use compressed JPEG instead.
      if (blob && blob.type !== format) {
        format = 'image/jpeg'
        blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality))
      }
      if (blob && blob.size < 700000) break
    }
    if (!blob || blob.size > 1200000) throw Error('size')
    // Extract only a small color sample; the full image is never sent to a server.
    const sample = document.createElement('canvas')
    sample.width = sample.height = 24
    const s = sample.getContext('2d')
    if (!s) throw Error('canvas')
    s.drawImage(canvas, 0, 0, 24, 24)
    const pixels = s.getImageData(0, 0, 24, 24).data
    let best = [35, 77, 131],
      score = 0
    const bins = new Map<string, { count: number; color: number[] }>()
    for (let i = 0; i < pixels.length; i += 4) {
      const c = [pixels[i], pixels[i + 1], pixels[i + 2]],
        max = Math.max(...c),
        min = Math.min(...c),
        sat = (max - min) / 255
      if (sat < 0.18 || max < 45 || min > 215) continue
      const key = c.map((x) => Math.floor(x / 48)).join(',')
      const bin = bins.get(key) ?? { count: 0, color: c }
      bin.count++
      bins.set(key, bin)
      if (bin.count * sat > score) {
        score = bin.count * sat
        best = bin.color
      }
    }
    const accent =
      '#' +
      best
        .map((x) =>
          Math.round(x * 0.65)
            .toString(16)
            .padStart(2, '0')
        )
        .join('')
    return { blob, accent }
  } finally {
    bitmap.close()
  }
}

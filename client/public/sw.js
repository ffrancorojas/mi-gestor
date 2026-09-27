const NAVIGATION_CACHE = 'mi-gestor-navigation-v2'
const STATIC_CACHE = 'mi-gestor-static-v2'
const CURRENT_CACHES = new Set([NAVIGATION_CACHE, STATIC_CACHE])
const APP_SHELL = ['/', '/manifest.webmanifest', '/favicon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(NAVIGATION_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => !CURRENT_CACHES.has(cacheName))
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

const handleNavigation = async (request) => {
  try {
    const response = await fetch(request)

    if (response.ok) {
      const cache = await caches.open(NAVIGATION_CACHE)
      await cache.put('/', response.clone())
    }

    return response
  } catch {
    return (await caches.match(request)) ?? (await caches.match('/')) ?? Response.error()
  }
}

const handleStaticAsset = async (request) => {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) return cachedResponse

  const response = await fetch(request)

  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE)
    await cache.put(request, response.clone())
  }

  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(handleStaticAsset(request))
  }
})

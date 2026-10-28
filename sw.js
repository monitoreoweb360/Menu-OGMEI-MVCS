/* Menú de tableros: actualizaciones de red y respaldo sin conexión. */
const CACHE_NAME = 'tableros-mvcs-v4';
const APP_FILES = [
  './',
  './index.html',
  './css/estilos.css',
  './js/a9.js?v=20261028-3',
  './js/pwa.js',
  './manifest.webmanifest',
  './fonts/aptos-narrow.ttf',
  './img/logo MVCS.png',
  './img/icons/icon-192.png',
  './img/icons/icon-512.png',
  './img/icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_FILES.map(async path => {
      try {
        const response = await fetch(new Request(path, {cache: 'reload'}));
        if (response.ok) await cache.put(path, response);
      } catch (error) {
        // Un recurso no disponible no debe impedir la instalación.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('tableros-mvcs-') && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  // Priorizar siempre la versión publicada; la caché solo sirve sin conexión.
  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const home = await caches.match('./index.html');
        if (home) return home;
      }
      return Response.error();
    }
  })());
});

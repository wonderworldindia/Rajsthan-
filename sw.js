/* AutoSync Studio service worker — app-shell caching and safe cache lifecycle. */
const CACHE_PREFIX = 'autosync-studio-';
const CACHE_NAME = CACHE_PREFIX + 'v2';
const APP_SHELL = ['./','./index.html','./manifest.json','./icons/icon.svg','./js/db.js','./js/sheets-sync.js','./js/speech.js','./js/canvas-fx.js','./js/app.js'];

self.addEventListener('install', event => {
  event.waitUntil((async () => { const cache = await caches.open(CACHE_NAME); await cache.addAll(APP_SHELL); await self.skipWaiting(); })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(req);
        if (response && response.ok) (await caches.open(CACHE_NAME)).put('./index.html', response.clone()).catch(()=>{});
        return response;
      } catch (_) {
        return (await caches.match('./index.html')) || new Response('Offline — app shell unavailable.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response && response.ok && response.type === 'basic') (await caches.open(CACHE_NAME)).put(req,response.clone()).catch(()=>{});
      return response;
    } catch (_) { return new Response('',{status:504,statusText:'Offline'}); }
  })());
});
self.addEventListener('sync', event => {
  if (event.tag === 'sync-sheets-queue') event.waitUntil(
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients => clients.forEach(client => client.postMessage({type:'TRIGGER_SHEETS_SYNC'})))
  );
});
const CACHE_NAME = 'autosync-pwa-v1';
const ASSETS = ['./','./index.html','./manifest.json','./js/db.js','./js/sheets-sync.js','./js/speech.js','./js/canvas-fx.js','./js/app.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});
self.addEventListener('sync',e=>{if(e.tag==='sync-sheets-queue')e.waitUntil(self.clients.matchAll({includeUncontrolled:true}).then(clients=>clients.forEach(client=>client.postMessage({type:'TRIGGER_SHEETS_SYNC'}))));});
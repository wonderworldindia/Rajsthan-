# AutoSync Studio — Modular PWA Architecture

## Structure
- `index.html` — Main UI, offline-first dashboard, JSON export/import, theme & language toggles
- `manifest.json` — PWA manifest
- `sw.js` — Service Worker with asset caching and Background Sync (`sync-sheets-queue`)
- `js/db.js` — IndexedDB persistence (`records` and `sync_queue` stores)
- `js/sheets-sync.js` — Google Sheets API v4 append integration
- `js/speech.js` — Web Speech API narration (`hi-IN` / `en-US`)
- `js/canvas-fx.js` — HTML5 Canvas celebratory particle engine
- `js/app.js` — ES module bootstrapper and Service Worker registration

## Run Locally
Serve over HTTPS or `http://localhost` (required for Service Workers):
```bash
python3 -m http.server 8080
```
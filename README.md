# AutoSync Studio — Modular PWA

An offline-first record workspace with IndexedDB persistence, JSON/CSV export, bilingual UI, speech narration, and optional Google Sheets API integration.

## Project structure

- `index.html` — Main UI and application controller
- `manifest.json` — PWA manifest and app metadata
- `sw.js` — Versioned service worker and offline app-shell caching
- `icons/icon.svg` — PWA icon
- `js/db.js` — IndexedDB helpers (module library)
- `js/sheets-sync.js` — Google Sheets append helper (module library)
- `js/speech.js` — Web Speech helper
- `js/canvas-fx.js` — Canvas celebration helper
- `js/app.js` — Service Worker registration helper
- `backups/original/` — Exact uploaded source files, retained for recovery
- `backups/AutoSync-Studio-Original-Backup.zip` — ZIP of exact uploaded source files

## Run locally

Use HTTPS or localhost (required for Service Workers):

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Important integration notes

- Google Sheets live mode requires a valid short-lived OAuth access token with suitable Sheets permissions. Never commit tokens or store them in source control. For a public production deployment, use a trusted backend/OAuth flow rather than exposing long-lived credentials in browser code.
- Demo mode simulates sync and does not write to a real spreadsheet.
- Background Sync support varies by browser. The app also listens for connectivity restoration while open.
- External CDN assets and Google Fonts require internet access; the local app shell remains cached, but those third-party assets are not bundled.
- If IndexedDB is unavailable, the in-memory fallback is temporary and is not durable across reloads.

## Verification

Run the app over localhost/HTTPS, add a record, export/import JSON, toggle offline/online, and test on a browser that supports Service Workers and Background Sync. Confirm real Sheets writes only with a test spreadsheet and a valid OAuth flow.
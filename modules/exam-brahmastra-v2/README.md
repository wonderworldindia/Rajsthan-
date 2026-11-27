# Wonder World Rajasthan — Exam Brahmastra Test Engine V2

Standalone bilingual mock-test module, isolated from the existing AutoSync Studio app.

## Package contents
The complete candidate bundle contains:
- index.html, styles.css, main.js, engine.js
- questions.json (10 illustrative demo questions)
- tests/engine.test.js and package.json
- QA_REPORT.md and docs/SHARE_GATE_LIMITATIONS.md

## Run locally
Serve this directory over HTTP (ES modules and fetch do not reliably run from file://):
`python3 -m http.server 8080`

## Status
- Unit tests: 11/11 passed
- JavaScript syntax checks: passed
- Static HTTP smoke checks: passed
- Browser / Android Chrome validation: pending
- Question bank: 10 demo questions only; not an official or source-verified bank
- WhatsApp channel follow: user self-confirmation only, not technically verified

This is a standalone candidate module. It is not integrated into the live application. Existing root files, service worker, manifest and database must remain unchanged.

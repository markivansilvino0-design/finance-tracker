# Finance Tracker — Corrected PWA Files

These files are configured specifically for:

https://markivansilvino0-design.github.io/finance-tracker/

## Upload
Replace only:
- manifest.json
- sw.js

Add:
- pwa-register.js
- icons/icon-192.png
- icons/icon-512.png

## Important
Your existing index.html, app.js, styles.css, Code.gs, Google Sheet, and Apps Script URL are not replaced by this package.

If your current index.html does NOT already register sw.js, add this immediately before </body>:

<script src="./pwa-register.js"></script>

Also make sure index.html contains:

<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#1d416f">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

After uploading, wait for GitHub Pages to deploy, then on Android Chrome open the site and use:
Chrome menu ⋮ → Install app / Add to home screen.

If the old version remains, clear the site's cached data once and reload.

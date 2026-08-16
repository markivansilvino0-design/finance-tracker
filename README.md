# Personal Finance Tracker PWA

This is a mobile-first Progressive Web App for:
- Income and expenses
- Bank accounts and e-wallets
- Credit cards and utilization
- Credit-card installments
- Monthly cash-flow reports
- Offline/local browser storage

## Run locally
Serve this folder from a web server (service workers do not work from file://).
For example:
python -m http.server 8000
Then open http://localhost:8000

## Install on Android/iPhone
Deploy the folder to an HTTPS host such as GitHub Pages, Netlify, Vercel, or your own web hosting.
Open the HTTPS URL on the phone and choose Add to Home Screen / Install App.

## Data
The current version stores data in the browser using localStorage. It does not send financial data to a server.
The next upgrade can add Google Sheets synchronization or a secure cloud database.


## Google Sheets sync
See GOOGLE_SHEETS_SETUP.md and Code.gs. The PWA supports backup/restore through a Google Apps Script web app.

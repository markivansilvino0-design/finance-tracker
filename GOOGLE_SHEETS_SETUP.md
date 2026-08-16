# Google Sheets Sync Setup

## 1. Create the Google Sheet
Create a new blank Google Sheet. You can name it `Personal Finance Tracker`.

## 2. Add the backend
Open **Extensions → Apps Script**. Delete the sample code and paste the contents of `Code.gs`.

## 3. Deploy
Choose **Deploy → New deployment → Web app**.
- Execute as: **Me**
- Who has access: choose the appropriate option for your account. For a personal setup, "Anyone" is the simplest, but understand that anyone who has the URL may be able to call the endpoint.
- Click Deploy and copy the URL ending in `/exec`.

## 4. Connect the phone app
Open the PWA → **More/Reports → Google Sheets Sync**.
Paste the Web App URL and tap **Save URL**.

## 5. Backup and restore
- **Sync Now** replaces the Google Sheet data with the current device data.
- **Restore from Sheets** replaces the current device data with the saved Google Sheet data.

### Recommended workflow
Use the phone app as the primary entry point. Tap **Sync Now** after important changes. Use the Google Sheet for reporting, analysis, and backup.

### Important
The current sync is intentionally a simple full backup/restore model. It does not merge simultaneous edits. Avoid editing the sheet and phone at the same time and then overwriting one with the other.


## V3 note
After updating Code.gs, create a new Web App deployment version so the V3 installment fields (financed and totalPayable) are stored and restored correctly. The app will automatically sync changes once the existing /exec URL is connected.

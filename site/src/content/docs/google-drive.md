---
title: Google Drive
description: Set up Send to Google Drive once, so Bluelines can upload your Excel audits, screenshots included, straight to your Drive.
group: Share
order: 42
---

**Send to Google Drive** uploads the same Excel (`.xlsx`) file as **Export → Excel (.xlsx)**, screenshots embedded, to your Google Drive, then opens it in a new tab.

Bluelines has no server, so it can't sign you in to Google by itself. You create your own Google OAuth client once (it takes about five minutes) and paste its client ID into Settings. After that, sending is one click.

## One-time setup

### 1. Copy your redirect URI from Bluelines

1. Open the toolbar popup and click **Settings**.
2. Go to **Google Drive**.
3. Under **OAuth client ID**, find the **Authorized redirect URI**. It looks like this, with your own extension ID:

   ```text
   https://<extension-id>.chromiumapp.org/
   ```

4. Copy it exactly, including the trailing `/`.

### 2. Enable the Drive API in Google Cloud Console

1. Open Google Cloud Console:

   ```text
   https://console.cloud.google.com/
   ```

2. Create a project, or select one you already have.
3. Go to **APIs & Services**.
4. Find the **Google Drive API** and enable it.

### 3. Create an OAuth client ID

1. In **APIs & Services**, go to **Credentials**.
2. Click **Create credentials → OAuth client ID**.
3. For **Application type**, choose **Web application**.
4. Under **Authorized redirect URIs**, add the URI you copied in step 1.
5. Create the client.
6. Copy the **client ID**. It ends in `.apps.googleusercontent.com`.

> **Note:** If Google asks you to set up the OAuth consent screen before it lets you create a client, do that first, then come back to **Credentials**.

### 4. Paste the client ID and connect

1. Back in **Settings → Google Drive**, paste the client ID into **OAuth client ID**:

   ```text
   1234567890-abc123def456.apps.googleusercontent.com
   ```

   (That is an example. Use your own.)

2. Click **Check / connect** (it may read **Connect Google Drive**).
3. Google's sign-in and consent screen opens. Choose your account and allow access.
4. The status changes to **Connected as** followed by your Google email, and the button becomes **Re-check**.

You're set up. Clicking **Check / connect** saves the client ID, so there is nothing else to save.

## Send a file

1. Open **Export** in the sidebar (this page) or the table view (**This page** or **All pages**).
2. Click **Send to Google Drive**.
3. The first time, Bluelines asks you to confirm:

   ```text
   Send to Google Drive uploads an Excel file of these notes, including their screenshots, page addresses and element selectors, to your Google Drive. Bluelines can only see files it creates there.

   Continue? You won't be asked again.
   ```

4. You see "Building spreadsheet…", then "Connecting to Google Drive…", then "Saved to Google Drive ✓ — *N* annotations". The file opens in a new tab.

The file is saved to your Drive with the usual export name, for example `bluelines-localhost-current-page-2026-10-22.xlsx`. One upload runs at a time, so a double click doesn't create two files.

## What Bluelines can access

Bluelines asks Google for the `drive.file` scope only:

```text
https://www.googleapis.com/auth/drive.file
```

With this scope, Bluelines can only see and manage **files it creates**. It can't list, read or change anything else in your Drive.

When you connect, Bluelines also reads your Google account's email and name, to show **Connected as** in Settings.

## Sign-in and token lifetime

- Google gives Bluelines an access token that lasts about **one hour**. Bluelines keeps it in the extension's local storage and reuses it while it has more than a minute left.
- When it lapses, Bluelines asks Google again. If you are still signed in to Google, this usually happens without a prompt. Otherwise, you see the consent screen again.
- **Opening Settings never contacts Google.** The status there comes from what the browser already knows. Only **Check / connect** and **Send to Google Drive** talk to Google.

> **Warning:** The token is stored **unencrypted** in extension storage. Other sites can't read it, but anyone who can use this browser profile could.

## Disconnect

In **Settings → Google Drive**, click **Disconnect**. Bluelines revokes the token with Google and forgets the token and your account. The status returns to **Not connected**.

Files already uploaded stay in your Drive. Your client ID stays in the field so you can reconnect later.

## If your extension ID changes

The redirect URI contains your extension's ID. When you load Bluelines with **Load unpacked**, the browser derives that ID from the folder. Loading it on another computer, or from another folder, can give it a new ID, and then Google rejects the sign-in because the redirect URI no longer matches.

You have two fixes:

- **Update Google.** Copy the new **Authorized redirect URI** from **Settings → Google Drive** and add it to your OAuth client's **Authorized redirect URIs** in Google Cloud Console.
- **Pin the ID.** Add a `"key"` field with your extension's public key to `manifest.json`, so the ID stays the same wherever you load it. See Chrome's developer documentation on keeping a consistent extension ID for how to get the key.

  ```json
  {
    "key": "<your extension's public key>"
  }
  ```

  Add the `"key"` line inside the existing `manifest.json` object. Don't replace the file.

> **Note:** In Firefox, the redirect URL shown in Settings is different from Chrome's. Register the one your browser shows.

## Troubleshooting

| Message or problem | Fix |
|---|---|
| "No Google OAuth client ID set. Add one in the extension settings." | Paste your client ID in **Settings → Google Drive** and click **Check / connect**. |
| Google shows an error about the redirect URI | The URI in Google Cloud Console doesn't match the one in Settings. Copy it again exactly, including the trailing `/`. If your extension ID changed, see above. |
| "Google sign-in was cancelled." | You closed the Google window. Click **Check / connect** or **Send to Google Drive** again. |
| "Drive upload failed: …" | Read the reason after the colon. If Google says access was denied or the API is disabled, check that the **Google Drive API** is enabled in your project. |
| The status shows an error and the button reads **Try again** | Fix the cause in the message, then click **Try again**. |

## Related

- [Export and share](/docs/export-and-share)
- [Privacy](/docs/privacy)
- [Troubleshooting](/docs/troubleshooting)

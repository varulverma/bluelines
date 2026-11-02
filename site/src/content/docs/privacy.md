---
title: Privacy and permissions
description: What Bluelines keeps in your browser, exactly what leaves it and when, why it asks for each permission, and how to delete your data.
group: Reference
order: 80
---

Bluelines is local by default. It has no account, no server, no analytics and no telemetry. Your notes leave your browser only when you use Enhance, Google Drive or AI agents, and only after you turn that on or click it.

## What stays in your browser

- **Notes, screenshots, categories and settings** are saved in this browser's extension storage (`chrome.storage.local`), in this browser profile only. They are never synced.
- **Marking, saving, the sidebar and the table** work fully offline.
- **Every file export** (Excel, HTML report, CSV, PDF page, ZIP) is built on your computer and downloaded straight to it. So is everything you copy.
- **Share to apps** copies your notes formatted for that app. Nothing is sent and no account is needed.

Other websites and other extensions can't read Bluelines' storage. Anyone who can use this browser profile, or malware running as you, can.

## What leaves, and when

| You do this | What is sent | Where | Asked first? |
|---|---|---|---|
| Click **Enhance** on a note | The note text, its category, the element's CSS selector, and the page address **without** its query string or `#fragment`. **No screenshot.** Your API key goes in the provider's auth header. | Only the provider you chose: `api.anthropic.com`, `api.openai.com` or `openrouter.ai` | Yes, once per provider |
| Click **Send to Google Drive** | The Excel export: notes, categories, selectors, page addresses **and screenshots**. Your Google access token goes in the auth header. | `www.googleapis.com`, plus Google sign-in at `accounts.google.com` when you connect | Yes, once |
| Click **Check / connect** in Settings | Google sign-in, then one call to read your Drive account name | Google | You started it |
| Click **Disconnect** in Settings | Your access token, so Google can revoke it | `oauth2.googleapis.com` | You started it |
| Turn on **Connect to AI agents** | Notes from your **shared sites** only: text, element details, page addresses and, if you allow it, screenshots | An AI tool on this computer that you started with your pairing code, over `127.0.0.1` | You turn it on, and confirm |

Enhance and the Drive upload respond only to your own clicks and key presses. A script on the page can't trigger them.

Opening Settings doesn't contact Google. The Drive status comes from what this browser already stores.

### AI agents

**Connect to AI agents** is off until you turn it on. While it is on:

- Bluelines talks only to `127.0.0.1` on this computer, and the local bridge accepts only the extension, so web pages can't connect to it.
- An AI tool needs your private pairing code to connect. **New pairing code** disconnects every tool using the old one.
- Only notes on your **shared sites** are visible. The default list is `localhost 127.0.0.1 *.localhost *.local *.test staging.* dev.*`. Notes on every other site stay private.
- **See screenshots** is on by default. Turn it off to share text only.
- Agents are read-only unless you turn on **Resolve, reply and add notes**. Anything an agent writes is labelled **AI** in your sidebar.
- Every access is listed under **Recent agent activity** in Settings.

> **Warning:** The AI tool may send what it reads to its own provider, as with anything else you show it. Share only the sites you're happy for that tool to see.

## Your keys are stored unencrypted

Your Enhance API key and your Google access token are stored in plain text in the extension's local storage. They are never put in the page, never sent to pages, and never included in exports. The Google token lasts about an hour.

Because they aren't encrypted, anyone who can use this browser profile could read them. Use an API key with a spending limit.

## Page scripts can see open panels

While a Bluelines panel (the sidebar, the table or the note form) is open, it is part of the web page. That page's own scripts, including analytics or session-replay tools some sites use, can technically read what the panel shows. Closed panels show nothing.

Avoid opening Bluelines panels on sites you don't trust.

## Permissions

| Permission | Why Bluelines needs it |
|---|---|
| `<all_urls>` (host permission) | Adds the Bluelines UI to any page you review, and takes the screenshot of the element you mark. Chrome describes this as "read and change all your data on all websites". Bluelines reads a page only to find and capture the element you click, and changes it only by adding its own UI. |
| `storage` | Saves your notes and settings. |
| `unlimitedStorage` | Screenshots fill the default storage quota quickly. |
| `scripting` | Adds Bluelines to tabs that were already open when you installed or updated it. |
| `identity` | Google Drive sign-in. |
| `alarms` | Reconnects to a local AI tool every 30 seconds while **Connect to AI agents** is on. |

Google Drive uses the `drive.file` scope, the narrowest Drive permission. Bluelines can see only the files it created, never the rest of your Drive.

Bluelines doesn't ask for the `tabs` or `activeTab` permissions.

## Delete your data

- **One note:** delete it from the sidebar or the table. You get a few seconds to click **Undo**.
- **Your API key:** clear the **API key** field in Settings and click **Save settings**.
- **Google Drive access:** click **Disconnect** in Settings. Bluelines revokes access at Google and forgets the account.
- **AI agent access:** set **AI agent access** to **Off**, or click **New pairing code** to disconnect every tool. Clear the activity list with **Clear**.
- **Everything:** remove the extension. That deletes everything it stored.

There is no "delete all notes" button yet. To keep a copy before you remove the extension, export a ZIP bundle from the table view (it includes `annotations.json`). See [Export and share](/docs/export-and-share).

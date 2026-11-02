---
title: Back up and move your notes
description: Where your notes live, what an export keeps, and what to do before you reinstall Bluelines or switch computers. There is no sync and no import.
group: Guides
order: 67
next: tips
---

Bluelines keeps everything in your browser. That's why it needs no account, and it's also why you need to know how to keep a copy. Read this before you remove the extension, move the folder, or change computers.

## Who it's for

Anyone with notes they can't afford to lose, and anyone moving to a new computer or browser profile.

## What you'll end up with

- A ZIP or JSON record of every note, with screenshots, stored where you choose.
- A clear picture of what that record can and can't do.

## What you need

- Bluelines installed, with notes in it.

## First, the honest part

- **Notes live in this browser profile only.** They're saved in the extension's local storage: no account, no server, no cloud copy.
- **There is no sync.** Notes don't follow you to another computer, another browser or another Chrome profile.
- **There is no import.** Bluelines has no way to read an export back in. An export is a record you can read, share and keep. It can't restore notes into the extension.
- **Removing the extension deletes everything it stored**: notes, screenshots, categories and settings.

See [Privacy](/docs/privacy#what-stays-in-your-browser).

## Steps

### Keep a record

1. Open any page and open the table (the table icon in the dock or the sidebar header).
2. Click **All pages**. This covers every note in this browser, on every site.
3. Open **Export** and choose **ZIP bundle (with screenshots)**. The toast says "Building ZIP bundle…", then, for example, "Exported ZIP bundle (120 annotations, 97 screenshots)".
4. The file looks like this:

   ```text
   bluelines-example.com-all-pages-2026-10-22.zip
   ├── annotations.json
   ├── report.html
   └── screenshots/
       ├── screenshot-1.png
       └── ...
   ```

5. Store it somewhere backed up. For an off-computer copy, **Export → Send to Google Drive** uploads the Excel version with screenshots. See [Google Drive](/docs/google-drive).

### Know what the record keeps

Each note in `annotations.json` and in the **JSON (.json)** export has the fields below. CSV, Markdown and XML carry the same information.

```json
{
  "index": 1,
  "type": "Bug",
  "typeLabel": "Layout Bug",
  "note": "CTA label clips at 320px",
  "selector": "button.cta",
  "pageUrl": "https://example.com/pricing",
  "markedAt": "2026-10-22T09:14:03.000Z",
  "hasScreenshot": true
}
```

It doesn't keep whether a note is resolved, AI replies, which agent it was sent to, the extra details Bluelines uses to find a moved element, or your categories and settings. Note those down separately if you need them.

### Before you reinstall, move the folder or switch computers

6. Export the ZIP as above.
7. Write down your categories from **Settings → Annotations → Your categories**, and re-enter your Enhance key and Drive client ID later.
8. Chrome gives an unpacked extension an ID based on where it was loaded from. Loading Bluelines from a different folder, or on another computer, gives it a new ID and an empty store. The redirect URI for Google Drive changes too, so update it in Google Cloud Console. See [If your extension ID changes](/docs/google-drive#if-your-extension-id-changes).
9. Clicking reload on the extension in `chrome://extensions`, from the same folder, keeps your notes.
10. If you use AI agents, the new install has a new pairing code. Copy the setup command again from **Settings → Connect to AI agents** into each tool.

### Carry notes over by hand

11. There's no import, so to continue on a new install, open `report.html` from the ZIP, visit each page it lists, and mark the notes you still need again. Mark only open work. Resolved notes are best left in the record.

## Do more with it

- **Make it a habit.** Export a ZIP at the end of each review or sprint, named by date. It's also the cleanest thing to hand to someone else.
- **Keep clients apart.** Use a separate Chrome profile per client. Each profile has its own Bluelines storage, so **All pages** exports only that client's notes.
- **Clean up after exporting.** Delete notes you no longer need from the sidebar or the table. Delete is immediate, with an **Undo** button in the toast for a few seconds.

## Next

[Tips and power moves](/docs/tips).

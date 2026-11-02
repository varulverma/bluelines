---
title: Browser support and limitations
description: Which browsers Bluelines runs in today, and the known limits of version 1.0.0.
group: Reference
order: 81
---

Bluelines is a Manifest V3 extension with one manifest and no build step. Chrome is the first-release target.

## Browsers

| Browser | Status |
|---|---|
| **Google Chrome** (desktop) | **Tested.** Chrome 155 passes the full automated suites. First-release target. |
| **Microsoft Edge** (desktop) | **Tested.** Edge 156 passes the same suites. |
| Brave, Arc, Opera, Vivaldi | **Expected to work.** They are Chromium-based and should behave like Chrome, but haven't been tested yet. |
| Firefox, Zen (121 and later) | **Experimental.** The manifest carries Firefox settings, but the extension hasn't been run in Firefox yet. |
| Safari | **Not supported.** |

### Install in a Chromium browser

Open your browser's extensions page (`chrome://extensions`, `edge://extensions`, and so on), turn on **Developer mode**, click **Load unpacked** and pick the Bluelines folder. See [Install](/docs/install). A Chrome Web Store listing is coming soon.

### Try it in Firefox or Zen

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and pick `manifest.json` in the Bluelines folder.
3. Grant site access if Firefox asks. Until you do, Bluelines can't run on the page.

Things that may differ in Firefox:

- Copying a note's image needs Firefox 127 or later.
- The Google Drive redirect URL is different. Settings shows the right one for your browser.
- The `Alt+Shift` shortcuts may clash with Firefox's own.

## Known limitations

### Iframes and shadow DOM

Bluelines can't mark elements inside iframes or inside shadow DOM. Embedded content such as video players, payment forms and some third-party widgets falls in this group. Mark the element around it, or add a general note with **+** in the sidebar header.

### Screenshots cover the visible viewport only

Bluelines scrolls the element into view before it captures it, but anything taller or wider than the window is cut off. For a long element, mark a smaller part of it, or describe the rest in the note.

### Notes are keyed to the URL without its `#fragment`

- **Hash routes share one set of notes.** On an app that routes with `#/settings` and `#/billing`, notes from both routes show on both.
- **Different query strings get separate sets.** `/pricing?plan=pro` and `/pricing?plan=team` each have their own notes.

The table view's **All pages** toggle shows notes from every URL, grouped by domain.

### No sync between devices

Notes live in this browser profile only, by design. To move them or keep a backup, export a ZIP bundle (it includes `annotations.json`) or copy all notes as JSON from the table view. See [Export and share](/docs/export-and-share).

### Liquid glass on pure white or black pages

The **Liquid glass** panel material has weaker contrast on pages that are pure white or pure black. Pick **Frosted glass** or **Solid** in [Appearance](/docs/appearance#in-page-panels) if notes look faint.

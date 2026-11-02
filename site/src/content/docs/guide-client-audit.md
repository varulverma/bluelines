---
title: Build a client audit report across many pages
description: Audit a whole site page by page, review every note in the table, and deliver an HTML, PDF or Excel report with screenshots, optionally saved straight to Google Drive.
group: Guides
order: 62
next: guide-qa-bug-bash
---

You walk a client's site page by page, then turn every note into one report with screenshots that you can send, print or drop into a shared Drive folder.

## Who it's for

Freelancers, agencies and in-house reviewers who deliver UX or design audits.

## What you'll end up with

- Notes on every page you reviewed, in your own audit categories.
- One report covering all pages: a standalone HTML file, a PDF, or an Excel file, each with screenshots.
- Optionally, that Excel file saved in your Google Drive.

## What you need

- Bluelines installed. See [Install](/docs/install).
- The client's site open in a tab.
- For Google Drive: a one-time OAuth client ID setup. See [Google Drive](/docs/google-drive#one-time-setup).
- For Enhance: an API key from Anthropic, OpenAI or OpenRouter. See [Enhance](/docs/enhance).

## Steps

### Set up your audit categories

1. Open **Settings → Annotations**. Under **Your categories**, type a name and click **Add**. A typical audit set:

   ```text
   Visual
   Content
   Usability
   Accessibility
   ```

2. Make the one you'll use most the first in the list. New notes start in your first category, and new categories are added at the end, so rename **UI** to that name rather than adding it. You can delete **UI** once you have others (Bluelines always keeps at least one).

### Audit each page

3. Open the first page. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>, click an element, pick the category from the chip's arrow, write the note, press <kbd>Enter</kbd>.
4. Add page-wide findings with **+** in the sidebar header. They're saved as general notes with no location.
5. Move to the next page and repeat. Notes belong to the exact page address without its `#` part, so `/pricing` and `/pricing?plan=team` keep separate notes. See [Browser support and limitations](/docs/browser-support#notes-are-keyed-to-the-url-without-its-fragment).

> **Tip:** Write each finding as problem plus recommendation. "Low contrast on the footer links. Darken them to meet 4.5:1." reads well in a client report without editing.

### Tighten the wording with Enhance (optional)

6. On a card whose wording you want to sharpen, click **Enhance** (the sparkles). The first time, Bluelines asks before it sends anything to your provider.
7. The toast says "Enhanced prompt copied to clipboard!". Enhance doesn't change the note. It writes a precise instruction aimed at a developer or AI coding tool. To keep it, click **Edit**, paste, and save.

### Review everything in one place

8. Open the table: the table icon in the dock, or in the sidebar header.
9. Click **All pages**. Notes are grouped by domain, with a **Page** column.
10. Use **Search notes, selectors, pages…** and the category chips to check each group. Search and filters only change what you see. They're not applied to exports, and the **Export** menu says so ("search/filter not applied").
11. Notes on other pages can be resolved, sent or deleted from here, but not edited. Click through to the page to edit one.

### Export the report

12. Open **Export** in the table header. The menu names the scope at the top, **All pages** or **This page**. Choose:
    - **HTML report**: a standalone file with the table and inline screenshots. Opens in any browser.
    - **PDF (print-ready page)**: downloads a `…-print.html` file. Open it, and in the print dialog choose **Save as PDF**.
    - **Excel (.xlsx)**: a spreadsheet with each screenshot embedded in its row.
13. File names include the host, the scope and the date:

    ```text
    bluelines-client.example.com-all-pages-2026-10-22.html
    ```

> **Tip:** **All pages** means every note in this browser, on every site, not only this client's. If you audit several clients, use a separate Chrome profile for each, or export **This page** from each page instead.

### Send it to Google Drive (optional)

14. In the same **Export** menu, choose **Send to Google Drive**. The first time, Bluelines asks before uploading.
15. The toasts say "Building spreadsheet…", "Connecting to Google Drive…", then "Saved to Google Drive ✓ — 42 annotations". Bluelines uploads the same `.xlsx` file and can see only the files it creates in your Drive.

## Do more with it

- **Hand over a bundle.** **ZIP bundle (with screenshots)** gives you `annotations.json`, `report.html` and a `screenshots/` folder in one file. See [ZIP bundle](/docs/export-and-share#zip-bundle-with-screenshots).
- **Paste into a doc.** **Copy as → Notion** or **Markdown** copies every note as text, ready to paste into a write-up. See [Copy as](/docs/export-and-share#copy-as-all-notes-in-a-structured-format).
- **Track the follow-up.** When the client ships fixes, re-open each page and click **Resolve**. In the table, resolved rows are dimmed and tagged **Resolved**.
- **Colour by category.** Turn on **Settings → Workspace → Note colours → By category** so each category has its own colour on pins and numbers while you review.

## Next

[Run a QA bug bash on staging](/docs/guide-qa-bug-bash).

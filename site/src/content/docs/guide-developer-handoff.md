---
title: Hand off a live site to a developer
description: Review a live page with Inspect Mode, check every note in the sidebar, then hand the developer Linear or Jira issues or an Excel file with screenshots.
group: Guides
order: 60
next: guide-claude-code-fix
---

You review a page, pin each problem to the element it belongs to, and give your developer something they can act on without a call.

## Who it's for

Designers, PMs and reviewers who sign off a build and pass the fixes to a developer.

## What you'll end up with

- A numbered set of notes, each pinned to an element, with a screenshot.
- The same notes as issues pasted into Linear or Jira, or an Excel file with every screenshot embedded.

## What you need

- Bluelines installed. See [Install](/docs/install).
- The page you want to review, open in a tab.
- About ten minutes per page.

## Steps

### Mark the page

1. Open the page. Click **Inspect** in the dock, or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>.
   A toast says: "Inspect Mode: click any element, or Tab to one and press Enter. Esc to stop."
2. Hover the page. The highlight shows each element's selector and size. Click the one you want to comment on.
3. The note form opens beside the element, joined to it by a connector line. The caption under it names the element, its size and the note number, for example `› button.cta · 160×44 · #03`.
4. Set the category. The chip at the left shows your first category (**UI** until you add your own). Click the arrow beside it (**Choose or add a category**), then click **+** and type a name such as `Layout`. Press <kbd>Enter</kbd>. Your categories are one list, shared by every page. See [Categories](/docs/notes-and-categories#categories).
5. Type the note. Write what should change, not just what's wrong:

   ```text
   Card titles wrap to three lines at 1280px. Keep them to two and truncate with an ellipsis.
   ```

6. Press <kbd>Enter</kbd> to save (<kbd>Shift</kbd>+<kbd>Enter</kbd> adds a line break). The toast says "Annotation saved".
7. Repeat for every problem. For something that isn't tied to one element ("the whole page feels slow"), open the sidebar and click **+** in its header for a general note.

> **Tip:** Scroll the element fully into view before you click it. Screenshots cover only the visible part of the window.

### Check your notes in the sidebar

8. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>, or click the Notes button in the dock. Numbered pins appear on the page, matching the numbers on the cards.
9. If the sidebar is a slim column of dots, hover it, or click the rail icon in its header (**Expand to full sidebar**).
10. Click each card. The page scrolls to the element and pulses it. Check it's the right one.
11. Look at the status filters at the top: **All**, **Open**, **Agent**, **Re-pin**, **Done**. **Re-pin** should be 0. If it isn't, the page changed and a note lost its element. Open that card and click **Re-pin**, then click the right element. See [Re-pin](/docs/sidebar-and-status#element-not-found-and-re-pin).
12. Fix wording with **Edit** (the pencil). Edit keeps the note's original "Marked at" time.

### Hand it off

Pick one route.

**Route A: issues in Linear or Jira**

13. Click the table icon in the sidebar header (**View as table**).
14. Make sure **This page** is selected at the top.
15. Open **Copy as** and choose **Linear** or **Jira**. The toast says, for example, "Copied 8 annotations as Linear".
16. Paste into a new issue.

Linear and Jira are switched on by default in **Settings → Share to apps**. Copied text carries each note, its element, page and time, plus a `hasScreenshot` flag. It doesn't carry the images. If the developer needs the pictures, use Route B too.

**Route B: Excel with screenshots**

13. In the sidebar header, open **Export** and choose **Excel (.xlsx)**.
14. The toast says "Building spreadsheet…", then "Exported 8 annotations (8 images)".
15. Send the file. It's named like this:

    ```text
    bluelines-shop.example.com-current-page-2026-10-22.xlsx
    ```

Each row has the number, screenshot, type, note, location, page and "Marked at" time, and the screenshot is embedded in its cell. The sidebar **Export** always covers this page only. For several pages, use the table's **Export**. See [Export scope](/docs/export-and-share#what-gets-exported-scope).

## Do more with it

- **Resolve as they ship.** When the developer fixes something, click **Resolve** on its card. It moves to **Done**, so **Open** always shows what's left. See [Resolve and reopen](/docs/sidebar-and-status#resolve-and-reopen).
- **One issue per note.** Picking a format in **Copy as** also sets the format of every card's Copy button. After you choose Linear once, **Copy** on a single card copies just that note as a Linear issue.
- **Paste a picture.** **Copy image** on a card copies only the screenshot, so you can paste it straight into a Slack thread or a Figma file.
- **More apps.** Turn on GitHub issue, GitLab issue, Slack, Discord, Trello or Email in **Settings → Share to apps**. See [Share to apps](/docs/share-to-apps).
- **Let an AI tool make the fixes.** See the next guide.

## Next

[Let Claude Code fix your notes on localhost](/docs/guide-claude-code-fix).

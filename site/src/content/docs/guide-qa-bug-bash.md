---
title: Run a QA bug bash on staging
description: Log bugs and regressions on a staging build, keep notes attached after each deploy with Re-pin, and move them into your tracker as CSV or GitHub issues.
group: Guides
order: 63
next: guide-a11y-copy-review
---

You test a staging build, pin every bug to the element that shows it, keep the notes attached through redeploys, and move the list into your tracker.

## Who it's for

QA engineers, and teams running a bug bash before a release.

## What you'll end up with

- Bugs and regressions pinned to their elements on staging, with screenshots.
- A clear split between open, fixed and lost notes after each deploy.
- A CSV for your tracker, or GitHub issues ready to paste.

## What you need

- Bluelines installed. See [Install](/docs/install).
- The staging build open, for example `https://staging.example.com`.

## Steps

### Set up QA categories

1. Open **Settings → Annotations → Your categories** and add:

   ```text
   Bug
   Regression
   Blocker
   ```

   Then delete **UI** so **Bug** is first: new notes start in your first category. You can also add a category from the note form: click the chip's arrow, then **+**.

> **Tip:** Bluelines shows a category named exactly `Bug` (any capitalisation) as **Layout Bug**, a label kept from earlier versions. Only JSON and the XML `type` attribute keep `Bug`; CSV, Markdown, Excel, HTML and PDF say **Layout Bug**, and Linear and Jira tag it `[Task]`. To keep your own word everywhere, pick another name, such as `Broken` or `Defect`.

### Log bugs

2. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> and click the broken element.
3. Pick the category from the chip's arrow, then write steps and expected result:

   ```text
   Regression since Tuesday's build. Click "Apply coupon" with an empty field: the button spins forever. Expected: inline error "Enter a code".
   ```

4. Press <kbd>Enter</kbd>. Bluelines takes a screenshot of the visible window, cropped to the element.
5. For a bug inside an open menu or dialog, see [Annotate dropdowns, menus and modals](/docs/guide-modals-keyboard).

### Triage with the status filters

6. Open the sidebar (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>). The filters show a count each:
   - **Open**: not resolved, element found.
   - **Agent**: open and sent to an AI agent.
   - **Re-pin**: the element can't be found any more.
   - **Done**: resolved.
7. Click a card to jump to its element. See [Status filters](/docs/sidebar-and-status#status-filters).

### After each deploy

8. Reload the staging page and open the sidebar.
9. Check **Re-pin**. A note lands there when its element is gone or changed too much to match. Bluelines doesn't guess, so it never points at the wrong element.
10. For each one, click **Re-pin** on the card, then click the element the note belongs to. The toast says "Note re-pinned to this element". Press <kbd>Esc</kbd> to cancel.
11. If you click a card and see "Matched approximately: the page changed since this note was made. Check it is the right element.", check the highlight before you trust it.
12. Retest each open bug. Click **Resolve** when it's fixed ("Marked resolved"). If a fixed bug comes back, open **Done** and click **Reopen**.

### Move it to your tracker

**As CSV**

13. Open the table (table icon), choose **This page** or **All pages**, then **Export → CSV**. The toast says "Exported 17 annotations as CSV".
14. Import the file into your tracker or spreadsheet. The columns are:

    ```text
    #, Type, Note, Selector, Page, Marked At, Has Screenshot
    ```

    Every cell is quoted, and values starting with `=`, `+`, `-` or `@` get a leading `'` so spreadsheets don't run them as formulas. The CSV has no status column, so filter to what you want to file before you mark things resolved, or file everything and close the fixed ones in your tracker.

**As GitHub issues**

15. In **Settings → Share to apps**, tick **GitHub issue** (or **GitLab issue**).
16. In the table, open **Copy as** and choose **GitHub issue**. Bluelines copies the notes as Markdown. Nothing is sent and no account is needed.
17. Paste into a new issue. To file one bug per issue, keep **GitHub issue** selected and use **Copy** on each card instead: the card's Copy button uses the format you picked last.

## Do more with it

- **Send screenshots too.** CSV and copied text say whether a note has a screenshot but don't include it. Attach **Export → Excel (.xlsx)** or **ZIP bundle (with screenshots)**. See [Export and share](/docs/export-and-share).
- **Let an agent fix the easy ones.** Staging hosts (`staging.*`) are in the default shared sites. Send a note to Claude Code or Cursor and follow [the Claude Code guide](/docs/guide-claude-code-fix).
- **Check the whole release.** In the table, **All pages** with the **Regression** chip shows every regression in one list.

## Next

[Review accessibility and copy](/docs/guide-a11y-copy-review).

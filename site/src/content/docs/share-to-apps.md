---
title: Share to apps
description: Choose which apps appear in the Copy as menu, and copy your notes formatted for GitHub, GitLab, Slack, Discord, Trello, Email, Notion, Linear or Jira.
group: Share
order: 41
next: google-drive
---

**Share to apps** adds app-specific formats to the **Copy as** menu. Pick an app and Bluelines copies your notes to the clipboard, formatted for that app, ready to paste into a new issue, a message, a card or an email.

Nothing is sent anywhere and no account is needed. Bluelines never opens or signs in to these apps. You paste the text yourself.

## Choose your apps

1. Open the toolbar popup and click **Settings**.
2. Go to **Share to apps** ("Apps listed in the table view's **Copy as** menu").
3. Tick the apps you use:
   - **Notion** (on by default)
   - **Linear** (on by default)
   - **Jira** (on by default)
   - **GitHub issue**
   - **GitLab issue**
   - **Slack**
   - **Discord**
   - **Trello**
   - **Email**

Changes save as soon as you tick or untick a box.

You can also get here from the table view: open **Copy as** and click **Add apps…** at the bottom of the menu. Settings opens at **Share to apps**.

## Use an app format

1. Open the table view and choose **This page** or **All pages**.
2. Open **Copy as**. Your ticked apps are listed below **JSON**, **Markdown**, **XML** and **Plain text**.
3. Click an app. Bluelines copies every note in that scope and shows "Copied *N* annotations as *App*".
4. Paste into the app.

Search and category filters are not applied: you get every note in the scope. See [Export and share](/docs/export-and-share#what-gets-exported-scope).

The app you pick also becomes the format of each note's **Copy** button, so you can then copy notes one at a time in the same format. The sidebar's **Copy button format** menu lists the same apps.

## What each app gets

| App | Format | Paste it into |
|---|---|---|
| **GitHub issue** | Markdown | The description of a new GitHub issue, or a comment. |
| **GitLab issue** | Markdown | The description of a new GitLab issue, or a comment. |
| **Slack** | Slack formatting: headings and bold become `*bold*` lines | A Slack message. |
| **Discord** | Markdown | A Discord message. |
| **Trello** | Markdown | A Trello card description or comment. |
| **Email** | Plain text: no `#`, `**` or backticks | The body of an email. |
| **Notion** | Markdown with a quote block per note and an icon per category | A Notion page. |
| **Linear** | One issue-style section per note, titled `[Bug]`, `[Improvement]`, `[Task]` or `[Note]` | A Linear issue description. |
| **Jira** | Jira wiki markup (`h1.`, `h2.`, `*bold*`) | A Jira issue description. |

Every format includes, for each note: its number and category, the note text, the location (CSS selector, or "No location"), the page address, when it was marked, and whether it has a screenshot. Screenshots themselves are not included. Use **Copy image** on a note, or an Excel, HTML or ZIP export, for the images.

The Markdown, Notion, Linear and Jira formats are shown in full in [Export and share](/docs/export-and-share#copy-as-all-notes-in-a-structured-format).

### GitHub issue, GitLab issue, Discord, Trello

These four get the same Markdown as **Copy as Markdown**: a heading, the page, export time and count, then a numbered heading and a bullet list per note. All four render Markdown, so headings, bold and code formatting show up when you paste.

```markdown
# Bluelines annotations

- **Page:** http://localhost:3000/checkout
- **Exported:** 22/10/2026, 09:41:00
- **Count:** 1

## 1. Layout Bug

- **Note:** Pay button overlaps the card field on mobile
- **Location:** `[data-testid="pay-now"]`
- **Page:** http://localhost:3000/checkout
- **Marked at:** 2026-10-22T09:30:12.000Z
- **Screenshot:** yes
```

### Slack

Slack doesn't use Markdown headings or `**bold**`. Bluelines turns each heading into a bold line and each `**bold**` into Slack's `*bold*`. Code formatting stays.

```text
*Bluelines annotations*

- *Page:* http://localhost:3000/checkout
- *Exported:* 22/10/2026, 09:41:00
- *Count:* 1

*1. Layout Bug*

- *Note:* Pay button overlaps the card field on mobile
- *Location:* `[data-testid="pay-now"]`
- *Page:* http://localhost:3000/checkout
- *Marked at:* 2026-10-22T09:30:12.000Z
- *Screenshot:* yes
```

### Email

Email clients show Markdown symbols as they are, so Bluelines removes them: heading `#` marks, `**` bold markers and backticks.

```text
Bluelines annotations

- Page: http://localhost:3000/checkout
- Exported: 22/10/2026, 09:41:00
- Count: 1

1. Layout Bug

- Note: Pay button overlaps the card field on mobile
- Location: [data-testid="pay-now"]
- Page: http://localhost:3000/checkout
- Marked at: 2026-10-22T09:30:12.000Z
- Screenshot: yes
```

This is the same as **Plain text** in the **Copy as** menu.

> **Note:** These examples are illustrative. The "Exported" time uses your browser's local date format.

## Related

- [Export and share](/docs/export-and-share)
- [Table view](/docs/table-view)
- [Run a client audit](/docs/guide-client-audit)

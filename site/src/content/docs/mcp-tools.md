---
title: MCP tools reference
description: Every tool the Bluelines MCP server gives your AI agent, with parameters, permissions, output shape and example prompts.
group: AI
order: 33
---

When you [connect an AI agent](/docs/ai-agents), the Bluelines MCP server (`mcp/bluelines-mcp.js`) gives it ten tools. Six read your notes and four change them. You never call these tools yourself: you ask your agent in plain words and it picks the right tool.

The server also tells every agent how to start: "The user can send notes to you by name: call get_my_annotations first. get_overview and list_annotations show every shared note. resolve_annotation after fixing one."

## How notes are shaped

### Grouping: site → section → page → category

Tools that return several notes group them like this:

- **Site:** the host, for example `localhost:3000`. Local files are grouped under `local files`.
- **Section:** the first part of the path, for example `/checkout` or `/account`. Pages at the root are in `/`.
- **Page:** the path and query string, with the full URL and the page title.
- **Category:** within each page, notes are grouped by category, largest group first. Notes in each category are oldest first.

Every level carries counts: total notes, open, resolved, and notes per category. The whole result starts with a summary of sites, pages and notes.

### Categories and inferred kinds

A note's category is the one you chose. The built-in categories are reported by their labels: **Layout Bug**, **Suggestion**, **Text Annotation** and **General Note**. Your own categories appear exactly as you named them.

Most notes are saved under a generic category (**Note**, **UI**, **General**, **General Note**, **Other**, or none), which says little. For those, Bluelines infers a kind from the note's wording. The first rule that matches wins:

| Inferred kind | Triggered by words such as |
|---|---|
| **Accessibility** | a11y, accessibility, contrast, screen reader, aria, alt text, keyboard, focus ring, focus state, focus order, tab order, WCAG |
| **Bug** | bug, broken, break, error, crash, fail, not working, doesn't work, wrong, overlap, overflow, cut off, clipped, misaligned, glitch, 404, 500 |
| **Copy / text** | typo, spelling, grammar, wording, copy, rephrase, reword, text, label, headline, title, translate, capitalize |
| **Visual / layout** | colour, spacing, padding, margin, font, size, align, bigger, smaller, larger, tiny, huge, width, height, radius, border, shadow, icon, layout, responsive, mobile, gap |
| **Question** | a note ending in `?`, or starting with why, how, what, should, can or could |
| **Suggestion** | should, could, would be, maybe, consider, suggest, add, remove, instead, prefer, nice to |
| **General** | anything else |

For example, a generic note reading "contrast too low on the footer links" is reported as **Accessibility**, and "button overlaps the card field" as **Bug**.

### Each note

Each note in a list has:

| Field | What it is |
|---|---|
| `id` | The note's id. Other tools take it. |
| `text` | Your note. |
| `status` | `open` or `resolved`. |
| `element` | What the note points at, in words, for example `button "Pay now" in form "Payment" under "Checkout"`. General notes say `(whole page, no element)`. |
| `selector` | The CSS selector of the element. |
| `testId` | The element's `data-testid`, if it has one. |
| `category` | Your category, or the inferred kind. |
| `assignedTo` | The agent you sent the note to, if any. |
| `by` | `ai` if an agent added the note. |
| `created` | When you made it. |
| `replies` | How many replies it has. |
| `screenshot` | `true` if a screenshot is available to the agent. |

The words, selector and `data-testid` together let the agent find the matching code in your project.

## Read tools

These work as soon as the agent is connected. They only see notes on your **Shared sites**, plus notes you sent to that agent.

### get_my_annotations

"Start here. Notes the user sent to you (this AI tool) from the Bluelines note form, grouped site → section → page → category, with element, selector and data-testid for each. Open notes only unless status says otherwise. Fix them, then resolve_annotation each one."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | `open` \| `resolved` \| `all` | No | open (default), resolved or all. |

**Needs write permission:** No.

If nothing is assigned, it answers that no open notes are assigned to it and points to `get_overview`.

Example prompt:

```text
Work through the Bluelines notes I sent you.
```

### get_overview

"Every site and page that has Bluelines notes (only sites the user shares with AI agents), grouped site → section → page, with note counts by category and open/resolved."

No parameters. Returns counts only, not the notes themselves.

**Needs write permission:** No.

Example prompt:

```text
Give me an overview of my Bluelines notes.
```

### list_annotations

"Bluelines notes grouped site → section → page → category (categories are the user's own, or inferred from the wording: Bug, Copy / text, Visual / layout, Accessibility, Suggestion, Question). Each note has "element" (what it points at, e.g. button "Pay now" in form "Payment" under "Checkout"), a CSS "selector" and any data-testid — use them to find the matching code. Open notes only unless status says otherwise."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `site` | string | No | Host to include, e.g. "localhost:3000" (substring match). |
| `page` | string | No | Page path or URL substring, e.g. "/checkout". |
| `category` | string | No | Category name exactly as shown in get_overview, e.g. "Bug". Not case-sensitive. |
| `status` | `open` \| `resolved` \| `all` | No | open (default), resolved or all. |
| `query` | string | No | Search note text, element description and selector. |

**Needs write permission:** No.

Example prompt:

```text
Fix all open Bluelines bugs on localhost:3000.
```

### get_annotation

"One note in full: text, element anchor (text, label, heading, landmark, classes), selector, position, replies, and the screenshot of the element as an image (if the user allows screenshots)."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Note id from list_annotations. |

**Needs write permission:** No. The screenshot is included only when **See screenshots** is on.

Besides the list fields, it returns the site, page, URL, page title, the full element anchor, the element's position, when the note was last edited, who resolved it and when, and every reply with its author and time.

Example prompt:

```text
Show me the screenshot for the Bluelines note about the header logo.
```

### get_current_page

"The page open in the user's browser right now, with its notes grouped by category."

No parameters. Returns the URL and title of the active tab and all its notes, open and resolved. If that page is not on a shared site, or no page is open, it says so instead.

**Needs write permission:** No.

Example prompt:

```text
What Bluelines notes are on the page I have open?
```

### show_annotation

"Open the note's page in the user's browser, scroll to its element and highlight it — to point the user at something."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Note id. |

Switches to the tab with that page, or opens a new one, then scrolls to and highlights the element.

**Needs write permission:** No.

Example prompt:

```text
Show me which element that Bluelines note is about.
```

## Write tools

These need **Resolve, reply and add notes** turned on in **Settings → Connect to AI agents**. Without it, each call is refused with: "AI agents can read Bluelines notes but not change them. The user can allow changes in Bluelines settings → Connect to AI agents."

Everything they write is labelled **AI** in your sidebar.

### resolve_annotation

"Mark a note resolved after fixing it, optionally saying what changed (shown to the user as an AI reply). Needs the user to allow changes in Bluelines settings."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Note id. |
| `text` | string | No | What you changed, e.g. "Fixed padding in Header.tsx". |

**Needs write permission:** Yes.

Example prompt:

```text
You fixed the padding issue, so resolve that Bluelines note and say what you changed.
```

### reopen_annotation

"Mark a resolved note open again."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Note id. |

**Needs write permission:** Yes.

Example prompt:

```text
The footer fix didn't work. Reopen that Bluelines note.
```

### reply_to_annotation

"Add a reply to a note (labelled AI in the user's sidebar) — to explain a change or ask a question."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | string | Yes | Note id. |
| `text` | string | Yes | Reply text. |

**Needs write permission:** Yes.

Example prompt:

```text
Reply on the Bluelines note about the logo to ask which size I want.
```

### add_annotation

"Pin a new note (labelled AI) on a page, e.g. review findings. Without a selector it is a general note for the whole page."

| Parameter | Type | Required | Description |
|---|---|---|---|
| `url` | string | Yes | Full page URL, e.g. http://localhost:3000/checkout |
| `text` | string | Yes | Note text. |
| `selector` | string | No | CSS selector of the element (optional). |
| `category` | string | No | Category, e.g. "Bug" (optional). |

The page must be on a shared site. Notes the agent adds have no screenshot.

**Needs write permission:** Yes.

Example prompt:

```text
Review localhost:3000/signup for accessibility problems and pin each one as a Bluelines note.
```

## Environment variables

The server reads two environment variables. Your AI tool passes them when it starts the server; the setup copied from Settings already includes the first.

| Variable | Required | What it does |
|---|---|---|
| `BLUELINES_TOKEN` | Yes | Your pairing code from **Settings → Connect to AI agents**. Without it, every tool answers that Bluelines is not paired. |
| `BLUELINES_PORT` | No | The first port to try. Default `17337`. Each server takes the next free port in a range of 10. |

> **Warning:** The extension looks for servers on ports 17337 to 17346 only, and Settings has no port field. Leave `BLUELINES_PORT` unset unless you know you need it, and keep it inside that range.

## Related

- [Connect AI agents](/docs/ai-agents)
- [Send notes to an agent](/docs/send-to-agent)
- [Fix notes with Claude Code](/docs/guide-claude-code-fix)

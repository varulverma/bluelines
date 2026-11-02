---
title: Introduction
description: Bluelines is a browser extension that lets you pin review notes to any element on a live web page, then hand them to people or AI agents.
group: Get started
order: 10
video: /video/trailer.mp4
next: install
---

Bluelines turns any web page into a review surface. You point at an element, write what should change, and the note stays pinned to that element. Later you hand the notes to a developer, a client, a ticket tracker or an AI coding agent.

It runs in your browser as an extension. There is no account and no server. Notes, screenshots and settings stay in your browser's extension storage, and marking, saving, viewing and every file export work offline.

## Who it's for

- **Designers** reviewing a build against the design.
- **Product managers and clients** giving feedback on a staging site.
- **QA testers** logging visual bugs with a screenshot and the exact element.
- **Developers** who want a precise list of what to fix, or want an AI agent to work through it.

You don't need to install anything in the site you review. Bluelines works on any page your browser can open, including `localhost` and local files.

## The loop: See → Mark → Explain → Ship

| Step | What you do | Where |
|---|---|---|
| **See** | Turn on **Inspect Mode** and hover the page. Bluelines outlines each element with its selector and size. | [Inspect Mode](/docs/inspect-mode) |
| **Mark** | Click the element. A one-line note callout opens beside it, joined by a connector line. | [Notes and categories](/docs/notes-and-categories) |
| **Explain** | Write what should change, pick a category and save. Bluelines stores the element's selector, a fingerprint and a viewport screenshot. | [Notes and categories](/docs/notes-and-categories) |
| **Ship** | Review notes in the sidebar or table, then copy, export, share or send them to an AI agent. | [Sidebar and status](/docs/sidebar-and-status), [Export and share](/docs/export-and-share), [AI agents](/docs/ai-agents) |

## What's new

- **AI agents.** Turn on **Settings → Connect to AI agents** and MCP-capable tools on your computer, such as Claude Code, Cursor or VS Code, can read your notes and work through them. Agents are read-only unless you allow changes, and anything they write is labelled **AI**. See [AI agents](/docs/ai-agents).
- **Send to agent.** Send a note to a specific agent from the note callout or from the orange button on its card. Click again to take it back. See [Send to agent](/docs/send-to-agent).
- **Status filters.** The sidebar filters notes by **Open**, **Agent**, **Re-pin** and **Done**, with live counts. See [Sidebar and status](/docs/sidebar-and-status).

## Map of the docs

### Get started

- [Install](/docs/install): Chrome, Edge, Brave, Arc and Firefox (experimental).
- [Quickstart](/docs/quickstart): your first note in 60 seconds.

### Use Bluelines

- [Inspect Mode](/docs/inspect-mode): pick elements, including inside menus and modals.
- [Notes and categories](/docs/notes-and-categories): write, categorise, edit and delete notes.
- [Sidebar and status](/docs/sidebar-and-status): review, jump, resolve and re-pin.
- [Table view](/docs/table-view): every note in one searchable table, across pages.
- [Keyboard shortcuts](/docs/keyboard-shortcuts): shortcuts and keyboard-only use.
- [Enhance](/docs/enhance): rewrite a note as an AI prompt with your own key.
- [AI agents](/docs/ai-agents): connect Claude Code, Cursor and other MCP tools.
- [Send to agent](/docs/send-to-agent): hand one note to one agent.
- [MCP tools](/docs/mcp-tools): what an agent can read and do.
- [Export and share](/docs/export-and-share): Excel, HTML, CSV, PDF, ZIP and copy formats.
- [Share to apps](/docs/share-to-apps): GitHub, GitLab, Slack, Discord, Trello and Email.
- [Google Drive](/docs/google-drive): send the Excel audit to your Drive.
- [Appearance](/docs/appearance): theme, accent, corners, glass and motion.
- [Workspace](/docs/workspace): sidebar, page pins and note colours.
- [Privacy](/docs/privacy): what stays local and what leaves.
- [Browser support](/docs/browser-support): what is tested and what isn't.
- [Troubleshooting](/docs/troubleshooting): fixes for common problems.
- [Changelog](/docs/changelog): what changed in each version.

### Guides

- [Developer handoff](/docs/guide-developer-handoff)
- [Fix notes with Claude Code](/docs/guide-claude-code-fix)
- [Client audit](/docs/guide-client-audit)
- [QA bug bash](/docs/guide-qa-bug-bash)
- [Accessibility and copy review](/docs/guide-a11y-copy-review)
- [Modals, menus and keyboard-only review](/docs/guide-modals-keyboard)
- [Several agents at once](/docs/guide-multiple-agents)
- [Back up and move your notes](/docs/guide-backup-move)
- [Tips](/docs/tips)

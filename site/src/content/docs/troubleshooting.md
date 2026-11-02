---
title: Troubleshooting
description: Fixes for the most common Bluelines problems, from a missing dock to an AI agent that won't connect.
group: Reference
order: 82
---

## The page

### The dock doesn't show, or it says "Refresh this page"

Tabs that were open before you installed, reloaded or updated Bluelines don't have the current version yet.

- **The dock is missing.** Click the Bluelines icon in the toolbar, or press a shortcut such as <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>. Bluelines adds itself to the tab the first time you do.
- **The dock says "Bluelines was updated. Refresh this page to keep annotating."** That dock belongs to the old version. Reload the tab.
- **You hid the dock.** Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> to bring it back.

### I can't annotate `chrome://` pages or the extension store

Browsers don't let any extension run on their own pages (`chrome://`, `edge://` and similar) or on extension stores. The toolbar popup says "Bluelines can't run on this page (browser pages and extension stores are off-limits)." Open the site you want to review in a normal tab.

### Local `file://` pages don't work

Chrome blocks extensions on local files until you allow it. The popup says: "To annotate local files, turn on "Allow access to file URLs" for Bluelines in chrome://extensions."

1. Open `chrome://extensions`.
2. Click **Details** on Bluelines.
3. Turn on **Allow access to file URLs**.
4. Reload the local page.

### Keyboard shortcuts don't work

1. Open `chrome://extensions/shortcuts`.
2. Find Bluelines and check that each command has a key. Set them if they're empty.
3. If a key is taken by another extension or by the browser, pick a different one.

The defaults are <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (Inspect Mode), <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> (sidebar) and <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> (dock). Chrome applies suggested shortcuts only on a fresh install, so if you installed an early build, set them once by hand.

### A note says "Element not found"

The page changed so much that Bluelines can no longer find the element the note points at. Rather than guess and point at the wrong thing, it asks you to re-pin.

1. Click **Re-pin** on the note's card.
2. Click the element the note belongs to.

The **Re-pin** status filter in the sidebar lists every note that needs this.

### My notes are missing after the URL changed

Notes are saved per URL, without the `#fragment`:

- **A different query string is a different page.** `/pricing?plan=pro` and `/pricing?plan=team` each have their own notes. Go back to the exact URL you marked.
- **Hash changes don't matter.** `/app#/a` and `/app#/b` share one set of notes.

To find a note, open the table view and switch to **All pages**. It lists notes from every URL, grouped by domain.

## AI agents

### The agent stays on "Waiting for an AI tool…"

Settings shows "Waiting for an AI tool to start the Bluelines MCP server…" until an AI tool launches the bridge. Check:

1. **AI agent access** is set to **On** in Settings → **Connect to AI agents**.
2. **Node.js 18 or later** is installed. Run `node --version` in a terminal.
3. The **Bluelines folder** field points at the folder you loaded into Chrome, the one that contains `mcp/bluelines-mcp.js`. Copy the setup again after you fix it.
4. You added the setup to your AI tool and **restarted the tool** (or started a new session) so it launches the server.
5. Your browser is open. The bridge talks to Bluelines in the browser.

When it works, the status changes to "Connected to AI tools" and the agent appears as a chip.

### "An AI tool tried to connect with an old pairing code"

You clicked **New pairing code**, or reinstalled, and the AI tool still has the old code. In Settings, copy the setup for that agent again, replace the old entry in the AI tool's config, and restart the tool.

### The agent can't see my site

Agents see notes only on your **shared sites**. The default list is:

```text
localhost 127.0.0.1 *.localhost *.local *.test staging.* dev.*
```

Add your site to **Shared sites** in Settings, separated by spaces. Use `*.example.com` for subdomains, `staging.*` for a prefix, or `file` for local files. Notes on every other site stay private.

### The agent can't resolve, reply or add notes

Agents are read-only by default. In Settings → **Connect to AI agents**, under **Agents may also**, turn on **Resolve, reply and add notes**. Anything an agent writes is labelled **AI** in your sidebar.

## Integrations

### Google Drive stopped working after I reloaded the extension

The **Authorized redirect URI** includes the extension's ID, and an unpacked extension gets a new ID when you load it from a different folder or on a different computer.

1. Open Settings → **Google Drive** and copy the redirect URI shown there.
2. In Google Cloud Console, open your OAuth client and replace the old URI under **Authorized redirect URIs**.
3. Click **Check / connect** in Settings.

To stop the ID changing, pin it with a `"key"` in `manifest.json`. See Chrome's guide to keeping a consistent extension ID.

### Enhance shows an error

| Message | What to do |
|---|---|
| No API key set. Add one in the extension settings. | Paste a key into **API key** in Settings → **AI Enhance**, then **Save settings**. |
| *Provider* rejected the API key. Check it in Bluelines Settings. | The key is wrong, revoked, or for a different provider. Check the **Provider** matches the key. |
| *Provider* didn't accept the model "…". Change the model in Bluelines Settings. | The model ID is wrong or retired. Clear **Model** to use the default, or enter a current ID. |
| *Provider* rate limit reached. Wait a moment and try again. | Wait, or check your plan's limits with the provider. |
| *Provider* is busy or unavailable right now. | The provider is having trouble. Try again shortly. |
| Couldn't reach *Provider*. Check your internet connection and try again. | You're offline, or a network filter blocks the provider. |

See [AI Enhance](/docs/enhance).

## Your data

### Where are my notes stored, and how do I back them up?

Everything lives in this browser profile's extension storage. Nothing is synced, so another browser or computer won't see your notes, and removing the extension deletes them.

To keep a copy, open the table view, switch to **All pages**, and export a **ZIP bundle**. It contains `annotations.json`, `report.html` and a `screenshots/` folder. See [Export and share](/docs/export-and-share) and [Privacy and permissions](/docs/privacy).

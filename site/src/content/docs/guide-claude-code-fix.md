---
title: Let Claude Code fix your notes on localhost
description: Review your local build, send the notes to Claude Code through the Bluelines MCP server, let it fix and resolve them, then check its work in the Done filter.
group: Guides
order: 61
video: /video/teaser.mp4
next: guide-client-audit
---

You mark problems on the running app, Claude Code reads them with their elements and screenshots, edits your code, and resolves each note with a reply saying what it changed. You check the result and reopen anything that isn't right.

## Who it's for

Developers and design engineers who use Claude Code on the project they're reviewing.

## What you'll end up with

- Notes on `localhost` that Claude Code fixed in your code.
- An **AI** reply on each resolved note explaining the change.
- A **Done** list to check, and anything not fixed reopened for another pass.

## What you need

- Bluelines installed. See [Install](/docs/install).
- Node.js 18 or later.
- Claude Code on the same computer, with the browser open while it works.
- Your app running locally, for example on `http://localhost:3000`.

## Steps

### Connect Claude Code (once)

1. Click the Bluelines toolbar icon, then **Settings**. Go to **Connect to AI agents**.
2. Set **AI agent access** to **On**. Read the dialog ("Let AI tools on this computer read your Bluelines notes?") and confirm. Bluelines creates your private pairing code.
3. In **Bluelines folder**, paste the folder you loaded into Chrome, the one that contains `mcp/bluelines-mcp.js`.
4. Under **Add an agent**, pick **Claude Code**. Click **Copy** next to the command and run it once in a terminal. It looks like this, with your code and folder filled in:

   ```bash
   claude mcp add bluelines -s user -e BLUELINES_TOKEN=<your-pairing-code> -- node "<bluelines-folder>/mcp/bluelines-mcp.js"
   ```

5. Start Claude Code. The status in Settings changes from "Waiting for an AI tool to start the Bluelines MCP server…" to "Connected to AI tools", and the Claude Code tile gets a green dot.

Full setup for every tool: [Connect AI agents](/docs/ai-agents).

### Share the site and allow changes

6. Check **Shared sites**. The default already covers local work:

   ```text
   localhost 127.0.0.1 *.localhost *.local *.test staging.* dev.*
   ```

   Sites are matched by host name, so `localhost` covers every port. Agents can't see notes on any site that isn't listed. See [Shared sites](/docs/ai-agents#shared-sites).
7. Under **Agents may also**, tick **Resolve, reply and add notes**. Without it, Claude Code can read your notes but can't resolve them. Leave **See screenshots** on so it can see what you saw.

### Review and send

8. Open `http://localhost:3000`. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> and click the first element to fix.
9. Type the note. While an agent is connected, its icon sits at the right end of the caption line under the note. Click the Claude Code icon so it's pressed, then press <kbd>Enter</kbd>. The toast says "Annotation sent to Claude Code".
10. Repeat for each fix. For notes you already saved, click the orange send button on the card. See [Send to an agent](/docs/send-to-agent).

> **Tip:** You don't have to send every note. Claude Code can read every note on a shared site. Sending marks the ones you want it to do first, and they show under the **Agent** filter.

### Let Claude Code work

11. In Claude Code, ask for the work:

    ```text
    Fix all open Bluelines bugs on localhost:3000. Resolve each note when it's done and say what you changed.
    ```

    Or start with what you sent:

    ```text
    Get my Bluelines annotations and fix them one by one.
    ```

12. Watch the toolbar popup: the Claude Code chip in **AI agents** blinks while it reads or changes your notes. In the sidebar, each fixed note gets an **AI** reply and moves to **Done**.

### Check the work

13. Reload the page so it shows the new code.
14. Open the sidebar (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>) and click the **Done** filter.
15. Click each card to jump to its element and check the fix. Read the AI reply under the note.
16. If something isn't fixed, click **Reopen** on its card. The toast says "Reopened" and the note is back under **Open**.
17. Ask Claude Code to go again:

    ```text
    Some Bluelines notes on localhost:3000 were reopened. Read the replies, fix them, and resolve them again.
    ```

## Do more with it

- **Point it at one page.** "List the open Bluelines notes on localhost:3000/checkout and fix the layout ones first." The `list_annotations` tool filters by site, page, category, status and text. See [MCP tools](/docs/mcp-tools).
- **Ask it to review.** With changes allowed, Claude Code can pin its own notes: "Review localhost:3000/pricing for accessibility problems and add a Bluelines note for each one." Its notes are labelled **AI**.
- **Ask it to show you.** "Show me the Bluelines note about the header." `show_annotation` opens the page and highlights the element.
- **See what it did.** **Settings → Connect to AI agents → Recent agent activity** lists every request.
- **Take a note back.** Click the orange send button on a sent card again. The toast says "Took the note back from Claude Code".
- **Turn it off.** Set **AI agent access** to **Off**, or click **New pairing code** to disconnect every tool that uses the old code.

## Next

[Build a client audit report](/docs/guide-client-audit).

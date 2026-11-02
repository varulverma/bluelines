---
title: Work with several AI tools at once
description: Connect Claude Code, Cursor and other MCP tools at the same time, send each note to the right one, and watch what each is doing from the popup and the activity log.
group: Guides
order: 66
next: guide-backup-move
---

You can connect more than one AI tool to Bluelines at once, for example Claude Code in a terminal and Cursor in your editor. Each note can be sent to one of them, and each tool picks up only what you sent it.

## Who it's for

Developers who use more than one AI coding tool, or who split work between them (one for layout, one for copy).

## What you'll end up with

- Two or more AI tools connected at the same time.
- Each note sent to the tool you choose, visible under the **Agent** filter.
- A live view of what each tool is doing, and a log of every request.

## What you need

- **Connect to AI agents** turned on, with your Bluelines folder filled in. See [Connect AI agents](/docs/ai-agents).
- Node.js 18 or later.
- The AI tools installed on the same computer.

## Steps

### Connect each tool

1. Open **Settings → Connect to AI agents**. Under **Add an agent**, pick the first tool, for example **Claude Code**, copy its command and run it once:

   ```bash
   claude mcp add bluelines -s user -e BLUELINES_TOKEN=<your-pairing-code> -- node "<bluelines-folder>/mcp/bluelines-mcp.js"
   ```

2. Pick the next tool, for example **Cursor**. Bluelines shows where its config lives ("Add to ~/.cursor/mcp.json") and the JSON to add:

   ```json
   {
     "mcpServers": {
       "bluelines": {
         "command": "node",
         "args": ["<bluelines-folder>/mcp/bluelines-mcp.js"],
         "env": { "BLUELINES_TOKEN": "<your-pairing-code>" }
       }
     }
   }
   ```

   Every tool uses the same pairing code. Setups for Codex, Claude Desktop, GitHub Copilot, Windsurf, Gemini CLI, Cline, Zed, OpenCode and other MCP tools are in [Connect AI agents](/docs/ai-agents).
3. Start both tools. Each one starts its own Bluelines server on the next free port, from 17337 up to 17346, so up to 10 can run at once. Bluelines connects to all of them and checks again every 30 seconds.
4. In Settings, the status reads "Connected to AI tools", each connected tool is listed under it, and its tile gets a green dot.

### Watch them from the popup

5. Click the Bluelines toolbar icon. The **AI agents** strip says how many are connected ("2 connected") and shows a chip for each.
6. A chip blinks while that tool is reading or changing your notes. If the same tool runs in two windows, the chip shows **×2**.
7. Hover a chip, or <kbd>Tab</kbd> to it, for its card: **Online for**, **Requests**, **Can see** (how many notes), **Sent to it** (open notes you sent) and its last few requests. Click the chip to open Settings.

### Send each note to the right tool

8. **From the note form:** every connected tool has an icon at the right end of the caption line. Click one so it's pressed (only one at a time), then save. The toast says, for example, "Annotation sent to Cursor".
9. **From a card:** click the orange send button. With one tool connected, the note goes straight to it. With several, a **Send to** menu lists them. Pick one.
10. **Change your mind:** click the send button on a sent card to take it back ("Took the note back from Cursor"), then send it again to the other tool. Or click **Edit** and pick a different tool in the dialog.
11. Click the **Agent** filter in the sidebar to see every open note that's waiting for a tool. Each card shows which tool it went to.

### Ask each tool for its own notes

12. In each tool, ask for its notes. Each one gets only the notes sent to it:

    ```text
    Get my Bluelines annotations and fix them. Resolve each one when it's done.
    ```

    Any tool can still read every note on your shared sites if you ask it to, for example "list all open Bluelines notes on localhost:3000".

### Check the log

13. **Settings → Connect to AI agents → Recent agent activity** lists the latest requests with their times. Click **Clear** to empty it.

## Do more with it

- **Split by category.** Send layout notes to the tool that's open in your component library and copy notes to the one in your content repo.
- **Cut everyone off at once.** **New pairing code** disconnects every tool that uses the old code. Copy the new command into the tools you want back. A tool still using the old code makes Settings say "An AI tool tried to connect with an old pairing code. Copy the command again."
- **All ports busy.** If ten tools are already connected, the eleventh can't start its server ("Ports 17337–17346 are all in use"). Close one first. See [Connect AI agents: troubleshooting](/docs/ai-agents#troubleshooting).
- **Keep it read-only for some work.** **Resolve, reply and add notes** applies to every connected tool. Untick it while you only want suggestions. See [Permissions](/docs/ai-agents#permissions).

## Next

[Back up and move your notes](/docs/guide-backup-move).

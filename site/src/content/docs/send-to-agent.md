---
title: Send notes to an agent
description: Hand a specific note to a specific connected AI agent, then watch it reply and resolve the note in your sidebar.
group: AI
order: 32
video: /video/08-send-to-agent.mp4
next: mcp-tools
---

Once an AI agent is connected (see [Connect AI agents](/docs/ai-agents)), it can read every note on your shared sites. **Sending** a note goes further: it assigns that note to one agent, so the agent knows it is its job. Ask the agent to pick up its notes and it starts with exactly the ones you sent.

You can send a note while you write it, or later from its card or table row.

## Send while you write the note

When at least one agent is connected, the note form shows one small icon per connected agent at the right end of its caption line (the line under the text box, next to the selector and the "⇧↵ new line" hint).

1. Mark an element in Inspect Mode (<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>) and write your note.
2. Click the agent's icon. Its tooltip reads "Send to *Agent* when you save". The icon stays pressed.
3. Save the note. The toast reads **Annotation sent to *Agent***.

Only one agent can be picked per note. Click another icon to switch, or click the pressed icon again to unpick it. If no agent is connected, the icons don't appear.

The **Edit** dialog has the same choice: a row of agent buttons where you can change or clear the agent. The agent the note was sent to is listed there even if it is not connected right now.

## Send, take back or re-send from a card or row

Every note card in the sidebar, and every row in the table view, has an orange **Send** button with an agent icon.

- **Send:** click it. Its tooltip reads "Send to an AI agent so it can pick this up".
  - With **one** agent connected, the note goes straight to it. The toast reads **Sent to *Agent***.
  - With **several** agents connected, a **Send to** menu opens. Pick the agent.
  - With **no** agent connected, the toast reads "No AI agent is connected. Connect one in Settings → Connect to AI agents."
- **Take back:** once sent, the button shows that agent's logo and stays pressed. Its tooltip reads "Sent to *Agent*. Click to take it back." Click it and the toast reads **Took the note back from *Agent***.
- **Re-send:** click it again to send it, to the same agent or a different one.

A sent note shows a tag with the agent's logo and name on its card and in its table row.

## The Agent filter

The sidebar's status chips include **Agent**: "Show open notes sent to an AI agent". Each chip shows its count:

- **All**: every note on this page.
- **Open**: notes still open.
- **Agent**: open notes you sent to an agent.
- **Re-pin**: notes whose element was not found.
- **Done**: resolved notes.

Use **Agent** to see what is still waiting on your agents.

## What the agent sees

The agent's starting point is the `get_my_annotations` tool. It returns the open notes you sent to **that** agent, grouped by site, section, page and category, with the element each note points at in words, its CSS selector and its `data-testid`.

A note you send to an agent is visible to that agent even if its site is not in your **Shared sites**. Sending is how you share that one note. Other agents still can't see it.

Each AI tool is recognised by its own name, so a note sent to Cursor shows up in Cursor's `get_my_annotations`, not in Claude Code's.

See [MCP tools reference](/docs/mcp-tools) for everything the agent can call.

## When the agent replies or resolves

If you turned on **Resolve, reply and add notes** in Settings, the agent can write back:

- **Replies** appear under the note text on its card, labelled **AI**. Your own replies are labelled **You**.
- **Resolving** marks the note resolved. Its card shows **Resolved**, it moves to the **Done** filter, and its table row is dimmed. If the agent said what it changed, that appears as an **AI** reply.
- **New notes** that the agent pins get an **AI** tag ("Added by an AI agent").

Every action also appears in **Settings → Connect to AI agents → Recent agent activity**, and blinks the agent's chip in the popup.

Without that permission the agent can still read your notes and tell you what it changed in its own chat, but the notes stay open until you resolve them.

## Reopen a note

Not happy with a fix? Click **Reopen** on the card (the resolve button, which reads "Reopen: move it back to Open"). The note returns to **Open** and, if it is still sent to the agent, to **Agent**. The agent sees it again the next time it calls `get_my_annotations`.

An agent with write permission can also reopen a note itself, with `reopen_annotation`.

## Example session

> **Note:** This is an illustrative example. Your agent's wording, tools and file names will differ.

You send three notes on `localhost:3000/checkout` to Claude Code, then ask:

```text
> Fix the Bluelines notes I sent you.

Calling get_my_annotations…
3 open notes on localhost:3000 → /checkout:
  Bug (2)
    1. button "Pay now" in form "Payment" under "Checkout"
       selector [data-testid="pay-now"] — "pay button overlaps the card field on mobile"
    2. input "Card number" in form "Payment"
       selector #card-number — "error text is cut off"
  Copy / text (1)
    3. heading "Checkout" — "typo: Chekout"

Fixing 1: added mobile margin to PayButton in src/components/PayButton.tsx.
Calling resolve_annotation (text: "Added 16px top margin under 640px in PayButton.tsx")…
Fixing 2: let the error message wrap in src/components/CardField.tsx.
Calling resolve_annotation (text: "Error text now wraps in CardField.tsx")…
Fixing 3: corrected the heading in src/pages/checkout.tsx.
Calling resolve_annotation (text: "Fixed typo in checkout heading")…

All 3 notes are resolved.
```

In your sidebar, the three cards now show **Resolved** with an **AI** reply each, and the **Agent** count drops to 0.

## Related

- [Connect AI agents](/docs/ai-agents)
- [Fix notes with Claude Code](/docs/guide-claude-code-fix)
- [Use several agents](/docs/guide-multiple-agents)
- [Sidebar and status](/docs/sidebar-and-status)

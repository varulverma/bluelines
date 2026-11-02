---
title: Review accessibility and copy
description: Run an accessibility and copy pass with your own categories, mark focusable elements from the keyboard, and turn findings into fix prompts or agent tasks.
group: Guides
order: 64
next: guide-modals-keyboard
---

You do two focused passes over a page: one for accessibility, one for the words. You mark elements with the keyboard where you can, which tests focus order as you go, and you turn each finding into a fix a developer or an AI tool can act on.

## Who it's for

Accessibility reviewers, content designers and UX writers.

## What you'll end up with

- Notes in two categories, **Accessibility** and **Copy**, pinned to elements.
- A fix prompt for any note, ready to paste into a coding tool.
- Notes an AI agent can sort by kind, even the ones you left in the default category.

## What you need

- Bluelines installed. See [Install](/docs/install).
- For Enhance: an API key in **Settings → AI Enhance**. See [Enhance](/docs/enhance).
- For agents: **Connect to AI agents** set up. See [Connect AI agents](/docs/ai-agents).

## Steps

### Add the two categories

1. Open the note form on any element, click the arrow beside the category chip, then **+**. Type `Accessibility` and press <kbd>Enter</kbd>. Do the same for `Copy`.
   Or add both in **Settings → Annotations → Your categories**.
2. If you already have a category with a different name, such as `A11y`, you can rename it everywhere instead: double-click the chip's name in the note form, type the new name, press <kbd>Enter</kbd>. Every saved note in that category moves with it. See [Rename a category](/docs/notes-and-categories#rename-a-category-everywhere).

### Accessibility pass: mark from the keyboard

3. Press <kbd>Tab</kbd> until the dock's **Inspect** button has focus and press <kbd>Enter</kbd>. Or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>.
4. Press <kbd>Tab</kbd> to move through the page. Bluelines highlights each element as it gets focus, so you see the real focus order.
5. When focus lands on a problem, press <kbd>Enter</kbd>. The note form opens for that element.
6. Choose **Accessibility** from the chip's arrow and describe the issue:

   ```text
   Focus ring is invisible on this button in dark mode. Add a 2px outline with at least 3:1 contrast.
   ```

7. Press <kbd>Enter</kbd> to save. Focus returns to where you were, and Inspect Mode turns off; press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> again before you mark the next element.
8. Elements you can't reach with <kbd>Tab</kbd> are findings too. Plain text can't take keyboard focus, so mark it with the mouse, or add a general note with **+** in the sidebar header:

   ```text
   The "Filters" panel can't be reached with Tab at all. It needs to be a button or have tabindex="0" and a key handler.
   ```

See [Keyboard marking](/docs/inspect-mode#mark-with-the-keyboard).

### Copy pass

9. Turn on Inspect Mode again and click each piece of text to fix. Choose **Copy** and write the replacement, not just the problem:

   ```text
   "Submit" is vague. Use "Create account".
   ```

### Turn findings into fixes

10. **With Enhance:** click **Enhance** on a card. Bluelines sends the note text, category, selector and page address (no screenshot) to your provider and copies a fix prompt to your clipboard ("Enhanced prompt copied to clipboard!"). Paste it into your coding tool.
11. **With an AI agent:** send the notes to your connected tool from the note form or the card, then ask:

    ```text
    Fix the open Bluelines Accessibility notes on localhost:3000, then the Copy notes. Resolve each one with a short reply.
    ```

Agents see your categories as you named them. Notes left in the default **UI** category (or a generic one like `Note` or `General`) are grouped by a kind Bluelines infers from the wording: **Accessibility**, **Bug**, **Copy / text**, **Visual / layout**, **Question** or **Suggestion**. Words like "contrast", "aria", "alt text", "keyboard", "focus order" or "WCAG" read as **Accessibility**. "Typo", "wording", "label" or "headline" read as **Copy / text**. See [Inferred kinds](/docs/mcp-tools#categories-and-inferred-kinds).

> **Tip:** If you don't want to pick a category for every note, leave them in **UI** and use those words. The agent still gets them sorted.

## Do more with it

- **Hand the pass to a writer.** In the table, click the **Copy** chip, check the list, then **Copy as → Markdown**. Copy as covers every note in scope, not just the filtered ones, so use **This page** on a page with only copy notes, or remove what you don't need after pasting.
- **Check contrast on your own panels.** If the page is very light or very dark, **Settings → Appearance → In-page panels → Solid** keeps Bluelines' own panels easiest to read.
- **Larger text while reviewing.** **Settings → Appearance → Text size → Large**.

## Next

[Annotate dropdowns, menus and modals](/docs/guide-modals-keyboard).

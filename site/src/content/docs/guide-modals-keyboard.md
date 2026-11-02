---
title: Annotate dropdowns, menus, modals and keyboard flows
description: Mark elements that disappear when you click away, work inside modal dialogs, and review a whole flow without touching the mouse.
group: Guides
order: 65
next: guide-multiple-agents
---

Some of the most important UI only exists while it's open: a dropdown, a menu, a date picker, a modal. Clicking the dock to start Inspect Mode would close it. This guide shows how to mark those, and how to run a review entirely from the keyboard.

## Who it's for

Anyone reviewing menus, overlays, multi-step forms or keyboard behaviour.

## What you'll end up with

- Notes pinned to items inside open dropdowns, menus and modal dialogs.
- A keyboard-only review of a flow, with notes on each step.
- General notes for the things that can't be pinned.

## What you need

- Bluelines installed. See [Install](/docs/install).
- The shortcuts at their defaults, or your own set in `chrome://extensions/shortcuts`. See [Keyboard shortcuts](/docs/keyboard-shortcuts).

## Steps

### A dropdown or menu

1. Open the dropdown on the page as a user would.
2. With it still open, press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>. Inspect Mode starts without a click, so the menu stays open.
3. Hover the menu item and click it. Bluelines catches the click, so the item isn't activated and the menu doesn't navigate away.
4. Write the note and press <kbd>Enter</kbd>.

> **Tip:** For menus that open on hover, keep the pointer over the menu while you press the shortcut.

### A modal dialog

5. Open the dialog. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>.
6. While the page shows a modal `<dialog>`, Bluelines moves its own interface into the dialog, so the highlight, note form and toasts stay usable on top of it.
7. Click the element in the dialog, write the note, save.

### Review a flow with the keyboard only

8. Press <kbd>Tab</kbd> until the dock's **Inspect** button has focus, then press <kbd>Enter</kbd>.
9. Press <kbd>Tab</kbd> to move through links, buttons and fields. Each one is highlighted as it takes focus. Press <kbd>Enter</kbd> on the one you want to mark.
10. In the note form:
    - <kbd>Enter</kbd> saves, <kbd>Shift</kbd>+<kbd>Enter</kbd> adds a line.
    - <kbd>Shift</kbd>+<kbd>Tab</kbd> from the note text reaches the category arrow. <kbd>Enter</kbd> opens the menu, <kbd>Esc</kbd> closes it.
    - <kbd>Esc</kbd> cancels the note.
11. Press <kbd>Esc</kbd> to leave Inspect Mode. Anywhere in Bluelines, <kbd>Esc</kbd> closes the innermost layer first (the screenshot viewer, a menu, the table, then the sidebar) and puts focus back where you were.
12. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> to open the sidebar and <kbd>Tab</kbd> through the cards and their buttons.

See [Keyboard marking](/docs/inspect-mode#mark-with-the-keyboard).

### Things you can't pin

13. Some things have no element to click: a hover state, a toast that vanishes, an animation, the whole page's feel. Open the sidebar and click **+** in its header. The form says "General note · no location".

    ```text
    The success toast after "Save" disappears in under a second. Keep it for at least 4 seconds.
    ```

## Do more with it

- **Notes inside closed menus.** When a menu closes, its items usually leave the page, so their notes show **Element not found** and count under **Re-pin**. Open the menu again, then reopen the sidebar, and the note finds its element. Use **Re-pin** only if the item really moved. See [Re-pin](/docs/sidebar-and-status#element-not-found-and-re-pin).
- **Move the dock off the content.** Tab to the dock's drag handle, press <kbd>Enter</kbd>, move it with the arrow keys (hold <kbd>Shift</kbd> for bigger steps) and press <kbd>Enter</kbd> to drop it. It snaps to the nearest edge.
- **Know the limits.** Bluelines can't mark inside iframes or shadow DOM, and screenshots only cover what's visible in the window. See [Known limitations](/docs/browser-support#known-limitations).

## Next

[Work with several AI tools at once](/docs/guide-multiple-agents).

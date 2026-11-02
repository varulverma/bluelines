---
title: Keyboard shortcuts
description: Every Bluelines shortcut, how to change them, how Esc works, and how to use Bluelines with the keyboard alone.
group: Use Bluelines
order: 24
---

## Global shortcuts

These work on any page Bluelines can run on, even before you've clicked anything.

| Shortcut | What it does |
|---|---|
| <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> | Turns [Inspect Mode](/docs/inspect-mode) on or off. Use it to mark elements inside an open dropdown, popup or modal, where a click would close it first. |
| <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> | Opens or closes the sidebar. Also brings back a hidden dock. |
| <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> | Shows or hides the dock. |
| <kbd>Esc</kbd> | Closes the innermost open layer and returns focus. See [How Esc works](#how-esc-works). |

The toolbar popup shows your current shortcuts next to **Open sidebar** and **Inspect Mode**.

## Shortcuts in the note callout

| Shortcut | What it does |
|---|---|
| <kbd>Enter</kbd> | Saves the note. |
| <kbd>Shift</kbd>+<kbd>Enter</kbd> | Adds a new line. |
| <kbd>Esc</kbd> | Closes the category menu if it's open, otherwise cancels the note. |
| <kbd>Enter</kbd> in the new-category field | Adds the category and selects it. |
| <kbd>Enter</kbd> / <kbd>Esc</kbd> while renaming a category | Saves / cancels the new name. |

In the **Edit annotation** dialog, <kbd>Enter</kbd> saves, <kbd>Shift</kbd>+<kbd>Enter</kbd> adds a new line and <kbd>Esc</kbd> cancels.

## Change the shortcuts

1. Open the shortcuts page.

   Chrome, Brave and Arc:

   ```text
   chrome://extensions/shortcuts
   ```

   Edge:

   ```text
   edge://extensions/shortcuts
   ```

2. Find **Bluelines — Visual Annotation Tool**.
3. Click the pencil next to a command and press the new keys.

The three commands are *Toggle Inspect Mode*, *Toggle the Bluelines annotations sidebar* and *Show/hide the floating dock*.

> **Note:** Browsers apply Bluelines' suggested shortcuts only on a fresh install. If you installed an earlier build, or a shortcut is blank, set it once on this page. Older builds suggested <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>, <kbd>P</kbd> and <kbd>M</kbd>, which clash with browser shortcuts, so the browser never assigned them.

## How Esc works

<kbd>Esc</kbd> closes one layer at a time, starting with the innermost, and puts focus back where you were.

| What's open | One press of Esc | Focus goes to |
|---|---|---|
| Inspect Mode (or Re-pin) | Leaves Inspect Mode only. The sidebar underneath stays open. | Where it was |
| Moving the dock with the keyboard | Cancels the move and puts the dock back. | The drag handle |
| Renaming a category | Cancels the rename. | The note field |
| Category menu in the callout | Closes the menu. | The category arrow |
| Note callout | Cancels the note. | Where you were before it opened |
| Edit dialog | Closes it without saving. | The button that opened it |
| Screenshot lightbox | Closes it. | The thumbnail |
| A menu (Export, Copy format, Copy as, Send to) | Closes it. | The button that opened it |
| Table view | Closes it. | The dock's **Table view** button if you opened it there, otherwise the **Annotations sidebar** button |
| Sidebar | Closes it. | The **Annotations sidebar** button in the dock |

> **Note:** Bluelines only handles <kbd>Esc</kbd> for its panels while focus is inside them, so the page's own <kbd>Esc</kbd> behaviour keeps working.

## Use Bluelines with the keyboard only

Every control in the dock, sidebar, table and callout is a real button you can reach with <kbd>Tab</kbd>. Card and row actions, filter chips, the callout and the dock handle show their tooltip on keyboard focus as well as on hover; the other buttons show it on hover only, and every button has a spoken label.

### Mark an element

1. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>, or Tab to **Inspect** in the dock and press <kbd>Enter</kbd>.
2. Press <kbd>Tab</kbd> to move through the page's links, buttons and fields. Each one is outlined as it gets focus.
3. Press <kbd>Enter</kbd> to mark the focused element. The callout opens with the note field focused.
4. Type your note and press <kbd>Enter</kbd> to save.

Plain text can't take keyboard focus. For it, add a general note: open the sidebar, Tab to **+** and press <kbd>Enter</kbd>.

### Pick a category

In the callout, press <kbd>Shift</kbd>+<kbd>Tab</kbd> to reach the category arrow and press <kbd>Enter</kbd>. Tab to a category and press <kbd>Enter</kbd>. Focus returns to the note field. The **Rename** item in the menu renames the category without a double-click.

### Review notes

1. Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> to open the sidebar.
2. Tab to a status filter and press <kbd>Enter</kbd> to filter.
3. Tab to a card's number chip and press <kbd>Enter</kbd> to jump to its element.
4. Tab through the card's action buttons and press <kbd>Enter</kbd> to use one.
5. Press <kbd>Esc</kbd> to close the sidebar.

### Move or hide the dock

- Tab to the Bluelines mark at the start of the dock and press <kbd>Enter</kbd>. Move it with the arrow keys (hold <kbd>Shift</kbd> for bigger steps), then press <kbd>Enter</kbd> to drop it. It snaps to the nearest edge.
- Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> to hide or show the dock.

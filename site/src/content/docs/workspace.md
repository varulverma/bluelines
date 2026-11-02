---
title: Workspace and categories
description: Choose how the sidebar opens, whether page pins show, how notes are coloured, which categories you use, and when the dock is visible.
group: Customize
order: 51
---

These settings change how Bluelines behaves while you review, not how it looks. Open them from the toolbar popup: click **Settings**, then scroll to **Workspace** and **Annotations**. Changes apply at once in every open tab.

## Workspace

### Sidebar opens as

| Option | What it does |
|---|---|
| **Compact rail** | The default. The sidebar opens as a slim 56 px column of numbered notes that expands when you hover over it. |
| **Full panel** | The sidebar opens at full width, with every card readable straight away. |

You can still switch from the sidebar itself: the rail icon in the sidebar header toggles between the two, and Bluelines remembers your last choice.

### Page pins

| Option | What it does |
|---|---|
| **Show** | The default. Numbered markers sit on annotated elements while the sidebar is open. Click a pin to jump to its card. |
| **Hide** | No markers on the page. The sidebar and table work as before. |

Hide pins when you're taking clean screenshots of the page, or when pins cover small controls you still need to click.

### Note colours

This sets the colour of the numbers in the sidebar and on page pins.

| Option | What it does |
|---|---|
| **Accent** | The default. Every number uses your [accent colour](/docs/appearance#accent-colour). |
| **By category** | Each category gets its own colour, so you can see bugs, suggestions and copy notes apart at a glance. |

> **Note:** **Reset appearance** in the Appearance section also resets Page pins and Note colours. It doesn't change how the sidebar opens.

## Annotations

The Annotations section controls what the note form offers after you select an element.

### Your categories

Bluelines starts with one category, **UI**. Build your own list here:

- **Add.** Type a name into **New category (e.g. Copy, Layout)** and click **Add**. Names must be unique, ignoring case.
- **Rename.** Edit the name in its field and press <kbd>Enter</kbd> or click away. Every saved note in that category, on every page, moves to the new name.
- **Delete.** Click **Delete** next to it. Notes already in that category keep it, still labelled with the old name. You can't delete the last category, because new notes need one to go into.

A short message under the list confirms each change, for example "Added Copy." or "Renamed UI to Layout.".

New notes use the **first category in the list** unless you open the category chip's arrow in the note form and pick another. You can also add a category from the same menu with its **+** button (*Add a new category*), and rename one from the chip. See [Notes and categories](/docs/notes-and-categories).

### Categories: Hide or Show

| Option | What it does |
|---|---|
| **Hide** | The default. The Edit dialog has no category picker, so editing a note keeps its category. |
| **Show** | The Edit dialog shows the category picker, so you can move a note to another category while you edit it. |

This setting affects only the **Edit** dialog. The new-note form always shows its category chip. The change applies to the next form you open.

## The dock

The dock is the small floating bar with the **Inspect**, **Annotations sidebar** and **Table view** buttons. Drag it by its handle and it snaps to the nearest edge of the window.

- Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd> to hide or show it.
- Or click its close button (**Hide dock**). Bluelines tells you how to bring it back.

With the dock hidden, everything still works: press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> for Inspect Mode, <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> for the sidebar, or use **Open sidebar** in the toolbar popup. Bluelines remembers whether the dock is hidden. Its position resets to the bottom centre on each new page.

If a shortcut does nothing, check it at `chrome://extensions/shortcuts`. See [Keyboard shortcuts](/docs/keyboard-shortcuts).

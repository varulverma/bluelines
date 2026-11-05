# Chrome Web Store listing copy

Written for: the Chrome Web Store dashboard. Paste each block into the matching
field. The detailed description field does **not** render Markdown, so the block
below is deliberately plain text with blank lines and hyphen bullets only.

---

## Name (75 char limit, currently 34)

```
Bluelines : Visual Annotation Tool
```

## Short description (132 char limit, currently 130)

Matches `description` in `extension/manifest.json`. Keep the two in sync.

```
Pin comments to any element on a live web page, then export them as a spreadsheet, a report, or a prompt for your AI coding agent.
```

## Single-purpose statement (dashboard field)

```
Bluelines lets a user attach review comments to specific elements on a web page and export those comments for a developer or an AI coding agent.
```

---

## Detailed description (paste as plain text)

Identical to `marketing/exports/chrome-store/DESCRIPTION.txt`. No lists of formats, apps, agents or
providers: the 1.0.0 draft was rejected on 5 Nov 2026 for "excessive keywords" (ref. Yellow Argon).

```
Bluelines lets you point at what's wrong instead of describing it.

Turn on Inspect, click any element on any live web page, and pin a note to it. Every note keeps the element's CSS selector, a fingerprint so it can find that element again, the page URL and a screenshot. When you're done, send the notes to your developer or straight to your AI coding agent.

Built for anyone who reviews web pages for a living: designers doing QA, PMs writing feedback, developers reviewing what an AI just built, and anyone tired of writing "the button on the third row looks off".


WHAT YOU CAN DO

- Inspect any element with a crosshair, see its selector and size as you hover
- Pin a note to it, sorted into categories you control
- Browse notes in a sidebar or a sortable table, with numbered pins on the page
- Filter by status: Open, Agent, Re-pin, Done
- Re-open a page later and Bluelines finds the elements again. If an element genuinely moved or vanished, it says "Re-pin" instead of guessing


HAND NOTES TO AN AI CODING AGENT

Bluelines ships an MCP bridge, a small local server that lets AI coding agents that support MCP read your notes, reply to them and mark them resolved. Assign a note to an agent and it picks it up, fixes the code and closes the loop.

The bridge is off until you turn it on and read-only by default. It runs on your machine, on localhost, behind a pairing code. Agents see only notes from the sites you choose to share, plus any single note you send them.


EXPORT ANYWHERE

Download your notes as a spreadsheet with the screenshots included, as a PDF or web report, or in common data formats. You can also copy a single note in a format that pastes cleanly into your issue tracker or team chat, or save an export to Google Drive if you choose to connect it.


PRIVATE BY DEFAULT

- No account, no sign-up, no Bluelines server
- Your notes and screenshots stay in your browser's local storage
- No telemetry, no analytics, no tracking of any kind
- Free and open source, MIT licensed

Data leaves your browser only when you use one of three optional features, each off until you set it up:
- Enhance tidies up a note's wording with your own AI provider's API key. It asks for consent the first time and sends that note's text, category and selector, plus the page address without its query string. No screenshot.
- Google Drive export uploads a spreadsheet you built to your own Drive. It can only see files Bluelines created.
- The AI agent bridge shares notes from the sites you choose with a coding agent running on your own computer.

Full details: https://getbluelines.netlify.app/docs/privacy/


MADE TO BE USED ALL DAY

Change the colours, text size and panel style to suit you, in light or dark mode. Everything works from the keyboard, focus is always visible, and motion is reduced if your system asks for it.

Works on any website. No framework required, nothing to install in your codebase.


Docs: https://getbluelines.netlify.app/docs/
Source: https://github.com/varulverma/bluelines

See. Mark. Explain. Ship.
```

---

## Permission justifications (dashboard fields)

| Permission | Justification to paste |
|---|---|
| `host_permissions: <all_urls>` | Bluelines is a review tool for any website the user chooses to review, so it cannot predict which sites it will run on. The content script draws the annotation UI on the page the user is reviewing, reads the clicked element to build a CSS selector for it, and `captureVisibleTab` takes the screenshot attached to the note. It does not read or transmit page content otherwise. |
| `storage` | Stores the user's notes, screenshots and settings locally. |
| `unlimitedStorage` | A single reviewed page can carry dozens of PNG screenshots, which exceeds the default `chrome.storage.local` quota quickly. |
| `scripting` | Injects the annotation UI into tabs that were already open when the extension was installed or updated, so the user does not have to reload every tab. |
| `identity` | Only for the optional Google Drive export, via `launchWebAuthFlow` with the `drive.file` scope. The user signs in explicitly from the settings page; the extension works fully without it. |
| `alarms` | Polls the optional local MCP bridge on `localhost` every 30 seconds while the user has turned it on, so notes sent from an AI coding agent appear in the sidebar. |

## Data-use disclosure (Privacy tab)

Tick **Website content** and **Web history** only. Leave every other type unticked
(personally identifiable, health, financial, authentication, personal communications,
location, user activity). Tick all three certifications. Full wording for each field:
`marketing/exports/chrome-store/PRIVACY-ANSWERS.md`.

Privacy policy URL: `https://getbluelines.netlify.app/docs/privacy/`

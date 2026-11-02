// All copy and facts for the Bluelines launch page.
// Facts come from the extension's README, manifest and DESIGN.md (v1.0.0).
// Assumptions (placeholder: true below, replace before launch):
//   - github: the repository URL (README there should carry the install steps)
//   - url: the production domain

export const site = {
  name: 'Bluelines',
  tagline: 'See. Mark. Explain. Ship.',
  url: 'https://getbluelines.netlify.app', // Netlify address; switch to the custom domain once attached
  title: 'Bluelines | Mark up any live website',
  description:
    'Bluelines is a browser extension for Chrome, Edge, Brave, Arc and other Chromium browsers that pins notes to elements on any live website and hands them to your developer or AI coding agent. Local-first, no account.',
  version: '1.0.0',
  github: { href: 'https://github.com/varulverma/bluelines' },
};

// Header nav: pages only, the few that matter. The full map is in the footer (`resources`).
export const nav = [
  { label: 'Docs', href: '/docs/' },
  { label: 'Install', href: '/docs/install/' },
  { label: 'AI agents', short: 'Agents', href: '/docs/ai-agents/' },
  { label: 'Changelog', href: '/docs/changelog/' },
];

// Docs sidebar groups, in nav order. content.config.ts validates `group` against this list.
export const docGroups = ['Get started', 'Use Bluelines', 'AI', 'Share', 'Customize', 'Guides', 'Reference'] as const;

export const chapters = [
  { id: 'see', n: '01', word: 'See' },
  { id: 'mark', n: '02', word: 'Mark' },
  { id: 'explain', n: '03', word: 'Explain' },
  { id: 'ship', n: '04', word: 'Ship' },
];

// Review notes the page's own bracket pins as you read. Short, in the product's note voice.
export const reviewNotes = {
  hero: { cat: 'note', text: 'Headline reads in under 3 seconds. Ship it.' },
  see: { cat: 'note', text: 'This record is measured live from the element in the frame.' },
  mark: { cat: 'text', text: 'Start with UI. Add the words your team already uses.' },
  explain: { cat: 'bug', text: '"Looks off" is not a ticket. The prompt on the right is.' },
  ship: { cat: 'note', text: 'Every export carries the page URL on each row.' },
  privacy: { cat: 'note', text: 'This site sent nothing about you anywhere. Check the network tab.' },
};

// Bluelines starts with one category, "UI". The rest are examples of categories a reviewer adds.
export const categories = [
  { id: 'note', name: 'UI', use: 'The one you start with. Spacing, alignment, polish.', example: 'Pay now sits too close to the total. Give it the same 24 px gap as the coupon field.' },
  { id: 'bug', name: 'Broken', use: 'Something is broken or wrong.', example: 'Coupon field accepts an empty code and shows "Applied".' },
  { id: 'text', name: 'Wording', use: 'Typos, tone, labels.', example: 'Say "Review and pay" so it reads as the last step.' },
  { id: 'suggestion', name: 'Accessibility', use: 'Contrast, focus, labels, keyboard.', example: 'Delivery options need a visible focus ring.' },
];

// What Enhance actually sends (background.js enhancePrompt), and an example of what comes back.
export const enhance = {
  sent: [
    ['Annotation type', 'Broken'],
    ['Raw comment', 'button looks off on mobile'],
    ['Element selector', 'button#pay'],
    ['Page URL', 'https://fernhill.test/checkout'],
  ] as [string, string][],
  output:
    'On https://fernhill.test/checkout, fix button#pay on viewports under 400 px: its label wraps to two lines and doubles the button height. Keep the label on one line (reduce horizontal padding before shrinking the type), keep a 44 px tap height, and change only this component.',
};

export const agents = [
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'cursor', name: 'Cursor' },
  { id: 'codex', name: 'Codex' },
  { id: 'copilot', name: 'GitHub Copilot' },
  { id: 'windsurf', name: 'Windsurf' },
  { id: 'cline', name: 'Cline' },
  { id: 'zed', name: 'Zed' },
  { id: 'gemini', name: 'Gemini CLI' },
  { id: 'opencode', name: 'opencode' },
  { id: 'claude-desktop', name: 'Claude Desktop' },
];

export const exportsList = [
  { ext: '.xlsx', name: 'Excel', what: 'A real spreadsheet with each screenshot embedded as an image in its row.' },
  { ext: '.html', name: 'HTML report', what: 'One standalone file with the table and inline screenshots. Opens in any browser.' },
  { ext: '.csv', name: 'CSV', what: 'Every cell quoted, and values that look like formulas are defused.' },
  { ext: '.pdf', name: 'PDF', what: 'A print-ready page that opens the print dialog. Save as PDF from there.' },
  { ext: '.zip', name: 'ZIP bundle', what: 'annotations.json, report.html and a screenshots folder, together.' },
  { ext: 'Drive', name: 'Google Drive', what: 'Uploads the Excel audit to your own Drive, only when you click.' },
];

export const copyFormats = ['Markdown', 'JSON', 'XML', 'Notion', 'Linear', 'Jira'];

export const accents = [
  { name: 'Cyan', hex: '#00e5ff' },
  { name: 'Lime', hex: '#c6f432' },
  { name: 'Orange', hex: '#ff7a1a' },
  { name: 'Pink', hex: '#ff4fd8' },
  { name: 'Violet', hex: '#a78bfa' },
  { name: 'White', hex: '#f2f2f2' },
];

export const privacy = {
  stays: [
    ['Notes and screenshots', 'Saved in this browser’s extension storage, keyed to the page URL.'],
    ['Marking, saving, viewing', 'Work fully offline. No network call in the save or load path.'],
    ['Every file export', 'Built on your machine and downloaded straight to it.'],
    ['You', 'No account, no server, no analytics, no telemetry.'],
  ] as [string, string][],
  leaves: [
    ['Enhance', 'Sends the note, its category, the selector and the page address without query or #fragment to the AI provider you picked, with your own key. No screenshots. Asked once per provider.'],
    ['Send to Google Drive', 'Uploads the Excel export to your Drive. Bluelines can see only files it created there. Asked once.'],
    ['AI agents', 'Off until you turn it on. Talks only to 127.0.0.1, only for the sites you share, read-only by default.'],
  ] as [string, string][],
};

export const shortcuts = [
  { keys: ['Alt', 'Shift', 'M'], what: 'Inspect mode on or off. Works inside open menus and dialogs.' },
  { keys: ['Alt', 'Shift', 'D'], what: 'Open or close the notes sidebar.' },
  { keys: ['Alt', 'Shift', 'H'], what: 'Show or hide the dock.' },
  { keys: ['Esc'], what: 'Close the innermost layer and return focus where it was.' },
];

// Browsers, with the honest status from docs/browser-support.md. Logos: Simple Icons (CC0).
export const browsers = [
  { id: 'chrome', name: 'Chrome', page: 'chrome://extensions', status: 'Tested' },
  { id: 'edge', name: 'Edge', page: 'edge://extensions', status: 'Tested' },
  { id: 'brave', name: 'Brave', page: 'brave://extensions', status: 'Chromium' },
  { id: 'arc', name: 'Arc', page: 'arc://extensions', status: 'Chromium' },
  { id: 'opera', name: 'Opera', page: 'opera://extensions', status: 'Chromium' },
  { id: 'vivaldi', name: 'Vivaldi', page: 'vivaldi://extensions', status: 'Chromium' },
  { id: 'firefox', name: 'Firefox', page: 'about:debugging', status: 'Experimental' },
  { id: 'zen', name: 'Zen', page: 'about:debugging', status: 'Experimental' },
];

// One line to get the code. The extension lives in the repo's extension/ folder, so Load unpacked points there.
export const cloneCmd = `git clone --depth 1 ${site.github.href}.git`;

// Footer sitemap: every useful page, grouped. Docs slugs match src/content/docs/*.md.
export const resources = [
  { group: 'Product', links: [
    ['Home', '/'],
    ['GitHub repository', site.github.href],
    ['Download ZIP', `${site.github.href}/archive/refs/heads/main.zip`],
    ['Install guide', '/docs/install/'],
    ['Quickstart', '/docs/quickstart/'],
    ['Browser support', '/docs/browser-support/'],
  ] },
  { group: 'Learn', links: [
    ['Documentation', '/docs/'],
    ['Inspect mode', '/docs/inspect-mode/'],
    ['Keyboard shortcuts', '/docs/keyboard-shortcuts/'],
    ['Export and share', '/docs/export-and-share/'],
    ['Tips', '/docs/tips/'],
  ] },
  { group: 'AI agents', links: [
    ['Connect an AI agent', '/docs/ai-agents/'],
    ['Send notes to an agent', '/docs/send-to-agent/'],
    ['MCP tools reference', '/docs/mcp-tools/'],
    ['Enhance with AI', '/docs/enhance/'],
    ['llms.txt', '/llms.txt'],
  ] },
  { group: 'Help', links: [
    ['Troubleshooting', '/docs/troubleshooting/'],
    ['Report a bug', `${site.github.href}/issues/new`],
    ['Changelog', '/docs/changelog/'],
    ['Privacy', '/docs/privacy/'],
    ['Security policy', `${site.github.href}/blob/main/SECURITY.md`],
    ['License', `${site.github.href}/blob/main/LICENSE`],
  ] },
] as { group: string; links: [string, string][] }[];

// Installing from GitHub (Load unpacked), as in the extension's README.
export const installSteps = [
  ['Get the code', 'Download the ZIP from GitHub and unzip it, or run the git clone line above.'],
  ['Open extensions', 'Go to your browser’s extensions page (chrome://extensions, edge://extensions, brave://extensions) and switch on Developer mode.'],
  ['Load unpacked', 'Click Load unpacked and pick the extension folder inside the bluelines folder. The Burst appears in your toolbar.'],
  ['Start marking', 'Open any page and press Alt+Shift+M. For local files, allow file URLs on the extension’s details page.'],
] as [string, string][];

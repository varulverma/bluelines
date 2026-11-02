// Captures real Bluelines screenshots for the landing page (src/assets/shots) and the docs
// (src/content/docs/img), from the extension in ../extension running on a demo checkout page.
//   node scripts/capture-shots.cjs          (headless; HEADED=1 to watch)
// Windows Chrome by default; set CHROME_PATH for another browser.
const fs = require('fs');
const path = require('path');
const http = require('http');
const cp = require('child_process');

const EXT = path.resolve(__dirname, '../../extension');
const LAND = path.resolve(__dirname, '../src/assets/shots');
const DOCS = path.resolve(__dirname, '../src/content/docs/img');

// Real 1440×900 window at 2× (not Emulation), so the extension's own captureVisibleTab crops match the page.
const spawn0 = cp.spawn;
cp.spawn = (cmd, args, opts) => spawn0(cmd, args.map((a) => (a.startsWith('--window-size') ? '--window-size=1456,995' : a)).concat('--force-device-scale-factor=2', '--hide-scrollbars'), opts);
const { launch, sleep, poll } = require(path.join(EXT, 'tests/lib/cdp'));

const html = fs.readFileSync(path.join(__dirname, 'demo-checkout.html'));
const server = http.createServer((req, res) => {
  const ok = req.url.split('?')[0] === '/';
  res.writeHead(ok ? 200 : 404, { 'content-type': 'text/html; charset=utf-8' });
  res.end(ok ? html : 'not found');
});

let h;
async function main() {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const URL = `http://127.0.0.1:${server.address().port}/`;
  h = await launch({ ext: EXT, prefix: 'bluelines-shots-' });
  const { cdp } = h;
  // A reviewer's own categories (a fresh install starts with just "UI").
  await h.ev(h.sw, `chrome.storage.local.set({ dn_categories: ['UI', 'Broken', 'Wording', 'Accessibility'], dn_show_categories: true, dn_sidebar_compact: false, dn_theme: 'dark' }).then(() => true)`);

  // Crop = union of the selectors' boxes plus padding, in CSS px (document coordinates).
  const rectOf = (s, sels, pad) => h.ev(s, `(() => {
    let l = 1e9, t = 1e9, r = -1e9, b = -1e9;
    for (const sel of ${JSON.stringify(sels)}) { const el = document.querySelector(sel); if (!el) continue;
      const q = el.getBoundingClientRect(); l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); }
    const p = ${pad}; return { x: Math.max(0, l - p) + scrollX, y: Math.max(0, t - p) + scrollY, width: r - l + 2 * p, height: b - t + 2 * p, scale: 1 };
  })()`);
  // dir: LAND (full viewport for the landing page) or DOCS (usually a crop)
  const shot = async (s, dir, name, clip) => {
    await sleep(700); // let transitions settle
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip, captureBeyondViewport: true } : {}) }, s, 30000);
    fs.writeFileSync(path.join(dir, name + '.png'), Buffer.from(data, 'base64'));
    console.log('saved', path.basename(dir), name);
  };

  const { s } = await h.openPage(URL);
  await sleep(500);
  const ev = (e) => h.ev(s, e);
  const moveTo = async (x, y) => {
    for (let i = 0; i < 6; i++) await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x - 40 + i * 8, y: y - 10 + i * 2 }, s);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }, s);
  };
  const box = (sel) => ev(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })()`);
  const toastGone = () => poll(() => ev(`!document.querySelector('#bluelines-root .dn-toast.show, #bluelines-root .dn-toast.visible')`), 8000);

  // Inspect Mode on the Pay button: full view, the dock, the hover chips
  await h.domClick(s, '#bluelines-mode-btn');
  const [bx, by] = await box('#pay');
  await moveTo(bx + 30, by + 4);
  await sleep(4500); // the "Inspect Mode" toast fades
  await toastGone();
  await shot(s, LAND, 'inspect');
  await shot(s, DOCS, 'dock', await rectOf(s, ['#bluelines-pill'], 28));
  await shot(s, DOCS, 'hover-chips', await rectOf(s, ['#pay', '#dn-highlight-label', '#dn-highlight-size'], 40));

  // The note callout
  await h.realClick(s, bx + 30, by + 4);
  await poll(() => ev(`!!document.querySelector('#bluelines-popup-form')`));
  await sleep(400);
  const pick = (type) => ev(`document.querySelector('#bluelines-popup-form .dn-type-pill[data-type="${type}"]').click(); true`);
  await pick('UI');
  await ev(`document.querySelector('#dn-text-input').focus(); true`);
  await cdp.send('Input.insertText', { text: 'Too close to the total. Give it the same 24 px gap as the coupon field.' }, s);
  await shot(s, LAND, 'form');
  await shot(s, DOCS, 'callout', await rectOf(s, ['#pay', '#dn-highlight-label', '#bluelines-popup-form'], 32));

  const total = async () => ((await h.storage())['dn_annotations::' + URL] || []).length;
  const save = async () => {
    const before = await total();
    await h.domClick(s, '#bluelines-popup-form .dn-form-save');
    await poll(async () => (await total()) > before, 10000);
    await sleep(400);
  };
  await save();
  const note = async (sel, type, text) => {
    await h.domClick(s, '#bluelines-mode-btn');
    const [x, y] = await box(sel);
    await moveTo(x, y);
    await sleep(150);
    await h.realClick(s, x, y);
    await poll(() => ev(`!!document.querySelector('#bluelines-popup-form')`));
    await pick(type);
    await ev(`document.querySelector('#dn-text-input').focus(); true`);
    await cdp.send('Input.insertText', { text }, s);
    await save();
  };
  await note('#title', 'Wording', 'Say "Review and pay" so it reads as the last step.');
  await note('#apply', 'Broken', 'Apply works with an empty code. Keep it disabled until a code is typed.');
  await note('#guides', 'Accessibility', 'Nav links lose their focus ring. Keep a visible 2 px outline.');
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 700, y: 870 }, s);
  await sleep(4000);
  await toastGone();

  // Sidebar with pins on the page
  await h.domClick(s, '#bluelines-toggle-btn');
  await sleep(800);
  await shot(s, LAND, 'sidebar');
  await shot(s, DOCS, 'sidebar');

  // Table and its Export menu
  await h.domClick(s, '#dn-table-btn');
  await sleep(800);
  await shot(s, LAND, 'table');
  await shot(s, DOCS, 'table');
  await h.domClick(s, '#dn-export-menu-btn-table');
  await sleep(400);
  await shot(s, LAND, 'export');
  await shot(s, DOCS, 'export-menu', await ev(`(() => { const m = [...document.querySelectorAll('#bluelines-root .dn-action-menu, #bluelines-root [role="menu"]')].pop(); const b = document.querySelector('#dn-export-menu-btn-table').getBoundingClientRect(); const r = m.getBoundingClientRect();
    const l = Math.min(b.left, r.left) - 24, t = b.top - 24; return { x: l, y: t, width: Math.max(b.right, r.right) + 24 - l, height: r.bottom + 24 - t, scale: 1 }; })()`));

  // Toolbar popup, opened as a tab but pointed at the demo tab (as if clicked over it)
  await ev(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); document.getElementById('dn-table-close-btn')?.click(); true`);
  const tabId = await h.ev(h.sw, `chrome.tabs.query({ url: '${URL}' }).then((t) => t[0].id)`);
  const pop = await h.openPage('about:blank', { waitPill: false });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: `{ const q = chrome.tabs.query.bind(chrome.tabs); chrome.tabs.query = (o, cb) => q({}).then((all) => { const t = all.filter((x) => x.id === ${tabId}); cb ? cb(t) : 0; return t; }); }` }, pop.s);
  await cdp.send('Page.navigate', { url: `chrome-extension://${h.extId}/popup.html` }, pop.s);
  await sleep(1500);
  await shot(pop.s, DOCS, 'popup', await rectOf(pop.s, ['body'], 0));

  // Settings sections. Agent access is preset on (the toggle wants a trusted confirm click);
  // the path and pairing code are examples.
  await h.ev(h.sw, `chrome.storage.local.set({ dn_bridge_enabled: true, dn_bridge_token: '7f3a9c2e51d84b06', dn_bridge_path: 'C:/Tools/bluelines/extension' }).then(() => true)`);
  const set = await h.openPage(`chrome-extension://${h.extId}/settings.html`, { waitPill: false });
  await sleep(1000);
  const sectionRect = (h2, until) => // until: JS expression for the element the crop ends at
   h.ev(set.s, `(() => { const r = document.getElementById('${h2}').closest('section').getBoundingClientRect();
    const b = ${until ? `${until}.getBoundingClientRect().bottom + 24` : 'r.bottom + 16'};
    return { x: r.left - 16 + scrollX, y: r.top - 16 + scrollY, width: r.width + 32, height: b - r.top + 16, scale: 1 }; })()`);
  await shot(set.s, DOCS, 'settings-appearance', await sectionRect('h-appearance'));
  await shot(set.s, DOCS, 'settings-enhance', await sectionRect('h-ai'));
  // A fresh setup shows the waiting state; this machine may have an older agent knocking.
  await h.ev(set.s, `(() => { const st = document.getElementById('bridge-status'); st.className = 'drive-status'; st.textContent = 'Waiting for an AI tool…'; return true; })()`);
  await shot(set.s, DOCS, 'settings-agents', await sectionRect('h-agents', "document.querySelectorAll('#bridge-details > .field')[1]"));
}

main()
  .catch((e) => { console.error('ABORTED:', e.stack); process.exitCode = 1; })
  .finally(() => { if (h) h.close(); server.close(); });

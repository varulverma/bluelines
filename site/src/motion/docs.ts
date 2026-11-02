// Docs pages only: "Copy page for AI", the page menu, copy buttons on code blocks, heading anchors.
const live = document.querySelector<HTMLElement>('[data-docs-live]');
const say = (msg: string) => { if (live) { live.textContent = ''; requestAnimationFrame(() => (live.textContent = msg)); } };

// Briefly swap a label to "Copied", then back.
function flash(label: HTMLElement, text = 'Copied') {
  const was = label.dataset.was ?? label.textContent ?? '';
  label.dataset.was = was;
  label.textContent = text;
  clearTimeout(Number(label.dataset.t));
  label.dataset.t = String(setTimeout(() => (label.textContent = was), 1800));
}

const article = document.querySelector<HTMLElement>('[data-docs-md]');

// Copy page for AI: the page's Markdown. If the clipboard is blocked, show it selected for Ctrl+C.
const copyPage = document.querySelector<HTMLButtonElement>('[data-copy-page]');
copyPage?.addEventListener('click', async () => {
  const label = copyPage.querySelector<HTMLElement>('[data-copy-label]')!;
  let text = '';
  try {
    const res = await fetch(article!.dataset.docsMd!);
    if (!res.ok) throw new Error(String(res.status));
    text = await res.text();
  } catch {
    text = article?.innerText ?? '';
  }
  try {
    await navigator.clipboard.writeText(text);
    flash(label);
    say('Page copied as Markdown.');
  } catch {
    const box = document.querySelector<HTMLTextAreaElement>('[data-copy-fallback]');
    if (!box) return;
    box.value = text;
    box.hidden = false;
    box.focus();
    box.select();
    say('Copying is blocked here. The page is selected below: press Ctrl+C to copy it.');
  }
});

// Page menu: Esc closes it, and so does a click elsewhere.
const more = document.querySelector<HTMLDetailsElement>('[data-docs-more]');
if (more) {
  more.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && more.open) { more.open = false; more.querySelector('summary')?.focus(); }
  });
  document.addEventListener('click', (e) => { if (more.open && !more.contains(e.target as Node)) more.open = false; });
  more.querySelector('[data-copy-llms]')?.addEventListener('click', async (e) => {
    const b = e.currentTarget as HTMLElement;
    try { await navigator.clipboard.writeText(new URL('/llms.txt', location.origin).href); flash(b); say('llms.txt link copied.'); }
    catch { location.href = '/llms.txt'; }
  });
}

// Code blocks: a Copy button that copies the code without its trailing newline.
document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
  const wrap = document.createElement('div');
  wrap.className = 'code';
  pre.before(wrap);
  wrap.append(pre);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'code__copy mono';
  btn.setAttribute('aria-label', 'Copy code');
  btn.textContent = 'Copy';
  btn.addEventListener('click', async () => {
    const text = (pre.querySelector('code') ?? pre).textContent?.replace(/\n+$/, '') ?? '';
    try { await navigator.clipboard.writeText(text); flash(btn); say('Code copied.'); }
    catch { getSelection()?.selectAllChildren(pre); say('Copying is blocked here. The code is selected: press Ctrl+C.'); }
  });
  wrap.append(btn);
});

// Callouts: a blockquote that starts with **Note:**, **Tip:** or **Warning:** gets that kind.
document.querySelectorAll<HTMLElement>('.prose blockquote').forEach((q) => {
  const kind = q.querySelector('p:first-child > strong:first-child')?.textContent?.replace(':', '').trim().toLowerCase();
  if (kind === 'note' || kind === 'tip' || kind === 'warning') q.classList.add(`callout--${kind}`);
});

// Heading anchors: a # link after each h2/h3, so a section can be linked to.
document.querySelectorAll<HTMLElement>('.prose :is(h2, h3)[id]').forEach((h) => {
  const a = document.createElement('a');
  a.className = 'anchor';
  a.href = `#${h.id}`;
  a.setAttribute('aria-label', `Link to ${h.textContent}`);
  a.textContent = '#';
  h.append(a);
});

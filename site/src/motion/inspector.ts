// The signature: one bracket frame (the product's Inspect highlight) that every concept visual reads.
// Driver = the element under inspection. Auto mode picks the [data-inspect] block nearest the
// reading line as you scroll and pins its review note; Inspect mode (dock, Alt+Shift+M) hands the
// bracket to the visitor's pointer, focus and taps, and clicks pin their own notes.
// Fans out to: the bracket + chips, the note card, the pins layer, the live record in chapter 01,
// the dock's Notes count. Idle input: the corners breathe and the record's timestamp runs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, scrollToTarget } from '../engine';

type Pin = { el: HTMLElement; node: HTMLElement; n: number; cat: string; text: string };
type Box = { x: number; y: number; w: number; h: number }; // document coordinates

// Display names, as a reviewer would set them up (the extension starts with one category, "UI").
const CAT_NAME: Record<string, string> = { bug: 'Broken', suggestion: 'Accessibility', text: 'Wording', note: 'UI', you: 'UI' };
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#.>-_0123456789';

let reduced = false;
let mode: 'auto' | 'manual' = 'auto';
let current: HTMLElement | null = null;
let arrivedAt = 0;
let introDone = false;
const box: Box = { x: 0, y: 0, w: 0, h: 0 };
const pins: Pin[] = [];
let jumpIndex = -1;

// DOM refs
let root: HTMLElement, corners: HTMLElement[], wash: HTMLElement, sel: HTMLElement, size: HTMLElement;
let note: HTMLElement, noteNum: HTMLElement, noteCat: HTMLElement, noteText: HTMLElement;
let pinLayer: HTMLElement, toast: HTMLElement, toastText: HTMLElement;
let rec: Record<string, HTMLElement> = {};

// ---------- selector + fingerprint, a small cousin of the extension's selector.js ----------
const usable = (c: string) => !/^(split|is-|lenis|motion|js)/.test(c);
function part(el: Element) {
  const tag = el.tagName.toLowerCase();
  if (el.id && el.id !== 'main') return `${tag}#${el.id}`;
  const cls = [...el.classList].find(usable);
  return cls ? `${tag}.${cls}` : tag;
}
export function selectorOf(el: Element) {
  const own = part(el);
  if (own.includes('#') || own.includes('.')) return own;
  const p = el.parentElement;
  return p && p !== document.body ? `${part(p)} > ${own}` : own;
}
const textOf = (el: Element) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 34);

// ---------- scramble (mono readout settling into the real value) ----------
const scr = { el: null as HTMLElement | null, final: '', start: 0 };
function setSelector(text: string, now: number) {
  if (reduced) { sel.textContent = text; return; }
  scr.el = sel; scr.final = text; scr.start = now;
}
function tickScramble(now: number) {
  if (!scr.el) return;
  const p = Math.min(1, (now - scr.start) / 0.38);
  const keep = Math.floor(scr.final.length * p);
  let out = scr.final.slice(0, keep);
  for (let i = keep; i < scr.final.length; i++) out += scr.final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
  scr.el.textContent = out;
  if (p >= 1) scr.el = null;
}

// ---------- lock onto an element ----------
function lock(el: HTMLElement | null) {
  if (el === current) return;
  current = el;
  arrivedAt = gsap.ticker.time;
  root.classList.toggle('is-on', !!el);
  if (!el) return;
  setSelector(selectorOf(el), gsap.ticker.time);
  renderNote();
  writeRecord(el);
}

function pinFor(el: HTMLElement | null) {
  return el ? pins.find((p) => p.el === el) : undefined;
}

function renderNote() {
  const p = pinFor(current);
  const data = p ?? (current?.dataset.note ? { n: 0, cat: current.dataset.cat || 'note', text: current.dataset.note } : null);
  note.classList.toggle('is-on', !!data);
  if (!data) return;
  noteCat.textContent = CAT_NAME[data.cat] || data.cat;
  noteCat.style.setProperty('--c', `var(--cat-${data.cat})`);
  noteText.textContent = data.text;
  dims.delete(note);
}

// ---------- pins ----------
function addPin(el: HTMLElement, cat: string, text: string) {
  if (pinFor(el)) return pinFor(el)!;
  const n = pins.length + 1;
  const node = document.createElement('span');
  node.className = 'pin';
  node.textContent = String(n);
  node.style.setProperty('--c', `var(--cat-${cat})`);
  pinLayer.append(node);
  const p = { el, node, n, cat, text };
  pins.push(p);
  placePin(p);
  if (!reduced) gsap.from(node, { scale: 0, rotate: -30, duration: 0.55, ease: 'back.out(2.2)', transformOrigin: '0% 100%' });
  document.querySelectorAll('[data-notes-count]').forEach((c) => (c.textContent = String(pins.length)));
  document.documentElement.style.setProperty('--notes', String(pins.length));
  if (el === current) renderNote();
  return p;
}
function placePin(p: Pin) {
  const r = p.el.getBoundingClientRect();
  const x = Math.min(r.right + scrollX + 2, document.documentElement.clientWidth - 30);
  p.node.style.translate = `${x}px ${r.top + scrollY - 24}px`;
}
const placePins = () => pins.forEach(placePin);

// ---------- live record (chapter 01) ----------
function writeRecord(el: HTMLElement) {
  if (!rec.selector) return;
  const p = pinFor(el);
  rec.selector.textContent = `"${selectorOf(el)}"`;
  rec.tag.textContent = `"${el.tagName.toLowerCase()}"`;
  rec.text.textContent = JSON.stringify(textOf(el));
  rec.type.textContent = `"${p?.cat === 'you' ? 'note' : p?.cat || el.dataset.cat || 'note'}"`;
}

// ---------- render: one tick on the GSAP clock ----------
// Reads first (one rect + cached chip sizes), then transform-only writes. Text writes happen only
// when a value changes, and chip sizes are re-measured only then.
const dims = new Map<HTMLElement, [number, number]>();
const measure = (el: HTMLElement) => { const d: [number, number] = [el.offsetWidth, el.offsetHeight]; dims.set(el, d); return d; };
const dim = (el: HTMLElement) => dims.get(el) ?? measure(el);
function setText(el: HTMLElement | undefined, v: string) {
  if (!el || el.textContent === v) return;
  el.textContent = v;
  if (el === size || el === sel) dims.delete(el);
}
const place = (el: HTMLElement, x: number, y: number, extra = '') => { el.style.transform = `translate3d(${x}px,${y}px,0)${extra}`; };
let lastStamp = 0;

function render(time: number) {
  tickScramble(time);
  if (scr.el) dims.delete(sel);
  if (!current || !current.isConnected) return;
  const r = current.getBoundingClientRect();
  const sx = scrollX, sy = scrollY;
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  setText(size, `${Math.round(r.width)} × ${Math.round(r.height)} px`);
  const [selW] = dim(sel), [sizeW] = dim(size);
  const noteOn = note.classList.contains('is-on');
  if (noteOn) {
    const n = pinFor(current)?.n;
    const cap = `› ${selectorOf(current)} · ${Math.round(r.width)}×${Math.round(r.height)}${n ? ` · #${String(n).padStart(2, '0')}` : ''}`;
    if (noteNum.textContent !== cap) { noteNum.textContent = cap; dims.delete(note); }
  }
  const [nw, nh] = noteOn ? dim(note) : [0, 0];

  const tx = r.left + sx, ty = r.top + sy;
  const ratio = gsap.ticker.deltaRatio();
  // Travel: 0.55 s between sections (auto), the product's 130 ms glide under the pointer (manual).
  const k = reduced ? 1 : 1 - Math.pow(mode === 'manual' ? 0.62 : 0.86, ratio);
  box.x += (tx - box.x) * k;
  box.y += (ty - box.y) * k;
  box.w += (r.width - box.w) * k;
  box.h += (r.height - box.h) * k;

  const pad = 6 + (reduced ? 0 : Math.sin(time * 2.1) * 1.5);
  const x = box.x - sx, y = box.y - sy, w = box.w, h = box.h;
  const L = 14;
  place(corners[0], x - pad, y - pad);
  place(corners[1], x + w + pad - L, y - pad);
  place(corners[2], x - pad, y + h + pad - L);
  place(corners[3], x + w + pad - L, y + h + pad - L);
  place(wash, x, y, ` scale(${Math.max(w, 1) / 100},${Math.max(h, 1) / 100})`);

  // Chips: selector above, size below; they move inside the frame near the viewport edges.
  const top = vw < 768 ? 104 : 72;
  const selY = y - pad - 28 < top ? y + pad + 4 : y - pad - 28;
  place(sel, Math.max(8, Math.min(x - pad, vw - selW - 8)), selY);
  const sizeY = y + h + pad + 8 > vh - 92 ? y + h - pad - 28 : y + h + pad + 8;
  const sizeX = Math.max(8, Math.min(x - pad, vw - sizeW - 8));
  place(size, sizeX, sizeY);

  // Note card: above the frame's top right, beside its pin, so it never sits on the content below.
  // No room above (under the header): bottom right, stacked under the size chip if needed.
  if (noteOn) {
    let nx = x + w + pad - nw - 34, ny = y - pad - 10 - nh;
    if (ny < top) {
      nx = x + w + pad - nw; ny = sizeY;
      if (nx < sizeX + sizeW + 12) { nx = sizeX; ny = sizeY + 34; }
    }
    place(note, Math.max(8, Math.min(nx, vw - nw - 8)), Math.min(ny, vh - 96 - nh));
  }

  // Live record: the rect of whatever is in the frame, and a running timestamp (4 per second).
  if (rec.x) {
    setText(rec.x, String(Math.round(tx)));
    setText(rec.y, String(Math.round(ty)));
    setText(rec.w, String(Math.round(r.width)));
    setText(rec.h, String(Math.round(r.height)));
    if (time - lastStamp > 0.25 && (!reduced || !lastStamp)) { lastStamp = time; setText(rec.time, String(Date.now())); }
  }

  // Auto mode drops the section's review pin once the frame has landed.
  if (mode === 'auto' && introDone && current.dataset.note && !pinFor(current) && time - arrivedAt > (reduced ? 0 : 0.5)) {
    addPin(current, current.dataset.cat || 'note', current.dataset.note);
  }
}

// ---------- auto mode: the block nearest the reading line ----------
let targets: HTMLElement[] = [];
function pickAuto() {
  if (mode !== 'auto' || !introDone) return;
  const line = innerHeight * 0.42;
  let best: HTMLElement | null = null, bestD = Infinity;
  for (const el of targets) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 80 || r.top > innerHeight - 80) continue;
    const d = r.top > line ? r.top - line : r.bottom < line ? line - r.bottom : 0;
    if (d < bestD) { bestD = d; best = el; }
  }
  if (best && bestD < innerHeight * 0.4) lock(best);
}

// ---------- Inspect mode (the visitor holds the pen) ----------
const ours = (el: Element | null) => !!el?.closest('#inspector, #pins, #toast, [data-dock], [data-inspect-toggle]');
function setMode(next: 'auto' | 'manual') {
  if (mode === next) return;
  mode = next;
  const on = mode === 'manual';
  document.documentElement.classList.toggle('is-inspecting', on);
  document.querySelectorAll('[data-inspect-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
  say(on ? 'Inspect is on. Point at anything, click to pin a note. Esc to stop.' : 'Inspect is off.');
  if (!on) pickAuto();
}
export const toggleInspect = () => setMode(mode === 'manual' ? 'auto' : 'manual');

function pinUser(el: HTMLElement) {
  if (el === document.body || el === document.documentElement) return;
  lock(el);
  const existing = pinFor(el);
  if (existing) return say(`Already pinned as note ${existing.n}.`);
  const p = addPin(el, 'you', `Pinned by you on ${selectorOf(el)}.`);
  say(`Note ${p.n} pinned to ${selectorOf(el)}. It stays in this tab only.`);
}

let toastCall: gsap.core.Tween | null = null;
export function say(text: string) {
  toastText.textContent = text;
  toast.classList.add('is-on');
  toastCall?.kill();
  toastCall = gsap.delayedCall(3.2, () => toast.classList.remove('is-on'));
}

export function jumpToNextNote() {
  if (!pins.length) return say('No notes yet. Scroll, or turn on Inspect and click something.');
  jumpIndex = (jumpIndex + 1) % pins.length;
  const p = pins[jumpIndex];
  scrollToTarget(p.el, -Math.max(120, innerHeight * 0.3));
  if (mode === 'manual') lock(p.el);
  say(`Note ${p.n} of ${pins.length}: ${p.text}`);
}

export function startInspector() {
  onPage(({ intro }) => {
    reduced = prefersReducedMotion();
    root = document.getElementById('inspector')!;
    corners = [...root.querySelectorAll<HTMLElement>('.ins__c')];
    wash = root.querySelector('.ins__wash')!;
    sel = root.querySelector('[data-ins-sel]')!;
    size = root.querySelector('[data-ins-size]')!;
    note = root.querySelector('[data-ins-note]')!;
    noteNum = root.querySelector('[data-ins-num]')!;
    noteCat = root.querySelector('[data-ins-cat]')!;
    noteText = root.querySelector('[data-ins-text]')!;
    pinLayer = document.getElementById('pins')!;
    toast = document.getElementById('toast')!;
    toastText = toast.querySelector('[data-toast-text]')!;
    rec = Object.fromEntries([...document.querySelectorAll<HTMLElement>('[data-rec]')].map((e) => [e.dataset.rec!, e]));
    targets = [...document.querySelectorAll<HTMLElement>('[data-inspect]')];

    // First frame: the corners start at the viewport's corners and lock onto the headline.
    box.x = scrollX + 8; box.y = scrollY + 8;
    box.w = document.documentElement.clientWidth - 16; box.h = innerHeight - 16;
    const first = targets.find((t) => t.getBoundingClientRect().top < innerHeight) || targets[0];
    const start = () => { introDone = true; lock(null); lock(first || null); pickAuto(); };
    if (reduced) start(); else intro.add(start, 0.35);

    gsap.ticker.add(render);
    onScroll(pickAuto);
    ScrollTrigger.addEventListener('refresh', placePins);
    addEventListener('resize', () => gsap.delayedCall(0.15, placePins));

    // Pointer, focus, taps and keys for Inspect mode.
    addEventListener('pointermove', (e) => {
      if (mode !== 'manual' || e.pointerType === 'touch') return;
      const el = e.target as HTMLElement;
      if (!ours(el) && el !== document.documentElement) lock(el);
    }, { passive: true });
    addEventListener('focusin', (e) => {
      const el = e.target as HTMLElement;
      if (mode === 'manual' && !ours(el) && el !== document.getElementById('main')) lock(el);
    });
    addEventListener('click', (e) => {
      if (mode !== 'manual') return;
      const el = e.target as HTMLElement;
      if (ours(el)) return;
      e.preventDefault();
      e.stopPropagation();
      pinUser(el);
    }, true);
    addEventListener('keydown', (e) => {
      if (e.altKey && e.shiftKey && e.code === 'KeyM') { e.preventDefault(); toggleInspect(); return; }
      if (mode !== 'manual') return;
      if (e.key === 'Escape') { e.preventDefault(); setMode('auto'); return; }
      const el = document.activeElement as HTMLElement | null;
      if (e.key === 'Enter' && el && !ours(el) && el !== document.body) { e.preventDefault(); pinUser(el); }
    }, true);
  });
}

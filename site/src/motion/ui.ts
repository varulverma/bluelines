// Small global behaviour: the header steps aside on scroll down, the dock and "try it" buttons,
// and the accent picker (the product's Appearance > Accent colour, applied to this page).
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll } from '../engine';
import { jumpToNextNote, toggleInspect, say } from './inspector';

type RGB = [number, number, number];
const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.replace('#', '').padEnd(6, '0').slice(0, 6), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const toHex = (c: RGB) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const lum = (c: RGB) => {
  const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: RGB, b: RGB) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as RGB;
// Step toward `to` until the colour reads at 4.5:1 on `ground` (same idea as prefs.js).
function readable(c: RGB, ground: RGB, to: RGB) {
  for (let t = 0; t <= 1; t += 0.05) { const m = mix(c, to, t); if (contrast(m, ground) >= 4.5) return toHex(m); }
  return toHex(to);
}

export function accentVars(hex: string) {
  const c = hexToRgb(hex);
  const ink: RGB = [3, 20, 23];
  return {
    '--accent': hex,
    '--accent-hover': toHex(mix(c, [255, 255, 255], 0.35)),
    '--accent-ink': contrast(c, ink) >= 4.5 ? '#031417' : '#ffffff',
    '--accent-text-ink': readable(c, [11, 11, 11], [255, 255, 255]),
    '--accent-text-paper': readable(c, [250, 250, 250], [0, 0, 0]),
  };
}

function setAccent(hex: string, save = true) {
  const vars = accentVars(hex);
  for (const [k, v] of Object.entries(vars)) document.documentElement.style.setProperty(k, v);
  document.querySelectorAll<HTMLElement>('[data-accent]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.accent === hex)));
  const input = document.querySelector<HTMLInputElement>('[data-accent-input]');
  if (input && input.value !== hex) input.value = hex;
  document.querySelectorAll('[data-accent-hex]').forEach((e) => (e.textContent = hex.toUpperCase()));
  if (save) try { localStorage.setItem('rl-accent-v2', JSON.stringify(vars)); } catch {}
}

export function startUI() {
  onPage(() => {
    let last = 0;
    onScroll(({ y }) => {
      if (Math.abs(y - last) < 6) return;
      document.documentElement.classList.toggle('head-away', y > 240 && y > last);
      last = y;
    });

    // The real extension screenshots carry their own dock: step ours aside while one is on screen.
    const shotsInView = new Set<Element>();
    document.querySelectorAll('.shot, .foot').forEach((el) => ScrollTrigger.create({
      trigger: el, start: 'top 92%', end: 'bottom 8%',
      onToggle: (st) => {
        st.isActive ? shotsInView.add(el) : shotsInView.delete(el);
        document.documentElement.classList.toggle('dock-away', shotsInView.size > 0);
      },
    }));

    // Film: our play button replaces the native one until first play (native controls stay if JS fails).
    const film = document.querySelector<HTMLVideoElement>('[data-film]');
    const play = document.querySelector<HTMLButtonElement>('[data-film-play]');
    if (film && play) {
      film.controls = false;
      play.hidden = false;
      const started = () => { play.hidden = true; film.controls = true; };
      play.addEventListener('click', () => { started(); film.play().catch(() => {}); film.focus(); });
      film.addEventListener('play', started);
      ScrollTrigger.create({ trigger: film, start: 'top bottom', end: 'bottom top', onToggle: (st) => { if (!st.isActive) film.pause(); } });
    }

    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#fafafa' : '#0b0b0b');
      try { localStorage.setItem('rl-theme', next); } catch {}
    });

    document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy!); b.textContent = 'Copied'; say('Install command copied. Paste it in a terminal.'); }
      catch { say('Copying is blocked here. Select the command and press Ctrl+C.'); }
      setTimeout(() => (b.textContent = 'Copy'), 1800);
    }));

    document.querySelectorAll('[data-inspect-toggle]').forEach((b) => b.addEventListener('click', () => toggleInspect()));
    document.querySelectorAll('[data-notes-jump]').forEach((b) => b.addEventListener('click', () => jumpToNextNote()));

    const saved = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00e5ff';
    setAccent(saved, false);
    document.querySelectorAll<HTMLElement>('[data-accent]').forEach((b) => b.addEventListener('click', () => setAccent(b.dataset.accent!)));
    document.querySelector<HTMLInputElement>('[data-accent-input]')?.addEventListener('input', (e) => setAccent((e.target as HTMLInputElement).value));
  });
}

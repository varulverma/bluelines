// Full-page logo loader, on every page load. The Burst assembles from its own parts (petals spin
// in, star, eye, spark, then the cursor arrow lands with a click), the counter follows real work
// (fonts + the header logo), and the logo flies into its slot at the centre of the navbar while
// the curtain lifts. Internal page links play the same curtain in reverse before they navigate.
// Budget: 2.6 s at most, first paint to page. Reduced motion: a short fade.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion, setLoader } from '../engine';

const MIN = 1.0; // the logo build needs this long
const MAX = 1.6;  // progress never waits longer than this

function build(logo: SVGSVGElement, ripple: HTMLElement) {
  const q = (s: string) => logo.querySelector(s)!;
  const o = { svgOrigin: '24 23.5' };
  return gsap.timeline()
    .from(q('.burst__body'), { ...o, scale: 0, rotation: -140, duration: 0.7, ease: ease.out })
    .from(q('.burst__star'), { ...o, scale: 0.2, rotation: 160, autoAlpha: 0, duration: 0.7, ease: ease.out }, 0.1)
    .from(q('.burst__eye'), { svgOrigin: '23 22.3', scaleY: 0, duration: 0.3, ease: ease.soft }, 0.4)
    .from(q('.burst__spark'), { svgOrigin: '23 22.3', scale: 0, rotation: -90, duration: 0.45, ease: 'back.out(2.4)' }, 0.5)
    .from(q('.burst__arrow'), { x: 14, y: 14, autoAlpha: 0, duration: 0.38, ease: ease.out }, 0.56)
    // the click: the arrow presses in and a ring goes out from its tip
    .to(q('.burst__arrow'), { svgOrigin: '28 26', scale: 0.82, duration: 0.08, ease: 'power2.in', yoyo: true, repeat: 1 }, 0.86)
    .fromTo(ripple, { scale: 0.2, autoAlpha: 1 }, { scale: 2.2, autoAlpha: 0, duration: 0.6, ease: ease.out }, 0.9);
}

async function run() {
  const root = document.getElementById('loader');
  if (!root) return;
  const finish = () => { root.hidden = true; document.documentElement.classList.add('is-loaded'); };
  const work = Promise.all([document.fonts.ready, new Promise((r) => setTimeout(r, 0))]);

  // Arriving from another page of this site: the curtain is already down, so just lift it.
  let fromNav = false;
  try { fromNav = sessionStorage.getItem('rl-nav') === '1'; sessionStorage.removeItem('rl-nav'); } catch {}
  if (fromNav && !prefersReducedMotion()) {
    document.documentElement.classList.add('loader-js');
    gsap.set(root.querySelectorAll('.loader__foot, .loader__bar'), { autoAlpha: 0 });
    await Promise.race([work, wait(0.6)]);
    await gsap.timeline()
      .to(root.querySelector('#loader-logo'), { scale: 0.5, rotation: 60, autoAlpha: 0, duration: 0.45, ease: ease.inOut }, 0)
      .to(root.querySelector('.loader__bg'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: ease.inOut }, 0.1);
    return finish();
  }

  // Late script (slow network): the visitor already waited, so skip the build and hand off fast.
  const late = performance.now() > 1400;
  if (late && performance.now() > 2000) return finish(); // the CSS guard is already lifting it
  if (late && !prefersReducedMotion()) {
    await Promise.race([work, wait(0.4)]);
    await gsap.timeline()
      .to(root.querySelectorAll('.loader__foot, .loader__bar, #loader-logo'), { autoAlpha: 0, duration: 0.25, ease: ease.soft }, 0)
      .to(root.querySelector('.loader__bg'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: ease.inOut }, 0.05);
    return finish();
  }

  if (prefersReducedMotion()) {
    await Promise.race([work, wait(MAX)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish();
  }

  document.documentElement.classList.add('loader-js');
  const logo = root.querySelector<SVGSVGElement>('#loader-logo')!;
  const ripple = root.querySelector<HTMLElement>('.loader__ripple')!;
  const count = root.querySelector<HTMLElement>('[data-loader-count]')!;
  const bar = root.querySelector<HTMLElement>('.loader__bar')!;
  const foot = root.querySelectorAll<HTMLElement>('.loader__foot > span');

  gsap.from(foot, { yPercent: 100, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: ease.out, delay: 0.2 });
  const logoIn = build(logo, ripple);

  // Counter: real progress, never faster than the logo build, never past MAX.
  let ready = false;
  work.then(() => (ready = true));
  const shown = { v: 0 };
  const t0 = performance.now();
  await new Promise<void>((resolve) => {
    const tick = () => {
      const s = (performance.now() - t0) / 1000;
      const goal = s > MAX ? 100 : Math.min(ready ? 100 : 85, (s / MIN) * 100);
      shown.v += (goal - shown.v) * 0.3;
      if (goal === 100 && shown.v > 99.5) shown.v = 100;
      count.textContent = String(Math.round(shown.v)).padStart(3, '0');
      bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100 && logoIn.time() >= 0.95) { gsap.ticker.remove(tick); resolve(); }
    };
    gsap.ticker.add(tick);
  });

  // Handoff: the loader logo flies into the navbar's centre slot; the curtain lifts behind it.
  const slot = document.getElementById('head-logo');
  const a = logo.getBoundingClientRect();
  const b = slot?.getBoundingClientRect();
  const tl = gsap.timeline();
  tl.to(foot, { yPercent: -100, autoAlpha: 0, duration: 0.4, stagger: 0.04, ease: ease.inOut }, 0)
    .to(bar, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.5, ease: ease.inOut }, 0);
  if (b && b.width) {
    tl.to(logo, {
      x: b.left + b.width / 2 - (a.left + a.width / 2),
      y: b.top + b.height / 2 - (a.top + a.height / 2),
      scale: b.width / a.width,
      duration: 0.75,
      ease: ease.inOut,
    }, 0.05);
  } else {
    tl.to(logo, { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: ease.inOut }, 0.1);
  }
  tl.to(root.querySelector('.loader__bg'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: ease.inOut }, 0.1);
  await tl;
  document.documentElement.classList.add('logo-docked');
  finish();
}

// Leaving for another page of this site: the curtain drops, the logo returns to centre.
function leaveOnInternalLinks() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (url.href === location.href) return;
    const root = document.getElementById('loader');
    if (!root || prefersReducedMotion()) return;
    e.preventDefault();
    root.hidden = false;
    const logo = root.querySelector<SVGSVGElement>('#loader-logo')!;
    gsap.set(root.querySelectorAll('.loader__foot > span, .loader__bar'), { autoAlpha: 0 });
    try { sessionStorage.setItem('rl-nav', '1'); } catch {}
    gsap.timeline({ onComplete: () => { location.href = url.href; } })
      .fromTo(root.querySelector('.loader__bg'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut })
      .fromTo(logo, { scale: 0.4, rotation: -60, autoAlpha: 0, x: 0, y: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: ease.out }, 0.2);
  });
  // Back/forward cache restores the covered page: uncover it.
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    const root = document.getElementById('loader');
    if (root) root.hidden = true;
  });
}

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

export function startLoader() {
  setLoader(run);
  leaveOnInternalLinks();
}

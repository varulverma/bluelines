// Motion engine, trimmed to what a one-page site needs: one clock (GSAP ticker drives Lenis and
// ScrollTrigger), declarative reveals, and an intro timeline. No loader, router or GL.
//   data-split="lines|words|chars"   masked text reveal (SplitText), on scroll or on intro
//   data-reveal="up|fade|clip"        block reveal
//   data-intro                        play with the page intro instead of on scroll
//   data-delay="0.2"                  extra delay (seconds)
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;

// Shared easing vocabulary. Motion verb: snap and lock.
export const ease = { out: 'expo.out', inOut: 'expo.inOut', soft: 'power3.out' } as const;

// ---------- scroll ----------
export type ScrollState = { y: number; velocity: number; progress: number };
const state: ScrollState = { y: 0, velocity: 0, progress: 0 };
const listeners = new Set<(s: ScrollState) => void>();
let lenis: Lenis | null = null;

function initScroll() {
  if (prefersReducedMotion()) {
    addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      state.velocity = scrollY - state.y;
      state.y = scrollY;
      state.progress = max > 0 ? scrollY / max : 0;
      listeners.forEach((fn) => fn(state));
    }, { passive: true });
    return;
  }
  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
  lenis.on('scroll', (l: Lenis) => {
    state.y = l.scroll;
    state.velocity = l.velocity;
    state.progress = l.limit > 0 ? l.scroll / l.limit : 0;
    ScrollTrigger.update();
    listeners.forEach((fn) => fn(state));
  });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export const onScroll = (fn: (s: ScrollState) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const scrollState = () => state;
export function scrollToTarget(target: HTMLElement, offset = -120) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else scrollTo({ top: target.getBoundingClientRect().top + scrollY + offset });
}

// ---------- reveals ----------
function splitTween(el: HTMLElement, isIntro: boolean) {
  const type = (el.dataset.split || 'lines') as 'lines' | 'words' | 'chars';
  const delay = parseFloat(el.dataset.delay || '0');
  const s = { tween: undefined as gsap.core.Tween | undefined, done: false, requested: false };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      const targets = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars;
      s.tween = gsap.from(targets, {
        yPercent: 110,
        duration: type === 'chars' ? 0.9 : 1.15,
        stagger: type === 'lines' ? 0.08 : type === 'words' ? 0.035 : 0.018,
        ease: ease.out,
        delay,
        paused: isIntro && !s.requested,
        onComplete: () => { s.done = true; },
        scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
      return s.tween;
    },
  });
  return () => { s.requested = true; s.tween?.play(); };
}

function blockTween(el: HTMLElement, paused: boolean) {
  const kind = el.dataset.reveal || 'up';
  const delay = parseFloat(el.dataset.delay || '0');
  const from: gsap.TweenVars =
    kind === 'fade' ? { autoAlpha: 0 }
    : kind === 'clip' ? { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 }
    : { y: 40, autoAlpha: 0 };
  gsap.set(el, { visibility: 'visible' });
  return gsap.fromTo(el, from, {
    ...(kind === 'clip' ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}),
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 0.9 : 1.2,
    ease: ease.out,
    delay,
    paused,
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true },
  });
}

function initReveals() {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => t.play(), 0);
  });
  return intro;
}

// ---------- boot ----------
export type PageFn = (page: { intro: gsap.core.Timeline }) => void;
const pageFns: PageFn[] = [];
/** Register page work; runs once at boot with the intro timeline to extend. */
export const onPage = (fn: PageFn) => { pageFns.push(fn); };

let loader: (() => Promise<void>) | null = null;
/** Register the first-load sequence; boot waits for it before the page intro plays. */
export const setLoader = (fn: () => Promise<void>) => { loader = fn; };

export async function boot() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
  // The loader starts first; page setup runs underneath it.
  const loading = loader ? loader() : document.fonts.ready;
  initScroll();
  lenis?.stop();
  const intro = initReveals();
  pageFns.forEach((fn) => fn({ intro }));
  await loading;
  lenis?.start();
  ScrollTrigger.refresh();
  intro.play();
}

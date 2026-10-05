import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker and wired into ScrollTrigger
 * so pinned sections and scroll-driven timelines stay in sync.
 *
 * Disabled entirely under prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Keep ScrollTrigger informed of Lenis' virtual scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor links / route changes.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

/** Scroll to top instantly on route change, respecting the smooth scroller. */
export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

/** Smooth-scroll to an in-page anchor, accounting for the fixed nav. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -96 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

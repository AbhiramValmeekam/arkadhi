import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['RESEARCH', 'EXPERIMENT', 'SYSTEM', 'PRODUCT', 'FUTURE'];

/**
 * HeroTransition — the fall ends, the paper field opens. A hairline draws
 * across, then a marquee band states the pipeline on loop. The band inhales
 * scroll velocity: fling and the words surge, settle back when you rest.
 */
export function HeroTransition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const band = bandRef.current;
    if (!el || !band) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-bridge-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true },
        },
      );
      gsap.fromTo(
        '[data-bridge-label]',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          ease: 'expo.out',
          duration: 0.9,
          scrollTrigger: { trigger: el, start: 'top 75%', once: true },
        },
      );
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const loop = gsap.to(band, {
          xPercent: -50,
          ease: 'none',
          duration: 26,
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = Math.min(4, 1 + Math.abs(self.getVelocity()) / 1800);
            gsap.to(loop, { timeScale: v, duration: 0.4, overwrite: 'auto' });
          },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="bg-warmivory text-charcoal">
      <div className="shell pt-16 md:pt-24">
        <div data-bridge-rule className="h-px w-full origin-left bg-charcoal/20" />
        <p
          data-bridge-label
          className="mt-6 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal/55"
        >
          <span>The particles fall — the narrative begins</span>
          <span>Scroll</span>
        </p>
      </div>
      <div aria-hidden="true" className="mt-12 overflow-hidden border-y border-charcoal/10 py-5 md:mt-16 md:py-7">
        <div ref={bandRef} className="flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: 3 }).flatMap((_, r) =>
                WORDS.map((w) => (
                  <span key={`${half}-${r}-${w}`} className="flex shrink-0 items-center">
                    <span className="px-8 font-display text-[clamp(2rem,6vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.02em] text-charcoal md:px-12">
                      {w}
                    </span>
                    <span className="font-mono text-[clamp(1.2rem,3vw,2rem)] text-charcoal">→</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

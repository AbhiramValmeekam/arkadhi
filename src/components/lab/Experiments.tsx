import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MaskLines, SectionHead } from './motion';
import { experimentStages } from '@/lib/content/narrative';

gsap.registerPlugin(ScrollTrigger);

/**
 * Experiments — one continuous pipeline on soft apricot: QUESTION → METHOD →
 * EXPERIMENT → RESULT → EVIDENCE. A progress spine fills with scroll while
 * each stage's rule sweeps in; stages never become cards, only stations.
 */
export function Experiments() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-exp-spine]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        },
      );
      gsap.utils.toArray<HTMLElement>('[data-exp-stage]').forEach((stage) => {
        gsap.fromTo(
          stage.querySelector('[data-exp-rule]'),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'expo.out',
            duration: 1.1,
            scrollTrigger: { trigger: stage, start: 'top 82%', once: true },
          },
        );
        gsap.fromTo(
          stage.querySelector('[data-exp-body]'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            ease: 'expo.out',
            duration: 0.9,
            scrollTrigger: { trigger: stage, start: 'top 80%', once: true },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Experiments" className="bg-apricot text-charcoal">
      <div ref={ref} className="shell py-24 md:py-36">
        <SectionHead index="04" label="Experiments" note="QUESTION → EVIDENCE" />
        <MaskLines
          lines={['HOW A QUESTION', 'BECOMES EVIDENCE.']}
          className="mb-16 mt-10 md:mb-24"
          lineClassName="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-charcoal"
        />
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-charcoal/15 md:left-[9px]">
            <div data-exp-spine className="h-full w-full origin-top bg-charcoal" />
          </div>
          <ol className="space-y-16 md:space-y-24">
            {experimentStages.map((s, i) => (
              <li key={s.id} data-exp-stage className="relative pl-12 md:pl-20">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-charcoal bg-apricot md:h-5 md:w-5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-charcoal" />
                </span>
                <p className="font-mono text-[11px] tracking-[0.22em] text-charcoal/50">
                  {s.id} / 05
                </p>
                <h3 className="mt-3 font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
                  {s.name}
                </h3>
                <div data-exp-body>
                  <div data-exp-rule className="mt-6 h-px w-full origin-left bg-charcoal/30" />
                  <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-charcoal/70">
                    {s.body}
                  </p>
                  {i === experimentStages.length - 1 && (
                    <p className="mt-4 inline-block bg-charcoal px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-warmivory">
                      Research in progress
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

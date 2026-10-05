import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MaskLines, Scramble, SectionHead } from './motion';
import { finalStatement } from '@/lib/content/narrative';

gsap.registerPlugin(ScrollTrigger);

/**
 * FinalStatement — the emotional climax on peach. "WE DON'T JUST FOLLOW
 * THE FUTURE." holds, then scrambles into "WE INVESTIGATE IT." as scroll
 * completes the thought. Geometry compresses toward the wordmark below.
 */
export function FinalStatement() {
  const ref = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-final-squeeze]',
        { scale: 1 },
        {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 40%', scrub: 0.8 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Final statement" className="bg-peach text-charcoal">
      <div ref={ref} className="shell py-28 md:py-44">
        <SectionHead index={finalStatement.index} label={finalStatement.label} note="CLIMAX" />
        <div data-final-squeeze className="origin-center will-change-transform">
          <MaskLines
            lines={finalStatement.first}
            className="mt-12 text-center md:mt-16"
            lineClassName="font-display text-[clamp(2.4rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-charcoal"
          />
          <div ref={secondRef} className="mt-8 text-center md:mt-10">
            <Scramble
              text={finalStatement.second[0]}
              duration={1.4}
              className="font-display text-[clamp(2.4rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-charcoal underline decoration-charcoal/40 decoration-[0.06em] underline-offset-[0.12em]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

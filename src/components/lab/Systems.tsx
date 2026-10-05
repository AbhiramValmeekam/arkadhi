import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MaskLines, SectionHead } from './motion';
import { systemFlow } from '@/lib/content/narrative';

gsap.registerPlugin(ScrollTrigger);

/**
 * Systems — scattered information organizing itself. Four bands tighten
 * their tracking and spacing as scroll progresses: DATA → CONTEXT →
 * MEMORY → SYSTEM. The bridge from research into EchoRegent.
 */
export function Systems() {
  const [active, setActive] = useState(2);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-sys-band]').forEach((band, i) => {
        gsap.fromTo(
          band,
          { letterSpacing: '0.14em', opacity: 0.35 },
          {
            letterSpacing: '0.01em',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: band,
              start: 'top 88%',
              end: 'top 42%',
              scrub: 0.7,
            },
          },
        );
        void i;
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Systems" className="border-y border-charcoal/10 bg-warmivory text-charcoal">
      <div ref={ref} className="shell py-24 md:py-36">
        <SectionHead index="05" label="Systems" note="SCATTER → STRUCTURE" />
        <MaskLines
          lines={['SCATTERED BECOMES', 'STRUCTURED.']}
          className="mb-14 mt-10 md:mb-20"
          lineClassName="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-charcoal"
        />
        <div role="list" aria-label="Data to system flow">
          {systemFlow.map((l, i) => (
            <div
              key={l.id}
              role="listitem"
              data-sys-band
              onMouseEnter={() => setActive(i)}
              className={`grid cursor-default grid-cols-[3rem_1fr] items-baseline gap-x-4 border-t border-charcoal/15 py-10 last:border-b md:grid-cols-[5rem_1fr_1fr] md:gap-x-8 md:py-12 ${
                active === i ? 'bg-peach/30' : ''
              } -mx-4 px-4 transition-colors duration-500 md:-mx-6 md:px-6`}
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-charcoal/50">{l.id}</span>
              <span className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.03em]">
                {l.name}
              </span>
              <span className="col-start-2 max-w-[38ch] text-[15px] leading-relaxed text-charcoal/65 md:col-start-auto">
                {l.note}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-[60ch] text-[15.5px] leading-relaxed text-charcoal/65">
          This is the bridge: what research learns to retain becomes the memory
          infrastructure products are built on. Next: the first such product.
        </p>
      </div>
    </section>
  );
}

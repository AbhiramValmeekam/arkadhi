import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeckCard, TechMotif, PALETTE } from '@/components/motion/Scroll3D';
import { threadScenes } from '@/lib/content/scenes';

/**
 * Sticky 3D card deck — the reference's signature scroll, rebuilt for a tech lab.
 *
 * Normal-flow section; each card sticks at a fan-out offset while the next one
 * slides over it, entering with a scroll-linked 3D tip. A thin progress rail
 * tracks the deck. No WebGL lattice, no ghost numerals — just perspective
 * transforms, reversible on scroll-back.
 */
export function ThreadScenes() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start center', 'end center'] });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section ref={sectionRef} aria-label="Research threads" className="relative py-24 md:py-32">
      <div className="shell mb-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-signal">Research threads</p>
          <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold uppercase tracking-[0.01em] text-ink">
            Five cards, one structure
          </h2>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:block">
          Scroll — the deck tips in 3D
        </p>
      </div>

      <div className="shell sticky top-20 z-20 mb-10">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div className="h-full w-full origin-left rounded-full bg-signal" style={{ scaleX: railScale }} />
        </div>
      </div>

      <div className="shell relative flex flex-col gap-[10vh] pb-[12vh]" style={{ perspective: 1400 }}>
        {threadScenes.map((s, i) => (
          <DeckCard
            key={s.numeral}
            index={i}
            kicker={s.kicker}
            numeral={s.numeral}
            heading={s.heading}
            statement={s.statement}
            source={s.source}
            accent={PALETTE[i % PALETTE.length]}
            motif={<TechMotif kind={s.shape} accent={PALETTE[i % PALETTE.length]} />}
            link={
              <Link
                to={s.to}
                className="link-underline inline-block font-mono text-meta uppercase tracking-[0.14em] text-signal"
              >
                {s.linkLabel} <span aria-hidden="true">→</span>
              </Link>
            }
          />
        ))}
      </div>

      <div className="shell mt-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {String(threadScenes.length).padStart(2, '0')} threads
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Arkadhi Labs</span>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profileScene } from '@/lib/content/scenes';

/**
 * Profile — the lab as an operating-model panel, with a scroll-linked 3D tip.
 *
 * Previously used mask-wipe + staggered reveals; now a single rounded panel
 * that settles flat (rotateX 8→0) as it enters, with fact cells that lift in
 * 3D one row at a time. Content unchanged.
 */
export function ProfileScene() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="border-t border-[var(--line)] py-20 md:py-28" style={{ perspective: 1200 }}>
      <motion.div
        className="shell flex flex-col items-center text-center"
        style={{ rotateX, y, opacity, transformStyle: 'preserve-3d' }}
      >
        <p className="t-eyebrow text-signal">{profileScene.kicker}</p>

        <h2 className="mt-7 font-serif text-[clamp(2.75rem,9vw,7.5rem)] font-light leading-none tracking-[-0.035em] text-ink">
          {profileScene.name}
        </h2>

        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-ink/30" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{profileScene.role}</p>
          <span className="h-px w-16 bg-ink/30" />
        </div>

        <dl className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
          {profileScene.facts.map((f) => (
            <div key={f.label} className="bg-paper px-5 py-7">
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{f.label}</dt>
              <dd className="mt-3 font-display text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-[46ch] text-[13px] leading-relaxed text-ink/50">{profileScene.note}</p>
      </motion.div>
    </section>
  );
}

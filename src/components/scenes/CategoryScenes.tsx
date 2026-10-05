import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { categoryScenes } from '@/lib/content/scenes';

/**
 * Category interludes — one full-bleed word each, with scroll-linked 3D tilt.
 *
 * Replaces the old letter-stagger reveal: the word tips from rotateX 10deg to
 * flat and drifts up as it crosses the viewport, over a hairline rule. Pure
 * DOM perspective, no canvas.
 */
export function CategoryScenes() {
  return (
    <div aria-label="Research domains">
      {categoryScenes.map((c) => (
        <Interlude key={c.word} word={c.word} note={c.note} />
      ))}
    </div>
  );
}

function Interlude({ word, note }: { word: string; note: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -10]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden border-t border-[var(--line)] px-6 text-center"
      style={{ perspective: 1100 }}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-[min(70vw,44rem)] -translate-x-1/2 -translate-y-1/2 bg-ink/10" />
      <motion.div style={{ rotateX, y, opacity, transformStyle: 'preserve-3d' }}>
        <h2 className="relative font-mono text-[clamp(1.05rem,3.4vw,2rem)] font-normal uppercase tracking-[0.34em] text-ink">
          {word}
        </h2>
        <p className="relative mx-auto mt-7 max-w-[42ch] font-serif text-[clamp(1.05rem,1.7vw,1.4rem)] italic leading-snug text-ink/55">
          {note}
        </p>
      </motion.div>
    </section>
  );
}

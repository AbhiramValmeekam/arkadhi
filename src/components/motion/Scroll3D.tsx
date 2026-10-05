import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * dontboardme-style scroll-3D primitives, rebuilt for a tech lab.
 *
 * The reference pattern is DOM-only (no WebGL):
 *  - hero type tilts/scales away on scroll (perspective + rotateX)
 *  - story beats are chunky rounded cards in a sticky deck — each card
 *    sticks while the next one slides over it, entering with a 3D tip
 *    (rotateX + rise + settle)
 *  - small chips drift at different rates for parallax depth
 *
 * All transforms are scroll-linked, so they are reversible and cheap.
 * Nothing here uses canvas or WebGL.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Hero that tips back and sinks as you scroll past it. */
export function Hero3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, scale, y, opacity, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  );
}

/** A chip that drifts slower/faster than the scroll for parallax depth. */
export function Drift({
  children,
  from = 40,
  to = -40,
  rotate = 6,
  className = '',
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  rotate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);

  return (
    <div ref={ref} className={className} style={{ perspective: 900 }}>
      <motion.div style={{ y, rotate: r, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  );
}

const PALETTE = ['#14999C', '#FC7A5C', '#0B1F3C', '#8F949B'] as const;

export { PALETTE };

/**
 * One card in the sticky deck. The outer wrapper sticks at a fan-out offset
 * so earlier cards peek out from behind later ones; the inner body enters
 * with a scroll-linked 3D tip (rotateX + rise + settle) driven by its own
 * scroll position — reversible on scroll-back.
 */
export function DeckCard({
  index,
  kicker,
  numeral,
  heading,
  statement,
  source,
  link,
  motif,
  accent = PALETTE[0],
}: {
  index: number;
  kicker: string;
  numeral: string;
  heading: string;
  statement: string;
  source: string;
  link: React.ReactNode;
  motif: React.ReactNode;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${96 + index * 22}px` }}>
      <div style={{ perspective: 1400 }}>
        <motion.article
          style={{ rotateX, scale, y, opacity, transformStyle: 'preserve-3d' }}
          transition={{ ease: EASE }}
          className="overflow-hidden rounded-[28px] border border-ink/10 bg-paper shadow-[0_24px_80px_-32px_rgba(11,31,60,0.35)]"
        >
          <div className="grid md:grid-cols-[1fr_240px]">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl font-mono text-[12px] font-bold text-white"
                  style={{ background: accent }}
                >
                  {numeral}
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">{kicker}</p>
              </div>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold uppercase leading-[1.02] tracking-[0.01em] text-ink">
                {heading}
              </h3>
              <p className="mt-5 max-w-[44ch] font-display text-[clamp(1.05rem,1.8vw,1.35rem)] italic leading-[1.45] text-ink/75">
                {statement}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <span className="h-px w-12 bg-ink/25" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{source}</span>
              </div>
              <div className="mt-6">{link}</div>
            </div>
            <div
              className="relative hidden items-center justify-center overflow-hidden md:flex"
              style={{ background: `linear-gradient(160deg, ${accent}1f, transparent 65%)` }}
            >
              <div style={{ transform: 'translateZ(60px)' }}>{motif}</div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

/**
 * Letter-cascade wordmark — the bigdreams.group BIG DREAMS entrance,
 * measured in-browser with Playwright and rebuilt here.
 *
 * Measured signature: each letter fades 0 → 1 over ~0.5s with a ~0.11s
 * left-to-right stagger running continuously across words, ease-out, no
 * clipping masks (overflow visible), static on scroll. The letters also
 * carry a small y offset through the entrance, so each letter rises as it
 * fades. Respects prefers-reduced-motion (renders static type).
 */
export function RiseLetters({
  text,
  baseDelay = 0.3,
  stagger = 0.11,
  duration = 0.5,
  rise = '0.5em',
  className = '',
}: {
  text: string;
  baseDelay?: number;
  stagger?: number;
  duration?: number;
  rise?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-hidden="true">
      {Array.from(text).map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          className="inline-block will-change-transform"
          initial={{ y: rise, opacity: 0 }}
          animate={{ y: '0em', opacity: 1 }}
          transition={{ duration, ease: EASE, delay: baseDelay + i * stagger }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

/** Pure-SVG tech motifs — circuit / orbit / helix / byte-grid / sparse. No WebGL. */export function TechMotif({ kind, accent = '#14999c' }: { kind: string; accent?: string }) {
  const s = { stroke: accent, strokeWidth: 1.5, fill: 'none' } as const;
  if (kind === 'ring')
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
        <circle cx="75" cy="75" r="52" {...s} />
        <circle cx="75" cy="75" r="34" {...s} opacity="0.6" />
        <circle cx="75" cy="75" r="6" fill={accent} />
        <ellipse cx="75" cy="75" rx="64" ry="24" {...s} opacity="0.7" transform="rotate(-24 75 75)" />
        <circle cx="127" cy="60" r="4" fill={accent} opacity="0.8" />
      </svg>
    );
  if (kind === 'helix')
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={30 + i * 4} y1={28 + i * 18} x2={120 - i * 4} y2={28 + i * 18} {...s} opacity={0.45 + i * 0.1} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={30 + i * 4} cy={28 + i * 18} r="3.5" fill={accent} opacity="0.85" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={120 - i * 4} cy={28 + i * 18} r="3.5" fill={accent} opacity="0.35" />
        ))}
      </svg>
    );
  if (kind === 'grid')
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((__, c) => (
            <rect
              key={`${r}-${c}`}
              x={30 + c * 18}
              y={30 + r * 18}
              width="10"
              height="10"
              rx="2.5"
              fill={(r + c) % 3 === 0 ? accent : 'none'}
              stroke={accent}
              strokeWidth="1.4"
              opacity={(r + c) % 3 === 0 ? 0.95 : 0.5}
            />
          )),
        )}
      </svg>
    );
  if (kind === 'sparse')
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
        {[
          [40, 44], [72, 34], [104, 52], [52, 78], [88, 84], [120, 96], [44, 112], [80, 116], [108, 124],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3} fill={accent} opacity={i % 3 === 0 ? 0.9 : 0.45} />
        ))}
        <path d="M40 44 L72 34 L104 52 L88 84 L52 78 Z M52 78 L44 112 L80 116 L88 84 M80 116 L108 124 L120 96 L88 84" {...s} opacity="0.55" />
      </svg>
    );
  // lattice (default): sparse circuit nodes
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden="true">
      <path d="M30 100 L60 70 L60 45 L95 45 M60 70 L90 100 L120 100 M90 100 L90 122" {...s} opacity="0.7" />
      {[[30, 100], [60, 70], [60, 45], [95, 45], [90, 100], [120, 100], [90, 122]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 1 ? 6 : 4} fill={i === 1 ? accent : 'none'} stroke={accent} strokeWidth="1.6" />
      ))}
      <circle cx="95" cy="45" r="3" fill={accent} />
    </svg>
  );
}

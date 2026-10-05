import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Masked line reveal — each line climbs out of its own clip on scroll entry.
 * The editorial workhorse: manifesto statements, section titles, CTA type.
 */
export function MaskLines({
  lines,
  className = '',
  lineClassName = '',
  stagger = 0.09,
  duration = 1.0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('[data-mask-line]');
      if (reduceMotion()) {
        gsap.set(targets, { y: '0%' });
        return;
      }
      gsap.fromTo(
        targets,
        { y: '112%' },
        {
          y: '0%',
          duration,
          ease: 'expo.out',
          stagger,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span data-mask-line className={lineClassName}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Text scramble — glyphs resolve left to right through a deterministic
 * character set, echoing the reference loader. Runs once on entry.
 */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+';

export function Scramble({
  text,
  className = '',
  duration = 1.1,
  delay = 0,
}: {
  text: string;
  className?: string;
  duration?: number;
  /** seconds to wait after entering view before resolving */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      el.textContent = text;
      return;
    }
    let raf = 0;
    let started = false;
    let timer = 0;
    const run = () => {
      const t0 = performance.now();
      const total = duration * 1000;
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / total);
        const out = Array.from(text)
          .map((c, i) => {
            if (c === ' ') return ' ';
            const local = t * (text.length + 6) - i;
            if (local >= 1) return c;
            if (local <= 0) return GLYPHS[(i * 7 + ((t * 60) | 0)) % GLYPHS.length];
            return Math.random() > 0.5 ? c : GLYPHS[(i * 13) % GLYPHS.length];
          })
          .join('');
        if (el) el.textContent = out;
        if (t < 1) raf = requestAnimationFrame(step);
        else if (el) el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          timer = window.setTimeout(run, delay * 1000);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/**
 * Scroll parallax — children drift by `shift` px across the viewport pass.
 * Transform-only, scrubbed, cleaned up with context.
 */
export function Parallax({
  children,
  shift = -60,
  className = '',
}: {
  children: ReactNode;
  shift?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -shift },
        {
          y: shift,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [shift]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section eyebrow — index numeral, mono label, hairline. One consistent
 * wayfinding mark for the whole narrative. Ink on light fields, peach on
 * the charcoal room.
 */
export function SectionHead({
  index,
  label,
  note,
  dark,
  tone = 'light',
}: {
  index: string;
  label: string;
  note?: string;
  dark?: boolean;
  /** 'ink' for the charcoal room. */
  tone?: 'light' | 'ink';
}) {
  void dark;
  const onDark = tone === 'ink';
  return (
    <div className="relative">
      <div className="relative flex items-center gap-5">
        <span className={`font-mono text-[11px] tracking-[0.22em] ${onDark ? 'text-peach' : 'text-charcoal'}`}>{index}</span>
        <span className={`h-px w-12 ${onDark ? 'bg-warmivory/25' : 'bg-charcoal/25'}`} />
        <span className={`font-mono text-[11px] uppercase tracking-[0.22em] ${onDark ? 'text-warmivory/60' : 'text-charcoal/60'}`}>
          {label}
        </span>
        {note && (
          <span className={`ml-auto hidden font-mono text-[11px] tracking-[0.18em] md:block ${onDark ? 'text-warmivory/40' : 'text-charcoal/50'}`}>
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

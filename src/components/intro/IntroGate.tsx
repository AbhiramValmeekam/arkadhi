import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/lib/motion/variants';

/**
 * Intro gate — the oversized numeral count the site opens on.
 *
 * Shown once per session (sessionStorage), skipped entirely under
 * prefers-reduced-motion, and always escapable: any key, click or wheel ends
 * it immediately. While active it locks the document scroll.
 *
 * The count is decorative, not a real loading bar — it is paced so the number
 * reads as a title card rather than a progress indicator, and it never waits on
 * anything, so it cannot strand a visitor behind a stalled asset.
 */
const KEY = 'arkadhi:intro-seen';

/**
 * True when the gate is going to play. Lets later components offset their
 * entrance so they animate after the curtain lifts rather than behind it.
 */
export function introWillShow() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true; // private mode: assume it plays, the offset is harmless
  }
}

export function IntroGate() {
  const [done, setDone] = useState(() => !introWillShow());
  const [n, setN] = useState(0);
  const raf = useRef(0);

  // count 0 → 100
  useEffect(() => {
    if (done) return;
    const start = performance.now();
    const DURATION = 1550;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * 100));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else raf.current = requestAnimationFrame(() => setTimeout(() => setDone(true), 260) as unknown as number);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [done]);

  // lock scroll while the gate is up
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const finish = () => setDone(true);
    window.addEventListener('keydown', finish);
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchstart', finish, { passive: true });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', finish);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
    };
  }, [done]);

  useEffect(() => {
    if (!done) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* private mode — the gate simply shows again */
    }
    // make sure Lenis picks the lock back up
    window.dispatchEvent(new Event('resize'));
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-peach"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.05, ease: EASE.calm }}
        >
          <div className="flex items-baseline gap-[0.06em] font-display font-light leading-[0.78] tracking-[-0.05em] text-ink">
            <span
              className="tabular-nums"
              style={{ fontSize: 'clamp(5rem, 22vw, 19rem)' }}
              aria-hidden="true"
            >
              {String(n).padStart(3, '0')}
            </span>
          </div>

          <div className="mt-10 flex w-[min(78vw,32rem)] items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Arkadhi Labs
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-[var(--line)]">
              <motion.span
                className="absolute inset-y-0 left-0 bg-charcoal"
                initial={{ width: '0%' }}
                animate={{ width: `${n}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-hush">
              Press any key
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

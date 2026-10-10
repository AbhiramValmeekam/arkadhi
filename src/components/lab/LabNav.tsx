import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/navigation/Logo';
import { MobileNav } from '@/components/navigation/MobileNav';

import { nav } from '@/lib/content/pack';

const ITEMS = nav;

/**
 * LabNav — difference-blend navigation. Bone type inverts itself against
 * whatever scrolls beneath (ivory hero or coal rooms), so it never needs a
 * background and never competes with the wordmark.
 */
export function LabNav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > 420 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] mix-blend-difference"
      >
        <div className="shell flex items-center justify-between py-4 text-[#FFFFFF] md:py-5">
          <Link to="/" aria-label="Arkadhi Labs home" className="flex min-h-[44px] min-w-[44px] items-center gap-3">
            <Logo showWord={false} tone="paper" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Arkadhi Labs
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] opacity-90 transition-opacity hover:opacity-100"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.24em] lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}

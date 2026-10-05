import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation, site } from '@/lib/content/site';
import { Logo } from './Logo';
import { EASE } from '@/lib/motion/variants';

/**
 * Mobile navigation — a full-screen layer, not a drawer.
 *
 * Carries the display type at near-hero scale so it reads as another layer of
 * the same system rather than a utility menu. Locks scroll while open and
 * closes on Escape.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const items = [{ label: 'Home', to: '/' }, ...navigation];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE.calm }}
          className="fixed inset-0 z-[120] flex flex-col bg-charcoal text-warmivory lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {/* Wipe-in layer */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-charcoal"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: EASE.precise }}
          />

          <div className="relative flex items-center justify-between px-6 py-5">
            <Logo tone="paper" />
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-meta uppercase tracking-[0.14em] text-warmivory/80"
              aria-label="Close navigation"
            >
              Close ✕
            </button>
          </div>

          <nav aria-label="Primary mobile" className="relative flex flex-1 flex-col justify-center px-6">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE.calm, delay: 0.12 + i * 0.05 }}
                  className="border-b border-warmivory/10"
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="flex items-baseline justify-between py-4 font-display text-[34px] font-bold leading-none tracking-[-0.035em] text-warmivory"
                  >
                    {item.label}
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-warmivory/35">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE.calm }}
            className="relative border-t border-warmivory/10 px-6 py-6"
          >
            <Link
              to="/work-with-us"
              onClick={onClose}
              className="font-mono text-meta uppercase tracking-[0.14em] text-peach"
            >
              Work With Us ↗
            </Link>
            <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-warmivory/35">
              {site.location}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

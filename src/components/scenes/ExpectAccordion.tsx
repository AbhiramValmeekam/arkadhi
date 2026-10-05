import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MaskWipe } from '@/components/motion/MaskWipe';
import { EASE } from '@/lib/motion/variants';
import { expectScenes } from '@/lib/content/scenes';

/**
 * "What to expect" — accordion of the lab's operating principles.
 *
 * A real disclosure widget: buttons with aria-expanded/aria-controls, keyboard
 * operable, one panel open at a time. Height animates via a measured wrapper
 * rather than max-height guesswork.
 */
export function ExpectAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[var(--line)] bg-paper-dim py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="t-eyebrow text-signal">{expectScenes.kicker}</p>
          <MaskWipe delay={0.08} className="mt-6">
            <h2 className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.04] tracking-[-0.03em] text-ink">
              {expectScenes.heading}
            </h2>
          </MaskWipe>
        </div>

        <ul className="border-t border-[var(--line)]">
          {expectScenes.items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `expect-panel-${i}`;
            const btnId = `expect-btn-${i}`;
            return (
              <li key={item.q} className="border-b border-[var(--line)]">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[16.5px] font-medium tracking-[-0.015em] text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ease-calm ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-ink/60" />
                      <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-ink/60" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE.calm }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-text pb-7 pr-8 text-[14.5px] leading-relaxed text-ink/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

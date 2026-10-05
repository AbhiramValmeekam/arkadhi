import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useVelocity } from 'framer-motion';
import { ParticleHero } from '@/components/motion/ParticleHero';
import { Scramble } from '@/components/lab/motion';
import { EASE } from '@/lib/motion/variants';
import { heroScene } from '@/lib/content/scenes';

/**
 * Hero — the protected particle title, redressed.
 *
 * The ARKADHI wordmark (ParticleHero) is untouched infrastructure. Surrounding
 * dressing: scrambling eyebrow, masked tagline, magnetic chips, clip-wiped
 * lede, staggered CTAs, scroll-driven progress hairline.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const subRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const BASE = 0.25;
  const WAVE = heroScene.mark.length * 0.11 + 0.5;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // tagline drifts, tightens and skews with scroll velocity — editorial motion
  const tagY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const tagSkew = useTransform(useVelocity(scrollYProgress), [-2.5, 2.5], [-7, 7]);
  const tagTracking = useTransform(scrollYProgress, [0, 1], ['0em', '-0.04em']);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-20 md:pt-24 2xl:pt-28"
    >
      {/* faint editorial grid + particle canvas (both flat, non-interactive) */}
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
      <div ref={canvasHostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />

      {/* corner registration labels */}
      <span aria-hidden="true" className="pointer-events-none absolute left-10 top-28 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-hush/70 md:block">
        Fig. 01 — Wordmark
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute right-10 top-28 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-hush/70 md:block">
        <Scramble text="EST. 2026" duration={0.9} delay={BASE + WAVE} />
      </span>

      <div className="shell flex flex-1 flex-col justify-center">
        <p className="t-eyebrow flex items-center justify-center gap-3 text-center tracking-[0.3em] text-charcoal">
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-charcoal" />
          <Scramble text={heroScene.microLine} duration={1.0} delay={BASE} />
        </p>

        <h1 className="mt-6 text-center md:mt-7">
          <span className="sr-only">Arkadhi Labs</span>
          <span
            aria-hidden="true"
            className="block pb-[0.17em] font-mark text-[clamp(4.5rem,min(26svh,21vw),17rem)] font-normal uppercase leading-[0.88] tracking-[0.01em] text-ink"
          >
            <ParticleHero
              text={heroScene.mark}
              accent={heroScene.markAccent}
              baseDelay={BASE + 0.3}
              sectionRef={sectionRef}
              subRef={subRef}
              canvasHostRef={canvasHostRef}
            />
          </span>
        </h1>

        <div ref={subRef}>
          <motion.div
            className="mx-auto mt-7 max-w-none text-center font-serif font-light leading-[1.05] text-ink/90"
            style={{ y: tagY, skewX: tagSkew, letterSpacing: tagTracking }}
          >
            {heroScene.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block origin-left whitespace-nowrap text-[clamp(1.8rem,4.6vw,3.8rem)]"
                  initial={{ y: '112%', rotate: 2.5 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 1.15, ease: EASE.calm, delay: BASE + WAVE + 0.1 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.div>

          <motion.span
            className="mx-auto mt-7 block h-px w-24 origin-center bg-charcoal/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE.calm, delay: BASE + WAVE + 0.4 }}
          />

          <motion.p
            className="mx-auto mt-5 max-w-[58ch] text-center text-[clamp(1.1rem,1.7vw,1.35rem)] font-normal leading-[1.6] tracking-[-0.005em] text-ink/90"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.0, ease: EASE.calm, delay: BASE + WAVE + 0.5 }}
          >
            {heroScene.lede}
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {[
              { to: heroScene.primary.to, label: heroScene.primary.label, cls: 'inline-flex items-center gap-3 bg-charcoal px-6 py-4 font-mono text-meta uppercase text-warmivory transition-colors duration-300 hover:bg-peach hover:text-charcoal', arrow: true },
              { to: heroScene.secondary.to, label: heroScene.secondary.label, cls: 'inline-flex items-center gap-3 border border-charcoal/30 px-6 py-4 font-mono text-meta uppercase text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-warmivory', arrow: false },
            ].map((cta, i) => (
              <motion.span
                key={cta.label}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: EASE.calm, delay: BASE + WAVE + 0.62 + i * 0.1 }}
              >
                <Link to={cta.to} className={cta.cls}>
                  {cta.label} {cta.arrow && <span aria-hidden="true">→</span>}
                </Link>
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className="shell flex items-center justify-between">
        <span className="block overflow-hidden">
          <motion.span
            className="block font-mono text-[10px] uppercase tracking-[0.22em] text-hush"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.2, ease: EASE.calm, repeat: Infinity }}
          >
            {heroScene.scrollHint}
          </motion.span>
        </span>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-hush">
            Learn — Understand — Act — Aware
          </span>
          <motion.span
            className="block h-8 w-px origin-top bg-ink/20"
            style={{ scaleY: progressScale }}
          />
        </span>
      </div>
    </section>
  );
}

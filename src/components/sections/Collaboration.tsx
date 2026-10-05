import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { MagneticLink } from '@/components/motion/Magnetic';
import { collaboration } from '@/lib/content/home';

/**
 * Collaboration — the closing narrative beat before the footer.
 * Large statement, then the good-fit qualifier, then the CTA.
 */
export function Collaboration() {
  return (
    <section className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{collaboration.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-7 max-w-[18ch] font-display text-[clamp(2rem,5.4vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
            {collaboration.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-[var(--line)] pt-9 md:grid-cols-[1.1fr_1fr] md:gap-16 md:mt-16">
          <Reveal>
            <p className="max-w-text text-lede text-ink/75">{collaboration.body}</p>
            <div className="mt-8">
              <MagneticLink to={collaboration.cta.to}>
                {collaboration.cta.label} <span aria-hidden="true">↗</span>
              </MagneticLink>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="t-eyebrow text-signal">{collaboration.goodFitLabel}</p>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ink/70">{collaboration.goodFit}</p>
            <Link
              to="/solutions"
              className="link-underline mt-7 inline-block font-mono text-meta uppercase tracking-[0.14em] text-signal"
            >
              See the problems we work on →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

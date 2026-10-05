import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { communityPage, audience } from '@/lib/content/community';

/**
 * Community teaser — Compute & Curiosity.
 *
 * Explicitly not an EchoRegent advertisement (brief §20). The audience list is
 * real team-supplied content; event details are still pending, so the section
 * makes no claim about a schedule.
 */
export function CommunityTeaser() {
  return (
    <section className="border-t border-[var(--line)] bg-paper-dim py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="t-eyebrow text-signal">{communityPage.eyebrow}</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                Compute &<br />Curiosity
              </h2>
              <p className="mt-6 max-w-[44ch] text-[15.5px] leading-relaxed text-ink/70">
                {communityPage.intro}
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-9">
              <Link to="/community" className="btn">
                Explore Compute & Curiosity <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="t-eyebrow">Who it is for</p>
            <RevealGroup as="ul" className="mt-6 border-t border-[var(--line)]">
              {audience.map((a) => (
                <RevealItem
                  as="li"
                  key={a}
                  y={10}
                  className="border-b border-[var(--line)] py-3.5 font-display text-[15px] tracking-[-0.01em]"
                >
                  {a}
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-hush">
              Research-led, but not researchers-only.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

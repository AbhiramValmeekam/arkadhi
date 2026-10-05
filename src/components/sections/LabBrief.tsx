import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { StatusMark } from '@/components/motion/StatusMark';
import { labBrief } from '@/lib/content/home';
import { cmpPrimitives, researchPrograms } from '@/lib/content/research';

/**
 * Lab brief — the flagship result stated plainly, then the four primitives as a
 * horizontal ledger rather than a card grid.
 */
export function LabBrief() {
  return (
    <section className="border-t border-[var(--line)] py-16 md:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="t-eyebrow">{labBrief.label}</p>
              <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                {labBrief.title}
              </h2>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-ink/70">{labBrief.body}</p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8">
              <Link
                to="/research"
                className="link-underline font-mono text-meta uppercase tracking-[0.14em] text-signal"
              >
                Read the full index →
              </Link>
            </Reveal>
          </div>

          {/* The four primitives */}
          <RevealGroup as="ul" className="border-t border-[var(--line)]">
            {cmpPrimitives.map((p, i) => {
              const program = researchPrograms[i];
              return (
                <RevealItem
                  as="li"
                  key={p.number}
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-x-5 border-b border-[var(--line)] py-5 md:grid-cols-[3.5rem_1fr_auto]"
                >
                  <span className="font-mono text-meta text-muted">{p.number}</span>
                  <span className="font-display text-[17px] font-medium tracking-[-0.01em]">{p.title}</span>
                  {program && (
                    <span className="col-start-2 md:col-start-3 md:justify-self-end">
                      <StatusMark status={program.status} />
                    </span>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

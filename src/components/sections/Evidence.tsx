import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { StatusMark } from '@/components/motion/StatusMark';
import { researchArtifacts } from '@/lib/content/research';
import { researchToSystems } from '@/lib/content/products';

/**
 * Evidence — the flagship paper leads, then the rest of the catalog.
 *
 * This is where the lab's credibility lives, so the composition gives the
 * published paper its own full-width block: title, authors, and the three
 * reported metrics, each labelled with its status.
 */
export function Evidence() {
  const flagship = researchArtifacts.find((a) => a.flagship);
  const rest = researchArtifacts.filter((a) => !a.flagship);

  return (
    <section className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{researchToSystems.eyebrow}</p>
          <h2 className="t-section mt-6 max-w-[16ch]">{researchToSystems.title}</h2>
        </Reveal>

        {/* Flagship */}
        {flagship && (
          <Reveal delay={0.12} className="mt-14 md:mt-20">
            <article className="grid gap-10 border-t border-ink/20 pt-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <StatusMark status={flagship.status} />
                  <span className="font-mono text-meta uppercase text-muted">{flagship.id}</span>
                </div>
                <p className="mt-5 font-mono text-meta uppercase text-muted">
                  {flagship.kind} · {flagship.year}
                </p>
              </div>

              <div>
                <h3 className="max-w-[20ch] font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                  {flagship.title}
                </h3>

                {/* Reported metrics — clearly attributed to the paper */}
                {flagship.metrics && (
                  <dl className="mt-8 grid grid-cols-3 gap-px bg-[var(--line)]">
                    {flagship.metrics.map((m) => (
                      <div key={m.label} className="bg-paper px-4 py-5">
                        <dt className="font-mono text-meta uppercase text-muted">{m.label}</dt>
                        <dd className="mt-2 font-display text-[clamp(1.125rem,1.8vw,1.5rem)] font-bold tracking-[-0.02em] text-signal">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="mt-7 max-w-text text-[14.5px] leading-relaxed text-ink/70">{flagship.summary}</p>

                <p className="mt-5 font-mono text-meta uppercase leading-relaxed text-muted">
                  Authors: {flagship.authors}
                </p>

                <Link
                  to={`/research#${flagship.slug}`}
                  className="link-underline mt-7 inline-block font-mono text-meta uppercase tracking-[0.14em] text-signal"
                >
                  Read Full Paper & Abstract →
                </Link>
              </div>
            </article>
          </Reveal>
        )}

        {/* Remaining catalog */}
        <RevealGroup className="mt-16 border-t border-[var(--line)] md:mt-20">
          {rest.map((a) => (
            <RevealItem
              key={a.id}
              as="article"
              className="grid gap-x-8 gap-y-3 border-b border-[var(--line)] py-7 md:grid-cols-[9rem_1fr_10rem] md:items-baseline"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-meta uppercase text-muted">{a.id}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-hush">{a.kind}</span>
              </div>

              <div>
                <h3 className="font-display text-[17px] font-medium leading-snug tracking-[-0.01em]">
                  {a.title}
                </h3>
                {a.negativeResult && (
                  <span className="mt-2 inline-block border border-signal/40 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-signal">
                    Documents a failure mode
                  </span>
                )}
              </div>

              <div className="md:justify-self-end">
                <StatusMark status={a.status} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

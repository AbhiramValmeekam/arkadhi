import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/sections/PageHeader';
import { Closer } from '@/components/sections/Closer';
import { StatusMark } from '@/components/motion/StatusMark';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Field } from '@/components/motion/Field';
import { researchArtifacts, researchPage, researchPrograms } from '@/lib/content/research';

/**
 * /research — the lab's evidence index.
 *
 * This page already worked well on the live site; the rebuild is mostly art
 * direction. The one structural change: TR-004 (the negative result) is called
 * out rather than buried, because publishing failure modes is the proof of the
 * "Evidence before narrative" principle stated on /lab.
 */
export function Research() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return researchArtifacts;
    return researchArtifacts.filter((a) => a.category.toLowerCase() === filter.toLowerCase());
  }, [filter]);

  const flagship = researchArtifacts.find((a) => a.flagship);
  const negative = researchArtifacts.find((a) => a.negativeResult);

  return (
    <>
      <PageHeader
        eyebrow={researchPage.eyebrow}
        title={['Original AI Architecture,', 'Measured Carefully.']}
        intro={researchPage.intro}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-60">
          <Field opacity={0.35} density={26} />
        </div>
      </PageHeader>

      {/* Flagship paper */}
      {flagship && (
        <section id={flagship.slug} className="border-b border-[var(--line)] py-16 md:py-24">
          <div className="shell">
            <Reveal>
              <p className="t-eyebrow text-charcoal">Primary Research Paper</p>
            </Reveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <StatusMark status={flagship.status} />
                  <span className="font-mono text-meta uppercase text-muted">{flagship.year}</span>
                </div>
                <p className="mt-5 font-mono text-meta uppercase text-muted">{flagship.id}</p>
                <p className="mt-2 font-mono text-meta uppercase text-hush">{flagship.category}</p>
              </div>

              <div>
                <h2 className="max-w-[20ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                  {flagship.title}
                </h2>

                {flagship.metrics && (
                  <dl className="mt-9 grid grid-cols-3 gap-px bg-[var(--line)]">
                    {flagship.metrics.map((m) => (
                      <div key={m.label} className="bg-warmivory px-4 py-6">
                        <dt className="font-mono text-meta uppercase text-muted">{m.label}</dt>
                        <dd className="mt-2 font-display text-[clamp(1.125rem,2vw,1.625rem)] font-bold tracking-[-0.02em] text-charcoal">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="mt-8 max-w-text text-[15px] leading-relaxed text-ink/70">{flagship.summary}</p>

                <p className="mt-6 font-mono text-meta uppercase leading-relaxed text-muted">
                  Authors: {flagship.authors}
                </p>

                {/* TODO: wire the real DOI / arXiv / PDF permalink — pending from team */}
                <span className="mt-8 inline-block border border-[var(--line)] px-5 py-3.5 font-mono text-meta uppercase text-muted">
                  Paper link — [NEED INPUT]
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Negative result callout */}
      {negative && (
        <section className="border-b border-[var(--line)] bg-apricot/50 py-14 md:py-16">
          <div className="shell">
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[0.55fr_1.45fr] md:gap-16">
                <div>
                  <p className="t-eyebrow text-charcoal">Also Published</p>
                  <p className="mt-4 font-display text-[19px] font-medium leading-snug tracking-[-0.015em]">
                    A negative result
                  </p>
                </div>
                <div>
                  <p className="max-w-text text-[15px] leading-relaxed text-ink/75">
                    We publish the experiments that failed. Disclosing failure modes is the difference between a
                    lab and a marketing page — and it is the only way 'Evidence before narrative' means anything.
                  </p>
                  <p className="mt-5 font-mono text-meta uppercase text-muted">
                    {negative.id} · {negative.title}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Catalog */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold tracking-[-0.03em]">
              {researchPage.catalogHeading}
            </h2>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.08} className="mt-8">
            <div className="flex flex-wrap gap-2">
              {researchPage.categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                    className={`rounded-sm border px-4 py-2.5 font-mono text-meta uppercase transition-colors duration-300 ease-calm ${
                      filter === c
                        ? 'border-charcoal bg-charcoal text-warmivory'
                        : 'border-[var(--line)] text-muted hover:border-ink/30 hover:text-ink'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Rows */}
          <RevealGroup as="ul" className="mt-10 border-t border-[var(--line)]">
            {filtered.map((a) => (
              <RevealItem
                as="li"
                key={a.id}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--line)] py-7 md:grid-cols-[10rem_1fr_11rem] md:items-baseline"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-meta uppercase text-muted">{a.id}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-hush">{a.kind}</span>
                </div>

                <div>
                  <h3 className="font-display text-[17.5px] font-medium leading-snug tracking-[-0.015em]">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 max-w-text text-[13.5px] leading-relaxed text-ink/60">
                    {a.summary.length > 200 ? a.summary.slice(0, 200) + '…' : a.summary}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-hush">
                    {a.authors}
                  </p>
                </div>

                <div className="md:justify-self-end">
                  <StatusMark status={a.status} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Research Programs</p>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.035em]">
              {researchPage.programsHeading}
            </h2>
            <p className="mt-5 max-w-text text-[15px] leading-relaxed text-ink/70">{researchPage.programsIntro}</p>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {researchPrograms.map((p) => (
              <RevealItem
                as="li"
                key={p.number}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--line)] py-7 md:grid-cols-[5rem_1fr_1.3fr_9rem] md:items-baseline"
              >
                <span className="font-mono text-meta text-muted">{p.number}</span>
                <h3 className="font-display text-[19px] font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink/65">{p.summary}</p>
                <div className="md:justify-self-end">
                  <StatusMark status={p.status} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Closer />
    </>
  );
}

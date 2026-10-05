import { PageHeader } from '@/components/sections/PageHeader';
import { Closer } from '@/components/sections/Closer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { MagneticLink } from '@/components/motion/Magnetic';
import { labPage, operatingModel, principles, disciplines, labJoin } from '@/lib/content/lab';

/** /lab — the operating model and principles. This page *is* the about page. */
export function Lab() {
  return (
    <>
      <PageHeader eyebrow={labPage.eyebrow} title={['A research institute for', 'original AI architecture.']} intro={labPage.intro} />

      {/* Operating model */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              {operatingModel.heading}
            </h2>
            <p className="mt-6 max-w-text text-[15.5px] leading-relaxed text-ink/70">{operatingModel.body}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <dl className="border-t border-[var(--line)]">
              {operatingModel.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between border-b border-[var(--line)] py-4">
                  <dt className="font-mono text-meta uppercase text-muted">{f.label}</dt>
                  <dd className="font-mono text-meta uppercase text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-text text-[13.5px] leading-relaxed text-ink/60">{operatingModel.note}</p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Operating Principles</p>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.035em]">
              How the lab decides what is worth doing.
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {principles.map((p) => (
              <RevealItem
                as="li"
                key={p.number}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--line)] py-8 md:grid-cols-[5rem_1fr_1.3fr] md:items-baseline"
              >
                <span className="font-mono text-meta text-muted">{p.number}</span>
                <h3 className="font-display text-[19px] font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink/65">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Disciplines */}
      <section id="disciplines" className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Lab Disciplines</p>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.035em]">
              Disciplines under one roof.
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-px bg-[var(--line)] md:grid-cols-2">
            {disciplines.map((d) => (
              <RevealItem key={d.key} className="bg-warmivory px-6 py-8 md:px-8 md:py-10">
                <h3 className="font-mono text-meta uppercase tracking-[0.14em] text-charcoal">{d.key}</h3>
                <p className="mt-5 max-w-[40ch] text-[14.5px] leading-relaxed text-ink/70">{d.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Join */}
      <section className="bg-charcoal py-20 text-warmivory md:py-28">
        <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="t-eyebrow text-peach">{labJoin.eyebrow}</p>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-warmivory">
              {labJoin.title}
            </h2>
            <p className="mt-6 max-w-text text-[15px] leading-relaxed text-warmivory/60">{labJoin.body}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <MagneticLink to={labJoin.cta.to} variant="dark">
              {labJoin.cta.label} <span aria-hidden="true">→</span>
            </MagneticLink>
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}

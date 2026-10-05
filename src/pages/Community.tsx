import { PageHeader } from '@/components/sections/PageHeader';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import {
  communityPage,
  communityPending,
  communityOutro,
  events,
  audience,
  ccPage,
} from '@/lib/content/community';
import { Link } from 'react-router-dom';

/**
 * /community — Compute & Curiosity, hosted by Arkadhi Labs.
 *
 * What it is, who should join, how events run, the join flow, and starter
 * resources. Dates and venues stay pending until confirmed — formats and
 * flow are stable intentions, never invented events.
 */
export function Community() {
  return (
    <>
      <PageHeader
        eyebrow={communityPage.eyebrow}
        title={['Compute &', 'Curiosity']}
        intro={communityPage.intro}
      />

      {/* What it is */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="t-eyebrow">What it is</p>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              A research-led community, hosted by Arkadhi Labs.
            </h2>
          </Reveal>
          <div>
            {ccPage.what.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-text text-[15.5px] leading-relaxed text-ink/75 [&:not(:first-child)]:mt-5">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who should join */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Who should join</p>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Come curious — background optional.
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 flex flex-wrap gap-2.5">
            {audience.map((a) => (
              <RevealItem
                as="li"
                key={a}
                className="border border-[var(--line)] px-5 py-3 font-mono text-meta uppercase tracking-[0.12em] text-ink/75 transition-colors duration-300 hover:border-charcoal hover:text-charcoal"
              >
                {a}
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-text text-[14.5px] leading-relaxed text-ink/60">
              Students and the simply curious sit next to researchers. If you are just starting
              out, say so when you register — first sessions assume zero background.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Events & formats */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Events & formats</p>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              How we meet.
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
            {ccPage.formats.map((f) => (
              <RevealItem key={f.key} className="bg-warmivory p-7 md:p-9">
                <h3 className="font-display text-[19px] font-medium tracking-[-0.015em]">{f.key}</h3>
                <p className="mt-3 max-w-[44ch] text-[14.5px] leading-relaxed text-ink/65">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <p className="t-eyebrow">Scheduled dates</p>
            {events.length === 0 ? (
              <p className="mt-5 max-w-text text-[14.5px] leading-relaxed text-ink/55">
                {communityPending.note} Session times are planned around a distributed,
                online-first community — no timezone is an afterthought.
              </p>
            ) : (
              <ul className="mt-6 border-t border-[var(--line)]">
                {events.map((e) => (
                  <li key={e.title} className="border-b border-[var(--line)] py-5">
                    <p className="font-display text-[16px] font-medium">{e.title}</p>
                    <p className="mt-1.5 font-mono text-meta uppercase text-muted">
                      {e.date} · {e.location} · {e.format}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      {/* Join flow */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Join flow</p>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Four steps to your first session.
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {ccPage.joinFlow.map((s) => (
              <RevealItem
                as="li"
                key={s.step}
                className="grid gap-x-8 gap-y-3 border-b border-[var(--line)] py-8 md:grid-cols-[5rem_1fr_1.3fr] md:items-baseline"
              >
                <span className="font-mono text-meta text-charcoal">{s.step}</span>
                <h3 className="font-display text-[19px] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink/65">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-10">
            <Link to="/work-with-us" className="btn">
              Register interest <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Starter resources */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Start here</p>
            <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Resources, by where you are.
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {ccPage.starters.map((r) => (
              <RevealItem as="li" key={r.key} className="border-b border-[var(--line)] py-7">
                <Link to={r.to} className="group grid gap-x-8 gap-y-2 md:grid-cols-[14rem_1fr_auto] md:items-baseline">
                  <h3 className="font-display text-[17px] font-medium tracking-[-0.015em] transition-transform duration-500 ease-calm group-hover:translate-x-2">
                    {r.key}
                  </h3>
                  <p className="max-w-text text-[14px] leading-relaxed text-ink/65">{r.body}</p>
                  <span aria-hidden="true" className="font-mono text-meta text-charcoal transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Outro */}
      <section className="py-20 md:py-28">
        <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-[17ch] font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              {communityOutro.title}
            </h2>
            <p className="mt-6 max-w-text text-[15px] leading-relaxed text-ink/70">{communityOutro.body}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link to={communityOutro.cta.to} className="btn">
              {communityOutro.cta.label} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

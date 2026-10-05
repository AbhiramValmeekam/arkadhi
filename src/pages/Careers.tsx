import { PageHeader } from '@/components/sections/PageHeader';
import { Closer } from '@/components/sections/Closer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { careersPage, traits, roles, careersHeading } from '@/lib/content/careers';
import { site } from '@/lib/content/site';

/** /lab/careers — hiring tracks. */
export function Careers() {
  return (
    <>
      <PageHeader eyebrow={careersPage.eyebrow} title={['Build the kind of AI work', 'that can be inspected.']} intro={careersPage.intro} />

      {/* Traits */}
      <section className="border-b border-[var(--line)] py-16 md:py-20">
        <div className="shell">
          <RevealGroup className="grid gap-px bg-[var(--line)] md:grid-cols-3">
            {traits.map((t) => (
              <RevealItem key={t.title} className="bg-warmivory px-6 py-8 md:px-7 md:py-9">
                <h2 className="font-display text-[17px] font-medium tracking-[-0.015em]">{t.title}</h2>
                <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-ink/65">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Open Roles</p>
            <h2 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-[-0.035em]">
              {careersHeading}
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {roles.map((r) => (
              <RevealItem
                as="li"
                key={r.title}
                className="group grid gap-x-8 gap-y-4 border-b border-[var(--line)] py-8 transition-colors duration-500 ease-calm hover:bg-peach/40 md:grid-cols-[9rem_1fr_1.1fr_7rem] md:items-baseline"
              >
                <span className="font-mono text-meta uppercase tracking-[0.12em] text-charcoal">{r.track}</span>
                <div>
                  <h3 className="font-display text-[18px] font-medium tracking-[-0.02em]">{r.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-hush">{r.location}</p>
                </div>
                <p className="text-[14px] leading-relaxed text-ink/65">{r.body}</p>
                <a
                  href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(`Application — ${r.title}`)}`}
                  className="link-underline font-mono text-meta uppercase tracking-[0.14em] text-charcoal md:justify-self-end"
                >
                  Apply →
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Closer />
    </>
  );
}

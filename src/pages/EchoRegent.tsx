import { Band, Title, Lead, PageHead, Ledger, ON_DARK, PRIMARY, SECONDARY } from '@/components/home/parts';
import { MaskLines } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';
import { echoPage as c, mail, SUBJECTS } from '@/lib/content/pack';

/** /echoregent — no upload box, no demo, no savings claims. Email is the only action. */
export function EchoRegent() {
  return (
    <>
      <PageHead eyebrow={c.eyebrow} lines={['MAKE EVERY', 'TOKEN COUNT.']} intro={c.subhead}>
        <p className="mt-6 inline-block border border-charcoal px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em]">{c.stage}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={mail(SUBJECTS.audit)} className={PRIMARY}>{c.primary} <span aria-hidden="true">→</span></a>
          <a href="#audit" className={SECONDARY}>{c.secondary}</a>
        </div>
      </PageHead>

      <Band id="problem" index="01" label="The problem">
        <Title lines={['LONGER CONTEXT CAN', 'MEAN A LARGER BILL.']} />
        <p className="sr-only">{c.problem.heading}</p>
        <Lead className="mt-10">{c.problem.body}</Lead>
        <Lead className="mt-4">{c.problem.support}</Lead>
      </Band>

      <Band id="building" tone="teal" index="02" label="What we are building">
        <Title lines={['LESS UNNECESSARY', 'CONTEXT. QUALITY', 'CHECKED.']} />
        <p className="sr-only">{c.building.heading}</p>
        <Lead className="mt-10">{c.building.body}</Lead>
        <Lead className="mt-4">{c.building.support}</Lead>
      </Band>

      <Band id="audit" tone="gray" index="03" label={c.audit.heading}>
        <Title lines={['HOW THE', 'AUDIT WORKS']} />
        <p className="sr-only">{c.audit.heading}</p>
        <ol className="mt-14 border-t border-charcoal/30 md:mt-20">
          {c.audit.steps.map((s, i) => (
            <li key={s.name} className="border-b border-charcoal/30">
              <Reveal delay={i * 0.05}>
                <div className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:py-10">
                  <span className="font-mono text-[12px] tracking-[0.22em]">0{i + 1}</span>
                  <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">{s.name}</h3>
                  <p className="max-w-[44ch] text-[17px] leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Lead className="mt-10">{c.audit.walkthrough}</Lead>
        <p className="mt-5 max-w-[60ch] border-l-[3px] border-charcoal pl-4 text-[16.5px] leading-relaxed">{c.audit.dataNote}</p>
      </Band>

      <Band id="who" index="04" label={c.who.heading}>
        <Title lines={['WHO IT', 'IS FOR']} />
        <p className="sr-only">{c.who.heading}</p>
        <Lead className="mt-10">{c.who.body}</Lead>
        <Lead className="mt-4">{c.who.support}</Lead>
      </Band>

      <Band id="faq" tone="peach" index="05" label="Questions">
        <Title lines={['QUESTIONS', 'AND ANSWERS']} />
        <div className="mt-14 md:mt-20">
          <Ledger rows={c.faq.map((f) => ({ key: f.q, body: f.a }))} />
        </div>
      </Band>

      <section aria-label="Request a token audit" className="bg-charcoal text-warmivory">
        <div className="shell py-20 md:py-32">
          <h2 className="sr-only">{c.closing.headline}</h2>
          <MaskLines
            lines={['UNDERSTAND YOUR', 'TOKEN SPEND BEFORE', 'CHANGING YOUR STACK.']}
            lineClassName="font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.035em]"
          />
          <a href={mail(SUBJECTS.audit)} className={`${ON_DARK} mt-10`}>{c.closing.cta} <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </>
  );
}

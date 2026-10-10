import { Band, Title, Lead, PageHead, ON_DARK, PRIMARY, SECONDARY } from '@/components/home/parts';
import { MaskLines } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';
import { ccEvents, ccPage as c, ccSections, mail, SUBJECTS } from '@/lib/content/pack';

/**
 * /computecuriosity — email-only joining. No invented events, dates, counts or
 * group links. Future sections live in `ccSections` and render only when live.
 */
export function CCHome() {
  const hasLive = (id: string) => ccSections.some((s) => s.id === id && s.live);
  return (
    <>
      <PageHead eyebrow={c.eyebrow} lines={['A PLACE TO THINK,', 'BUILD AND ASK BETTER', 'QUESTIONS ABOUT AI.']} intro={c.subhead}>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href={mail(SUBJECTS.community)} className={PRIMARY}>{c.primary} <span aria-hidden="true">→</span></a>
          <a href="#what-we-do" className={SECONDARY}>{c.secondary}</a>
        </div>
      </PageHead>

      <Band id="who" index="01" label="Who it is for">
        <Title lines={['CURIOSITY IS THE', 'STARTING POINT.']} />
        <p className="sr-only">{c.who.heading}</p>
        <Lead className="mt-10">{c.who.body}</Lead>
      </Band>

      <Band id="what-we-do" tone="teal" index="02" label={c.what.heading}>
        <Title lines={['WHAT', 'WE DO']} />
        <p className="sr-only">{c.what.heading}</p>
        <ul className="mt-14 border-t border-charcoal/30 md:mt-20">
          {c.what.items.map((it, i) => (
            <li key={it.key} className="border-b border-charcoal/30">
              <Reveal delay={i * 0.05}>
                <div className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:items-baseline md:py-10">
                  <span className="font-mono text-[12px] tracking-[0.22em]">0{i + 1}</span>
                  <h3 className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-bold uppercase leading-[1] tracking-[-0.03em]">{it.key}</h3>
                  <p className="max-w-[40ch] text-[17px] leading-relaxed">{it.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Band>

      {/* Real events render here once confirmed; until then, only the approved invitation. */}
      {!(hasLive('events') && ccEvents.length > 0) && (
        <Band id="events" tone="peach" index="03" label="Events">
          <Title lines={['FIND OUT', 'WHAT’S NEXT.']} size="xl" />
          <p className="sr-only">{c.events.heading}</p>
          <Lead className="mt-10">{c.events.body}</Lead>
          <a href={mail(SUBJECTS.community)} className={`${PRIMARY} mt-10`}>{c.events.cta} <span aria-hidden="true">→</span></a>
        </Band>
      )}

      <section id="join" aria-label="Community invitation" className="bg-charcoal text-warmivory">
        <div className="shell py-20 md:py-32">
          <h2 className="sr-only">{c.invite.heading}</h2>
          <MaskLines
            lines={['BRING A QUESTION.', 'LEAVE WITH SOMETHING', 'TO EXPLORE.']}
            lineClassName="font-display text-[clamp(2rem,6.4vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.035em]"
          />
          <p className="mt-10 max-w-[56ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-warmivory/90">{c.invite.body}</p>
          <a href={mail(SUBJECTS.community)} className={`${ON_DARK} mt-10`}>{c.invite.cta} <span aria-hidden="true">→</span></a>
          <p className="mt-6 max-w-[52ch] font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-warmivory/60">
            Request to join — include what you are curious about and how you would like to take part.
          </p>
          <p className="mt-14 border-t border-warmivory/20 pt-5 font-mono text-[12px] uppercase tracking-[0.18em] text-warmivory/75">{c.footer}</p>
        </div>
      </section>
    </>
  );
}

import { Band, Title, Lead, Ledger, PRIMARY } from './parts';
import { researchPage, mail, SUBJECTS } from '@/lib/content/pack';

/** How to read our results, then an open invitation — email only. */
export function ResearchReading() {
  const r = researchPage.reading;
  return (
    <Band id="reading" tone="teal" index="05" label={r.heading}>
      <Title lines={['HOW TO READ', 'OUR RESULTS']} />
      <p className="sr-only">{r.heading}</p>
      <Lead className="mt-10">{r.intro}</Lead>
      <div className="mt-14 md:mt-20">
        <Ledger rows={r.items} />
      </div>
      <p className="mt-14 max-w-[24ch] font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em]">{r.invite}</p>
      <a href={mail(SUBJECTS.general)} className={`${PRIMARY} mt-8`}>
        {r.cta} <span aria-hidden="true">→</span>
      </a>
    </Band>
  );
}

import { Band, Title, Ledger, PRIMARY } from './parts';
import { mail, SUBJECTS, work } from '@/lib/content/pack';

export function WorkWithUs({ index = '10' }: { index?: string }) {
  return (
    <Band id="work" index={index} label="Work with us">
      <Title lines={['WORK ON QUESTIONS', 'THAT MATTER.']} />
      <p className="sr-only">{work.heading}</p>
      <div className="mt-14 md:mt-20">
        <Ledger rows={work.paths} />
      </div>
      <a href={mail(SUBJECTS.general)} className={`${PRIMARY} mt-10`}>{work.cta} <span aria-hidden="true">→</span></a>
    </Band>
  );
}

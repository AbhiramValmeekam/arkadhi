import { Band, Title, Lead, Ledger } from './parts';
import { researchPage } from '@/lib/content/pack';

export function ResearchThreads({ index = '03' }: { index?: string }) {
  const t = researchPage.threads;
  return (
    <Band id="threads" tone="gray" index={index} label={t.heading}>
      <Title lines={['ACTIVE TECHNICAL', 'THREADS']} />
      <p className="sr-only">{t.heading}</p>
      <Lead className="mt-10">{t.intro}</Lead>
      <div className="mt-14 md:mt-20">
        <Ledger rows={t.items} />
      </div>
    </Band>
  );
}

import { Link } from 'react-router-dom';
import { Band, Lead, Title, PRIMARY, SECONDARY } from './parts';
import { communityHome, mail, SUBJECTS } from '@/lib/content/pack';

export function CommunitySection() {
  return (
    <Band id="community" tone="peach" index="09" label="Community">
      <Title lines={['COMPUTE', '& CURIOSITY']} size="xl" />
      <p className="sr-only">{communityHome.heading}</p>
      <Lead className="mt-10">{communityHome.body}</Lead>
      <Lead className="mt-3">{communityHome.support}</Lead>
      <ul className="mt-8 flex flex-wrap gap-3">
        {communityHome.activities.map((a) => (
          <li key={a} className="border border-charcoal/50 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.14em]">{a}</li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={mail(SUBJECTS.community)} className={PRIMARY}>{communityHome.cta} <span aria-hidden="true">→</span></a>
        <Link to="/computecuriosity" className={SECONDARY}>{communityHome.more}</Link>
      </div>
    </Band>
  );
}

import { Link } from 'react-router-dom';
import { Band, Lead, PRIMARY, SECONDARY } from './parts';
import { MaskLines } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';
import { echoHome, mail, SUBJECTS } from '@/lib/content/pack';

export function EchoRegentSection({ index = '08' }: { index?: string }) {
  return (
    <Band id="echoregent" index={index} label={echoHome.label}>
      <h2 className="sr-only">{echoHome.heading}</h2>
      <MaskLines
        lines={['ECHOREGENT']}
        className="mt-10 md:mt-14"
        lineClassName="font-display text-[clamp(2.8rem,11vw,10rem)] font-bold leading-[0.9] tracking-[-0.04em]"
      />
      <Reveal>
        <p className="mt-8 text-[clamp(1.3rem,2.4vw,2rem)] font-medium">{echoHome.description}</p>
      </Reveal>
      <Lead className="mt-6">{echoHome.body}</Lead>
      <Lead className="mt-4">{echoHome.offer}</Lead>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={mail(SUBJECTS.audit)} className={PRIMARY}>{echoHome.cta} <span aria-hidden="true">→</span></a>
        <Link to="/echoregent" className={SECONDARY}>{echoHome.more}</Link>
      </div>
    </Band>
  );
}

import { Link } from 'react-router-dom';
import { Band, Title, Lead, PRIMARY, SECONDARY } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { research, hero } from '@/lib/content/pack';

/** One neutral research card on the teal band. No figures, no readiness claims. */
export function Evidence({ more = false, index = '05' }: { more?: boolean; index?: string }) {
  const c = research.card;
  return (
    <Band id="research" tone="teal" index={index} label="Our research">
      <Title lines={['RESEARCH BEFORE', 'CLAIMS.']} />
      <p className="sr-only">{research.heading}</p>
      <Lead className="mt-10">{research.intro}</Lead>
      <Reveal delay={0.1}>
        <article className="mt-14 max-w-[900px] bg-warmivory p-7 md:p-12">
          <p className="inline-block border border-charcoal px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em]">{c.label}</p>
          <h3 className="mt-6 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
          <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed">{c.body}</p>
          <dl className="mt-8 divide-y divide-charcoal/15 border-y border-charcoal/15">
            {[['Finding', c.finding], ['Limit', c.limit], ['Scope', c.scope]].map(([k, v]) => (
              <div key={k} className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <dt className="font-mono text-[12px] uppercase tracking-[0.22em]">{k}</dt>
                <dd className="max-w-[58ch] text-[16.5px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
          <a href={c.cta.href} target="_blank" rel="noreferrer noopener" className={`${PRIMARY} mt-8`}>
            {c.cta.label} <span aria-hidden="true">↗</span>
          </a>
        </article>
      </Reveal>
      {more && (
        <Link to={hero.primary.to} className={`${SECONDARY} mt-8`}>
          {hero.primary.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </Band>
  );
}

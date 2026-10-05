import { Band, Title, Lead } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { researchPage } from '@/lib/content/pack';

/** Research catalog — plain status labels, no results. */
export function ResearchCatalog() {
  const c = researchPage.catalog;
  return (
    <Band id="catalog" index="02" label={c.heading}>
      <Title lines={['RESEARCH', 'CATALOG']} />
      <p className="sr-only">{c.heading}</p>
      <Lead className="mt-10">{c.intro}</Lead>
      <ul className="mt-14 border-t border-charcoal/25 md:mt-20">
        {c.items.map((it, i) => (
          <li key={it.title} className="border-b border-charcoal/25">
            <Reveal delay={i * 0.04}>
              <div className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[13rem_1fr_auto] md:items-baseline md:py-10">
                <div>
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em]">{it.kind}</p>
                  <p className="mt-2 inline-block border border-charcoal px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">{it.status}</p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">{it.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed">{it.body}</p>
                </div>
                {'href' in it && it.href ? (
                  <a href={it.href} target="_blank" rel="noreferrer noopener" className="font-mono text-[12px] uppercase tracking-[0.14em] underline underline-offset-4 hover:text-signal">
                    {it.linkLabel} ↗
                  </a>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}

import { Band, Title } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { evidence } from '@/lib/content/pack';

/**
 * Compact evidence panel: full paper title, authors, version/date, setting,
 * baseline, metric and scope — every number with a source. The edge row
 * states plainly that device measurements do not exist yet.
 */
export function EvidencePanel({ index = '02' }: { index?: string }) {
  return (
    <Band id="evidence" tone="white" index={index} label="Evidence, precisely">
      <Title lines={['WHAT THE PREPRINT', 'ACTUALLY SHOWS.']} size="md" />
      <Reveal delay={0.1}>
        <article className="mt-12 max-w-[900px] border border-charcoal/30 p-7 md:p-12">
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-charcoal/70">
            Research preprint | submitted 29 July 2026
          </p>
          <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {evidence.paper}
          </h3>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-charcoal/60">
            {evidence.byline}
          </p>
          <dl className="mt-8 divide-y divide-charcoal/15 border-y border-charcoal/15">
            {evidence.rows.map((r) => (
              <div key={r.key} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="font-mono text-[12px] uppercase tracking-[0.22em]">{r.key}</dt>
                <dd className="max-w-[58ch] text-[16px] leading-relaxed">{r.body}</dd>
              </div>
            ))}
          </dl>
          <a
            href={evidence.href}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-8 inline-block font-mono text-[12px] uppercase tracking-[0.18em] underline underline-offset-4 hover:text-charcoal/70"
          >
            Read on arXiv ↗
          </a>
        </article>
      </Reveal>
    </Band>
  );
}

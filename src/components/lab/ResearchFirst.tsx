import { MaskLines, SectionHead } from './motion';
import { researchFirst } from '@/lib/content/narrative';

/**
 * ResearchFirst — the manifesto on peach. Two massive masked words,
 * one plain-spoken paragraph, significant negative space.
 */
export function ResearchFirst() {
  return (
    <section aria-label="Research first" className="bg-peach text-charcoal">
      <div className="shell py-28 md:py-44">
        <SectionHead index={researchFirst.index} label={researchFirst.label} note="MANIFESTO" />
        <MaskLines
          lines={researchFirst.lines}
          className="mt-12 md:mt-16"
          lineClassName="font-display text-[clamp(3.4rem,12vw,11rem)] font-bold leading-[0.9] tracking-[-0.035em] text-charcoal"
        />
        <p className="mt-12 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-charcoal/75 md:mt-16">
          {researchFirst.body}
        </p>
      </div>
    </section>
  );
}

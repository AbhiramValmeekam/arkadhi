import { Band, Title, Lead } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { framework } from '@/lib/content/pack';

/** Learn / Understand / Act — three equal blocks above one full-width Aware foundation. */
export function Pillars() {
  return (
    <Band id="framework" tone="white" index="04" label="Our framework">
      <Title lines={['LEARN.', 'UNDERSTAND.', 'ACT. AWARE.']} size="xl" />
      <p className="sr-only">{framework.heading}</p>
      <Lead className="mt-10">{framework.intro}</Lead>

      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {framework.top.map((p, i) => (
          <li key={p.key} className="border border-charcoal/25 p-7 md:p-9">
            <Reveal delay={i * 0.06}>
              <p className="font-mono text-[12px] tracking-[0.22em]">0{i + 1}</p>
              <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold uppercase tracking-[-0.03em]">{p.key}</h3>
              <p className="mt-3 text-[17px] leading-relaxed">{p.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <div className="mt-4 border-t-[6px] border-peach bg-charcoal p-8 text-warmivory md:p-14">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-12">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-warmivory/75">Foundation</p>
              <h3 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">{framework.base.key}</h3>
            </div>
            <div>
              <p className="text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug">{framework.base.body}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-warmivory/80">{framework.caption}</p>
            </div>
          </div>
        </div>
      </Reveal>
      <p className="mt-6 max-w-[60ch] text-[15.5px] leading-relaxed">{framework.note}</p>
    </Band>
  );
}

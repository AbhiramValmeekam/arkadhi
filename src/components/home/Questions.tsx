import { Band, Title } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { questions } from '@/lib/content/pack';

/** Four research questions, each given room. Questions, not claims. */
export function Questions() {
  return (
    <Band id="questions" index="03" label="The questions">
      <Title lines={['WHAT SHOULD', 'INTELLIGENCE BE', 'ABLE TO DO?']} />
      <p className="sr-only">{questions.heading}</p>
      <ul className="mt-14 md:mt-20">
        {questions.items.map((q, i) => (
          <li key={q.key} className="border-t border-charcoal/15 last:border-b">
            <Reveal delay={i * 0.04}>
              <div className="grid gap-x-10 gap-y-3 py-9 transition-colors duration-500 hover:bg-peach/25 md:grid-cols-[12rem_1fr] md:py-14">
                <span className="font-mono text-[12px] uppercase tracking-[0.22em]">{q.key}</span>
                <span className="max-w-[24ch] font-display text-[clamp(1.7rem,4.2vw,3.5rem)] font-bold leading-[1] tracking-[-0.025em]">
                  {q.q}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}

import { Band, Title, Lead } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { systems } from '@/lib/content/pack';

export function Systems() {
  return (
    <Band id="systems" index="07" label="From research to systems">
      <Title lines={['IDEAS BECOME USEFUL', 'WHEN THEY CAN', 'BE TESTED.']} />
      <p className="sr-only">{systems.heading}</p>
      <Lead className="mt-10">{systems.body}</Lead>
      <ol className="mt-14 border-t border-charcoal/25 md:mt-20">
        {systems.diagram.map((d, i) => (
          <li key={d} className="border-b border-charcoal/25">
            <Reveal delay={i * 0.05}>
              <div className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-6 py-7 md:grid-cols-[5rem_1fr_auto] md:py-9">
                <span className="font-mono text-[12px] tracking-[0.22em]">0{i + 1}</span>
                <span className="font-display text-[clamp(1.9rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.03em]">{d}</span>
                <span aria-hidden="true" className="font-mono">{i < systems.diagram.length - 1 ? '↓' : '↺'}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Band>
  );
}

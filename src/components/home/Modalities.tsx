import { Band, Title, Lead } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { modalities } from '@/lib/content/pack';

const STATUS_TONE: Record<string, string> = {
  'Exploratory collaboration': 'border border-charcoal/40 text-charcoal',
  'Future direction': 'border border-dashed border-charcoal/40 text-charcoal/60',
};

/**
 * Research and collaboration areas. Status labels keep current work and
 * future ambition distinct; nothing implies a tested implementation
 * where none exists.
 */
export function Modalities({ index = '04' }: { index?: string }) {
  return (
    <Band id="modalities" tone="gray" index={index} label="Where a conversation fits">
      <Title lines={['RESEARCH AND', 'COLLABORATION AREAS.']} size="md" />
      <Lead className="mt-8">
        Three places a collaboration can start. Labels say exactly what each one is today.
      </Lead>
      <ul className="mt-12 border-t border-charcoal/25">
        {modalities.map((m, i) => (
          <li key={m.key} className="border-b border-charcoal/25 py-8 md:py-10">
            <Reveal delay={i * 0.05}>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  {m.key}
                </h3>
                <span className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${STATUS_TONE[m.status]}`}>
                  {m.status}
                </span>
              </div>
              <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed">{m.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}

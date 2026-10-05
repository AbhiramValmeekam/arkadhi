import { useState } from 'react';
import { useCursorState } from '@/components/cursor/Cursor';
import { MaskLines, SectionHead } from './motion';
import { researchAreas } from '@/lib/content/narrative';
import type { ResearchStatus } from '@/lib/content/narrative';

const STATUS_STYLE: Record<ResearchStatus, string> = {
  PUBLISHED: 'bg-charcoal text-warmivory',
  VALIDATING: 'bg-peach text-charcoal',
  'IN DEVELOPMENT': 'border border-charcoal/30 text-charcoal',
  EXPLORING: 'border border-dashed border-charcoal/30 text-charcoal/60',
};

/**
 * Research — the primary research environment on sky blue. Six areas with
 * visually distinct statuses. Hover deepens the row into a validation
 * strip: number, title, status badge, description.
 */
export function Research() {
  const [active, setActive] = useState(0);
  const explore = useCursorState('explore', 'Explore');

  return (
    <section aria-label="Research areas" className="bg-skyblue text-charcoal">
      <div className="shell py-24 md:py-36">
        <SectionHead index="03" label="Research" note="06 AREAS" />
        <MaskLines
          lines={['WHAT WE', 'STUDY.']}
          className="mb-14 mt-10 md:mb-20"
          lineClassName="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-charcoal"
        />
        <ul className="border-t border-charcoal/20">
          {researchAreas.map((r, i) => {
            const on = active === i;
            return (
              <li key={r.id} className="border-b border-charcoal/20" {...explore}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className={`grid w-full grid-cols-[3rem_1fr] items-baseline gap-x-4 py-7 text-left transition-colors duration-300 md:grid-cols-[4rem_1fr_auto] md:gap-x-8 md:py-8 ${
                    on ? 'bg-charcoal/[0.06]' : ''
                  }`}
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-charcoal/50">
                    {r.id}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className="font-display text-[clamp(1.7rem,4vw,3rem)] font-bold leading-none tracking-[-0.02em]">
                        {r.name}
                      </span>
                      <span className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${STATUS_STYLE[r.status]}`}>
                        {r.status}
                      </span>
                    </span>
                    <span
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[58ch] pt-4 text-[15px] leading-relaxed text-charcoal/70">
                          {r.body}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal/50">
          Statuses mark what each line is — nothing here claims finished results.
        </p>
      </div>
    </section>
  );
}

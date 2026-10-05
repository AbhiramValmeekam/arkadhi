import { useState } from 'react';
import { useCursorState } from '@/components/cursor/Cursor';
import { MaskLines, SectionHead } from './motion';
import { questions } from '@/lib/content/narrative';

/**
 * Questions — five research questions, each owning significant vertical
 * space. Hover shifts the type, warms the field behind it, and unfolds its
 * note. Touch: tap toggles. No cards.
 */
export function Questions() {
  const [open, setOpen] = useState<number | null>(0);
  const explore = useCursorState('explore', 'Ponder');

  return (
    <section aria-label="Research questions" className="bg-warmivory text-charcoal">
      <div className="shell py-24 md:py-36">
        <SectionHead index="02" label="The questions" note="05 OPEN" />
        <MaskLines
          lines={['WHAT WE ARE', 'ASKING.']}
          className="mb-14 mt-10 md:mb-20"
          lineClassName="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-charcoal"
        />
        <ul>
          {questions.map((q, i) => {
            const isOpen = open === i;
            return (
              <li key={q.id} className="border-t border-charcoal/15 last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  {...explore}
                  className={`group block w-full py-10 text-left transition-colors duration-500 md:py-14 ${
                    isOpen ? 'bg-peach/[0.35]' : 'hover:bg-peach/25'
                  } -mx-4 px-4 md:-mx-6 md:px-6`}
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] text-charcoal/50">
                    {q.id}
                  </span>
                  <span
                    className={`mt-4 block font-display font-bold leading-[0.95] tracking-[-0.02em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] text-[clamp(1.7rem,4.6vw,3.8rem)] ${
                      isOpen ? 'translate-x-3 text-charcoal md:translate-x-5' : 'text-charcoal group-hover:translate-x-2'
                    }`}
                  >
                    {q.text}
                  </span>
                  <span
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[52ch] pt-5 text-[15.5px] leading-relaxed text-charcoal/65">
                        {q.note}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

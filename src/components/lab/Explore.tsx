import { Link } from 'react-router-dom';
import { useCursorState } from '@/components/cursor/Cursor';
import { MaskLines, SectionHead } from './motion';
import { exploreAreas } from '@/lib/content/labnarrative';

/**
 * Explore — the research map as a paper index. Rows shift on hover,
 * descriptions unfold, the blaze signal fires. Cursor: EXPLORE.
 */
export function Explore() {
  const cursor = useCursorState('explore', 'Explore');

  return (
    <section aria-label="Research areas" className="bg-cream text-cocoa">
      <div className="shell py-24 md:py-36">
        <SectionHead index="02" label="What we explore" note="08 FIELDS" />
        <MaskLines
          lines={['A MAP OF OPEN', 'QUESTIONS.']}
          className="mb-14 mt-10 md:mb-20"
          lineClassName="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cocoa"
        />
        <ul className="border-t border-cocoa/12">
          {exploreAreas.map((a) => (
            <li key={a.id} className="border-b border-cocoa/12">
              <Link
                to={a.to}
                {...cursor}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 py-7 transition-colors duration-300 hover:bg-apricot/[0.06] md:grid-cols-[5rem_1fr_1fr_auto] md:gap-x-8 md:px-4 md:py-9"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-stone transition-colors duration-300 group-hover:text-ember">
                  {a.id}
                </span>
                <span>
                  <span className="block font-display text-[clamp(1.6rem,3.6vw,2.9rem)] font-bold leading-none tracking-[-0.02em] text-cocoa transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    {a.name}
                  </span>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-stone">
                    {a.tag}
                  </span>
                  <span className="mt-4 block max-w-[52ch] text-[15px] leading-relaxed text-cocoa/60 md:hidden">
                    {a.body}
                  </span>
                </span>
                <span className="hidden max-w-[46ch] text-[15px] leading-relaxed text-cocoa/60 opacity-0 transition-all delay-75 duration-500 group-hover:opacity-100 md:block">
                  {a.body}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-2 w-2 rounded-full bg-apricot opacity-0 transition-all duration-300 group-hover:opacity-100 md:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

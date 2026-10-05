import { Link } from 'react-router-dom';
import { MaskLines, SectionHead } from './motion';
import { collaborationPaths } from '@/lib/content/narrative';

/**
 * Collaboration — four large typographic paths on warm ivory. No cards:
 * each path shifts on hover and carries its own description.
 */
export function Collaboration() {
  return (
    <section aria-label="Collaboration paths" className="bg-warmivory text-charcoal">
      <div className="shell py-24 md:py-36">
        <SectionHead index="08" label="Collaboration" note="4 PATHS" />
        <MaskLines
          lines={['WORK WITH US.']}
          className="mb-14 mt-10 md:mb-20"
          lineClassName="font-display text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.035em] text-charcoal"
        />
        <ul>
          {collaborationPaths.map((p) => (
            <li key={p.id} className="border-t border-charcoal/15 last:border-b">
              <Link
                to="/work-with-us"
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 py-9 transition-colors duration-300 hover:bg-peach/30 md:grid-cols-[5rem_1fr_1fr_auto] md:gap-x-8 md:px-4 md:py-12"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-charcoal/50">
                  {p.id}
                </span>
                <span className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-[0.9] tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                  {p.name}
                </span>
                <span className="col-start-2 max-w-[40ch] text-[15px] leading-relaxed text-charcoal/65 md:col-start-auto">
                  {p.body}
                </span>
                <span aria-hidden="true" className="hidden font-mono text-xl transition-transform duration-500 group-hover:translate-x-2 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

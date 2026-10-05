import { Link } from 'react-router-dom';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorState } from '@/components/cursor/Cursor';
import { MaskLines, SectionHead } from './motion';
import { community } from '@/lib/content/narrative';

/**
 * Community — Compute & Curiosity on peach. Research-led, not
 * researchers-only. Tracks as large rows, one honest CTA.
 */
export function Community() {
  const enter = useCursorState('explore', 'Enter');

  return (
    <section aria-label="Compute and Curiosity community" className="bg-peach text-charcoal">
      <div className="shell py-24 md:py-36">
        <SectionHead index="07" label="Community" note="OPEN DOOR" />
        <MaskLines
          lines={community.lines}
          className="mt-12 md:mt-16"
          lineClassName="font-display text-[clamp(2.8rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.035em] text-charcoal"
        />
        <p className="mt-10 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-charcoal/80">
          {community.body}
        </p>
        <ul className="mt-12 border-t border-charcoal/25">
          {community.tracks.map((t) => (
            <li key={t} className="border-b border-charcoal/25">
              <div className="flex items-baseline justify-between py-6 md:py-7">
                <span className="font-display text-[clamp(1.6rem,3.6vw,2.8rem)] font-bold leading-none tracking-[-0.02em]">
                  {t}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/55">
                  Ongoing
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Magnetic>
          <Link
            to={community.cta.to}
            {...enter}
            className="mt-10 inline-flex items-center gap-3 bg-charcoal px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warmivory transition-colors duration-300 hover:bg-warmivory hover:text-charcoal"
          >
            {community.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

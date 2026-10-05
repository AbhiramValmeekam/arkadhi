import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { thesis } from '@/lib/content/home';

/**
 * Core thesis — full-bleed dark band.
 *
 * This is the L3 narrative beat: the page changes register here. Type goes
 * large, background goes deep, and the four thesis cells sit on hairlines.
 */
export function Thesis() {
  return (
    <section className="bg-deep text-paper">
      <div className="shell py-20 md:py-28">
        <Reveal>
          <p className="t-eyebrow text-signal">{thesis.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-7 max-w-[20ch] font-display text-[clamp(2rem,5.4vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
            {thesis.title}
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 max-w-text">
          <p className="text-[15.5px] leading-relaxed text-paper/60">{thesis.intro}</p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-px bg-white/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {thesis.cells.map((cell) => (
            <RevealItem key={cell.number} className="bg-deep px-6 py-8 md:px-7 md:py-9">
              <p className="font-mono text-meta tracking-[0.12em] text-signal">{cell.number}</p>
              <h3 className="mt-5 font-display text-[17px] font-medium tracking-[-0.01em] text-white">
                {cell.label}
              </h3>
              <p className="mt-3.5 text-[13.5px] leading-relaxed text-paper/55">{cell.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

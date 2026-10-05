import { Reveal } from '@/components/motion/Reveal';
import { MagneticLink } from '@/components/motion/Magnetic';

/** Recurring page closer — charcoal band, peach action. */
export function Closer() {
  return (
    <section className="bg-charcoal py-20 text-warmivory md:py-28">
      <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="max-w-[20ch] font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1.04] tracking-[-0.035em]">
            Bring us a problem worth measuring.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <MagneticLink to="/work-with-us" variant="dark">Start a Collaboration ↗</MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}

import { MaskLines, SectionHead } from './motion';
import { manifesto } from '@/lib/content/labnarrative';

/**
 * Manifesto — three massive masked lines on paper, drafting grid beneath.
 */
export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="relative bg-cream text-cocoa">
      <div aria-hidden="true" className="lab-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="shell relative py-28 md:py-44">
        <SectionHead index={manifesto.index} label={manifesto.label} note="READ CAREFULLY" />
        <MaskLines
          lines={manifesto.lines}
          className="mt-12 md:mt-16"
          lineClassName="font-display text-[clamp(2.6rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-cocoa"
        />
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <p className="max-w-text text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-cocoa/70 md:col-span-7 md:col-start-6">
            {manifesto.body}
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-cocoa/15 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-stone md:mt-16">
          {manifesto.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

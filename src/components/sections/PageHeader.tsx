import type { ReactNode } from 'react';
import { MaskLines } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';

/** Shared masthead for interior pages — index eyebrow, giant masked title. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string | readonly string[];
  intro?: string;
  children?: ReactNode;
}) {
  const lines = (Array.isArray(title) ? title : [title]).map((l) =>
    l.replace(/\.$/, '').toUpperCase(),
  );

  return (
    <header className="relative border-b border-charcoal/15 bg-peach pb-14 pt-32 text-charcoal md:pb-20 md:pt-44">
      <div className="shell">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-charcoal/60">
          Arkadhi Labs — {eyebrow}
        </p>
        <MaskLines
          lines={lines}
          className="mt-8"
          lineClassName="font-display text-[clamp(2.6rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.035em]"
        />
        {intro && (
          <Reveal delay={0.25} className="mt-8 max-w-text text-lede text-charcoal/75">
            <p>{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MaskLines, SectionHead } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';

type Tone = 'peach' | 'white' | 'gray' | 'teal' | 'navy';
const BG: Record<Tone, string> = {
  peach: 'bg-peach text-charcoal',
  white: 'bg-warmivory text-charcoal',
  gray: 'bg-apricot text-charcoal',
  teal: 'bg-skyblue text-charcoal',
  navy: 'bg-charcoal text-warmivory',
};

/** Full-bleed editorial band: numbered section head, then content. */
export function Band({
  id,
  tone = 'white',
  index,
  label,
  note,
  children,
}: {
  id?: string;
  tone?: Tone;
  index?: string;
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className={BG[tone]}>
      <div className="shell py-20 md:py-32">
        {index && <SectionHead index={index} label={label} note={note} tone={tone === 'navy' ? 'ink' : 'light'} />}
        {children}
      </div>
    </section>
  );
}

/** Giant masked display title — the lab's editorial headline style. */
export function Title({
  lines,
  size = 'lg',
  className = '',
}: {
  lines: string[];
  size?: 'xl' | 'lg' | 'md';
  className?: string;
}) {
  const sz = {
    xl: 'text-[clamp(2.6rem,10vw,9rem)] leading-[0.9] tracking-[-0.04em]',
    lg: 'text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]',
    md: 'text-[clamp(1.8rem,4vw,3.2rem)] leading-[1] tracking-[-0.03em]',
  }[size];
  return (
    <>
      <h2 className="sr-only">{lines.join(' ')}</h2>
      <MaskLines
        lines={lines}
        className={`mt-10 md:mt-14 ${className}`}
        lineClassName={`font-display font-bold uppercase ${sz}`}
      />
    </>
  );
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <Reveal className={className}>
      <p className="max-w-[60ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.6]">{children}</p>
    </Reveal>
  );
}

const BTN =
  'inline-flex min-h-[48px] items-center justify-center gap-3 px-6 py-4 font-mono text-meta uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal';
/** Navy fill. */
export const PRIMARY = `${BTN} bg-charcoal text-white hover:bg-warmivory hover:text-charcoal`;
/** Navy outline. */
export const SECONDARY = `${BTN} border border-charcoal text-charcoal hover:bg-charcoal hover:text-white`;
/** On navy. */
export const ON_DARK = `${BTN} border border-warmivory/50 text-warmivory hover:bg-warmivory hover:text-charcoal focus-visible:outline-warmivory`;

export function Ledger({ rows }: { rows: { key: string; body: string }[] }) {
  return (
    <ul className="border-t border-charcoal/25">
      {rows.map((r) => (
        <li key={r.key} className="grid gap-x-8 gap-y-1 border-b border-charcoal/25 py-6 sm:grid-cols-[13rem_1fr]">
          <span className="font-mono text-[12px] uppercase tracking-[0.22em]">{r.key}</span>
          <span className="max-w-[56ch] text-[17px] leading-relaxed">{r.body}</span>
        </li>
      ))}
    </ul>
  );
}

/** Interior page masthead — same giant masked title as the homepage. */
export function PageHead({ eyebrow, lines, intro, children }: { eyebrow: string; lines: string[]; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative border-b border-charcoal/15 bg-peach pb-16 pt-32 text-charcoal md:pb-24 md:pt-44">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.24em] text-charcoal/75">
          <Link to="/" className="link-underline hover:text-charcoal">Arkadhi Labs</Link> <span aria-hidden="true">/</span> {eyebrow}
        </nav>
        <h1 className="sr-only">{lines.join(' ')}</h1>
        <MaskLines
          lines={lines}
          className="mt-8"
          lineClassName="font-display text-[clamp(2.4rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em]"
        />
        {intro && <Lead className="mt-8">{intro}</Lead>}
        {children}
      </div>
    </header>
  );
}

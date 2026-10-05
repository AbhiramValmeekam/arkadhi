import { Link } from 'react-router-dom';
import { MaskLines, SectionHead } from './motion';
import { contact } from '@/lib/content/narrative';

/**
 * Contact — the charcoal room. Ivory statement, supporting list, one
 * rectangular CTA with a peach wipe on hover and a nudging arrow.
 */
export function Contact() {
  return (
    <section aria-label="Contact" className="bg-charcoal text-warmivory">
      <div className="shell py-28 md:py-44">
        <SectionHead index={contact.index} label={contact.label} note="LAST DOOR" tone="ink" />
        <MaskLines
          lines={contact.lines}
          className="mt-12 md:mt-16"
          lineClassName="font-display text-[clamp(3.4rem,13vw,12rem)] font-bold leading-[0.88] tracking-[-0.04em] text-warmivory"
        />
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.22em] text-warmivory/55 md:mt-16">
          {contact.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link
          to={contact.cta.to}
          className="group relative mt-12 inline-flex items-center gap-4 overflow-hidden border border-warmivory/40 px-9 py-5 font-mono text-[12px] uppercase tracking-[0.2em] text-warmivory transition-colors duration-300 hover:text-charcoal md:mt-16"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-left scale-x-0 bg-peach transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
          />
          <span className="relative">{contact.cta.label}</span>
          <span aria-hidden="true" className="relative transition-transform duration-500 group-hover:translate-x-2">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}

import { Band } from './parts';
import { MaskLines, SectionHead } from '@/components/lab/motion';
import { Reveal } from '@/components/motion/Reveal';
import { closing, mail, SUBJECTS } from '@/lib/content/pack';
import { site } from '@/lib/content/site';

/** Peach closing statement, then the charcoal contact room. */
export function ClosingStatement() {
  return (
    <Band tone="peach" index="12" label="Closing">
        <h2 className="sr-only">{closing.line}</h2>
        <MaskLines
          lines={['BUILDING INTELLIGENCE', 'THAT IMPROVES', 'WITH EXPERIENCE.']}
          className="mt-10 md:mt-14"
          lineClassName="font-display text-[clamp(2.2rem,7vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.035em]"
        />
    </Band>
  );
}

export function ContactRoom() {
  return (
      <section id="contact" aria-label="Contact" className="bg-charcoal text-warmivory">
        <div className="shell py-20 md:py-32">
          <SectionHead index="13" label="Contact" tone="ink" />
          <h2 className="sr-only">{closing.heading}</h2>
          <MaskLines
            lines={['START A', 'CONVERSATION.']}
            className="mt-10 md:mt-14"
            lineClassName="font-display text-[clamp(3rem,11vw,10rem)] font-bold leading-[0.88] tracking-[-0.04em]"
          />
          <Reveal>
            <p className="mt-10 max-w-[56ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-warmivory/90">{closing.body}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={mail(SUBJECTS.general)}
                className="group relative inline-flex min-h-[48px] items-center gap-4 overflow-hidden border border-warmivory/50 px-9 py-5 font-mono text-[12px] uppercase tracking-[0.2em] text-warmivory transition-colors duration-300 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warmivory"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-warmivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <span className="relative">{closing.cta}</span>
                <span aria-hidden="true" className="relative">↗</span>
              </a>
              <a href={`mailto:${site.contactEmail}`} className="text-[17px] underline underline-offset-4 hover:text-peach">{site.contactEmail}</a>
            </div>
          </Reveal>
        </div>
      </section>
  );
}

export function Closing() {
  return (
    <>
      <ClosingStatement />
      <ContactRoom />
    </>
  );
}

import { useState } from 'react';
import { PageHead, Band, PRIMARY } from '@/components/home/parts';
import { ContactRoom } from '@/components/home/Closing';
import { closing, echoHome, communityHome, mail, SUBJECTS, audiences } from '@/lib/content/pack';
import { site } from '@/lib/content/site';

/**
 * /contact — email actions only. No form: delivery does not exist yet, so a form
 * would be a button that does nothing.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.contactEmail);
    } catch {
      window.location.href = `mailto:${site.contactEmail}`;
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  const rows = [
    { key: closing.cta, subject: SUBJECTS.general, note: closing.body },
    { key: echoHome.cta, subject: SUBJECTS.audit, note: echoHome.offer },
    { key: communityHome.cta, subject: SUBJECTS.community, note: communityHome.support },
  ];
  return (
    <>
      <PageHead eyebrow="Contact" lines={['START A', 'CONVERSATION.']} intro={closing.body} />
      <Band index="01" label="Email">
        <ul className="border-t border-charcoal/25">
          {rows.map((r) => (
            <li key={r.subject} className="grid gap-x-8 gap-y-4 border-b border-charcoal/25 py-8 md:grid-cols-[1fr_1.2fr_auto] md:items-center">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">{r.key}</h2>
              <p className="max-w-[48ch] text-[17px] leading-relaxed">{r.note}</p>
              <a href={mail(r.subject)} className={PRIMARY}>
                Email <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </Band>
      <Band index="02" label="Who should write">
        <ul className="mt-12 grid gap-px border border-charcoal/30 bg-charcoal/30 md:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.key} className="bg-warmivory p-7 md:p-9">
              <h2 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                {a.key}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">{a.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border border-charcoal/30 p-6 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal/60">
            No mail app? Copy the address
          </p>
          <p className="font-mono text-[15px] tracking-[0.04em]">{site.contactEmail}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="ml-auto border border-charcoal px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-charcoal hover:text-warmivory"
          >
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>
      </Band>
      <ContactRoom />
    </>
  );
}

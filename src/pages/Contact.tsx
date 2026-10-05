import { PageHead, Band, PRIMARY } from '@/components/home/parts';
import { ContactRoom } from '@/components/home/Closing';
import { closing, echoHome, communityHome, mail, SUBJECTS } from '@/lib/content/pack';

/**
 * /contact — email actions only. No form: delivery does not exist yet, so a form
 * would be a button that does nothing.
 */
export function Contact() {
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
      <ContactRoom />
    </>
  );
}

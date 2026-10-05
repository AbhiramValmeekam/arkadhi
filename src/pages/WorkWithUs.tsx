import { useState } from 'react';
import { PageHeader } from '@/components/sections/PageHeader';
import { Reveal } from '@/components/motion/Reveal';
import { contactPage, directContact, inquiryTypes, formFields } from '@/lib/content/contact';
import { collaborationTracks } from '@/lib/content/contact';
import { site } from '@/lib/content/site';
import { Link } from 'react-router-dom';

/**
 * /work-with-us — collaboration and contact.
 *
 * No backend exists, so the form composes a pre-filled email to the lab's
 * public address via mailto. That is genuinely functional and honest; a fake
 * "message sent" state would not be.
 */
export function WorkWithUs() {
  const [type, setType] = useState('Research');
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Inquiry type: ${type}`,
      '',
      ...formFields
        .filter((f) => f.name !== 'link')
        .map((f) => `${f.label}: ${values[f.name] || '—'}`),
      '',
      values.link ? `Link: ${values.link}` : '',
    ].filter(Boolean);

    const subject = values.subject || 'Inquiry';
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      `[${type}] ${subject}`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <>
      <PageHeader eyebrow={contactPage.eyebrow} title={['Bring a', 'precise problem.']} intro={contactPage.intro} />

      <section className="py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Guidance */}
          <div>
            <Reveal>
              <h2 className="max-w-[18ch] font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.025em]">
                {directContact.heading}
              </h2>
              <p className="mt-6 max-w-text text-[15px] leading-relaxed text-ink/70">{directContact.body}</p>

              <p className="mt-9 font-mono text-meta uppercase tracking-[0.14em] text-charcoal">
                {directContact.label}
              </p>
              <p className="mt-4 max-w-text text-[14px] leading-relaxed text-ink/65">{directContact.routing}</p>
              <a
                href={`mailto:${site.contactEmail}`}
                className="link-underline mt-4 inline-block font-mono text-meta uppercase tracking-[0.12em] text-ink"
              >
                {site.contactEmail}
              </a>
            </Reveal>

            {/* Collaboration tracks */}
            <Reveal delay={0.12} className="mt-14">
              <p className="t-eyebrow">Ways to work with us</p>
              <ul className="mt-6 border-t border-[var(--line)]">
                {collaborationTracks.map((t) => (
                  <li key={t.key} className="border-b border-[var(--line)] py-4">
                    <Link to={t.to} className="group flex items-baseline justify-between gap-4">
                      <span className="font-display text-[15px] font-medium tracking-[-0.01em]">{t.key}</span>
                      <span className="max-w-[26ch] text-right text-[13px] leading-relaxed text-ink/60">
                        {t.body}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} className="border border-[var(--line)] p-6 md:p-9">
              {/* Inquiry type */}
              <fieldset>
                <legend className="font-mono text-meta uppercase tracking-[0.14em] text-muted">Inquiry type</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {inquiryTypes.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setType(t.key)}
                      aria-pressed={type === t.key}
                      className={`rounded-sm border px-4 py-2.5 font-mono text-meta uppercase transition-colors duration-300 ease-calm ${
                        type === t.key
                          ? 'border-charcoal bg-charcoal text-warmivory'
                          : 'border-[var(--line)] text-muted hover:border-ink/30 hover:text-ink'
                      }`}
                    >
                      {t.key}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
                  {inquiryTypes.find((t) => t.key === type)?.body}
                </p>
              </fieldset>

              <div className="mt-8 space-y-5">
                {formFields.map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={`f-${f.name}`}
                      className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
                    >
                      {f.label}
                      {f.required ? ' *' : f.optional ? ' (optional)' : ''}
                    </label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={`f-${f.name}`}
                        required={f.required}
                        rows={5}
                        value={values[f.name] || ''}
                        onChange={(e) => set(f.name, e.target.value)}
                        className="mt-2.5 w-full resize-none border border-[var(--line)] bg-transparent p-3.5 text-[14px] leading-relaxed focus:border-charcoal focus:outline-none"
                      />
                    ) : (
                      <input
                        id={`f-${f.name}`}
                        type={f.type}
                        required={f.required}
                        value={values[f.name] || ''}
                        onChange={(e) => set(f.name, e.target.value)}
                        className="mt-2.5 w-full border border-[var(--line)] bg-transparent p-3.5 text-[14px] focus:border-charcoal focus:outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" className="btn mt-8 w-full justify-center">
                Send Inquiry <span aria-hidden="true">→</span>
              </button>

              <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-hush">
                Opens your mail client addressed to {site.contactEmail}
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

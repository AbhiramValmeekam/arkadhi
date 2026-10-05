import { Link } from 'react-router-dom';
import { Logo } from '@/components/navigation/Logo';

const LINKS = [
  { label: 'Research', to: '/research' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/products' },
  { label: 'EchoRegent', to: 'https://echoregent-yudi-pub.web.app/', external: true },
  { label: 'Compute & Curiosity', to: '/computecuriosity' },
  { label: 'About', to: '/lab' },
  { label: 'Contact', to: '/work-with-us' },
];

/**
 * Lab footer — minimal editorial close on charcoal. One wordmark line,
 * one link row, one small-print row. No invented socials or addresses.
 */
export function LabFooter() {
  return (
    <footer className="border-t border-warmivory/10 bg-charcoal text-warmivory/60">
      <div className="shell py-14 md:py-16">
        <div className="flex items-center gap-3 text-warmivory">
          <Logo showWord={false} tone="paper" />
          <span className="font-mono text-[12px] uppercase tracking-[0.3em]">Arkadhi Labs</span>
        </div>
        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                {'external' in l && l.external ? (
                  <a
                    href={l.to}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-warmivory/60 transition-colors hover:text-peach"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-warmivory/60 transition-colors hover:text-peach"
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-warmivory/10 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-warmivory/35">
          <span>© 2026 Arkadhi Labs</span>
          <span>Research → Questions → Experiments → Systems</span>
        </div>
      </div>
    </footer>
  );
}

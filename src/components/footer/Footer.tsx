import { Link } from 'react-router-dom';
import { footerColumns, site } from '@/lib/content/site';
import { Logo } from '@/components/navigation/Logo';
import { MagneticLink } from '@/components/motion/Magnetic';

/** Editorial footer. Dark, quiet, mono metadata. */
export function Footer() {
  return (
    <footer className="bg-deep text-paper/70">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-paper/55">{site.anchor}</p>
            <div className="mt-7">
              <MagneticLink to="/work-with-us" variant="dark">
                Start a Collaboration ↗
              </MagneticLink>
            </div>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-mono text-meta uppercase tracking-[0.14em] text-signal">{col.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="link-underline text-[13.5px] text-paper/65 transition-colors duration-300 hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/35">
            © {site.year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-paper/35">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}

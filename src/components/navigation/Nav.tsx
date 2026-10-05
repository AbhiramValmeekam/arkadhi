import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation, site } from '@/lib/content/site';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { EASE } from '@/lib/motion/variants';

/**
 * Primary navigation.
 *
 * Compresses on scroll and swaps to a translucent paper backdrop once past the
 * hero. Not a conventional SaaS bar — it sits inside the page rhythm, with mono
 * metadata and a hairline that only appears after scrolling.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ease-calm ${
          scrolled ? 'border-b border-[var(--line)] bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div
          className={`shell flex items-center justify-between transition-all duration-500 ease-calm ${
            scrolled ? 'py-3.5' : 'py-5 md:py-6'
          }`}
        >
          <Link to="/" aria-label={`${site.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + '/');
              const hasChildren = 'children' in item && item.children;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <NavLink
                    to={item.to}
                    className={`link-underline text-[13.5px] transition-colors duration-300 ${
                      active ? 'text-ink' : 'text-ink/75 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {hasChildren && <span className="ml-1.5 text-[8px] align-middle opacity-50">▾</span>}
                  </NavLink>

                  {/* Active tick */}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-signal transition-all duration-500 ease-calm ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />

                  <AnimatePresence>
                    {hasChildren && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28, ease: EASE.calm }}
                        className="absolute left-0 top-full z-10 min-w-[210px] pt-5"
                      >
                        <div className="border border-[var(--line)] bg-paper py-2 shadow-[0_18px_40px_-24px_rgba(18,24,32,0.35)]">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.to}
                              className="block px-4 py-2.5 font-mono text-meta uppercase text-ink/70 transition-colors duration-200 hover:bg-signal/5 hover:text-ink"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/work-with-us" className="hidden font-mono text-meta uppercase tracking-[0.14em] lg:inline-flex">
              <span className="link-underline">Work With Us ↗</span>
            </Link>

            {/* Mobile trigger — deliberately not a hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2.5 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <span className="font-mono text-meta uppercase tracking-[0.14em]">Menu</span>
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <ScrollProgress />
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

/** Single-pixel progress indicator along the bottom edge of the nav. */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-transparent">
      <div
        className="h-px origin-left bg-signal/60 transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

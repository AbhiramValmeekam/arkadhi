import { Suspense, lazy, useEffect } from 'react';
import type { ComponentType } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LabNav } from '@/components/lab/LabNav';
import { LabFooter } from '@/components/lab/LabFooter';
import { CursorProvider } from '@/components/cursor/Cursor';
import { useLenis, scrollToTop, scrollToId } from '@/lib/motion/useLenis';
import { EASE } from '@/lib/motion/variants';

import { Home } from '@/pages/Home';
import { seo } from '@/lib/content/pack';

// Interior routes are code-split; the homepage (and its locked hero) stays in
// the main bundle so first paint is unchanged.
const lazyNamed = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  lazy(() => load().then((m) => ({ default: m[name] })));

const Research = lazyNamed(() => import('@/pages/Research'), 'Research');
const Products = lazyNamed(() => import('@/pages/Products'), 'Products');
const About = lazyNamed(() => import('@/pages/About'), 'About');
const Contact = lazyNamed(() => import('@/pages/Contact'), 'Contact');
const EchoRegent = lazyNamed(() => import('@/pages/EchoRegent'), 'EchoRegent');
const CCHome = lazyNamed(() => import('@/pages/cc/CCHome'), 'CCHome');
const NotFound = lazyNamed(() => import('@/pages/NotFound'), 'NotFound');

const SITE_URL = 'https://arkadhi.vercel.app';

const META: Record<string, { title: string; description: string }> = {
  '/': seo.home,
  '/research': seo.research,
  '/products': seo.products,
  '/about': seo.about,
  '/contact': seo.contact,
  '/echoregent': seo.echo,
  '/computecuriosity': seo.community,
};

function setMeta(pathname: string) {
  const m = META[pathname] ?? seo.home;
  const canonical = SITE_URL + (pathname === '/' ? '/' : pathname);
  document.title = m.title;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;
  const set = (sel: string, content: string) =>
    document
      .querySelectorAll<HTMLMetaElement>(sel)
      .forEach((el) => el.setAttribute('content', content));
  set(
    'meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]',
    m.description,
  );
  set('meta[property="og:title"], meta[name="twitter:title"]', m.title);
  set('meta[property="og:url"]', canonical);
}

export default function App() {
  useLenis();

  return (
    <CursorProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-meta focus:uppercase focus:text-paper"
      >
        Skip to content
      </a>

      <LabNav />
      <RoutedContent />
      <LabFooter />
    </CursorProvider>
  );
}

function RoutedContent() {
  const location = useLocation();

  // Reset scroll on navigation; honour in-page anchors.
  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      // Let the incoming (possibly lazy-loaded) page mount before scrolling:
      // poll briefly for the anchor, then scroll once it exists.
      let tries = 0;
      const t = window.setInterval(() => {
        tries += 1;
        if (document.getElementById(id) || tries > 20) {
          window.clearInterval(t);
          window.setTimeout(() => scrollToId(id), 120);
        }
      }, 100);
      return () => window.clearInterval(t);
    }
    scrollToTop();
  }, [location.pathname, location.hash]);

  // Keep the document title and description in sync.
  useEffect(() => {
    setMeta(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/* Route wipe — a thin sweep that marks the layer change. Kept brief. */}
      <AnimatePresence>
        <motion.div
          key={location.pathname + '-wipe'}
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[150] h-[2px] origin-left bg-signal"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE.precise }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          tabIndex={-1}
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: EASE.calm }}
        >
          <Suspense
            fallback={
              <div className="flex min-h-[100svh] items-center justify-center" role="status" aria-busy="true">
                <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-charcoal/60">
                  Loading section…
                </p>
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />

              <Route path="/research" element={<Research />} />
              <Route path="/products" element={<Products />} />
              <Route path="/echoregent" element={<EchoRegent />} />
              <Route path="/computecuriosity" element={<CCHome />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Old destinations resolve to the closest live page — never a 404. */}
              <Route path="/research/*" element={<Navigate to="/research" replace />} />
              <Route path="/products/*" element={<Navigate to="/products" replace />} />
              <Route path="/solutions" element={<Navigate to="/" replace />} />
              <Route path="/community" element={<Navigate to="/computecuriosity" replace />} />
              <Route path="/computecuriosity/*" element={<Navigate to="/computecuriosity" replace />} />
              <Route path="/lab/*" element={<Navigate to="/about" replace />} />
              <Route path="/lab" element={<Navigate to="/about" replace />} />
              <Route path="/careers" element={<Navigate to="/contact" replace />} />
              <Route path="/work-with-us" element={<Navigate to="/contact" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

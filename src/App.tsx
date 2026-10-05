import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LabNav } from '@/components/lab/LabNav';
import { LabFooter } from '@/components/lab/LabFooter';
import { CursorProvider } from '@/components/cursor/Cursor';
import { useLenis, scrollToTop, scrollToId } from '@/lib/motion/useLenis';
import { EASE } from '@/lib/motion/variants';
import { site } from '@/lib/content/site';

import { Home } from '@/pages/Home';
import { Research } from '@/pages/Research';
import { Solutions } from '@/pages/Solutions';
import { Products } from '@/pages/Products';
import { EchoRegent } from '@/pages/EchoRegent';
import { Community } from '@/pages/Community';
import { Lab } from '@/pages/Lab';
import { Careers } from '@/pages/Careers';
import { WorkWithUs } from '@/pages/WorkWithUs';
import { NotFound } from '@/pages/NotFound';

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
      const id = location.hash.slice(1);
      // Let the incoming page mount before scrolling to the anchor.
      const t = window.setTimeout(() => scrollToId(id), 220);
      return () => window.clearTimeout(t);
    }
    scrollToTop();
  }, [location.pathname, location.hash]);

  // Keep the document title in sync.
  useEffect(() => {
    const map: Record<string, string> = {
      '/': site.tagline,
      '/research': 'Research',
      '/solutions': 'Solutions',
      '/products': 'Products',
      '/products/echoregent': 'EchoRegent',
      '/community': 'Compute & Curiosity',
      '/lab': 'The Lab',
      '/lab/careers': 'Careers',
      '/work-with-us': 'Work With Us',
    };
    const suffix = map[location.pathname];
    document.title = suffix ? `${suffix} — ${site.name}` : `${site.name} — ${site.tagline}`;
  }, [location.pathname]);

  return (
    <>
      {/* Route wipe — a thin sweep that marks the layer change. Kept brief. */}
      <AnimatePresence>
        <motion.div
          key={location.pathname + '-wipe'}
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[150] h-[2px] origin-left bg-peach"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE.precise }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: EASE.calm }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/echoregent" element={<EchoRegent />} />
            <Route path="/echoregent" element={<EchoRegent />} />
            <Route path="/community" element={<Community />} />
            <Route path="/computecuriosity" element={<Community />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/lab/careers" element={<Careers />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from '@/components/motion/Magnetic';
import { useCursorState } from '@/components/cursor/Cursor';
import { MaskLines, SectionHead } from './motion';
import { echoRegentPage } from '@/lib/content/echoregent';

gsap.registerPlugin(ScrollTrigger);

const FRAGMENTS = 64;

/**
 * EchoRegent — memory infrastructure, staged as a conceptual visualization:
 * a field of information fragments that scroll organizes into a compact
 * memory row while the unnecessary ones drift away and fade. Conceptual
 * only — never presented as live output.
 */
export function EchoRegent() {
  const ref = useRef<HTMLDivElement | null>(null);
  const view = useCursorState('explore', 'View');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const frags = gsap.utils.toArray<HTMLElement>('[data-mem-frag]');
      // kept dots, in order, mapped onto a centered 12-column grid
      const keptIdx = new Map<number, number>();
      let k = 0;
      frags.forEach((_, i) => {
        if (i % 3 !== 2) keptIdx.set(i, k++);
      });
      const home = (i: number) => {
        const keep = keptIdx.has(i);
        if (!keep) return null;
        const kk = keptIdx.get(i)!;
        return { x: ((kk % 12) - 5.5) * 30, y: (Math.floor(kk / 12) - 1.5) * 30 };
      };
      const scatter = (i: number) => ({ x: ((i * 37) % 360) - 180, y: ((i * 53) % 220) - 110 });

      if (reduce) {
        // static end state: the organized memory grid, final caption on
        frags.forEach((f, i) => {
          const h = home(i);
          if (h) gsap.set(f, { x: h.x, y: h.y, opacity: 1 });
          else gsap.set(f, { opacity: 0 });
        });
        gsap.set('[data-mem-cap="3"]', { opacity: 1 });
        gsap.set('[data-mem-box]', { opacity: 1, scale: 1 });
        gsap.set('[data-mem-cap="1"], [data-mem-cap="2"]', { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '[data-mem-field]',
          start: 'top 85%',
          end: 'center 30%',
          scrub: 0.8,
        },
      });
      frags.forEach((f, i) => {
        const h = home(i);
        const s = scatter(i);
        gsap.set(f, { x: s.x, y: s.y, opacity: 0.9 });
        if (h) {
          tl.to(f, { x: h.x, y: h.y, opacity: 1, duration: 1 }, 0.05);
        } else {
          tl.to(
            f,
            {
              x: s.x * 1.5,
              y: 175 + (i % 5) * 24,
              opacity: 0,
              duration: 1,
            },
            0.15,
          );
        }
      });
      // staged captions: raw → keep → compact
      tl.fromTo('[data-mem-cap="1"]', { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0);
      tl.to('[data-mem-cap="1"]', { opacity: 0, duration: 0.12 }, 0.34);
      tl.fromTo('[data-mem-cap="2"]', { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.3);
      tl.to('[data-mem-cap="2"]', { opacity: 0, duration: 0.12 }, 0.62);
      tl.fromTo('[data-mem-cap="3"]', { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.66);
      tl.fromTo(
        '[data-mem-box]',
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.2 },
        0.7,
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="EchoRegent product" className="bg-warmivory text-charcoal">
      <div ref={ref} className="shell py-24 md:py-36">
        <SectionHead index="06" label="From research to system" note="PRODUCT — 01" />
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.24em] text-charcoal/55">
          {echoRegentPage.badge} — Memory infrastructure
        </p>
        <MaskLines
          lines={['ECHOREGENT']}
          className="mt-4"
          lineClassName="font-display text-[clamp(3rem,11vw,10rem)] font-bold leading-[0.9] tracking-[-0.035em] text-charcoal"
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <p className="max-w-[48ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-charcoal/80">
              {echoRegentPage.lede}
            </p>
            <p className="mt-6 max-w-[52ch] text-[15.5px] leading-relaxed text-charcoal/65">
              {echoRegentPage.problem}
            </p>
            <Magnetic>
              <a
                href="https://echoregent-yudi-pub.web.app/"
                target="_blank"
                rel="noreferrer noopener"
                {...view}
                className="mt-9 inline-flex items-center gap-3 bg-charcoal px-7 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-warmivory transition-colors duration-300 hover:bg-peach hover:text-charcoal"
              >
                Explore EchoRegent <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </div>
          <div>
            <div
              data-mem-field
              aria-hidden="true"
              className="relative flex h-[320px] items-center justify-center overflow-hidden border border-charcoal/20 md:h-[380px]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div data-mem-box className="h-[152px] w-[min(372px,84%)] border border-charcoal/40 opacity-0">
                  <span className="absolute -top-2.5 left-4 bg-warmivory px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-charcoal/60">
                    Compact memory
                  </span>
                </div>
              </div>
              {Array.from({ length: FRAGMENTS }).map((_, i) => (
                <span
                  key={i}
                  data-mem-frag
                  className={`absolute h-2.5 w-2.5 ${i % 3 !== 2 ? 'bg-charcoal' : 'bg-charcoal/30'}`}
                />
              ))}
              <span data-mem-cap="1" className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/70 opacity-0">
                01 · Raw context — every turn, verbatim
              </span>
              <span data-mem-cap="2" className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/70 opacity-0">
                02 · Keep the signal — the rest drifts away
              </span>
              <span data-mem-cap="3" className="absolute left-5 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/70 opacity-0">
                03 · Compact memory — what the model receives
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/55">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-charcoal" /> stays in memory
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 border border-charcoal/40" /> dropped as noise
              </span>
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-charcoal/60">{echoRegentPage.approach}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

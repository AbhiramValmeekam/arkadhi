import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHead } from '@/components/lab/motion';
import { mission, framework } from '@/lib/content/pack';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Words → characters, each word masked so characters can climb out of it. */
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i, a) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]">
            {w.split('').map((c, j) => (
              <span key={j} data-c className="inline-block will-change-transform">{c}</span>
            ))}
          </span>
          {i < a.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

const MISSION_CLS =
  'max-w-[24ch] font-display text-[clamp(1.75rem,min(4.8vw,7.4svh),4.6rem)] font-bold leading-[1.04] tracking-[-0.03em]';
/** Animated scene: narrower measure so the pillar drawing has room on the right. */
const MISSION_ANIM_CLS =
  'max-w-[24ch] md:max-w-[19ch] font-display text-[clamp(1.6rem,min(4.2vw,6.6svh),4.2rem)] font-bold leading-[1.04] tracking-[-0.03em]';
const VISION_CLS =
  'max-w-[28ch] font-display text-[clamp(1.65rem,min(4.8vw,7.2svh),4.4rem)] font-bold leading-[1.06] tracking-[-0.03em]';

/**
 * Mission → Vision, one pinned scroll sequence.
 *
 *  1. Mission: every word is filled in with a left-to-right ink wipe as you scroll.
 *  2. A navy circle opens from the centre and takes over the screen; mission recedes.
 *  3. Vision: concentric rings (the "mind") scale in while the characters climb out
 *     of their masks; the edge line settles underneath.
 *
 * With prefers-reduced-motion the same text is shown as two plain stacked blocks.
 */
export function Mission() {
  const [animated] = useState(() => !prefersReduced());
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!animated || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-mw]');
      const chars = gsap.utils.toArray<HTMLElement>('[data-c]');

      gsap.set(words, { backgroundPosition: '100% 0' });
      gsap.set('[data-col]', { scaleY: 0 });
      gsap.set('[data-base]', { scaleX: 0 });
      gsap.set('[data-base-label], [data-col-label]', { opacity: 0 });
      gsap.set('[data-draw]', { opacity: 0, y: 20 });
      gsap.set('[data-b]', { clipPath: 'circle(0% at 50% 56%)' });
      gsap.set(chars, { yPercent: 118, rotate: 4 });
      gsap.set('[data-rings]', { scale: 0.55, opacity: 0 });
      gsap.set('[data-edge]', { y: 24, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: '+=360%', pin: '[data-stage]', scrub: 0.7, anticipatePin: 1 },
      });

      // 1 · mission ink wipe
      tl.to(words, { backgroundPosition: '0% 0', duration: 1, stagger: 0.55 }, 0);
      const wipeEnd = 1 + (words.length - 1) * 0.55; // ≈ 11

      // The four pillars are drawn in step with the words that name them:
      // Learn / Understand / Act rise as columns, Aware lays the base beneath them.
      const at = (k: number) => (words.length - 4 + k) * 0.55;
      tl.to('[data-draw]', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0.4);
      gsap.utils.toArray<HTMLElement>('[data-col]').forEach((c, k) => {
        tl.to(c, { scaleY: 1, duration: 1.4, ease: 'power3.out' }, at(k));
        tl.to(`[data-col-label="${k}"]`, { opacity: 1, duration: 0.6 }, at(k) + 0.5);
      });
      tl.to('[data-base]', { scaleX: 1, duration: 1.6, ease: 'power3.out' }, at(3));
      tl.to('[data-base-label]', { opacity: 1, duration: 0.6 }, at(3) + 0.9);

      // 2 · circle takeover
      const t2 = wipeEnd + 0.6;
      tl.to('[data-a]', { opacity: 0, scale: 0.94, duration: 2.4, ease: 'power2.in' }, t2 + 0.6);
      tl.to('[data-b]', { clipPath: 'circle(150% at 50% 56%)', duration: 3, ease: 'power2.inOut' }, t2);

      // 3 · vision
      const t3 = t2 + 2.4;
      tl.to('[data-rings]', { scale: 1, opacity: 1, duration: 4, ease: 'power2.out' }, t3);
      tl.to(chars, { yPercent: 0, rotate: 0, duration: 1.4, ease: 'power3.out', stagger: 0.07 }, t3 + 0.4);
      const t4 = t3 + 0.4 + 1.4 + chars.length * 0.07;
      tl.to('[data-edge]', { y: 0, opacity: 1, duration: 1.6, ease: 'power2.out' }, t4 - 0.6);
      tl.to({}, { duration: 1.5 }, t4 + 1); // brief hold before unpin

      // progress hairline across the whole sequence
      tl.fromTo('[data-progress]', { scaleX: 0 }, { scaleX: 1, duration: tl.duration() }, 0);
    }, el);
    return () => ctx.revert();
  }, [animated]);

  if (!animated) {
    return (
      <section id="mission" aria-label="Mission and vision" className="bg-peach text-charcoal">
        <div className="shell py-20 md:py-32">
          <SectionHead index="01" label={mission.missionLabel} />
          <p className={`mt-10 md:mt-14 ${MISSION_CLS}`}>{mission.mission}</p>
          <div className="mt-16 border-t border-charcoal/30 pt-16 md:mt-24 md:pt-24">
            <SectionHead index="02" label={mission.visionLabel} />
            <p className={`mt-10 md:mt-14 ${VISION_CLS}`}>{mission.vision}</p>
          </div>
          <p className="mt-14 max-w-[60ch] border-t border-charcoal/30 pt-6 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed">{mission.edge}</p>
        </div>
      </section>
    );
  }

  const ink =
    'bg-[linear-gradient(90deg,#0B1F3C_50%,rgba(11,31,60,0.2)_50%)] bg-[length:200%_100%] bg-clip-text text-transparent';

  return (
    <section ref={root} id="mission" aria-label="Mission and vision" className="bg-peach text-charcoal">
      <div data-stage className="relative h-[100svh] min-h-[560px] overflow-hidden">
        {/* Scene A — mission */}
        <div data-a className="absolute inset-0 flex flex-col justify-center">
          <div className="shell pt-16">
            <SectionHead index="01" label={mission.missionLabel} />
            <p className={`mt-8 md:mt-12 ${MISSION_ANIM_CLS}`}>
              {mission.mission.split(' ').map((w, i, a) => (
                <span key={i}>
                  <span data-mw className={`inline-block ${ink}`}>{w}</span>
                  {i < a.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Mission drawing: three columns standing on one base — Aware beneath Learn, Understand, Act */}
        <div
          data-draw
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[9svh] left-6 right-6 h-[24svh] md:bottom-auto md:left-auto md:right-[5vw] md:top-1/2 md:h-[min(52svh,380px)] md:w-[min(32vw,430px)] md:-translate-y-[44%]"
        >
          <div className="flex h-[78%] items-end gap-2 md:gap-3">
            {framework.top.map((p, k) => (
              <div key={p.key} className="relative h-full flex-1 border border-charcoal/60">
                <div data-col className="absolute inset-0 origin-bottom bg-charcoal" />
                <span
                  data-col-label={k}
                  className="absolute inset-x-0 bottom-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-warmivory md:text-[11px]"
                >
                  {p.key}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2 h-[18%] border border-charcoal/60 md:mt-3">
            <div data-base className="absolute inset-0 origin-left bg-signal" />
            <span data-base-label className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal md:text-[11px]">
              {framework.base.key}
            </span>
          </div>
        </div>

        {/* Scene B — vision, revealed by an expanding circle */}
        <div data-b className="absolute inset-0 flex flex-col justify-center bg-charcoal text-warmivory">
          <div aria-hidden="true" className="lab-grid-dark pointer-events-none absolute inset-0 opacity-50" />
          {/* the "mind": concentric rings with one orbiting dot */}
          <div
            data-rings
            aria-hidden="true"
            className="pointer-events-none absolute right-[-18vmin] top-1/2 aspect-square w-[88vmin] -translate-y-1/2"
          >
            {[100, 72, 46].map((s, i) => (
              <span
                key={s}
                className="absolute left-1/2 top-1/2 rounded-full border border-warmivory/20"
                style={{ width: `${s}%`, height: `${s}%`, transform: 'translate(-50%,-50%)' }}
              >
                {i === 1 && (
                  <span className="orbit absolute inset-0 rounded-full">
                    <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach" />
                  </span>
                )}
              </span>
            ))}
            <span className="absolute left-1/2 top-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal bg-signal/30" />
          </div>

          <div className="shell relative pt-16">
            <SectionHead index="02" label={mission.visionLabel} tone="ink" />
            <p className={`mt-8 md:mt-12 ${VISION_CLS}`}>
              <Chars text={mission.vision} />
            </p>
            <p data-edge className="mt-8 max-w-[60ch] border-t border-warmivory/25 pt-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-warmivory/90 md:mt-12">
              {mission.edge}
            </p>
          </div>
        </div>

        {/* progress hairline */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-charcoal/10">
          <div data-progress className="h-full origin-left bg-signal" />
        </div>
      </div>
    </section>
  );
}

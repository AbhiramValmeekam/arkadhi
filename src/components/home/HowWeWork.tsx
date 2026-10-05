import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Band, Title } from './parts';
import { how } from '@/lib/content/pack';

gsap.registerPlugin(ScrollTrigger);

/** The existing experiment pipeline — spine, stage rules, stations — with the five approved steps. */
export function HowWeWork({ index = '06' }: { index?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-exp-spine]', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>('[data-exp-stage]').forEach((stage) => {
        gsap.fromTo(stage.querySelector('[data-exp-rule]'), { scaleX: 0 }, { scaleX: 1, ease: 'expo.out', duration: 1.1, scrollTrigger: { trigger: stage, start: 'top 82%', once: true } });
        gsap.fromTo(stage.querySelector('[data-exp-body]'), { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'expo.out', duration: 0.9, scrollTrigger: { trigger: stage, start: 'top 80%', once: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Band id="how-we-work" tone="gray" index={index} label={how.heading}>
      <Title lines={['FROM QUESTION', 'TO EVIDENCE.']} />
      <div ref={ref} className="relative mt-14 md:mt-20">
        <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-charcoal/20 md:left-[9px]">
          <div data-exp-spine className="h-full w-full origin-top bg-charcoal" />
        </div>
        <ol className="space-y-14 md:space-y-20">
          {how.steps.map((s, i) => (
            <li key={s.name} data-exp-stage className="relative pl-12 md:pl-20">
              <span aria-hidden="true" className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-charcoal bg-apricot md:h-5 md:w-5">
                <span className="h-1.5 w-1.5 rounded-full bg-charcoal" />
              </span>
              <p className="font-mono text-[12px] tracking-[0.22em]">0{i + 1} / 05</p>
              <h3 className="mt-3 font-display text-[clamp(2.4rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.03em]">{s.name}</h3>
              <div data-exp-body>
                <div data-exp-rule className="mt-6 h-px w-full origin-left bg-charcoal/40" />
                <p className="mt-6 max-w-[48ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

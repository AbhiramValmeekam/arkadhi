import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sampleGlyph } from './particle-type/sampleGlyph';
import type { GlyphCloud } from './particle-type/sampleGlyph';

gsap.registerPlugin(ScrollTrigger);

/**
 * Particle hero — solid black type, letter by letter. Rest the cursor on a
 * letter and it breaks into black dots sampled from its exact letterforms;
 * move away and the dots reconverge into type. Scrolling morphs the whole
 * field and switches the magnetism off: springs release, gravity takes over
 * and everything falls below the viewport. Scroll back up and the dots fly
 * home into type.
 *
 * One gsap.ticker loop, canvas only, transforms only, layout via
 * transform-free offset chains. Touch: field + scroll fall, no cursor force.
 * Reduced motion: static solid type, no loop, no pin.
 */

const CURSOR_RADIUS = 95;
const CURSOR_PUSH = 0.7;

const rnd = (seed: number) => {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};

interface P {
  x: number; y: number; vx: number; vy: number;
  bx: number; by: number;
  s: number; th: number; ph: number; gv: number; rs: number;
  sx: number; sy: number;
  dox: number; doy: number;
  _a?: number;
}

interface LetterSys {
  cloud: GlyphCloud;
  parts: P[];
  box: { x: number; y: number; w: number; h: number };
  /** 0 = solid type, 1 = fully particles. Eased toward hover/scroll targets. */
  morph: number;
}

export function ParticleHero({
  text,
  accent,
  baseDelay = 0.3,
  particleColor = '#0B1F3C',
  sectionRef,
  subRef,
  canvasHostRef,
}: {
  text: string;
  accent: string;
  baseDelay?: number;
  /** Ink black — the only colour the typography ever wears. */
  particleColor?: string;
  sectionRef: RefObject<HTMLElement | null>;
  subRef: RefObject<HTMLElement | null>;
  canvasHostRef: RefObject<HTMLElement | null>;
}) {
  const outerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  void subRef;
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const accentOuterRef = useRef<HTMLSpanElement | null>(null);
  const accentInnerRef = useRef<HTMLSpanElement | null>(null);
  const letters = Array.from(text);

  const finePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const section = sectionRef.current;
    const host = canvasHostRef.current;
    if (!section || !host || reduceMotion) return;

    const outers = outerRefs.current.filter((el): el is HTMLSpanElement => !!el);
    if (!outers.length) return;
    const n = outers.length;
    const inners = outers.map((o) => o.firstElementChild as HTMLElement);

    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(canvas);
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let cancelled = false;
    const ctx = gsap.context(() => {
      // ── entrance: solid glyphs rise briefly, then hand over to the field ──
      let entered = false;
      gsap.fromTo(
        inners,
        { y: 50, opacity: 0, rotation: () => gsap.utils.random(-8, 8), filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, rotation: 0, filter: 'blur(0px)',
          duration: 0.75, ease: 'expo.out', stagger: 0.11, delay: baseDelay,
          onComplete: () => {
            entered = true;
          },
        },
      );
      if (accentInnerRef.current) {
        gsap.fromTo(
          accentInnerRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: baseDelay + 0.3 + n * 0.11 },
        );
      }

      // ── transform-free layout via offset chains ──
      const layoutOf = (el: HTMLElement) => {
        let x = 0, y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== section) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return { x, y, w: el.offsetWidth, h: el.offsetHeight };
      };

      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.6);
      const sizeCanvas = () => {
        const w = Math.max(1, section.clientWidth);
        const h = Math.max(1, section.clientHeight);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      sizeCanvas();

      // ── one sampled cloud per letter ──
      const TOTAL = coarse ? 800 : 2300;
      const systems: LetterSys[] = [];
      const remap = (sys: LetterSys, idx: number) => {
        sys.box = layoutOf(inners[idx]);
        const ls = Math.max(1, sys.box.h);
        const gw = ls * sys.cloud.aspect;
        const gx = sys.box.x + (sys.box.w - gw) / 2;
        const gy = sys.box.y;
        for (let i = 0; i < sys.parts.length; i++) {
          const u = sys.cloud.pts[i * 2];
          const v = sys.cloud.pts[i * 2 + 1];
          sys.parts[i].bx = gx + u * gw;
          sys.parts[i].by = gy + v * ls;
        }
      };
      const refreshLayout = () => {
        sizeCanvas();
        systems.forEach((sys, idx) => remap(sys, idx));
      };

      const cs = getComputedStyle(inners[0]);
      void (async () => {
        for (let li = 0; li < n; li++) {
          const cloud = await sampleGlyph(
            letters[li], cs.fontFamily, cs.fontWeight, Math.round(TOTAL / n),
          );
          if (cancelled) return;
          if (!cloud.count) continue;
          const sys: LetterSys = {
            cloud,
            parts: [],
            box: layoutOf(inners[li]), // face guaranteed loaded — post-swap metrics
            morph: 0,
          };
          const ls = Math.max(1, sys.box.h);
          const gw = ls * cloud.aspect;
          const gx = sys.box.x + (sys.box.w - gw) / 2;
          const gy = sys.box.y;
          sys.parts = Array.from({ length: cloud.count }, (_, k) => {
            const i = li * 1000 + k;
            const u = cloud.pts[k * 2];
            const v = cloud.pts[k * 2 + 1];
            const dx = u - 0.5;
            const dy = (v - 0.5) / Math.max(0.4, cloud.aspect);
            return {
              // Dots spawn exactly on the grid — no fly-in on select, only the
              // quick centre-out fade. Movement is reserved for the cursor.
              x: gx + u * gw,
              y: gy + v * ls,
              vx: 0, vy: 0,
              bx: gx + u * gw, by: gy + v * ls,
              s: 1.4 + rnd(i + 101) * 0.6,
              th: clamp01(Math.hypot(dx, dy) * 1.5 + (rnd(i + 71) - 0.5) * 0.35),
              ph: rnd(i + 111) * Math.PI * 2,
              gv: 0.8 + rnd(i + 121) * 0.4,
              rs: 0.7 + rnd(i + 131) * 0.6,
              sx: 0,
              sy: 0,
              dox: (rnd(i + 161) - 0.5) * 2,
              doy: 0.6 + rnd(i + 171) * 0.9,
            } as P;
          });
          systems.push(sys);
        }
        if (cancelled || !systems.length) return;
      })();

      const ro = new ResizeObserver(refreshLayout);
      ro.observe(section);
      // Seat the accent on the final letter's own measured box — immune to
      // line-box guesswork. Transform-free offsets, so entrance/scroll
      // tweens never disturb it.
      const placeAccent = () => {
        const acc = accentOuterRef.current;
        const word = wordRef.current;
        const last = outers[outers.length - 1];
        if (!acc || !word || !last) return;
        if (last.offsetParent !== word) return;
        acc.style.left = `${last.offsetLeft + last.offsetWidth * 0.34}px`;
        acc.style.top = `${last.offsetTop + last.offsetHeight * 0.56 - 18}px`;
      };
      placeAccent();
      window.addEventListener('resize', placeAccent);
      if (document.fonts?.ready) {
        void document.fonts.ready.then(() => {
          if (!cancelled) {
            refreshLayout();
            placeAccent();
            ScrollTrigger.refresh();
          }
        });
      }
      window.addEventListener('resize', refreshLayout);

      // ── cursor in refs + hovered-letter hit test ──
      const mouse = { x: -9999, y: -9999, active: false };
      const hovered = { index: -1 };
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.active = true;
        if (!finePointer) {
          hovered.index = -1;
          return;
        }
        let found = -1;
        for (let i = 0; i < systems.length; i++) {
          const b = systems[i].box;
          if (
            mouse.x >= b.x - 8 && mouse.x <= b.x + b.w + 8 &&
            mouse.y >= b.y - 8 && mouse.y <= b.y + b.h + 8
          ) {
            found = i;
            break;
          }
        }
        hovered.index = found;
      };
      const onLeave = () => {
        mouse.active = false;
        hovered.index = -1;
      };
      if (finePointer) {
        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
      }

      // ── scroll driver, unpinned: the hero flows straight into the next
      // scene with no held frame. Progress across the section's viewport
      // passage drives the magnetism release and the fall.
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: false,
        onToggle: () => refreshLayout(),
      });
      const accOuter = accentOuterRef.current;

      // ── the loop ──
      let time = 0;
      const fall = new Float64Array(Math.max(1, n));
      const kick = new Float64Array(Math.max(1, n));
      const tick = (_t: number, deltaMs: number) => {
        const dt = Math.min(3, deltaMs / 16.667);
        time += deltaMs / 1000;
        const p = trigger.progress;
        const sv = Math.max(-6, Math.min(6, trigger.getVelocity() / 1000));
        const vh = window.innerHeight;
        // Magnetism holds the letterforms until scroll lets go; then gravity wins.
        // The release is front-loaded so a normal scroll fully drops the field.
        const magnet = 1 - smooth((p - 0.05) / 0.3);
        // Per-letter fall: each letter plunges as one rigid unit, centre
        // letters leading so the word sags in the middle like the reference.
        // Exponential tracking (no oscillation) plus a velocity-fed kick
        // spring for physical lag. Scroll back restores all.
        const rel = 1 - magnet;
        for (let fi = 0; fi < n; fi++) {
          const start = 0.1 + Math.abs(fi - (n - 1) / 2) * 0.02;
          const fp = smooth((p - start) / 0.55);
          const target = fp * fp * (vh * 1.6 + 400);
          fall[fi] += (target - fall[fi]) * Math.min(1, 0.14 * dt);
          const gain = 0.9 + rnd(fi + 201) * 0.2;
          const kickTarget = Math.max(-90, Math.min(90, sv * 14 * gain));
          kick[fi] += (kickTarget - kick[fi]) * Math.min(1, 0.1 * dt);
        }
        // Hover morphs one letter; scroll morphs the whole field for the fall.
        const scrollM = smooth((p - 0.05) / 0.25);

        if (systems.length) {
          for (let li = 0; li < systems.length; li++) {
            const sys = systems[li];
            const want = Math.max(
              hovered.index === li && finePointer && p < 0.05 ? 1 : 0,
              scrollM,
            );
            const rate = (want > sys.morph ? 5.0 : 3.2) * dt * 16.667 / 1000;
            sys.morph += Math.max(-rate, Math.min(rate, want - sys.morph));
            const mEff = sys.morph;

            // glyph dissolves as its own dots assemble (after entrance only)
            if (entered) {
              gsap.set(inners[li], { opacity: 1 - smooth(mEff / 0.35) });
            }
            if (mEff < 0.002) {
              for (const pt of sys.parts) {
                pt.x = pt.bx;
                pt.y = pt.by;
                pt.vx = 0;
                pt.vy = 0;
                pt._a = 0;
              }
              continue;
            }
            for (const pt of sys.parts) {
              const converge = smooth((mEff * 1.2 - pt.th) / 0.35);
              // Home rides its letter's plunge — dots keep grid position.
              // Personal offsets stay tiny so the letterform never dissolves.
              const hx = pt.bx + pt.sx * (1 - converge) + pt.dox * rel * 6;
              const hy =
                pt.by + fall[li] + kick[li] + pt.sy * (1 - converge) +
                pt.doy * rel * 8 +
                Math.sin(time * 0.9 + pt.ph) * 0.6 * magnet;
              const hx2 = hx + Math.cos(time * 0.7 + pt.ph) * 0.5 * magnet;

              if (finePointer && mouse.active && magnet > 0.4) {
                const dx = pt.x - mouse.x;
                const dy = pt.y - mouse.y;
                const d = Math.hypot(dx, dy);
                if (d < CURSOR_RADIUS && d > 0.01) {
                  const f = 1 - d / CURSOR_RADIUS;
                  const push = f * f * CURSOR_PUSH * dt;
                  pt.vx += (dx / d) * push;
                  pt.vy += (dy / d) * push;
                }
              }
              // Tracking, not springing: exponential follow can never
              // overshoot, so fast target motion trails coherently and the
              // grid never slingshots apart. Cursor velocity rides on top
              // and decays, which reads as the spring-back.
              const vd = Math.pow(0.88, dt);
              pt.vx = Math.max(-22, Math.min(22, pt.vx * vd));
              pt.vy = Math.max(-22, Math.min(22, pt.vy * vd));
              const tr = Math.min(1, 0.18 * dt);
              pt.x += (hx2 - pt.x) * tr + pt.vx * dt;
              pt.y += (hy - pt.y) * tr + pt.vy * dt;
              pt._a =
                converge *
                (1 - clamp01((pt.y - vh * 0.95) / (vh * 0.4))) *
                (1 - smooth((p - 0.85) / 0.15)) *
                (0.93 + 0.07 * Math.sin(time * 1.3 + pt.ph));
            }
          }

          ctx2d.clearRect(0, 0, canvas.width, canvas.height);
          ctx2d.fillStyle = particleColor;
          const BUCKETS = 6;
          for (let b = BUCKETS; b >= 1; b--) {
            const lo = (b - 1) / BUCKETS;
            const hi = b / BUCKETS;
            ctx2d.globalAlpha = (lo + hi) / 2;
            ctx2d.beginPath();
            for (const sys of systems) {
              for (const pt of sys.parts) {
                const a = pt._a ?? 0;
                if (a <= lo || a > hi) continue;
                ctx2d.moveTo(pt.x + pt.s, pt.y);
                ctx2d.arc(pt.x, pt.y, pt.s, 0, Math.PI * 2);
              }
            }
            ctx2d.fill();
          }
          ctx2d.globalAlpha = 1;
        }

        // accent falls with the title; everything else stays put
        if (p > 0.0005) {
          if (accOuter) gsap.set(accOuter, { opacity: 1 - clamp01(p * 2.2) });
        } else {
          if (accOuter) gsap.set(accOuter, { opacity: 1 });
        }
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        window.removeEventListener('resize', refreshLayout);
        window.removeEventListener('resize', placeAccent);
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    });

    return () => {
      cancelled = true;
      ctx.revert();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
    // Mount-once: static content, stable refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={wordRef} className="relative inline-block whitespace-nowrap">
      {letters.map((c, i) => (
        <span
          key={`${c}-${i}`}
          ref={(el) => {
            outerRefs.current[i] = el;
          }}
          className="relative inline-block"
        >
          <span className="inline-block">{c}</span>
        </span>
      ))}
      <span ref={accentOuterRef} className="pointer-events-none absolute left-0 top-0 block">
        <span
          ref={accentInnerRef}
          className="inline-block -rotate-6 font-serif text-[0.34em] font-normal normal-case italic leading-none tracking-normal text-ink"
        >
          {accent}
        </span>
      </span>
    </span>
  );
}

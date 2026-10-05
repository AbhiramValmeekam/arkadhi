import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type CursorState = 'default' | 'hover' | 'link' | 'explore' | 'drag';

interface Ctx {
  set: (s: CursorState, label?: string) => void;
  reset: () => void;
}

const CursorCtx = createContext<Ctx>({ set: () => {}, reset: () => {} });

/** Attach to any element to drive the cursor on hover. */
export function useCursorState(state: CursorState, label?: string) {
  const { set, reset } = useContext(CursorCtx);
  return useMemo(
    () => ({
      onMouseEnter: () => set(state, label),
      onMouseLeave: () => reset(),
    }),
    [set, reset, state, label],
  );
}

/**
 * Custom cursor — desktop pointers only.
 *
 * States: default · hover · link · explore · drag. The 'explore' state expands
 * and reveals a label (used on research rows). Never rendered on touch devices,
 * and suppressed under prefers-reduced-motion where it would just be noise.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState<string | undefined>();

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine && !reduced);
  }, []);

  const set = useCallback((s: CursorState, l?: string) => {
    setState(s);
    setLabel(l);
  }, []);
  const reset = useCallback(() => {
    setState('default');
    setLabel(undefined);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('no-cursor');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      // Ring trails the dot slightly — reads as weight, not lag.
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.classList.remove('no-cursor');
    };
  }, [enabled]);

  const value = useMemo(() => ({ set, reset }), [set, reset]);

  // Geometry per state.
  const sizes: Record<CursorState, { d: number; r: number }> = {
    default: { d: 5, r: 30 },
    hover: { d: 5, r: 46 },
    link: { d: 0, r: 52 },
    explore: { d: 5, r: 78 },
    drag: { d: 5, r: 62 },
  };
  const g = sizes[state];

  return (
    <CursorCtx.Provider value={value}>
      {children}
      {enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200] hidden mix-blend-difference md:block"
        >
          <div
            ref={dot}
            className="absolute left-0 top-0 rounded-full bg-[#FFFFFF] transition-[width,height] duration-300 ease-calm"
            style={{ width: g.d, height: g.d }}
          />
          <div
            ref={ring}
            className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-[#FFFFFF]/70 transition-[width,height,background-color,border-color] duration-300 ease-calm"
            style={{
              width: g.r,
              height: g.r,
              backgroundColor: state === 'explore' ? 'rgba(255,255,255,0.12)' : 'transparent',
            }}
          >
            {state === 'explore' && label && (
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#FFFFFF]">{label}</span>
            )}
          </div>
        </div>
      )}
    </CursorCtx.Provider>
  );
}

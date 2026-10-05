import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Magnetic button. The element follows the pointer a short distance and settles
 * back on leave. Strength is intentionally low — this should register as
 * responsiveness, not as a gimmick. Disabled on touch.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-500 ease-calm ${className}`}
    >
      {children}
    </span>
  );
}

/** Magnetic link styled as a button. Internal or external. */
export function MagneticLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
}) {
  const cls = variant === 'primary' ? 'btn' : variant === 'dark' ? 'btn-dark' : 'btn-ghost';
  const external = /^https?:|^mailto:/.test(to);
  return (
    <Magnetic>
      {external ? (
        <a href={to} className={`${cls} ${className}`} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      ) : (
        <Link to={to} className={`${cls} ${className}`}>
          {children}
        </Link>
      )}
    </Magnetic>
  );
}

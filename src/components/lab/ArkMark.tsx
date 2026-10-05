/**
 * ArkMark — the real Arkadhi Labs icon geometry, taken from the live
 * arkadhi.com favicon: an angular "A" construction drawn in strokes.
 * Strokes use currentColor. `w` thickens every stroke for the bold,
 * solid treatment (hero chrome stays hairline at w=1).
 */
export function ArkMark({ className = '', w = 1 }: { className?: string; w?: number }) {
  return (
    <svg
      viewBox="12 8 80 88"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M 50 15 L 18 90 L 32 90 L 41 68 L 50 68" strokeWidth={3 * w} />
      <line x1="50" y1="15" x2="35" y2="52" strokeWidth={2 * w} />
      <line x1="35" y1="52" x2="18" y2="90" strokeWidth={2 * w} />
      <line x1="35" y1="52" x2="32" y2="90" strokeWidth={2 * w} />
      <line x1="35" y1="52" x2="41" y2="68" strokeWidth={2 * w} />
      <path d="M 50 15 L 65 52 L 57 68 L 64 90 L 78 90 L 68 55 Z" strokeWidth={3 * w} />
      <line x1="68" y1="55" x2="64" y2="90" strokeWidth={2 * w} />
      <line x1="68" y1="55" x2="78" y2="90" strokeWidth={2 * w} />
      <polygon points="32,76 72,36 78,42 38,82" strokeWidth={2.5 * w} />
      <path d="M 66 32 L 90 20 L 78 44 Z" strokeWidth={3 * w} />
      <line x1="78" y1="32" x2="90" y2="20" strokeWidth={2.5 * w} />
      <line x1="41" y1="68" x2="57" y2="68" strokeWidth={2.5 * w} />
    </svg>
  );
}

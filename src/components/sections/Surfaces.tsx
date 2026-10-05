import { Link } from 'react-router-dom';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useCursorState } from '@/components/cursor/Cursor';
import { surfaces } from '@/lib/content/home';

/**
 * "Three surfaces, one standard."
 *
 * Three large typographic objects, not cards. Hovering raises the surface,
 * draws a teal edge, and moves the cursor into its explore state.
 */
export function Surfaces() {
  return (
    <section className="border-t border-[var(--line)]">
      <div className="shell pb-12 pt-16 md:pb-16 md:pt-24">
        <Reveal>
          <p className="t-eyebrow">{surfaces.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="t-section mt-6 max-w-[18ch]">
            {surfaces.title[0]}
            <br />
            {surfaces.title[1]}
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="grid border-t border-[var(--line)] md:grid-cols-3">
        {surfaces.items.map((item, i) => (
          <SurfaceItem key={item.key} item={item} index={i} />
        ))}
      </RevealGroup>
    </section>
  );
}

function SurfaceItem({
  item,
  index,
}: {
  item: (typeof surfaces.items)[number];
  index: number;
}) {
  const cursor = useCursorState('explore', 'Explore');

  return (
    <RevealItem
      as="article"
      className={`group relative border-b border-[var(--line)] md:border-b-0 ${
        index < 2 ? 'md:border-r md:border-[var(--line)]' : ''
      }`}
    >
      <Link
        to={item.to}
        {...cursor}
        className="flex h-full flex-col px-6 pb-24 pt-10 transition-colors duration-500 ease-calm group-hover:bg-signal/[0.035] md:px-10 md:pb-32 md:pt-12"
      >
        {/* Accent edge draws down on hover */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-0 w-px bg-signal transition-all duration-700 ease-calm group-hover:h-full"
        />

        <span className="font-mono text-meta uppercase tracking-[0.14em] text-signal">{item.key}</span>

        <h3 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-[1.06] tracking-[-0.025em]">
          {item.title[0]}
          <br />
          {item.title[1]}
        </h3>

        <p className="mt-6 max-w-[38ch] text-[14.5px] leading-relaxed text-ink/65">{item.body}</p>

        <span
          aria-hidden="true"
          className="mt-auto pt-10 font-mono text-meta uppercase text-muted transition-all duration-500 ease-calm group-hover:translate-x-1 group-hover:text-signal"
        >
          Explore →
        </span>
      </Link>
    </RevealItem>
  );
}

import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/sections/PageHeader';
import { Closer } from '@/components/sections/Closer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { StatusMark } from '@/components/motion/StatusMark';
import { useCursorState } from '@/components/cursor/Cursor';
import { solutionsPage, solutionThreads, solutionsOutro } from '@/lib/content/solutions';
import type { Status } from '@/lib/content/research';

/**
 * /solutions — problem-oriented framing (brief §16).
 *
 * Deliberately not a service catalogue. Framed as questions the lab works on,
 * each tied to real programs and artifacts.
 */
export function Solutions() {
  return (
    <>
      <PageHeader
        eyebrow={solutionsPage.eyebrow}
        title={['The questions behind', 'the systems.']}
        intro={solutionsPage.intro}
      />

      <section className="py-16 md:py-24">
        <div className="shell">
          <RevealGroup as="ul" className="border-t border-[var(--line)]">
            {solutionThreads.map((t) => (
              <SolutionRow key={t.number} thread={t} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-warmivory md:py-28">
        <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-bold leading-[1] tracking-[-0.04em] text-warmivory">
              {solutionsOutro.title}
            </h2>
            <p className="mt-6 max-w-text text-[15px] leading-relaxed text-warmivory/60">{solutionsOutro.body}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link to={solutionsOutro.cta.to} className="btn-dark">
              {solutionsOutro.cta.label} <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Closer />
    </>
  );
}

function SolutionRow({ thread }: { thread: (typeof solutionThreads)[number] }) {
  const cursor = useCursorState('explore', 'Explore');

  return (
    <RevealItem
      as="li"
      className="group grid gap-x-10 gap-y-5 border-b border-[var(--line)] py-10 transition-colors duration-500 ease-calm hover:bg-peach/40 md:grid-cols-[4rem_1fr_1.15fr] md:py-14"
    >
      <span className="font-mono text-meta text-muted">{thread.number}</span>

      <div>
        <p className="font-mono text-meta uppercase tracking-[0.14em] text-charcoal">{thread.key}</p>
        <h2 className="mt-5 max-w-[22ch] font-display text-[clamp(1.25rem,2.4vw,1.875rem)] font-medium leading-[1.12] tracking-[-0.025em]">
          {thread.question}
        </h2>
        <div className="mt-6">
          <StatusMark status={thread.status as Status} />
        </div>
      </div>

      <div {...cursor}>
        <p className="max-w-text text-[15px] leading-relaxed text-ink/70">{thread.body}</p>
        <p className="mt-6 font-mono text-meta uppercase text-muted">{thread.related}</p>
        <Link
          to={thread.to}
            className="link-underline mt-6 inline-block font-mono text-meta uppercase tracking-[0.14em] text-charcoal"
        >
          Related work →
        </Link>
      </div>
    </RevealItem>
  );
}

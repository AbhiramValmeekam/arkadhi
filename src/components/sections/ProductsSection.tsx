import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/motion/Reveal';
import { StatusMark } from '@/components/motion/StatusMark';
import { EASE } from '@/lib/motion/variants';
import { researchToSystems } from '@/lib/content/products';

/**
 * Conceptual pipeline for EchoRegent.
 *
 * Deliberately labelled as a diagram. It communicates the *idea* — context is
 * reduced before it reaches the model — and does not pretend to be a running
 * benchmark or a live demo (brief §18).
 */
const STAGES = [
  { key: 'Raw context', note: 'every turn, verbatim' },
  { key: 'Relevant information', note: 'signal retained' },
  { key: 'Memory representation', note: 'associative store' },
  { key: 'LLM context', note: 'reduced payload' },
];

export function MemoryPipeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'rounded-sm border border-[var(--line)] bg-apricot/50 p-6 md:p-8'}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        Conceptual diagram — not a live benchmark
      </p>
      <ol className="mt-6 space-y-0">
        {STAGES.map((stage, i) => (
          <li key={stage.key}>
            <motion.div
              className="flex items-baseline justify-between gap-4 py-2.5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: EASE.calm, delay: i * 0.12 }}
            >
              <span
                className={`font-mono text-[12.5px] tracking-[0.02em] ${
                  i === STAGES.length - 1 ? 'text-charcoal' : 'text-ink'
                }`}
              >
                {stage.key}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-hush">{stage.note}</span>
            </motion.div>

            {i < STAGES.length - 1 && (
              <span
                aria-hidden="true"
                className="block h-4 border-l border-dashed border-ink/20 pl-0"
                style={{ marginLeft: '2px' }}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ProductsSection() {
  return (
    <section className="border-t border-[var(--line)] py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">{researchToSystems.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="t-section mt-6 max-w-[16ch]">
            {researchToSystems.bigTitle[0]}
            <br />
            {researchToSystems.bigTitle[1]}
          </h2>
        </Reveal>

        <div className="mt-14 grid border-t border-[var(--line)] lg:grid-cols-2 md:mt-20">
          {/* EchoRegent */}
          <Reveal className="border-b border-[var(--line)] py-10 lg:border-b-0 lg:border-r lg:pr-14 md:py-14">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <StatusMark status="VALIDATING" />
              <span className="font-mono text-meta uppercase text-muted">Memory Layer</span>
            </div>

            <h3 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              EchoRegent
            </h3>

            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-relaxed text-ink/70">
              EchoRegent explores a memory layer that helps AI applications retain useful information while
              reducing unnecessary context passed into language models.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="https://echoregent-yudi-pub.web.app/" target="_blank" rel="noreferrer noopener" className="btn">
                Explore EchoRegent <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          {/* Pipeline + secondary systems */}
          <Reveal delay={0.12} className="py-10 lg:pl-14 md:py-14">
            <MemoryPipeline />

            <div className="mt-9 space-y-5">
              <div>
                <p className="font-display text-[15px] font-medium tracking-[-0.01em]">Prism Runtime</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">
                  Sparse activation runtime for memory-efficient inference.
                </p>
              </div>
              <div className="rule-soft" />
              <div>
                <p className="font-display text-[15px] font-medium tracking-[-0.01em]">Trace Atlas</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">
                  Interpretability dashboard for inspecting memory slot-matching.
                </p>
              </div>
            </div>

            <Link
              to="/products"
              className="link-underline mt-8 inline-block font-mono text-meta uppercase tracking-[0.14em] text-charcoal"
            >
              All systems →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

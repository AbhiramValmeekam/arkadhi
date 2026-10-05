import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StatusMark } from '@/components/motion/StatusMark';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Field } from '@/components/motion/Field';
import { SplitLines } from '@/components/motion/SplitLines';
import { MemoryPipeline } from '@/components/sections/ProductsSection';
import { DemoShell } from '@/components/sections/DemoShell';
import { echoRegentPage, audiences, demoSpec } from '@/lib/content/echoregent';
import { EASE } from '@/lib/motion/variants';

/**
 * /products/echoregent
 *
 * Structure: problem → approach → how it fits → who it's for → demo → waitlist.
 * Waitlist-first throughout; no pricing, no self-serve signup implied.
 */
export function EchoRegent() {
  return (
    <>
      {/* Masthead */}
      <header className="relative overflow-hidden border-b border-[var(--line)] pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <Field opacity={0.4} density={30} />
        </div>

        <div className="shell">
          <motion.p
            className="t-eyebrow flex items-center gap-3 text-charcoal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE.calm }}
          >
            <span className="status-dot" />
            {echoRegentPage.eyebrow} / {echoRegentPage.name}
          </motion.p>

          <SplitLines
            as="h1"
            lines={echoRegentPage.title}
            className="t-section mt-8 max-w-[17ch]"
            delay={0.15}
            duration={1.05}
          />

          <Reveal delay={0.35} className="mt-9 max-w-text">
            <p className="text-lede text-ink/75">{echoRegentPage.lede}</p>
          </Reveal>

          <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center gap-5">
            <Link to={echoRegentPage.cta.to} className="btn">
              {echoRegentPage.cta.label} <span aria-hidden="true">→</span>
            </Link>
            <StatusMark status="VALIDATING" />
          </Reveal>

          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-hush">
            Waitlist only — self-serve access and integrations are not yet available
          </p>
        </div>
      </header>

      {/* Problem / approach */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="t-eyebrow">The problem</p>
            <p className="mt-6 max-w-text text-[15.5px] leading-relaxed text-ink/75">{echoRegentPage.problem}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-eyebrow">The approach</p>
            <p className="mt-6 max-w-text text-[15.5px] leading-relaxed text-ink/75">{echoRegentPage.approach}</p>
          </Reveal>
        </div>
      </section>

      {/* How it fits */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="t-eyebrow">How the memory layer fits</p>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              It sits between your app and the model.
            </h2>
            <p className="mt-6 max-w-text text-[15px] leading-relaxed text-ink/70">
              Your integration does not change beyond the base URL. Everything downstream — classification,
              compression, memory — is handled before the request reaches the model.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <MemoryPipeline />
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Who it is for</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Built for teams who own both the model bill and the integration.
            </h2>
          </Reveal>

          <RevealGroup as="ul" className="mt-12 border-t border-[var(--line)]">
            {audiences.map((a) => (
              <RevealItem
                as="li"
                key={a.key}
                className="grid gap-x-8 gap-y-2 border-b border-[var(--line)] py-6 md:grid-cols-[16rem_1fr] md:items-baseline"
              >
                <h3 className="font-display text-[16px] font-medium tracking-[-0.015em]">{a.key}</h3>
                <p className="max-w-text text-[14px] leading-relaxed text-ink/65">{a.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Demo */}
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow">Demo</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              {demoSpec.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-10 max-w-4xl">
            <DemoShell />
          </Reveal>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-charcoal py-20 text-warmivory md:py-28">
        <div className="shell">
          <Reveal>
            <h2 className="max-w-[17ch] font-display text-[clamp(1.75rem,4.4vw,3.5rem)] font-bold leading-[1] tracking-[-0.04em] text-warmivory">
              Join the EchoRegent waitlist.
            </h2>
            <p className="mt-6 max-w-text text-[15px] leading-relaxed text-warmivory/60">
              Tell us what you are building and what your context costs look like today. We will reach out when
              access opens.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-9">
            <Link to="/work-with-us" className="btn-dark">
              Request access <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

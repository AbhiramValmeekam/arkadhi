import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/sections/PageHeader';
import { Closer } from '@/components/sections/Closer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { MemoryPipeline } from '@/components/sections/ProductsSection';
import { products, productsPage, productClaims } from '@/lib/content/products';

/**
 * /products — three systems, one of them customer-facing.
 *
 * `productClaims` is rendered as a single conditional block so the numeric
 * claims can be removed in one edit once §1.1 is decided.
 */
export function Products() {
  return (
    <>
      <PageHeader eyebrow={productsPage.eyebrow} title={['Building systems for', 'token-efficient, robust,', 'and interpretable AI.']} intro={productsPage.intro} />

      {/* Claims block — remove by flipping `enabled` in products.ts */}
      {productClaims.enabled && (
        <section className="border-b border-[var(--line)] py-12 md:py-16">
          <div className="shell">
            <Reveal>
              <p className="max-w-text text-[15px] leading-relaxed text-ink/70">{productClaims.headline}</p>
              <dl className="mt-8 grid grid-cols-3 gap-px bg-[var(--line)]">
                {productClaims.stats.map((s) => (
                    <div key={s.label} className="bg-warmivory px-4 py-6">
                    <dt className="font-mono text-meta uppercase text-muted">{s.label}</dt>
                        <dd className="mt-2 font-display text-[clamp(1.25rem,2.4vw,1.875rem)] font-bold tracking-[-0.02em] text-charcoal">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-hush">
                Figures as published on arkadhi.com — verification pending
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Product blocks */}
      <section className="py-16 md:py-24">
        <div className="shell space-y-16 md:space-y-24">
          {products.map((p, i) => (
            <Reveal key={p.slug}>
              <article
                id={p.slug}
                className="grid gap-10 border-t border-ink/20 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="font-mono text-meta uppercase tracking-[0.14em] text-charcoal">{p.badge}</span>
                    {p.formerName && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-hush">
                        formerly {p.formerName}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 font-display text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1] tracking-[-0.04em]">
                    {p.name}
                  </h2>
                  <p className="mt-4 font-mono text-meta uppercase text-muted">{p.tagline}</p>
                  <p className="mt-7 max-w-text text-[15.5px] leading-relaxed text-ink/70">{p.summary}</p>

                  {p.href && (
                    p.href.startsWith('http') ? (
                      <a href={p.href} target="_blank" rel="noreferrer noopener" className="btn mt-8">
                        Explore {p.name} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link to={p.href} className="btn mt-8">
                        Explore {p.name} <span aria-hidden="true">→</span>
                      </Link>
                    )
                  )}
                </div>

                <div>
                  {p.slug === 'echoregent' ? (
                    <>
                      <MemoryPipeline />
                      <RevealGroup as="ul" className="mt-9 border-t border-[var(--line)]">
                        {p.features?.map((f) => (
                          <RevealItem
                            as="li"
                            key={f.title}
                            className="border-b border-[var(--line)] py-4"
                          >
                            <p className="font-display text-[15px] font-medium tracking-[-0.01em]">{f.title}</p>
                            <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">{f.body}</p>
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </>
                  ) : (
                    <>
                      <p className="max-w-text text-[15px] leading-relaxed text-ink/70">{p.detail}</p>
                      <RevealGroup as="ul" className="mt-8 border-t border-[var(--line)]">
                        {p.bullets?.map((b) => (
                          <RevealItem
                            as="li"
                            key={b}
                            className="border-b border-[var(--line)] py-4 font-mono text-meta uppercase text-muted"
                          >
                            {b}
                          </RevealItem>
                        ))}
                      </RevealGroup>
                    </>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Closer />
    </>
  );
}

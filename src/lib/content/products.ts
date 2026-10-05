/**
 * Product content — ported from arkadhi.com/products.
 *
 * NOTE ON NAMING: the live site calls the context-management product "Prexi".
 * The team has confirmed the product name is now "EchoRegent". `formerName` is
 * retained so nothing is lost if that changes again.
 *
 * NOTE ON CLAIMS: the numeric claims live in the single `productClaims` export
 * below, kept separate so they can be removed or reframed in one edit.
 * See PROPOSAL.md §1.1 — still pending a verified/strip decision.
 */

export interface Product {
  slug: string;
  name: string;
  formerName?: string;
  badge: string;
  tagline: string;
  summary: string;
  detail: string;
  features?: { title: string; body: string }[];
  bullets?: string[];
  status: 'LIVE PRODUCT' | 'RESEARCH ENGINE' | 'OBSERVABILITY';
  href?: string;
  waitlist?: boolean;
}

export const productsPage = {
  eyebrow: 'Executable Systems & Tools',
  title: 'Building systems for token-efficient, robust, and interpretable AI.',
  intro:
    'From drop-in LLM context management to sparse runtime engines and activation trace visualizers, our systems turn research principles into production tools.',
};

export const products: Product[] = [
  {
    slug: 'echoregent',
    name: 'EchoRegent',
    formerName: 'Prexi',
    badge: 'LIVE PRODUCT',
    tagline: 'LLM Context Management Middleware',
    summary:
      "Stop paying for tokens you don't need. Drop-in context management for GPT-4o, Claude, and Gemini. Compress, cache, and protect every conversation in one API call.",
    detail:
      'EchoRegent explores a memory layer that helps AI applications retain useful information while reducing the context passed into language models.',
    status: 'LIVE PRODUCT',
    href: 'https://echoregent-yudi-pub.web.app/',
    waitlist: true,
    features: [
      {
        title: 'Context Compression',
        body: 'Compress long conversational turns while maintaining key semantic grounding.',
      },
      {
        title: 'Semantic Caching',
        body: 'Zero-latency vector caching to bypass redundant upstream model queries.',
      },
      {
        title: 'Conversation Memory',
        body: 'Persistent episodic & entity memory across multi-session user interactions.',
      },
      {
        title: 'Content Guardrails',
        body: 'Inline security filtering to block prompt injection & adversarial attacks.',
      },
    ],
  },
  {
    slug: 'prism-runtime',
    name: 'Prism Runtime',
    badge: 'RESEARCH ENGINE',
    tagline: 'Sparse Activation Runtime',
    summary:
      'Sparse activation runtime engine paired with Cognitive Memory Primitives for memory-efficient inference without global graph autograd.',
    detail:
      'Systems developed alongside our architectural papers to inspect and accelerate non-standard models.',
    status: 'RESEARCH ENGINE',
    bullets: [
      'Sparse activation execution kernel',
      'Selective compute allocation',
      'Memory-efficient sparse inference',
    ],
  },
  {
    slug: 'trace-atlas',
    name: 'Trace Atlas',
    badge: 'OBSERVABILITY',
    tagline: 'Interpretability Dashboard',
    summary:
      'Interpretability dashboard for visualizing token routing, slot-matching in competitive memory, and weight-protect plasticity movement.',
    detail:
      'Systems developed alongside our architectural papers to inspect and accelerate non-standard models.',
    status: 'OBSERVABILITY',
    bullets: [
      'Activation trace visualization',
      'Hopfield memory slot-matching inspection',
      'Real-time plasticity tracking',
    ],
  },
];

/**
 * ⚠️ NUMERIC CLAIMS — currently live on arkadhi.com/products.
 * These are held in one place pending the §1.1 decision. To strip them,
 * return an empty array and the UI falls back to a methodology-first layout.
 */
export const productClaims = {
  enabled: true,
  headline:
    'Proven 26× more token-efficient than standard memory frameworks, slashing production LLM API costs by up to 65%.',
  stats: [
    { value: '65%', label: 'API Cost Savings' },
    { value: '26×', label: 'Token Efficiency' },
    { value: '1', label: 'API Call Integration' },
  ],
};

/** Product page headings. */
export const researchToSystems = {
  eyebrow: 'Latest Artifacts',
  title: 'Original research and products.',
  bigTitle: ['From research,', 'to systems.'],
};

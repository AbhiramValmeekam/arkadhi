/**
 * Site-wide constants.
 * All copy here is ported verbatim from the live arkadhi.com site.
 */

export const site = {
  name: 'Arkadhi Labs',
  shortName: 'ARKADHI',
  tagline: 'Where intelligence takes shape.',

  // From the live <meta name="description">
  description:
    'Frontier AI research lab building original architecture, models, and the benchmarks to prove them.',

  // The recurring anchor paragraph, used in the footer and page closers.
  anchor:
    'Arkadhi Labs is a research-first AI lab building original model architecture, local gradient-free learning rules, and evidence-based evaluation infrastructure.',

  contactEmail: 'founder@arkadhi.com',

  /** Live EchoRegent deployment — all product exits point here. */
  echoRegentUrl: 'https://echoregent-yudi-pub.web.app/',

  // Live site footer line. Kept verbatim.
  location: 'Distributed Research Network',

  // Label pairs shown in the hero metadata column.
  facts: [
    { label: 'Base', value: 'Distributed' },
    { label: 'Mode', value: 'Research Lab' },
    { label: 'Output', value: 'Papers · Systems' },
    { label: 'Network', value: 'Open / Remote' },
  ],

  year: '2026',
} as const;

/** Primary navigation — minimal research-lab index. */
export const navigation = [
  { label: 'Research', to: '/research' },
  { label: 'Solutions', to: '/solutions' },
  {
    label: 'Products',
    to: '/products',
    children: [{ label: 'EchoRegent', to: 'https://echoregent-yudi-pub.web.app/' }],
  },
  {
    label: 'Community',
    to: '/community',
    children: [{ label: 'Compute & Curiosity', to: '/computecuriosity' }],
  },
  { label: 'About', to: '/lab' },
] as const;

/** Footer link columns — mirrors the live site, plus the two new surfaces. */
export const footerColumns = [
  {
    title: 'Research',
    links: [
      { label: 'Flagship Paper', to: '/research#arkadhi-cl-2026-01' },
      { label: 'CMP Architecture', to: '/research#programs' },
      { label: 'ByteCL Benchmark', to: '/research#draft-bm-002' },
      { label: 'Solutions', to: '/solutions' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'EchoRegent', to: 'https://echoregent-yudi-pub.web.app/' },
      { label: 'Prism Runtime', to: '/products#prism-runtime' },
      { label: 'Trace Atlas', to: '/products#trace-atlas' },
    ],
  },
  {
    title: 'Lab',
    links: [
      { label: 'Operating Model', to: '/lab' },
      { label: 'Principles', to: '/lab#principles' },
      { label: 'Careers', to: '/lab/careers' },
      { label: 'Community', to: '/community' },
      { label: 'Work With Us', to: '/work-with-us' },
    ],
  },
] as const;

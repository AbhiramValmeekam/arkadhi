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
  location: 'India · Remote research network',

  // Label pairs shown in the hero metadata column.
  facts: [
    { label: 'Base', value: 'Distributed' },
    { label: 'Mode', value: 'Research Lab' },
    { label: 'Output', value: 'Papers · Systems' },
    { label: 'Network', value: 'Open / Remote' },
  ],

  year: '2026',
} as const;

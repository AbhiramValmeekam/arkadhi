/**
 * Scroll-scene content.
 *
 * Structure follows a sticky-deck grammar — numeral, kicker, caps
 * heading, statement, source — every word Arkadhi's own, drawn from the
 * live site and the flagship paper. The `shape` key now only selects a
 * lightweight SVG tech motif (see Scroll3D.TechMotif); the old WebGL
 * lattice is gone.
 */

export const heroScene = {
  /**
   * The nameplate. The brand name is set as a condensed all-caps wordmark with
   * the second half of the name riding its baseline as a script flourish —
   * `mark` + `markAccent` together are "Arkadhi Labs", which is also the
   * heading's accessible name.
   */
  mark: 'ARKADHI',
  markAccent: 'labs',
  microLine: 'Frontier AI Research',
  lines: ['Where intelligence', 'takes shape.'],
  lede: 'A research-first AI lab building original model architecture, local gradient-free learning rules, and evaluation infrastructure with the rigor of a frontier paper.',
  primary: { label: 'Read the flagship paper', to: '/research#arkadhi-cl-2026-01' },
  secondary: { label: 'View systems & tools', to: '/products' },
  scrollHint: 'Scroll',
};

export interface ThreadScene {
  numeral: string;
  shape: string;
  kicker: string;
  heading: string;
  statement: string;
  source: string;
  to: string;
  linkLabel: string;
}

/** The five pinned scenes. Each numeral is the scene's position in the story. */
export const threadScenes: ThreadScene[] = [
  {
    numeral: '01',
    shape: 'lattice',
    kicker: 'The Lab',
    heading: 'THE PROBLEM IS STRUCTURAL.',
    statement:
      'Catastrophic forgetting is a structural defect of global backpropagation, not a training defect to be patched.',
    source: 'Arkadhi Labs — Core Research Thesis',
    to: '/research',
    linkLabel: 'Research',
  },
  {
    numeral: '02',
    shape: 'ring',
    kicker: 'Continual Learning',
    heading: 'MEMORY WITHOUT BACKPROPAGATION.',
    statement:
      'Cognitive Memory Primitives bind byte pairs into sparse codes through local, gradient-free plasticity — no global gradient pass.',
    source: 'CMP Architecture',
    to: '/research#programs',
    linkLabel: 'Programs',
  },
  {
    numeral: '03',
    shape: 'helix',
    kicker: 'Sequential Domains',
    heading: 'FIFTEEN DOMAINS, ONE MODEL.',
    statement:
      'Across 15 sequential text domains, the CMP model shows 15–19× lower backward transfer than a Transformer with Online EWC.',
    source: 'ARKADHI-CL-2026.01 — Published',
    to: '/research#arkadhi-cl-2026-01',
    linkLabel: 'Flagship paper',
  },
  {
    numeral: '04',
    shape: 'grid',
    kicker: 'Benchmark',
    heading: 'MEASURE WITHOUT TOKENIZER BIAS.',
    statement:
      'ByteCL is a standardised byte-level continual-learning benchmark, built so evaluation does not inherit a tokenizer’s assumptions.',
    source: 'ByteCL Benchmark',
    to: '/research#programs',
    linkLabel: 'Benchmark',
  },
  {
    numeral: '05',
    shape: 'sparse',
    kicker: 'Evidence Discipline',
    heading: 'NEGATIVE RESULTS COUNT.',
    statement:
      'Claims are validated with multi-seed replication and explicit domain-order controls — and negative results are published beside the positive ones.',
    source: 'Arkadhi Labs — Evidence Policy',
    to: '/research',
    linkLabel: 'Evidence',
  },
];

/**
 * Full-bleed category interludes — the equivalent of the reference site's
 * single-word bloom scenes. One word, held over the lattice.
 */
export const categoryScenes = [
  { word: 'CONTINUAL LEARNING', note: 'Local plasticity · sparse codes · no global gradient' },
  { word: 'ORIGINAL ARCHITECTURE', note: 'Structure before scale' },
  { word: 'OPEN EVALUATION', note: 'ByteCL · multi-seed · domain-order controls' },
];

/**
 * Profile scene. Deliberately a data panel rather than a portrait — the lab
 * has not supplied a photograph, and inventing one would be dishonest.
 */
export const profileScene = {
  kicker: 'The Lab',
  name: 'ARKADHI LABS',
  role: 'A research institute for original AI architecture',
  facts: [
    { label: 'Discipline', value: 'Continual learning' },
    { label: 'Method', value: 'Gradient-free plasticity' },
    { label: 'Evaluation', value: 'Byte-level · multi-seed' },
    { label: 'Base', value: 'Distributed' },
  ],
  note: 'Details here are drawn from the lab’s published operating model. Portrait and team biographies are pending.',
};

/** "What to expect" accordion — the lab's operating principles, restated. */
export const expectScenes = {
  kicker: 'What to expect',
  heading: 'How the lab works.',
  items: [
    {
      q: 'We publish negative results',
      a: 'A thread that fails to replicate is reported as a failure. The research catalog lists a published negative result alongside the flagship paper.',
    },
    {
      q: 'We control for order',
      a: 'Continual-learning claims are meaningless without explicit domain-order controls, so every reported number carries its ordering protocol.',
    },
    {
      q: 'We replicate across seeds',
      a: 'Findings are stated with the seed count that produced them. A single-seed result is labelled as such, not presented as a finding.',
    },
    {
      q: 'We distinguish ongoing from validated',
      a: 'Every artifact carries a status — published, in preparation, exploring, validating — and only published work is described as validated.',
    },
  ],
};

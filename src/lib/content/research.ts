/**
 * Research content — ported verbatim from arkadhi.com/research.
 *
 * Status vocabulary is the site's OWN existing one (PUBLISHED / IN PREPARATION),
 * extended with EXPLORING / IN DEVELOPMENT / VALIDATING for non-paper work.
 */

export type Status = 'PUBLISHED' | 'IN PREPARATION' | 'VALIDATING' | 'IN DEVELOPMENT' | 'EXPLORING';

export interface ResearchArtifact {
  id: string;          // the site's own artifact code, e.g. ARKADHI-CL-2026.01
  slug: string;
  kind: string;        // PUBLISHED PAPER / BENCHMARK SPECIFICATION / …
  category: string;    // CONTINUAL LEARNING / ARCHITECTURE / BENCHMARKS
  status: Status;
  year: string;
  title: string;
  summary: string;
  authors: string;
  metrics?: { value: string; label: string }[];
  flagship?: boolean;
  negativeResult?: boolean;
  href?: string;       // TODO: real DOI / PDF permalinks — pending from team
}

export const researchArtifacts: ResearchArtifact[] = [
  {
    id: 'ARKADHI-CL-2026.01',
    slug: 'arkadhi-cl-2026-01',
    kind: 'PUBLISHED PAPER',
    category: 'CONTINUAL LEARNING',
    status: 'PUBLISHED',
    year: '2026',
    title: "What Fires Together Doesn't Forget Together",
    summary:
      "We introduce CMP (Cognitive Memory Primitive), an architecture that represents inputs as sparse relational codes, stores them in a two-tier competitive memory, and learns entirely through local, gradient-free updates, with no backpropagation anywhere in the network. We test whether catastrophic forgetting is a structural defect of global backpropagation. On a 15-domain text protocol, CMP's backward transfer is 15–19× better than a matched Transformer with Online EWC (+0.1482 vs +2.2457 BWT).",
    authors: 'Ashmith Atmuri*, Akshay Kumar, Yashaswini Rao Bhogarajula (Arkadhi Labs)',
    metrics: [
      { value: '15–19×', label: 'Forgetting Reduction' },
      { value: '+0.1482', label: 'BWT Score' },
      { value: '3-Seed', label: 'Stable Replication' },
    ],
    flagship: true,
  },
  {
    id: 'DRAFT BM-002',
    slug: 'draft-bm-002',
    kind: 'BENCHMARK SPECIFICATION',
    category: 'BENCHMARKS',
    status: 'IN PREPARATION',
    year: '2026',
    title: 'ByteCL: A Tokenizer-Free Byte-Level Continual Learning Benchmark',
    summary:
      '[Work in Progress] Existing continual learning benchmarks rely on subword tokenizers (BPE, WordPiece) that bake in static vocabulary distribution assumptions and introduce tokenizer contamination across domains. ByteCL provides a standardized, multi-domain byte-stream benchmark designed specifically for non-subword and byte-level sequence models.',
    authors: 'Arkadhi Labs Benchmark Group (Arkadhi Labs)',
  },
  {
    id: 'DRAFT SYS-003',
    slug: 'draft-sys-003',
    kind: 'SYSTEMS TECHNICAL NOTE',
    category: 'ARCHITECTURE',
    status: 'IN PREPARATION',
    year: '2026',
    title: 'Selective Compute Allocation in Non-Backprop Memory Architectures',
    summary:
      '[Work in Progress] A technical note on accelerating sparse relational binding and two-tier Hopfield memory reads. We show that one-cue-at-a-time recurrent retrieval avoids the quadratic all-pairs attention matrix while maintaining stable memory access during online local updates.',
    authors: 'Arkadhi Labs Systems Group (Arkadhi Labs)',
  },
  {
    id: 'DRAFT TR-004',
    slug: 'draft-tr-004',
    kind: 'NEGATIVE RESULT REPORT',
    category: 'ARCHITECTURE',
    status: 'IN PREPARATION',
    year: '2026',
    title: 'Diagnostic Analysis of Stacking Non-Sparse Binding Blocks',
    summary:
      '[Work in Progress] Disclosing a diagnosed negative result from attempting to merge a 4-block non-sparse depth stack with competitive memory. Dense representations dilute memory slot-matching and create readout signal competition. Published to document failure modes for the research community.',
    authors: 'Ashmith Atmuri, Akshay Kumar (Arkadhi Labs)',
    negativeResult: true,
  },
];

/** Research programs — from the "Four Active Technical Threads" block. */
export const researchPrograms = [
  {
    number: '01',
    title: 'Local Plasticity',
    summary:
      'Designing non-backprop learning rules that update parameters locally without global autograd graph passes.',
    status: 'IN DEVELOPMENT' as Status,
  },
  {
    number: '02',
    title: 'Associative Memory',
    summary: 'Building two-tier Hopfield and VSA memory structures that store and retrieve relational codes.',
    status: 'IN DEVELOPMENT' as Status,
  },
  {
    number: '03',
    title: 'Byte-Level Benchmark',
    summary: 'Constructing ByteCL to evaluate continual learning without subword tokenizer contamination.',
    status: 'VALIDATING' as Status,
  },
  {
    number: '04',
    title: 'Interpretability Traces',
    summary: 'Creating real-time trace visualizers for inspecting memory slot-matching and parameter updates.',
    status: 'EXPLORING' as Status,
  },
];

/** Page-level copy for /research. */
export const researchPage = {
  eyebrow: 'Arkadhi Labs / Research Index',
  title: 'Original AI Architecture, Measured Carefully.',
  intro:
    'Our index of published research, papers in preparation, benchmark specifications, and technical notes. Built around falsifiable mechanisms and empirical evidence.',
  catalogHeading: 'Research Catalog',
  programsHeading: 'Four Active Technical Threads',
  programsIntro:
    'Our research is structured into dedicated long-term programs focused on solving foundational flaws in modern AI models.',
  categories: ['All', 'Continual Learning', 'Architecture', 'Benchmarks', 'Technical Reports'],
};

/** The four primitives listed in the homepage lab brief. */
export const cmpPrimitives = [
  { number: '01', title: 'Sparse Relational Binding' },
  { number: '02', title: 'Two-Tier Hopfield Memory' },
  { number: '03', title: 'Weight-Protect Plasticity' },
  { number: '04', title: 'ByteCL Benchmark' },
];

/** Statuses shown on the homepage primitives list. */
export const statusCopy: Record<Status, string> = {
  PUBLISHED: 'Published',
  'IN PREPARATION': 'In Preparation',
  VALIDATING: 'Validating',
  'IN DEVELOPMENT': 'In Development',
  EXPLORING: 'Exploring',
};

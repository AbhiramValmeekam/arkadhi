/** Homepage section copy — ported verbatim from arkadhi.com. */

export const hero = {
  eyebrow: ['Arkadhi Labs', 'Frontier AI Research'],
  headline: ['Where intelligence', 'takes shape.'],
  lede: 'Arkadhi Labs is a research-first AI lab building original model architecture, local gradient-free learning rules, and evaluation infrastructure with the rigor of a frontier paper.',
  primaryCta: { label: 'Explore Research Paper', to: '/research#arkadhi-cl-2026-01' },
  secondaryCta: { label: 'View Systems & Tools', to: '/products' },
};

export const labBrief = {
  label: 'Lab Brief',
  title: 'What Fires Together…',
  body: 'Demonstrating 15–19× lower forgetting using Cognitive Memory Primitives (CMP) with zero backprop.',
  note: '[Figure pending verification of the BPB/BWT label — see PROPOSAL.md §1.2]',
};

export const surfaces = {
  eyebrow: 'Index',
  title: ['Three surfaces,', 'one standard.'],
  items: [
    {
      key: 'Architecture',
      title: ['Architecture', '& Plasticity'],
      body: 'We investigate local, gradient-free learning rules, sparse relational representations, and structural resistance to catastrophic forgetting.',
      to: '/research#programs',
    },
    {
      key: 'Executable',
      title: ['Executable', 'Systems'],
      body: 'Products like EchoRegent for LLM context management and ByteCL benchmark harnesses that survive rigorous external scientific scrutiny.',
      to: '/products',
    },
    {
      key: 'Evidence',
      title: ['Evidence', 'Discipline'],
      body: 'Every claim is validated with multi-seed replication, explicit domain-order controls, and transparent disclosure of negative results.',
      to: '/research',
    },
  ],
};

export const thesis = {
  eyebrow: 'Core Research Thesis',
  title: 'Frontier progress needs better structure, not only larger scale.',
  intro:
    'The lab studies how models allocate compute, preserve memory, and avoid catastrophic forgetting. Our operating belief is simple: architecture, measurement, and systems must advance together.',
  cells: [
    {
      number: '01',
      label: 'Central Thesis',
      body: 'Catastrophic forgetting is a structural defect of global backpropagation, not a training defect to be patched.',
    },
    {
      number: '02',
      label: 'Core Mechanism',
      body: 'Cognitive Memory Primitive (CMP) binds byte pairs into sparse codes with local, gradient-free plasticity.',
    },
    {
      number: '03',
      label: 'Benchmark Proof',
      body: '15–19× lower backward transfer (BWT) than Transformer + Online EWC on 15 sequential text domains.',
    },
    {
      number: '04',
      label: 'Open Benchmark',
      body: 'Building ByteCL: a standardized byte-level benchmark for continual learning evaluation without tokenizer bias.',
    },
  ],
};

export const collaboration = {
  eyebrow: 'Collaboration',
  title: 'Bring us hard architecture and evaluation problems.',
  body: 'We are most useful when the question is technical, falsifiable, and important enough to deserve a clean protocol.',
  goodFitLabel: 'Good Fit',
  goodFit:
    'Academic labs, model architecture teams, and researchers building non-backprop continual learning models.',
  cta: { label: 'Start a Collaboration', to: '/work-with-us' },
};

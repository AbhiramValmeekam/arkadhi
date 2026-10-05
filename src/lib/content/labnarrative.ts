/**
 * Arkadhi Labs narrative content — original copy for the research-led site.
 * Research first, product as outcome. Nothing here describes fake results;
 * statuses mark what is shipped, live, or still an open question.
 */

export const manifesto = {
  index: '01',
  label: 'Why we exist',
  lines: ['WE EXPLORE WHAT', 'INTELLIGENT SOFTWARE', 'COULD BECOME.'],
  body: 'Arkadhi Labs is a research-first technology lab. We study how intelligent systems learn, remember, and interact with people — then turn the promising ideas into systems and products that survive contact with the real world.',
  meta: ['EST. 2026', 'RESEARCH → SYSTEM → PRODUCT'],
};

export const exploreAreas = [
  {
    id: '01',
    name: 'Continual Learning',
    tag: 'REMEMBER EVERYTHING',
    body: 'Models that accumulate knowledge across sequential domains without catastrophic forgetting — local, gradient-free plasticity instead of global patches.',
    to: '/research',
  },
  {
    id: '02',
    name: 'Intelligent Agents',
    tag: 'ACT WITH CONTEXT',
    body: 'Agents that plan, use tools, and recover from failure — evaluated on what they accomplish, not what they claim.',
    to: '/research',
  },
  {
    id: '03',
    name: 'Human–Computer Interaction',
    tag: 'MEET PEOPLE HALFWAY',
    body: 'Interfaces where models show their working: inspectable state, reversible actions, and collaboration instead of automation theatre.',
    to: '/solutions',
  },
  {
    id: '04',
    name: 'Generative Systems',
    tag: 'COMPOSE, DON’T HALLUCINATE',
    body: 'Generation constrained by structure — schemas, retrievers, and verifiers that keep creative systems honest.',
    to: '/solutions',
  },
  {
    id: '05',
    name: 'Computational Creativity',
    tag: 'MACHINES THAT SKETCH',
    body: 'Our own site typography is an experiment: type as a physical, interactive medium rather than frozen glyphs.',
    to: '/lab',
  },
  {
    id: '06',
    name: 'AI Infrastructure',
    tag: 'BORING IS A FEATURE',
    body: 'Benchmark harnesses, evaluation pipelines, and runtime tooling that make research results replicable — including ours.',
    to: '/products',
  },
  {
    id: '07',
    name: 'Multimodal Systems',
    tag: 'BEYOND THE CHATBOX',
    body: 'Systems that read interfaces, documents, and environments — not just text boxes — and act inside them carefully.',
    to: '/research',
  },
  {
    id: '08',
    name: 'Emerging Interfaces',
    tag: 'WHAT COMES AFTER APPS',
    body: 'Prototypes for ambient, spatial, and conversational computing — built to learn from, most of them thrown away.',
    to: '/lab',
  },
];

export const experiments = [
  {
    id: 'EXP—01',
    name: 'EchoRegent',
    type: 'PRODUCT',
    status: 'LIVE — WAITLIST',
    year: '2026',
    body: 'Memory infrastructure for LLM applications: an associative layer that carries what matters forward and passes reduced, higher-signal context to the model.',
    to: 'https://echoregent-yudi-pub.web.app/',
  },
  {
    id: 'EXP—02',
    name: 'ByteCL',
    type: 'BENCHMARK',
    status: 'PUBLISHED',
    year: '2026',
    body: 'A byte-level continual-learning benchmark across fifteen sequential text domains — evaluation without tokenizer bias, with explicit domain-order controls.',
    to: '/research',
  },
  {
    id: 'EXP—03',
    name: 'CMP Primitives',
    type: 'RESEARCH',
    status: 'PUBLISHED',
    year: '2026',
    body: 'Cognitive Memory Primitives: byte pairs bound into sparse codes through local plasticity. 15–19× lower forgetting than Transformer + Online EWC in our trials.',
    to: '/research',
  },
  {
    id: 'EXP—04',
    name: 'Particle Type',
    type: 'PROTOTYPE',
    status: 'FIELD TEST',
    year: '2026',
    body: 'The typography system running this very page — glyph-sampled dot matrices with cursor and scroll physics. An interface experiment disguised as a headline.',
    to: '/lab',
  },
];

export const systemLayers = [
  { id: 'L1', name: 'MODELS', note: 'Reasoning cores, evaluated ruthlessly' },
  { id: 'L2', name: 'AGENTS', note: 'Plans, tools, recovery loops' },
  { id: 'L3', name: 'MEMORY', note: 'What persists between sessions' },
  { id: 'L4', name: 'TOOLS', note: 'The hands of the system' },
  { id: 'L5', name: 'DATA', note: 'Provenance, not just volume' },
  { id: 'L6', name: 'INFRASTRUCTURE', note: 'Runtimes that stay up' },
  { id: 'L7', name: 'INTERFACE', note: 'Where humans meet the machine' },
];

export const currentResearch = [
  {
    id: '01',
    name: 'Intelligent Agents',
    question: 'Can an agent notice it is wrong before a human does?',
    status: 'VALIDATING',
  },
  {
    id: '02',
    name: 'Multimodal Interaction',
    question: 'What does oversight look like when the model sees the screen?',
    status: 'EXPLORING',
  },
  {
    id: '03',
    name: 'AI Systems',
    question: 'Which failures are architectural, not data problems?',
    status: 'IN PREPARATION',
  },
  {
    id: '04',
    name: 'Emergent Interfaces',
    question: 'What replaces the prompt box for sustained work?',
    status: 'EXPLORING',
  },
];

export const labAbout = {
  index: '07',
  label: 'The lab',
  statement: ['ARKADHI LABS IS A', 'RESEARCH-FIRST TECHNOLOGY LAB', 'EXPLORING THE NEXT GENERATION', 'OF INTELLIGENT SOFTWARE.'],
  points: [
    ['SMALL', 'A focused team; every person ships research or systems.'],
    ['RIGOROUS', 'Multi-seed replication, order controls, published negatives.'],
    ['PATIENT', 'Long-term questions over quarterly demos.'],
    ['OPEN', 'Benchmarks and methods published, not just press releases.'],
  ],
};

export const future = {
  index: '09',
  label: 'What’s next',
  lines: ['THE NEXT SYSTEM', 'HAS NOT BEEN', 'BUILT YET.'],
  body: 'We are hiring the people who want to build it — and looking for partners with hard architecture and evaluation problems.',
};

export const mission = {
  index: '08',
  label: 'Mission & vision',
  lines: ['THE WORLD’S BEST', 'SELF-IMPROVING AI', 'MODELS FOR THE EDGE.'],
  statement:
    'To build the world’s best self-improving AI models for the edge — through four pillars: Learn, Understand, Act, Aware.',
  vision:
    'A world where every device carries a mind that keeps learning — and where the research behind it can come from anywhere.',
  pillars: [
    ['LEARN', 'Models that keep learning on-device, long after deployment.'],
    ['UNDERSTAND', 'Systems that build a working model of their world and their user.'],
    ['ACT', 'Agents that do careful work in real environments, reversibly.'],
    ['AWARE', 'Small minds that know their limits and ask before overstepping.'],
  ],
};

export const collaborate = {
  index: '10',
  label: 'Collaborate',
  lines: ['WORK WITH', 'THE LAB.'],
  tracks: ['RESEARCH', 'PARTNERSHIPS', 'ENGINEERING', 'EXPERIMENTS', 'PRODUCT'],
  to: '/work-with-us',
};

/**
 * Approved copy — "Arkadhi Website Content Pack", 5 October 2026.
 * Every public string on the homepage, /echoregent and /computecuriosity
 * lives here. Nothing in this file is invented: if the pack does not say it,
 * it does not appear on the site.
 */
import { site } from '@/lib/content/site';

/** mailto: with a subject — the only contact mechanism until delivery exists. */
export const mail = (subject: string) =>
  `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;

export const SUBJECTS = {
  general: 'General',
  audit: 'EchoRegent token audit',
  community: 'Compute & Curiosity',
} as const;

export const nav = [
  { label: 'Research', to: '/research' },
  { label: 'Products', to: '/products' },
  { label: 'Community', to: '/computecuriosity' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;

export const hero = {
  eyebrow: 'Arkadhi Labs',
  lines: ['Building the world’s best', 'self-improving AI models', 'for the edge.'],
  headline: 'Building the world’s best self-improving AI models for the edge.',
  support: 'A research-first AI lab working toward intelligence that improves with experience. Current work: continual-learning experiments and an in-development memory layer for LLM applications.',
  primary: { label: 'Explore our research', to: '/research' },
  secondary: { label: 'Discuss a research collaboration', to: '/contact' },
  pillars: ['Learn', 'Understand', 'Act', 'Aware'],
};

export const mission = {
  missionLabel: 'Our mission',
  mission: 'To build the world’s best self-improving AI models for the edge - through four pillars: Learn, Understand, Act, Aware.',
  visionLabel: 'Our vision',
  vision: 'A world where every device carries a mind that keeps learning, and where the research behind it can come from anywhere.',
  edge: 'The edge means the devices people use every day.',
};

export const questions = {
  heading: 'What should intelligence be able to do?',
  items: [
    { key: 'Learn', q: 'How can a model get better with experience?' },
    { key: 'Understand', q: 'How can it make sense of what it sees?' },
    { key: 'Act', q: 'How can it put what it knows to use?' },
    { key: 'Aware', q: 'How can it recognise what it knows and what it does not?' },
  ],
};

export const framework = {
  heading: 'Learn. Understand. Act. Aware.',
  intro: 'Four parts of the intelligence we are working to build.',
  top: [
    { key: 'Learn', body: 'Gets better with experience.' },
    { key: 'Understand', body: 'Makes sense of what it sees.' },
    { key: 'Act', body: 'Puts what it knows to use.' },
  ],
  base: { key: 'Aware', body: 'Knows what it knows, and what it doesn’t.' },
  caption: 'Awareness is the base beneath Learn, Understand and Act.',
  note: 'This is our research direction, not a list of completed capabilities.',
};

export const research = {
  heading: 'Research before claims.',
  intro: 'We test ideas, share what the evidence supports and make the limits clear.',
  card: {
    title: 'CMP: learning from new experience',
    label: 'Research preprint | July 2026',
    body: 'CMP explores a different way for AI models to learn from new information.',
    finding:
      'In controlled language-learning tests, CMP preserved earlier learning better than the evaluated Transformer baseline.',
    limit: 'The study also reports weaker accuracy on a single task and no improvement in a vision test.',
    scope: 'These results do not establish general model superiority or readiness for everyday devices.',
    cta: { label: 'Read the CMP preprint', href: 'https://arxiv.org/abs/2607.26523' },
  },
};

/**
 * Compact evidence panel for the Research page. Every fact below is taken
 * from the inspected preprint record (arXiv:2607.26523, submitted 29 July
 * 2026); nothing here estimates unpublished numbers. CMP is expanded once
 * as Cognitive Memory Primitive.
 */
export const evidence = {
  heading: 'What the preprint actually shows.',
  paper: 'The Art of Not Forgetting: A Local Learning Architecture for Continual Learning',
  byline: 'Ashmith Atmuri and Yashaswini Rao Bhogarajula · preprint, submitted 29 July 2026',
  href: 'https://arxiv.org/abs/2607.26523',
  rows: [
    { key: 'Mechanism', body: 'Cognitive Memory Primitive (CMP): local learning rules that update without a global backpropagation pass.' },
    { key: 'Setting', body: 'Controlled language-learning tests of continual learning.' },
    { key: 'Baseline', body: 'The evaluated Transformer baseline used in the study.' },
    { key: 'Result', body: 'Lower forgetting (backward transfer) than the baseline; weaker single-task accuracy alongside it.' },
    { key: 'Limit', body: 'A single-domain accuracy gap and a null result in a vision test, reported in the same study.' },
    { key: 'Scope', body: 'Preliminary evidence from one study — not general model superiority and not device readiness.' },
    { key: 'Edge deployment', body: 'Edge deployment evaluation planned. No device runtime, latency, energy or update-cost numbers are claimed.' },
  ],
};

/**
 * Research and collaboration areas with per-area status. Current work and
 * future ambition stay distinct; nothing here implies a tested
 * implementation where none exists.
 */
export const modalities = [
  { key: 'Audio and language', body: 'Speech, language and continual-learning experiments under task-specific constraints.', status: 'Exploratory collaboration' },
  { key: 'Manufacturing and forecasting', body: 'Bounded data-driven modelling problems with a partner and an agreed evaluation.', status: 'Exploratory collaboration' },
  { key: 'Vision and robotics', body: 'Future research and collaboration areas — not validated current offerings.', status: 'Future direction' },
] as const;

/**
 * Who each conversation is for — shown on the Contact page so design
 * partners, edge-model teams and investors each see their next step.
 */
export const audiences = [
  { key: 'Design partners', body: 'Bring a bounded problem, representative data and deployment constraints; jointly define an experiment and success criteria.' },
  { key: 'Custom edge-model teams', body: 'Discuss task, device, latency and memory limits, privacy needs and an evaluation plan. Production readiness is not implied.' },
  { key: 'AI research investors', body: 'Contact the founders for the research direction, evidence, limitations and next experiments. No traction or funding claim is made.' },
] as const;

export const how = {
  heading: 'How we work',
  steps: [
    { name: 'Question', body: 'Start with a question that can be tested.' },
    { name: 'Method', body: 'Decide what evidence would change our view.' },
    { name: 'Experiment', body: 'Build the test and compare the results.' },
    { name: 'Result', body: 'Report what worked and what did not.' },
    { name: 'Evidence', body: 'Check the result before making a wider claim.' },
  ],
};

export const systems = {
  heading: 'Ideas become useful when they can be tested.',
  body: 'We use prototypes to connect research questions with problems people face.',
  diagram: ['Question', 'Experiment', 'Prototype', 'Feedback'],
};

export const echoHome = {
  label: 'Product in development',
  heading: 'EchoRegent',
  description: 'A token management layer for AI applications.',
  body: 'We are building EchoRegent to reduce the context sent to language models while checking the effect on output quality.',
  offer: 'Start with a free token audit to see where your application may be using more tokens than it needs.',
  cta: 'Request a token audit',
  more: 'Learn more about EchoRegent',
};

export const communityHome = {
  heading: 'Compute & Curiosity',
  body: 'An AI community hosted by Arkadhi Labs for people who research, build, use or want to understand AI.',
  support: 'Explore papers, exchange ideas and learn through real work.',
  activities: ['Research discussions', 'Build sessions', 'Shared resources'],
  cta: 'Ask about the community',
  more: 'About Compute & Curiosity',
};

export const work = {
  heading: 'Work on questions that matter.',
  paths: [
    { key: 'Research', body: 'Bring a question, a paper or an experiment.' },
    { key: 'Engineering', body: 'Help turn research ideas into testable systems.' },
    { key: 'Product', body: 'Talk to us about token use in your AI application.' },
    { key: 'Community', body: 'Learn and build with other people exploring AI.' },
  ],
  cta: 'Start a conversation',
};

export const team = {
  heading: 'The people building Arkadhi',
  people: [
    { name: 'Ashmith Atmuri', role: 'Co-founder | Product and company direction' },
    { name: 'Yashaswini Rao Bhogarajula', role: 'Co-founder | Research direction' },
  ],
};

export const closing = {
  line: 'Building intelligence that improves with experience.',
  heading: 'Start a conversation.',
  body: 'For research, product conversations and opportunities to work with us.',
  cta: 'Email Arkadhi',
};

export const footer = {
  name: 'Arkadhi Labs',
  tagline: 'Learn. Understand. Act. Aware.',
  legal: '© 2026 Arkadhi Labs',
};

export const echoPage = {
  eyebrow: 'EchoRegent by Arkadhi Labs',
  headline: 'Make every token count.',
  subhead: 'A token management layer for teams building AI applications.',
  stage: 'In development. Start with a free token audit.',
  primary: 'Request a free token audit',
  secondary: 'How the audit works',
  problem: {
    heading: 'Longer context can mean a larger bill.',
    body: 'When an application repeatedly sends growing context to a language model, token costs can rise with every interaction.',
    support: 'The first step is to find out which information the task actually needs.',
  },
  building: {
    heading: 'Less unnecessary context. Quality checked.',
    body: 'EchoRegent is being built to reduce unnecessary context before a model call.',
    support: 'We test the impact on outputs rather than treating fewer tokens as success on its own.',
  },
  audit: {
    heading: 'How the audit works',
    steps: [
      { name: 'Start the conversation', body: 'Tell us what your application does and where token costs are growing.' },
      { name: 'Agree on a sample', body: 'We will discuss a small, redacted sample of usage that is suitable to review.' },
      { name: 'Review the findings', body: 'Get a walkthrough of where token use may be reduced and what needs testing.' },
    ],
    walkthrough: 'A 30-minute conversation about your usage, findings and next steps.',
    dataNote: 'Do not send API keys, customer identifiers or confidential conversations in your first message.',
  },
  who: {
    heading: 'Who it is for',
    body: 'Technical founders and engineering teams at AI-first startups and agencies building applications with language models.',
    support: 'Especially teams with rising token costs and no existing token management layer.',
  },
  faq: [
    { q: 'Is EchoRegent available today?', a: 'EchoRegent is in development. Contact us about a token audit and early access.' },
    { q: 'How much will I save?', a: 'It depends on your workload. We do not promise a savings percentage before reviewing it.' },
    { q: 'Will output quality stay the same?', a: 'That needs testing on your tasks. We measure the effect on outputs alongside token use.' },
    { q: 'Do I have to integrate first?', a: 'No integration is needed to start the audit conversation.' },
  ],
  closing: { headline: 'Understand your token spend before changing your stack.', cta: 'Request a free token audit' },
};

export const ccPage = {
  eyebrow: 'Hosted by Arkadhi Labs',
  headline: 'A place to think, build and ask better questions about AI.',
  subhead: 'Compute & Curiosity brings together people who research, build, use or want to understand AI.',
  primary: 'Ask to join',
  secondary: 'What we do',
  who: {
    heading: 'Curiosity is the starting point.',
    body: 'Researchers, engineers, founders, students, business owners and anyone exploring AI are welcome to start a conversation.',
  },
  what: {
    heading: 'What we do',
    items: [
      { key: 'Read together', body: 'Discuss research papers and the questions behind them.' },
      { key: 'Build together', body: 'Explore ideas through small projects and experiments.' },
      { key: 'Share resources', body: 'Exchange useful tools, reading and lessons from real work.' },
      { key: 'Talk openly', body: 'Ask questions and challenge ideas with care.' },
    ],
  },
  events: {
    heading: 'Find out what’s next.',
    body: 'Ask about upcoming sessions and ways to take part.',
    cta: 'Ask about upcoming sessions',
  },
  invite: {
    heading: 'Bring a question. Leave with something to explore.',
    body: 'Tell us what you are curious about and how you would like to take part.',
    cta: 'Email Compute & Curiosity',
  },
  footer: 'Compute & Curiosity | Hosted by Arkadhi Labs',
};

/**
 * Future community sections. Kept as data so they can be switched on once
 * real content exists; only `live: true` entries are ever rendered.
 */
export const ccSections = [
  { id: 'research-discussions', title: 'Research discussions', live: true },
  { id: 'build-sessions', title: 'Build sessions', live: true },
  { id: 'resources', title: 'Shared resources', live: true },
  { id: 'events', title: 'Events', live: false },
  { id: 'paper-clubs', title: 'Paper clubs', live: false },
  { id: 'community-projects', title: 'Community projects', live: false },
  { id: 'learning-material', title: 'Learning material', live: false },
  { id: 'talks', title: 'Talks', live: false },
] as const;

/** Real events go here once confirmed. Empty on purpose: no placeholder dates. */
export interface CCEventRecord {
  title: string;
  date: string;
  time: string;
  timezone: string;
  format: string;
  location: string;
  description: string;
  registrationUrl: string;
}
export const ccEvents: CCEventRecord[] = [];

export const seo = {
  research: { title: 'Research | Arkadhi Labs', description: 'Research before claims: the questions, framework and evidence behind Arkadhi Labs, including a clearly labelled research preprint.' },
  products: { title: 'Products | Arkadhi Labs', description: 'EchoRegent, a token management layer for AI applications, is in development. Request a free token audit.' },
  about: { title: 'About | Arkadhi Labs', description: 'Arkadhi Labs mission, vision and the people building it.' },
  contact: { title: 'Contact | Arkadhi Labs', description: 'Email Arkadhi Labs about research, product conversations and opportunities to work with us.' },
  home: {
    title: 'Arkadhi Labs | Self-improving AI for the edge',
    description:
      'Arkadhi Labs is a research-first AI lab working toward self-improving models for the edge through Learn, Understand, Act and Aware.',
  },
  echo: {
    title: 'EchoRegent | Token management by Arkadhi Labs',
    description:
      'Explore EchoRegent, a token management layer in development, and request a free audit of your AI application’s token use.',
  },
  community: {
    title: 'Compute & Curiosity | An Arkadhi Labs community',
    description:
      'Explore an AI community hosted by Arkadhi Labs for people who research, build, use and want to understand AI.',
  },
};

/**
 * /research page extras. Catalog and thread names come from the original
 * arkadhi.com research index; descriptions are kept neutral and carry no
 * results. Statuses are the site's own plain labels.
 */
export const researchPage = {
  catalog: {
    heading: 'Research catalog',
    intro: 'What we have shared, and what is still being written.',
    items: [
      {
        kind: 'Research preprint',
        status: 'July 2026',
        title: 'CMP: learning from new experience',
        body: 'A different way for AI models to learn from new information. Limits are stated alongside the findings.',
        href: 'https://arxiv.org/abs/2607.26523',
        linkLabel: 'Read the CMP preprint',
      },
      {
        kind: 'Benchmark specification',
        status: 'In preparation',
        title: 'ByteCL',
        body: 'A tokenizer-free, byte-level benchmark for continual learning.',
      },
      {
        kind: 'Systems technical note',
        status: 'In preparation',
        title: 'Selective compute allocation',
        body: 'A technical note on memory reads in architectures that do not use backpropagation.',
      },
      {
        kind: 'Negative result report',
        status: 'In preparation',
        title: 'Stacking non-sparse binding blocks',
        body: 'A report on a diagnosed negative result, shared so others can learn from the failure.',
      },
    ],
  },
  threads: {
    heading: 'Active technical threads',
    intro: 'Directions we are working on. These are research directions, not completed work.',
    items: [
      { key: 'Local plasticity', body: 'Learning rules that update parameters locally, without a global backpropagation pass.' },
      { key: 'Associative memory', body: 'Memory structures that store and retrieve relational codes.' },
      { key: 'Byte-level benchmark', body: 'Evaluating continual learning without subword tokenizer effects.' },
      { key: 'Interpretability traces', body: 'Tools for inspecting how memory and parameter updates behave.' },
    ],
  },
  reading: {
    heading: 'How to read our results',
    intro: 'What a result from us does and does not tell you.',
    items: [
      { key: 'Preprint', body: 'A preprint has not been through peer review.' },
      { key: 'Limits', body: 'We show each result with its limits beside it.' },
      { key: 'Scope', body: 'A result in one setting is not a claim about every setting.' },
      { key: 'Failures', body: 'Negative results are written up too.' },
    ],
    invite: 'Bring a question, a paper or an experiment.',
    cta: 'Start a conversation',
  },
};

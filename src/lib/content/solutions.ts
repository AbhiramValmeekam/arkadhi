/**
 * Solutions content — problem-oriented framing (brief §16).
 *
 * This page does NOT exist on the live site. It is derived from Arkadhi's
 * actual research and product work so nothing here is invented; each thread
 * points at a real program or artifact.
 */

export const solutionsPage = {
  eyebrow: 'Problems We Investigate',
  title: 'The questions behind the systems.',
  intro:
    'We work on problems that are technical, falsifiable, and important enough to deserve a clean protocol. Three threads run through everything in the lab.',
};

export const solutionThreads = [
  {
    number: '01',
    key: 'Understanding',
    question: 'How can a model retain what it learns without overwriting what it already knows?',
    body: 'Global backpropagation updates every parameter against every new input, so new domains overwrite old ones. We investigate local, gradient-free learning rules and sparse relational representations that resist this structurally rather than patching it afterwards.',
    related: 'Local Plasticity · Associative Memory',
    status: 'IN DEVELOPMENT',
    to: '/research#programs',
  },
  {
    number: '02',
    key: 'Building',
    question: 'How should systems remember, reason and act over time?',
    body: 'Most applications today re-send everything and hope the model finds the signal. We build memory infrastructure that decides what carries forward — two-tier associative memory paired with a runtime that reads it efficiently.',
    related: 'EchoRegent · Prism Runtime',
    status: 'VALIDATING',
    to: '/products',
  },
  {
    number: '03',
    key: 'Measuring',
    question: 'How do we know a claim about a model is actually true?',
    body: 'Benchmarks that rely on subword tokenizers bake in vocabulary assumptions and contaminate results across domains. We build evaluation harnesses that remove that bias, and we publish the experiments that failed.',
    related: 'ByteCL · TR-004',
    status: 'VALIDATING',
    to: '/research',
  },
];

export const solutionsOutro = {
  title: 'Bring us the version of the problem that can be measured.',
  body: 'We are most useful when the question is technical, falsifiable, and important enough to deserve a clean protocol.',
  cta: { label: 'Start a Conversation', to: '/work-with-us' },
};

/** Lab content — ported verbatim from arkadhi.com/lab. */

export const labPage = {
  eyebrow: 'The Lab',
  title: 'A research institute for original AI architecture.',
  intro:
    'Arkadhi Labs is built for patient technical work: non-backprop learning rules, associative memory systems, byte-level continual learning evaluation, and field-tested collaboration.',
};

export const operatingModel = {
  heading: 'Closer to a scientific lab than a feature factory.',
  body: 'The lab is organized around durable research programs. We publish our findings, instrument what we build, and prefer narrow falsifiable claims over broad untested positioning.',
  facts: [
    { label: 'Base', value: 'Distributed' },
    { label: 'Mode', value: 'Lab' },
    { label: 'Output', value: 'Papers' },
  ],
  note: 'Our research network connects academic and industry collaborators worldwide — research that can come from anywhere.',
};

export const principles = [
  {
    number: '01',
    title: 'Mechanism before scale',
    body: 'We look for the smallest mechanism that explains the result before spending more compute on raw parameter scaling.',
  },
  {
    number: '02',
    title: 'Evidence before narrative',
    body: 'Claims need baseline protocols, multi-seed ablations, domain-order controls, and transparent disclosure of failure modes.',
  },
  {
    number: '03',
    title: 'Open legible artifacts',
    body: 'Research should leave behind executable tools, inspectable trace dashboards, and records other researchers can verify.',
  },
];

export const disciplines = [
  {
    key: 'Architecture',
    body: 'Researchers working on local gradient-free learning rules, sparse relational representations, and Hopfield memory systems.',
  },
  {
    key: 'Systems',
    body: 'Engineers turning research mechanisms into execution kernels, trace visualizers, and measurable runtime behavior.',
  },
  {
    key: 'Evaluation',
    body: 'Benchmark designers building ByteCL and contamination-resistant evaluation harnesses.',
  },
  {
    key: 'Collaborations',
    body: 'Technical partners connecting lab research to enterprise LLM context efficiency and academic replication.',
  },
];

export const labJoin = {
  eyebrow: 'Join Arkadhi Labs',
  title: 'Work with people who care about the method.',
  body: 'We hire researchers and engineers who can turn ambiguity into clean experimental protocols, runnable code, and precise technical writing.',
  cta: { label: 'Explore Open Roles', to: '/lab/careers' },
};

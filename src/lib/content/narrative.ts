/**
 * Homepage narrative content — research-first, no invented results.
 * Statuses mark what each item IS (research / experiment / validation /
 * product); anything unproven reads RESEARCH IN PROGRESS.
 */

export const researchFirst = {
  index: '01',
  label: 'Research first',
  lines: ['RESEARCH', 'FIRST.'],
  body: 'Arkadhi Labs investigates emerging problems in artificial intelligence and intelligent systems — exploring questions, building experiments and turning validated ideas into technology.',
};

export const questions = [
  {
    id: 'Q1',
    text: 'HOW SHOULD AI REMEMBER?',
    note: 'Memory that persists across sessions without drowning the model in context.',
  },
  {
    id: 'Q2',
    text: 'WHAT SHOULD AN INTELLIGENT SYSTEM RETAIN?',
    note: 'Separating signal worth carrying forward from tokens worth dropping.',
  },
  {
    id: 'Q3',
    text: 'HOW CAN AGENTS REASON ACROSS TIME?',
    note: 'Plans that survive contact with long sessions, tools, and failure.',
  },
  {
    id: 'Q4',
    text: 'WHAT HAPPENS WHEN CONTEXT BECOMES MEMORY?',
    note: 'The boundary where a prompt ends and a system begins.',
  },
  {
    id: 'Q5',
    text: 'HOW SHOULD HUMANS INTERACT WITH SYSTEMS THAT CONTINUOUSLY LEARN?',
    note: 'Oversight, reversibility, and interfaces people can actually inspect.',
  },
];

export type ResearchStatus = 'EXPLORING' | 'IN DEVELOPMENT' | 'VALIDATING' | 'PUBLISHED';

export const researchAreas: Array<{
  id: string;
  name: string;
  body: string;
  status: ResearchStatus;
}> = [
  {
    id: '01',
    name: 'AI MEMORY',
    body: 'Associative memory layers that let applications retain what matters across sessions — the research line behind EchoRegent.',
    status: 'IN DEVELOPMENT',
  },
  {
    id: '02',
    name: 'INTELLIGENT AGENTS',
    body: 'Agents evaluated on accomplished work: planning, tool use, and recovery when a step fails.',
    status: 'VALIDATING',
  },
  {
    id: '03',
    name: 'CONTEXT & REASONING',
    body: 'How much context a model actually needs, and which reasoning survives compression.',
    status: 'EXPLORING',
  },
  {
    id: '04',
    name: 'HUMAN-AI INTERACTION',
    body: 'Interfaces where systems show their working and every action stays reversible.',
    status: 'EXPLORING',
  },
  {
    id: '05',
    name: 'INTELLIGENT SYSTEMS',
    body: 'Continual-learning architectures that accumulate knowledge instead of forgetting it.',
    status: 'PUBLISHED',
  },
  {
    id: '06',
    name: 'EMERGING INTERFACES',
    body: 'Prototypes for ambient and conversational computing — built to learn from, most of them thrown away.',
    status: 'EXPLORING',
  },
];

export const experimentStages = [
  {
    id: 'S1',
    name: 'QUESTION',
    body: 'A falsifiable question worth months of work. If it cannot fail, it is not research.',
  },
  {
    id: 'S2',
    name: 'METHOD',
    body: 'A clean protocol: baselines, controls, and the conditions under which we would change our minds.',
  },
  {
    id: 'S3',
    name: 'EXPERIMENT',
    body: 'The build itself — prototypes, harnesses, and runs, instrumented from the first day.',
  },
  {
    id: 'S4',
    name: 'RESULT',
    body: 'What the runs actually showed, including the runs that showed nothing.',
  },
  {
    id: 'S5',
    name: 'EVIDENCE',
    body: 'Replication across seeds and orders. Until then: RESEARCH IN PROGRESS.',
  },
];

export const systemFlow = [
  { id: 'D1', name: 'DATA', note: 'Raw material with provenance attached.' },
  { id: 'D2', name: 'CONTEXT', note: 'What the system is holding right now.' },
  { id: 'D3', name: 'MEMORY', note: 'What it decides to keep.' },
  { id: 'D4', name: 'SYSTEM', note: 'Memory, tools, and interface acting as one.' },
];

export const community = {
  index: '07',
  label: 'Community',
  lines: ['COMPUTE', '& CURIOSITY'],
  body: 'Compute & Curiosity is the AI community hosted by Arkadhi Labs — research-led, but not researchers-only. Researchers, engineers, founders, students, and the AI-curious meet around real work.',
  tracks: ['EVENTS', 'LEARNING', 'DISCUSSIONS', 'RESOURCES'],
  cta: { label: 'Explore Compute & Curiosity', to: '/computecuriosity' },
};

export const collaborationPaths = [
  {
    id: 'P1',
    name: 'RESEARCH',
    body: 'Collaborate on questions worth investigating.',
  },
  {
    id: 'P2',
    name: 'ENGINEERING',
    body: 'Build experimental systems with us.',
  },
  {
    id: 'P3',
    name: 'BUSINESS',
    body: 'Bring us a difficult technical problem.',
  },
  {
    id: 'P4',
    name: 'COMMUNITY',
    body: 'Join conversations around AI.',
  },
];

export const finalStatement = {
  index: '09',
  label: 'Final statement',
  first: ['WE DON’T JUST', 'FOLLOW THE FUTURE.'],
  second: ['WE INVESTIGATE IT.'],
};

export const contact = {
  index: '10',
  label: 'Contact',
  lines: ['BUILD', 'WHAT’S', 'NEXT.'],
  items: ['Research.', 'Systems.', 'Experiments.', 'Products.', 'Community.'],
  cta: { label: 'Start a conversation', to: '/work-with-us' },
};

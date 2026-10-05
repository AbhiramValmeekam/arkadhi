/**
 * Compute & Curiosity — community content.
 *
 * ⚠️ NO EXISTING SOURCE. This page does not exist on arkadhi.com, and no
 * community details were supplied. Everything marked NEED_INPUT below is a
 * placeholder and MUST be replaced with verified information before launch.
 * Per brief §33, nothing here is invented.
 */

export const NEED_INPUT = '[NEED INPUT]';

export const communityPage = {
  eyebrow: 'Community',
  name: 'Compute & Curiosity',
  title: 'An AI community hosted by Arkadhi Labs.',
  intro:
    'Research-led, but not researchers-only. A place to use AI, understand how it works, and talk to people building it.',
};

/** Who the community is for — supplied by the team. */
export const audience = [
  'AI researchers',
  'AI engineers',
  'Founders',
  'Business owners',
  'Developers',
  'Students',
  'Curious people',
];

/**
 * Placeholder blocks. Each returns NEED_INPUT until real details exist.
 * The UI renders these as an explicit "awaiting details" state rather than
 * showing fabricated events.
 */
export const communityPending = {
  note: 'Compute & Curiosity is being organised. Event details will be published here once confirmed.',
  blocks: [
    {
      key: 'Format',
      body: NEED_INPUT,
      hint: 'How the community runs — events, cohorts, chat, or a mix.',
    },
    {
      key: 'Cadence',
      body: NEED_INPUT,
      hint: 'How often it meets, and in which timezone.',
    },
    {
      key: 'Location',
      body: NEED_INPUT,
      hint: 'Online-first timing. Keep session timing clear for a distributed network.',
    },
    {
      key: 'Join',
      body: NEED_INPUT,
      hint: 'The actual join mechanism — link, form, or invite.',
    },
  ],
};

/** Upcoming events. Intentionally empty — do not populate with invented events. */
export const events: {
  title: string;
  date: string;
  location: string;
  format: string;
  status: string;
}[] = [];

export const communityOutro = {
  title: 'Interested in Compute & Curiosity?',
  body: 'Tell us what you would want from a research-led AI community.',
  cta: { label: 'Register Interest', to: '/work-with-us' },
};

/**
 * Dedicated /computecuriosity page content. Formats describe HOW the
 * community meets (stable intentions, not scheduled events); dates and
 * venues stay pending until confirmed — never invented.
 */
export const ccPage = {
  eyebrow: 'Community — hosted by Arkadhi Labs',
  title: ['Compute &', 'Curiosity'],
  intro:
    'A research-led AI community that stays welcoming if you are just starting out. Come curious; leave with something you built, measured, or finally understood.',
  what: [
    'Compute & Curiosity is where Arkadhi Labs thinks out loud. Researchers bring open questions, engineers bring half-working prototypes, and newcomers bring the most useful thing of all — fresh eyes.',
    'No background in machine learning is required. Every session starts from zero assumptions and builds up: what we tried, what broke, and what the numbers actually said.',
  ],
  formats: [
    {
      key: 'Paper mornings',
      body: 'One paper, read together slowly. Jargon gets translated on the spot; nobody is expected to have read ahead.',
    },
    {
      key: 'Build nights',
      body: 'Small groups, small models, real runs. Ship a tiny experiment in an evening and compare notes.',
    },
    {
      key: 'Show & tell',
      body: 'Members demo what they made — polished or broken. Broken gets the better discussion.',
    },
    {
      key: 'Ask the lab',
      body: 'Open Q&A with Arkadhi researchers about the work, the methods, and the dead ends.',
    },
  ],
  joinFlow: [
    {
      step: '01',
      title: 'Register interest',
      body: 'Tell us who you are and what you are curious about. One short form, no application essay.',
      to: '/work-with-us',
    },
    {
      step: '02',
      title: 'Get the invite',
      body: 'We confirm the next session and send everything you need — nothing to install in advance.',
      to: '/work-with-us',
    },
    {
      step: '03',
      title: 'Join your first session',
      body: 'Lurk, ask, or build. First-timers get a proper introduction, not a cold lobby.',
      to: '/work-with-us',
    },
    {
      step: '04',
      title: 'Keep coming back',
      body: 'Curiosity compounds. Regulars start bringing their own questions and demos.',
      to: '/work-with-us',
    },
  ],
  starters: [
    {
      key: 'New to AI?',
      body: 'Start with a build night and the lab’s plain-language research summaries.',
      to: '/research',
    },
    {
      key: 'Already building?',
      body: 'Bring a prototype to show & tell, or a measurement puzzle to ask the lab.',
      to: '/products',
    },
    {
      key: 'Doing research?',
      body: 'Read the flagship paper and challenge our evaluation choices in person.',
      to: '/research',
    },
  ],
};

/** Contact content — ported verbatim from arkadhi.com/work-with-us. */

export const contactPage = {
  eyebrow: 'Contact & Collaboration',
  title: 'Bring a precise problem.',
  intro:
    'Use this form to reach the research leadership directly. Inquiries are automatically routed to founder@arkadhi.com.',
};

export const directContact = {
  heading: 'Send a hypothesis, proposal, or evaluation need.',
  body: 'The most useful messages include a short problem statement, what evidence already exists, what you want Arkadhi Labs to evaluate or build, and links to any relevant paper, repository, or CV.',
  label: 'Direct Email Routing',
  routing:
    'Submissions are delivered straight to founder@arkadhi.com. You can also write to us directly at any time.',
};

export const inquiryTypes = [
  {
    key: 'Research',
    body: 'For joint research, paper review, architecture discussions, and academic collaboration.',
  },
  { key: 'Product', body: 'For EchoRegent access, integration questions, and design partnerships.' },
  { key: 'Careers', body: 'For research, systems engineering, and fellowship applications.' },
  { key: 'General', body: 'Anything else worth a precise conversation.' },
];

export const formFields = [
  { name: 'name', label: 'Full Name', required: true, type: 'text' },
  { name: 'email', label: 'Email Address', required: true, type: 'email' },
  { name: 'organization', label: 'Organization / Lab', required: false, type: 'text' },
  { name: 'subject', label: 'Subject', required: true, type: 'text' },
  { name: 'message', label: 'Message', required: true, type: 'textarea' },
  { name: 'link', label: 'Paper, Repo, or CV Link', required: false, type: 'url', optional: true },
];

/**
 * Collaboration tracks — from the homepage "Work With Us" block (brief §21).
 * Kept separate from the contact form so the section can route each track.
 */
export const collaborationTracks = [
  {
    key: 'Research',
    body: 'Collaborate on research questions and experiments.',
    to: '/work-with-us',
  },
  {
    key: 'Engineering',
    body: 'Build experimental systems with us.',
    to: '/work-with-us',
  },
  {
    key: 'Business',
    body: 'Explore a technical problem with Arkadhi.',
    to: '/work-with-us',
  },
  {
    key: 'Community',
    body: 'Join conversations around AI and emerging technology.',
    to: '/community',
  },
];

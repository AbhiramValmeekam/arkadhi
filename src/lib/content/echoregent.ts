/**
 * EchoRegent product page content.
 *
 * Audience groups supplied by the team (GTM brief). Claims remain in
 * products.ts `productClaims` — held pending the §1.1 verification decision.
 */

export const echoRegentPage = {
  eyebrow: 'Product',
  name: 'EchoRegent',
  badge: 'WAITLIST',
  title: ['Memory infrastructure', 'for LLM applications.'],
  lede: 'EchoRegent explores a memory layer that helps AI applications retain useful information while reducing the context passed into language models.',
  problem:
    'Most LLM applications send the entire conversation on every turn. As sessions grow, that means paying for tokens that carry no signal, and pushing the model toward the middle of a long context where attention is weakest.',
  approach:
    'EchoRegent sits between your application and the model. It decides what is worth carrying forward, keeps it in an associative memory, and passes a reduced context to the model — without changing your integration beyond the base URL.',
  cta: { label: 'Join the waitlist', to: '/work-with-us' },
};

/** GTM audience groups — supplied by the team, verbatim in substance. */
export const audiences = [
  {
    key: 'AI-native startups',
    body: 'Teams with chat or agent products where founders and CTOs own the decision and engineers do the integration.',
  },
  {
    key: 'SaaS companies adding AI',
    body: 'Products adding AI support or copilots, where engineering and product leaders own cost and implementation.',
  },
  {
    key: 'AI agencies & dev shops',
    body: 'Teams deploying LLM features across multiple client projects at once.',
  },
  {
    key: 'Enterprise internal-AI teams',
    body: 'Where data handling, security and deployment requirements are settled before any savings claim matters.',
  },
  {
    key: 'Indie developers',
    body: 'Small product teams for whom a fast first-use experience matters more than a sales call.',
  },
];

/**
 * Demo area. What can run now vs what needs backend work (flagged honestly).
 *
 * RUNS NOW: the shell, loading / empty / error states, and a stubbed client.
 * NEEDS BACKEND: the classifier + compressor behind a deployed endpoint.
 * Until that exists, this ships visibly labelled as a preview — never canned
 * output presented as a real-time demo.
 */
export const demoSpec = {
  heading: 'See it compress.',
  statusLabel: 'Preview — not connected to a live endpoint',
  note: 'This interface is wired to a stubbed client. The classifier and compressor behind it require a deployed inference endpoint, which is not yet public.',
  states: {
    idle: 'Submit a passage to run it through the pipeline.',
    loading: 'Classifying domain and intent…',
    empty: 'No input provided.',
    error: 'Pipeline unreachable. The endpoint is not connected in this build.',
    success: 'Pipeline complete.',
  },
};

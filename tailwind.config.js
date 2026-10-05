/** Arkadhi Labs — design tokens.
 *  Evolved from the existing arkadhi.com brand system. One addition: a single
 *  condensed display weight for the hero nameplate, and nothing else.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',      // Pure White
        ink: '#0B1F3C',        // Core Navy
        signal: '#14999C',     // Tech Teal
        deep: '#0B1F3C',       // Core Navy
        muted: '#8F949B',       // Cool Gray
        hush: '#8F949B',        // Cool Gray
        'paper-dim': '#FFFFFF', // Pure White
        // ── Arkadhi Labs dark-editorial identity (narrative site) ──
        ivory: '#F4F1EA',      // hero field + light breaks
        abyss: '#10131A',      // legacy deep
        navy: '#0B1020',        // legacy lab
        violet: '#6C4DFF',     // legacy signal
        mint: '#A7FFEA',        // legacy sparing signal
        fog: '#737783',         // legacy muted
        rule: '#D8D5CE',        // legacy hairline
        coal: '#0C0C0B',        // legacy dark room
        bone: '#EDEAE0',        // legacy type on coal
        acid: '#D9FF3D',        // legacy signal
        smoke: '#8A877F',       // legacy muted on coal
        graphite: '#171714',    // legacy raised surfaces
        blaze: '#FF4D00',      // legacy signal
        stone: '#8F949B',       // Cool Gray
        surface: '#F7F7F2',     // optional paper surface for faint notebook sections
        // ── Arkadhi brand palette: Navy / White / Teal / Gray / Coral ──
        // (token names kept from the earlier palette so no markup changes)
        peach: '#FC7A5C',       // Insight Coral — curiosity / climax
        apricot: '#8F949B',     // Cool Gray — experimentation
        warmivory: '#FFFFFF',   // Pure White — foundation
        skyblue: '#14999C',     // Tech Teal — systems / computation
        charcoal: '#0B1F3C',    // Core Navy — type, buttons, dark fields
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Narrative serif — used only for story-scene display type (hero lines,
        // scene headings, pull statements, numerals). Keeps the editorial
        // character of the reference template without touching brand UI type.
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        // Nameplate only — the condensed caps the hero wordmark is set in.
        // Never used for UI or body type; `display` stays the brand face.
        mark: ['"Bebas Neue"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // The ratio is the design: display runs ~50× the metadata size.
        meta: ['0.6875rem', { lineHeight: '1.7', letterSpacing: '0.14em' }],
        'meta-lg': ['0.75rem', { lineHeight: '1.7', letterSpacing: '0.12em' }],
        hero: ['clamp(3.25rem, 10.5vw, 10.5rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        section: ['clamp(2.25rem, 6vw, 5.5rem)', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
        sub: ['clamp(1.375rem, 2.2vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.0625rem, 1.35vw, 1.1875rem)', { lineHeight: '1.62' }],
        // Story-scene display scale — the oversized serif moments.
        'scene-xl': ['clamp(2.75rem, 8.5vw, 8.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'scene-lg': ['clamp(1.75rem, 4vw, 3.1rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'scene-quote': ['clamp(1.1rem, 1.9vw, 1.6rem)', { lineHeight: '1.38', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        shell: '1600px',
        text: '62ch',
      },
      transitionTimingFunction: {
        // Deliberate, expensive-feeling easing. No bounce.
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
        precise: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-rise': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise .7s cubic-bezier(0.22,1,0.36,1) both',
        pulse: 'pulse 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
      },
    },
  },
  plugins: [],
};

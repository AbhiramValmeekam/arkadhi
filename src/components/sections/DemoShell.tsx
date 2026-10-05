import { useState } from 'react';
import { demoSpec } from '@/lib/content/echoregent';

type Phase = 'idle' | 'loading' | 'error' | 'empty';

/**
 * EchoRegent demo shell.
 *
 * IMPORTANT: this is wired to a STUBBED client, not a live endpoint. It exists
 * so the real classifier/compressor can be dropped in later as a config change
 * rather than a rebuild — and it is labelled as a preview so nobody mistakes it
 * for a working benchmark. It never renders canned output as if real.
 */
export function DemoShell() {
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');

  const run = () => {
    if (!input.trim()) {
      setPhase('empty');
      return;
    }
    setPhase('loading');
    // No endpoint is connected in this build — surface that honestly.
    window.setTimeout(() => setPhase('error'), 900);
  };

  return (
    <div className="border border-[var(--line)] bg-apricot/50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
        <span className="font-mono text-meta uppercase tracking-[0.14em] text-ink">Pipeline</span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal">
          <span className="status-dot status-dot--idle" />
          {demoSpec.statusLabel}
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        {/* Input */}
        <div className="border-b border-[var(--line)] p-5 md:border-b-0 md:border-r">
          <label htmlFor="demo-input" className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            Input passage
          </label>
          <textarea
            id="demo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            placeholder="Paste a conversation turn or support ticket…"
            className="mt-3 w-full resize-none border border-[var(--line)] bg-warmivory p-3.5 font-mono text-[12.5px] leading-relaxed text-ink placeholder:text-hush focus:border-charcoal focus:outline-none"
          />
          <button
            type="button"
            onClick={run}
            disabled={phase === 'loading'}
            className="btn mt-4 w-full justify-center disabled:opacity-50"
          >
            {phase === 'loading' ? 'Running…' : 'Compress & Classify →'}
          </button>
        </div>

        {/* Output */}
        <div className="p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Output</span>

          <div className="mt-3 min-h-[168px] border border-[var(--line)] bg-warmivory p-3.5">
            {phase === 'idle' && (
              <p className="font-mono text-[12.5px] leading-relaxed text-hush">{demoSpec.states.idle}</p>
            )}

            {phase === 'loading' && (
              <div className="space-y-2.5" aria-live="polite">
                <p className="font-mono text-[12.5px] text-muted">{demoSpec.states.loading}</p>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-3 animate-pulse bg-ink/10"
                    style={{ width: `${72 - i * 16}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {phase === 'empty' && (
              <p className="font-mono text-[12.5px] text-ink/70" role="alert">
                {demoSpec.states.empty}
              </p>
            )}

            {phase === 'error' && (
              <div role="alert">
                <p className="font-mono text-[12.5px] leading-relaxed text-ink/70">{demoSpec.states.error}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-hush">
                  Requires a deployed inference endpoint
                </p>
              </div>
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-hush">
            {demoSpec.note}
          </p>
        </div>
      </div>
    </div>
  );
}

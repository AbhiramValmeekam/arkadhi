import { Link } from 'react-router-dom';
import { Field } from '@/components/motion/Field';

export function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <Field opacity={0.3} density={20} />
      </div>
      <div className="shell relative">
        <p className="t-eyebrow text-charcoal">404</p>
        <h1 className="t-section mt-6 max-w-[16ch]">This page isn't in the index.</h1>
        <p className="mt-7 max-w-text text-lede text-ink/70">
          The route you followed does not exist. The research index is a reasonable place to restart.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/" className="btn">
            Back to home <span aria-hidden="true">→</span>
          </Link>
          <Link to="/research" className="btn-ghost">
            Research index
          </Link>
        </div>
      </div>
    </section>
  );
}

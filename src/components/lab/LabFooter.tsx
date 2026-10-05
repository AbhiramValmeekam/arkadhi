import { Logo } from '@/components/navigation/Logo';
import { footer } from '@/lib/content/pack';

export function LabFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-10">
        <div className="flex items-center gap-3">
          <Logo showWord={false} tone="paper" />
          <span className="font-mono text-[12px] uppercase tracking-[0.3em]">{footer.name}</span>
        </div>
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-white/85">{footer.tagline}</p>
        <p className="font-mono text-[12px] tracking-[0.1em] text-white/75">{footer.legal}</p>
      </div>
    </footer>
  );
}

import { site } from '@/lib/content/site';
import { ArkMark } from '@/components/lab/ArkMark';

/**
 * Wordmark + the real Arkadhi icon.
 *
 * The mark is the live arkadhi.com "A" line construction (see lab/ArkMark),
 * rendered in currentColor so it adapts to light and dark chrome.
 */
export function Logo({
  className = '',
  tone = 'ink',
  showWord = true,
}: {
  className?: string;
  tone?: 'ink' | 'paper';
  showWord?: boolean;
}) {
  const stroke = tone === 'paper' ? '#FAF7F2' : '#121820';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} style={{ color: stroke }}>
      <ArkMark className="h-[22px] w-[22px] shrink-0" />
      {showWord && (
        <span className="font-display text-[13px] font-bold uppercase tracking-[0.22em]">
          {site.shortName}
        </span>
      )}
    </span>
  );
}

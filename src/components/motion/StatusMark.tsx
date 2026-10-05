import { statusCopy, type Status } from '@/lib/content/research';

/**
 * Status marker — the trust primitive (brief §15).
 *
 * Uses the site's own existing vocabulary (PUBLISHED / IN PREPARATION) plus
 * three added terms for non-paper work. Only PUBLISHED is accented; everything
 * in flight stays visually quieter, so the distinction is legible at a glance.
 */
export function StatusMark({
  status,
  className = '',
  tone = 'light',
}: {
  status: Status;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const isPublished = status === 'PUBLISHED';
  const isIdle = status === 'EXPLORING' || status === 'IN PREPARATION';

  return (
    <span
      className={`status ${tone === 'dark' ? 'text-white/60' : 'text-muted'} ${className}`}
      title={statusCopy[status]}
    >
      <span
        className={`status-dot ${isPublished ? '' : isIdle ? 'status-dot--idle' : 'bg-charcoal/50'} ${
          isPublished ? 'animate-pulse' : ''
        }`}
      />
      {statusCopy[status]}
    </span>
  );
}

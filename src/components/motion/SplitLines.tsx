import { motion } from 'framer-motion';
import { EASE, DUR } from '@/lib/motion/variants';

/**
 * Line-mask reveal. Each line sits inside its own clipping box and rises into
 * place. Used for hero and section headings — this is the L4 entrance.
 */
export function SplitLines({
  lines,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.075,
  duration = DUR.hero,
}: {
  lines: readonly string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="shown"
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            variants={{
              hidden: { y: '110%' },
              shown: { y: '0%', transition: { duration, ease: EASE.calm } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

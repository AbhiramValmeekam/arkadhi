import { Band, Title } from './parts';
import { Reveal } from '@/components/motion/Reveal';
import { team } from '@/lib/content/pack';

/** Text-only until approved founder photos exist. */
export function Team({ index = '11' }: { index?: string }) {
  return (
    <Band id="team" tone="gray" index={index} label="About">
      <Title lines={['THE PEOPLE', 'BUILDING ARKADHI']} />
      <p className="sr-only">{team.heading}</p>
      <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
        {team.people.map((p, i) => (
          <li key={p.name} className="border border-charcoal/40 p-7 md:p-10">
            <Reveal delay={i * 0.06}>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-4 text-[17px] leading-relaxed">{p.role}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Band>
  );
}

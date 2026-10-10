import { PageHead } from '@/components/home/parts';
import { Mission } from '@/components/home/Mission';
import { Team } from '@/components/home/Team';
import { WorkWithUs } from '@/components/home/WorkWithUs';
import { mission } from '@/lib/content/pack';

/** /about — mission, vision, the people, and ways to work with us. */
export function About() {
  return (
    <>
      <PageHead eyebrow="About" lines={['ABOUT', 'ARKADHI LABS']} intro={mission.edge} />
      <Mission />
      <Team index="03" />
      <WorkWithUs index="04" />
    </>
  );
}

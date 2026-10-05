import { Hero } from '@/components/sections/Hero';
import { Mission } from '@/components/home/Mission';
import { Questions } from '@/components/home/Questions';
import { Pillars } from '@/components/home/Pillars';
import { Evidence } from '@/components/home/Evidence';
import { HowWeWork } from '@/components/home/HowWeWork';
import { Systems } from '@/components/home/Systems';
import { EchoRegentSection } from '@/components/home/EchoRegentSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { WorkWithUs } from '@/components/home/WorkWithUs';
import { Team } from '@/components/home/Team';
import { Closing } from '@/components/home/Closing';

/**
 * Homepage order (approved content pack):
 * Hero (locked title) → Mission + Vision → Questions → Four pillars →
 * Research + evidence → How we work → Research to systems → EchoRegent →
 * Compute & Curiosity → Work with us → Team → Closing + Contact.
 */
export function Home() {
  return (
    <>
      <div className="relative z-10">
        <Hero />
      </div>
      <div className="relative z-10">
        <Mission />
        <Questions />
        <Pillars />
        <Evidence more />
        <HowWeWork />
        <Systems />
        <EchoRegentSection />
        <CommunitySection />
        <WorkWithUs />
        <Team />
        <Closing />
      </div>
    </>
  );
}

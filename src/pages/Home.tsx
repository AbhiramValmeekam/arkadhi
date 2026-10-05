import { Hero } from '@/components/sections/Hero';
import { HeroTransition } from '@/components/lab/HeroTransition';
import { ResearchFirst } from '@/components/lab/ResearchFirst';
import { Questions } from '@/components/lab/Questions';
import { Research } from '@/components/lab/Research';
import { Experiments } from '@/components/lab/Experiments';
import { Systems } from '@/components/lab/Systems';
import { EchoRegent } from '@/components/lab/EchoRegent';
import { Community } from '@/components/lab/Community';
import { Collaboration } from '@/components/lab/Collaborate';
import { FinalStatement } from '@/components/lab/FinalStatement';
import { Contact } from '@/components/lab/Contact';

/**
 * Homepage narrative — one continuous research environment:
 *
 * HERO (locked title) → transition → RESEARCH FIRST (peach) → QUESTIONS
 * (ivory) → RESEARCH (sky) → EXPERIMENTS (apricot) → SYSTEMS (ivory) →
 * ECHOREGENT (ivory) → COMMUNITY (peach) → COLLABORATION (ivory) →
 * FINAL (peach) → CONTACT (charcoal).
 */
export function Home() {
  return (
    <>
      <div className="relative z-10">
        <Hero />
      </div>

      <div id="work" className="relative z-10 scroll-mt-24">
        <HeroTransition />
        <ResearchFirst />
        <Questions />
        <Research />
        <Experiments />
        <Systems />
        <EchoRegent />
        <Community />
        <Collaboration />
        <FinalStatement />
        <Contact />
      </div>
    </>
  );
}

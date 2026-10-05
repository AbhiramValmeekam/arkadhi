import { PageHead } from '@/components/home/parts';
import { Evidence } from '@/components/home/Evidence';
import { ResearchCatalog } from '@/components/home/ResearchCatalog';
import { ResearchThreads } from '@/components/home/ResearchThreads';
import { HowWeWork } from '@/components/home/HowWeWork';
import { ResearchReading } from '@/components/home/ResearchReading';
import { research } from '@/lib/content/pack';

/** /research — evidence first, then the catalog, active threads, method and the wider field. */
export function Research() {
  return (
    <>
      <PageHead eyebrow="Research" lines={['RESEARCH', 'BEFORE CLAIMS.']} intro={research.intro} />
      <Evidence index="01" />
      <ResearchCatalog />
      <ResearchThreads />
      <HowWeWork index="04" />
      <ResearchReading />
    </>
  );
}

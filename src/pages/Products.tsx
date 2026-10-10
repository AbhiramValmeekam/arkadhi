import { PageHead } from '@/components/home/parts';
import { EchoRegentSection } from '@/components/home/EchoRegentSection';
import { echoHome } from '@/lib/content/pack';

/** /products — one product, in development. */
export function Products() {
  return (
    <>
      <PageHead eyebrow="Products" lines={['PRODUCTS']} intro={echoHome.label} />
      <EchoRegentSection index="01" />
    </>
  );
}

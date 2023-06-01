import Head from 'next/head';
import { Container } from '@/components/Layout'
import { metaConfig } from '@/config/metaConfig';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found | {metaConfig.companyName}</title>
      </Head>
      <section className="relative overflow-hidden">
        <Container>
          <div className="relative z-10 mx-auto flex h-[70vh] max-w-none flex-col items-center justify-center gap-y-4 sm:max-w-xl lg:max-w-3xl">
            <div className="mx-auto max-w-md xl:max-w-lg mb-24 rounded-xl backdrop-blur-sm p-6 bg-white/10">
              <h2 className="font-sans mt-4 text-lg text-blue-900 sm:text-xl">404 error</h2>
              <h1 className="mt-4 text-4xl text-blue-900 sm:text-5xl">Page not found...</h1>
              <p className="mt-6">
                Sorry, the page you are looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const { useNavbar } = await import('@/hooks/useNavbar');
  const navBarData = await useNavbar();

  return {
    props: {
      navBarData,
    },
    revalidate: 10,
  };
}
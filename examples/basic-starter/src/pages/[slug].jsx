import { Hero } from '@/components/Hero';
import Head from 'next/head';
import { Blocks } from 'cloakwp';
import stripHtml from '@/utils/stripHtml';
import { metaConfig } from '@/config/metaConfig';

export default function Page({ data }) {
  const metatitle = `${data?.title?.rendered || "Page"} | ${metaConfig.companyName}`

  return (
    <>
      <Head>
        <title>{metatitle}</title>
        <meta
          name="description"
          content={stripHtml(data?.excerpt?.rendered)}
        />
      </Head>
      <div>
        <Hero heroData={data.acf} />
        <div>
          <Blocks data={data.blocksData} />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const { usePage, usePreview } = await import('cloakwp');
  const { useNavbar } = await import('@/hooks/useNavbar');
  
  const page = await usePage({slug: context.params.slug});
  const navBarData = await useNavbar();
  let data = page.data;

  let preview = {};
  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await usePreview(previewData);
    data = preview.data;
  }

  const notFound = !data;

  return {
    props: {
      data,
      navBarData,
      preview: context.preview ?? false,
      previewParams: preview.context ?? null,
    },
    notFound,
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { usePaths } = await import('cloakwp')
  let paths = await usePaths()
  const excludePaths = ['/blog', '/']
  paths = paths.filter(path => !excludePaths.includes(path))

  return {
    paths,
    fallback: 'blocking', // ensures that when new pages get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  }
}
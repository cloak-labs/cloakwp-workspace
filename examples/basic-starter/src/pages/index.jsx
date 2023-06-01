import Head from 'next/head';
import stripHtml from '@/utils/stripHtml';
import { Blocks } from 'cloakwp';
import { metaConfig } from '@/config/metaConfig';

export default function Home({ data }) {
  const metatitle = `${data?.title?.rendered || "Home"} | ${metaConfig.companyName}`

  return (
    <>
      <Head>
        <title>{metatitle}</title>
        <meta
          name="description"
          content={stripHtml(data?.excerpt?.rendered)}
        />
      </Head>
      <Blocks data={data.blocksData} />
    </>
  )
}

export async function getStaticProps(context) {
  const { usePage, usePreview } = await import('cloakwp');
  const { useNavbar } = await import('@/hooks/useNavbar');
  
  const page = await usePage({slug: '/'});
  const navBarData = await useNavbar();
  let data = page.data;

  let preview = {};

  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await usePreview(previewData);
    data = preview.data;
  }

  return {
    props: {
      data,
      navBarData,
      preview: isPreview ?? false,
      previewParams: preview.context ?? null,
    },
    revalidate: 10,
  };
}
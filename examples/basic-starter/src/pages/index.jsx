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
  const { getPage, getPreviewData, getMenus } = await import('cloakwp');
  
  const page = await getPage({slug: '/'});
  const navBarData = await getMenus('header-nav');
  let data = page.data;

  let preview = {};

  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await getPreviewData(previewData);
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
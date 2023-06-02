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
  const { getPage, getPreviewData, getMenus } = await import('cloakwp');
  
  const page = await getPage({slug: context.params.slug});
  const navBarData = await getMenus('header-nav');
  let data = page.data;

  let preview = {};
  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await getPreviewData(previewData);
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
  const { getPaths } = await import('cloakwp')
  let paths = await getPaths()
  const excludePaths = ['/blog', '/']
  paths = paths.filter(path => !excludePaths.includes(path))

  return {
    paths,
    fallback: 'blocking', // ensures that when new pages get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  }
}
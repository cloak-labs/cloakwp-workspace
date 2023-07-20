import { Blocks } from 'cloakwp';

export default function Page({ pageData }) {
  return <Blocks data={pageData?.blocksData} />
}

export async function getStaticProps(context) {
  const { getPage, getPreviewData, getMenus } = await import('cloakwp');
  console.log({slug: context.params.slug})
  let { data } = await getPage({slug: context.params.slug});
  const navBarData = await getMenus('header-nav');

  let preview = {};
  const { preview: isPreview, previewData } = context
  
  if (isPreview) {
    preview = await getPreviewData(previewData);
    data = preview.data;
  }

  const notFound = !data;

  return {
    props: {
      pageData: data,
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
  console.log({paths})
  // const excludePaths = ['/blog', '/']
  // paths = paths.filter(path => !excludePaths.includes(path))

  return {
    paths,
    fallback: 'blocking', // ensures that when new pages get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  }
}
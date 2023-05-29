import Head from 'next/head';
import parse from 'html-react-parser';
import stripHtml from '@/utils/stripHtml';
import { Blocks, deepMerge } from 'cloakwp';
import { Hero } from '@/components/Hero';
import { Container } from '@/components/Layout';
import myBlockConfig from '@/config/myBlockConfig';
import { metaConfig } from '@/config/metaConfig';


export default function BlogSinglePost({data}) {

  let heroData = { // TODO: adjust blog post hero settings
    hero_style: 'tertiary',
    tertiary_background_color: 'navy',
    alignment: 'center',
    eyebrow: 'THE BLOG',
    h1: data?.title?.rendered,
    subtitle: parse(stripHtml(data?.excerpt?.rendered)),
    display_hero: true
  }

  const metatitle = `${data?.title?.rendered?.replaceAll('&#8217;', '\'') || "Blog Post"} | ${metaConfig.companyName}`

  return (
    <>
      <Head>
        <title>{metatitle}</title>
        <meta
          name="description"
          content={stripHtml(data?.excerpt?.rendered)}
        />
      </Head>
      <Hero heroData={heroData} />
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-24">
        <Blocks
          data={data?.blocksData}
          container={({block}) => <Container className="relative" innerClassName="max-w-3xl lg:max-w-4xl">{block.rendered}</Container>}
          blockConfig={deepMerge(
            myBlockConfig,
            {
              'core/image': {
                props: {
                  className: 'mb-5'
                }
              },
              'acf/cardsgrid': {
                container: ({block}) => <Container className="relative" innerClassName="max-w-5xl lg:max-w-6xl">{block.rendered}</Container>
              },
            }
          )}
        />
      </section>
    </>
  )
}

export async function getStaticProps(context) {
  const { usePreview, usePost } = await import('cloakwp');
  const { useNavbar } = await import('@/hooks/useNavbar');

  const page = await usePost({slug: context.params.slug});
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
  const { usePaths } = await import('cloakwp');
  const paths = await usePaths('posts');

  return {
    paths: paths,
    fallback: 'blocking', // ensures that when new posts get created in WP, they get server-side rendered the first time a user tries to visit them (and then they get statically served from there on out)
  };
}
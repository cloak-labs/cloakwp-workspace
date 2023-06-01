import Head from 'next/head';
import formatDate from '@/utils/formatDate';
import parse from 'html-react-parser';
import stripHtml from '@/utils/stripHtml';
import { Blocks } from 'cloakwp';
import { motion } from 'framer-motion';
import { motionContainer, motionItem } from '@/utils/motion';
import { Container } from '@/components/Layout';
import { Card } from '@/components/Cards'
import { Hero } from '@/components/Hero';
import { metaConfig } from '@/config/metaConfig';

export default function BlogArchive({ data, blogPosts }) {
    
    const metatitle = `${data?.title?.rendered || "Blog"} | ${metaConfig.companyName}`

    return (
      <>
        <Head>
          <title>{metatitle}</title>
          <meta
            name="description"
            content={stripHtml(data?.excerpt?.rendered)}
          />
        </Head>
        <Hero heroData={data.acf} />
        <Blocks data={data?.blocksData} />
        <motion.section
          className="relative overflow-hidden min-h-screen"
          variant={motionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Container className="mt-12 mb-16" innerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6" >
            {blogPosts?.map(({title, date, excerpt, featured_image, backgroundColor, slug}, i) => (
              <Card
                title={parse(title.rendered)}
                date={formatDate(date)}
                description={parse(excerpt.rendered)}
                image={featured_image.medium}
                bgColor={backgroundColor}
                href={`/${slug}`}
                cta="Read More"
                key={i}
              />
            ))}
          </Container>
        </motion.section>
      </>
    )
}

export async function getStaticProps(context) {
  const { usePreview, usePage, usePosts } = await import('cloakwp');
  const { useNavbar } = await import('@/hooks/useNavbar');

  const page = await usePage({ slug: 'blog' }); // manually pass in slug because context.params.page != '/blog' because it's an index file
  const navBarData = await useNavbar();
  const blogPosts = await usePosts('posts');
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
      blogPosts,
      preview: context.preview ?? false,
      previewParams: context.params ?? null,
    },
    revalidate: 10,
  };
}

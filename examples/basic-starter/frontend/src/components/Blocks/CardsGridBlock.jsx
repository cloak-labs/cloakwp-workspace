import { CardsGrid } from '@/components/Cards';
import { useBlockStyleBuilder } from 'cloakwp';
import formatDate from '@/utils/formatDate';

export function CardsGridBlock({ block }) {
  const { styles } = useBlockStyleBuilder(block.data);
  const {
    cta_text,
    data_type,
    card_pages,
    num_columns,
    manual_cards,
    post_meta = [],
  } = block.data.attrs.data;
  const { backgroundColor } = block.data.attrs;

  let posts = [];
  if (data_type == '0' || data_type == 0) {
    // card data = pages selected with ACF relationship field

    posts = card_pages?.value?.map((page) => {
      return {
        id: page.id,
        imageUrl: page.featured_image,
        href: page.pathname || `/${page.slug || page.post_name}`,
        title: page.post_title,
        description: page.post_excerpt,
        post_date: formatDate(page.post_date),
        post_modified: formatDate(page.post_modified),
        post_author: page.post_author
      };
    });

  } else if (data_type == '1' || data_type == 1) {
    // card data was manually entered

    posts = manual_cards?.value?.map((card) => {
      return {
        id: card.title,
        imageUrl: card.image.src,
        href: card.pathname,
        title: card.title,
        date: card.post_date,
        description: card.description,
        cta: card.cta_text,
      };
    });

  }

  return (
    <CardsGrid
      cta={cta_text}
      cols={num_columns}
      posts={posts}
      limit={posts?.length}
      bgColor={backgroundColor}
      style={styles}
      postMeta={post_meta}
    />
  );
}

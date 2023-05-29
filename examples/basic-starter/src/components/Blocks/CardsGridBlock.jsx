import { CardsGrid } from '@/components/Cards';
import { useBlockStyleBuilder } from 'cloakwp';
import formatDate from '@/utils/formatDate';


export function CardsGridBlock({block}) {
  const { classes, styles } = useBlockStyleBuilder(block.data);
  const { button_text, data_type, card_pages, num_columns, manual_cards } = block.data.attrs.data;
  const { backgroundColor}  = block.data.attrs;
    
  let posts = []
  if(data_type == '0' || data_type == 0){ // card data = pages selected with ACF relationship field
    posts = card_pages?.value?.map(page => {
      return {
        id: page.id,
        imageUrl: page.featured_image,
        href: `/${page.slug || page.post_name}`,
        title: page.post_title,
        date: formatDate(page.post_date),
        description: page.post_excerpt,
      }
    })
  }else if(data_type == '1' || data_type == 1){ // card data was manually entered
    posts = manual_cards?.value?.map(card => {
      return {
        id: card.title,
        imageUrl: card.image.src,
        href: card.url,
        title: card.title,
        date: card.post_date,
        description: card.description,
        cta: card.cta_text
      }
    })
  }

  return (
    <div style={styles}>
      <CardsGrid
        cta={button_text}
        cols={num_columns}
        posts={posts}
        limit={posts?.length}
        bgColor={backgroundColor}
      />
    </div>
  )
}
import { Fragment } from 'react';
import { Card } from '@/components/Cards';
import classNames from '@/utils/classNames';

export function CardsGrid({ 
  posts, // array of post data
  cta, // optional cta text to use on all cards
  limit = 3, // the maximum amount of cards to render
  cols = 3, // choose between 2 and 3 column layout
  bgColor
}) {

  return (
    <div className={classNames(
      "relative z-10 mx-auto grid gap-5 max-w-sm sm:max-w-none",
      cols == 3 && 'xmd:grid-cols-3 sm:grid-cols-2',
      cols == 2 && 'md:grid-cols-2',
    )}>
      {posts?.slice(0, Math.min(limit, posts.length))?.map((post, i) => (
        <Fragment key={post.id || i}>
          <Card
            image={post.imageUrl}
            href={post.href}
            title={post.title}
            {...(post.date ? {date: post.date} : {})}
            {...(post.cta? {cta: post.cta} : cta ? {cta} : {})}
            description={post.description}
            bgColor={bgColor}
          />
        </Fragment>
      ))}
    </div>
  );
}

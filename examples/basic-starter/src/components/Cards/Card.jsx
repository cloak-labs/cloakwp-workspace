import Image from 'next/future/image';
import classNames from '@/utils/classNames';
import { HeroIcon } from '@/components/Icons';
import { Link } from '@/components/Link';

export function Card({
  title,
  image,
  description,
  className,
  backgroundColor,
  href,
  cta,
  post,
  postMeta,
}) {
  const themeName = {
    white: 'lightBg',
    'gray-50': 'lightBg',
    'gray-300': 'lightBg',
    'gray-600': 'darkBg',
    'gray-700': 'darkBg',
    'gray-800': 'darkBg',
    'gray-900': 'darkBg',
    'gray-950': 'blackBg',
  }[backgroundColor]; // user-selected backgroundColor determines the color theme

  const themes = {
    lightBg: {
      primaryTextColor: 'text-gray-800 group-hover:text-blue-700',
      secondaryTextColor: 'text-gray-600',
      ctaTextColor: 'text-blue-600 hover:text-blue-700',
      metaTextColor: 'text-gray-400',
    },
    darkBg: {
      primaryTextColor: 'text-gray-200',
      secondaryTextColor: 'text-gray-50',
    },
    blackBg: (themes) => ({
      ...themes.darkBg,
    }),
  };

  const defaultTheme = 'lightBg';
  const theme = themes[themeName || defaultTheme];
  const { primaryTextColor, secondaryTextColor, ctaTextColor, metaTextColor } =
    typeof theme == 'function' ? theme(themes) : theme;

  description = "Lorem ipsum item asam ipus. Lorem ipsum item asam ipus. Lorem ipsum item asam ipus." // to test descriptions

  return (
    <Link href={href}>
      <article
        className={classNames(
          'group rounded-lg border border-gray-400/30 shadow-sm hover:border-gray-400',
          className,
          `bg-${backgroundColor}`
        )}
      >
        <div
          className={classNames(
            'flex flex-col',
            !image && 'justify-center'
          )}
        >
          {image && (
            <Image
              className="w-full aspect-video object-cover rounded-t-lg"
              width="320"
              height="240"
              src={image}
              alt={`featured image for ${title}`}
            />
          )}
          <div className={classNames('flex flex-col gap-3 relative px-4 pt-5', cta ? 'pb-16' : 'pb-5')}>
            {title && (
              <h3
                className={classNames(
                  'text-xl font-semibold break-words',
                  primaryTextColor
                )}
              >
                {title}
              </h3>
            )}
            {description && (
              <span
                className={classNames(
                  'text-base leading-snug',
                  secondaryTextColor
                )}
              >
                {description}
              </span>
            )}
            {cta && (
              <div
                className={classNames(
                  'flex gap-2 items-center absolute bottom-4',
                  ctaTextColor
                )}
              >
                <p className="uppercase text-sm font-semibold">{cta}</p>
                <HeroIcon icon="arrow-long-right" className="w-6 h-6" />
              </div>
            )}
          </div>
          {postMeta.length > 0 && (
            <div
              className={classNames(
                'flex gap-3 items-center border-t border-gray-200 py-2.5 px-4 text-sm font-medium',
                metaTextColor
              )}
            >
              {postMeta.map((meta, i) => (
                <>
                  {post[meta] && (
                    <>
                      <figcaption>{post[meta]}</figcaption>
                      {i < postMeta.length - 1 && <span>|</span>}
                    </>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

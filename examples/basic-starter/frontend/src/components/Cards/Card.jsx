import { Fragment } from 'react';
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
    white: 'whiteBg',
    'gray-50': 'whiteBg',
    'gray-100': 'lightBg',
    'gray-300': 'lightBg',
    'gray-600': 'darkBg',
    'gray-700': 'darkBg',
    'gray-800': 'darkBg',
    'gray-900': 'darkBg',
    'gray-950': 'blackBg',
    'blue-700': 'blueBg',
    'blue-800': 'blueBg',
    'blue-900': 'darkBlueBg',
    'blue-950': 'darkBlueBg',
  }[backgroundColor]; // user-selected backgroundColor determines the color theme

  const themes = {
    whiteBg: {
      primaryTextColor: 'text-gray-800 group-hover:text-blue-700',
      secondaryTextColor: 'text-gray-600',
      borderColor: 'border-gray-400/30 hover:border-gray-400',
      ctaTextColor: 'text-blue-600 hover:text-blue-700',
      metaTextColor: 'text-gray-500',
      metaBorderColor: 'border-gray-200',
    },
    lightBg: (themes) => ({
      ...themes.whiteBg,
      metaBorderColor: 'border-gray-300',
    }),
    darkBg: {
      primaryTextColor: 'text-gray-100 group-hover:text-blue-300',
      secondaryTextColor: 'text-gray-300',
      borderColor: 'border-gray-500 hover:border-gray-900',
      ctaTextColor: 'text-blue-300 hover:text-blue-400',
      metaTextColor: 'text-gray-300',
      metaBorderColor: 'border-gray-500',
    },
    blackBg: (themes) => ({
      ...themes.darkBg,
      secondaryTextColor: 'text-gray-400',
      metaTextColor: 'text-gray-400',
    }),
    blueBg: {
      primaryTextColor: 'text-blue-50 group-hover:text-white',
      secondaryTextColor: 'text-blue-100/90',
      borderColor: 'border-blue-600 hover:border-blue-900',
      ctaTextColor: 'text-blue-300 hover:text-blue-400',
      metaTextColor: 'text-blue-100/80',
      metaBorderColor: 'border-blue-200/20',
    },
    darkBlueBg: (themes) => ({
      ...themes.blueBg,
      secondaryTextColor: 'text-blue-100/70',
      metaTextColor: 'text-blue-100/70',
      metaBorderColor: 'border-blue-400/20',
    }),
  };

  const defaultTheme = 'lightBg';
  const theme = themes[themeName || defaultTheme];
  const {
    primaryTextColor,
    secondaryTextColor,
    ctaTextColor,
    borderColor,
    metaTextColor,
    metaBorderColor,
  } = typeof theme == 'function' ? theme(themes) : theme;

  description =
    'Lorem ipsum item asam ipus. Lorem ipsum item asam ipus. Lorem ipsum item asam ipus.'; // to test descriptions

  return (
    <Link href={href}>
      <article
        className={classNames(
          'group rounded-lg overflow-hidden border shadow-sm',
          className,
          borderColor,
          `bg-${backgroundColor}`
        )}
      >
        <div className={classNames('flex flex-col', !image && 'justify-center')}>
          {image && (
            <Image
              className={classNames("w-full aspect-video object-cover border-b", metaBorderColor)}
              width="320"
              height="240"
              src={image}
              alt={`featured image for ${title}`}
            />
          )}
          <div
            className={classNames(
              'flex flex-col gap-3 relative px-4 pt-5',
              cta ? 'pb-16' : 'pb-5'
            )}
          >
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
                'flex gap-3 items-center border-t py-2.5 px-4 text-sm font-medium',
                metaTextColor,
                metaBorderColor
              )}
            >
              {postMeta.map((meta, i) => (
                <>
                  {post[meta] && (
                    <Fragment key={i}>
                      <figcaption>{post[meta]}</figcaption>
                      {i < postMeta.length - 1 && <span>|</span>}
                    </Fragment>
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

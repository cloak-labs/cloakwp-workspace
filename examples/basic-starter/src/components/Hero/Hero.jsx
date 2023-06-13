import Image from 'next/future/image';
import classNames from '@/utils/classNames';
import { Button } from '@/components/Button';
import { Eyebrow, H1, P } from '@/components/Typography';
import { ConditionalWrapper, Container } from '@/components/Layout';

export const Hero = ({ data }) => {
  const { backgroundColor, eyebrow, h1, subtitle, cta_button, image, alignment, hero_style } = data;

  let bgColor = `bg-${backgroundColor}`
  const hasBgImage = hero_style == 'bg_image'

  const themeName = {
    'white': 'lightBg',
    'gray-50': 'lightBg',
    'gray-300': 'lightBg',
    'gray-600': 'darkBg',
    'gray-700': 'darkBg',
    'gray-800': 'darkBg',
    'gray-900': 'darkBg',
    'gray-950': 'blackBg',
  }[backgroundColor]

  const themes = {
    lightBg: {
      eyebrowColor: hasBgImage ? 'text-gray-800' : 'text-gray-600',
      headingColor: 'text-gray-800',
      textColor: hasBgImage ? 'text-gray-800' : 'text-gray-600',
      buttonColor: 'gray'
    },
    darkBg: {
      eyebrowColor: 'text-gray-200',
      headingColor: 'text-gray-50',
      textColor: 'text-gray-200',
      buttonColor: 'light-gray'
    },
    blackBg: (themes) => ({
      ...themes.darkBg,
      buttonColor: hasBgImage ? 'light-gray' : 'gray'
    })
  }
  
  const theme = themes[themeName || 'lightBg']
  const { eyebrowColor, headingColor, textColor, buttonColor } = typeof theme == "function" ? theme(themes) : theme

  const style = hasBgImage ? { backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}

  return (
    <section id="hero" className={classNames("relative overflow-hidden", bgColor, hero_style != 'image_right' && "py-24")} style={style}>
      {hasBgImage &&
        <div id="hero-overlay" className={classNames('absolute top-0 left-0 w-full h-full bg-black bg-opacity-80', bgColor)} />
      }
      <div className={classNames("relative z-10 items-center", hero_style == 'image_right' && "grid grid-cols-1 sm:grid-cols-7 lg:grid-cols-2")}>
        <ConditionalWrapper
          condition={hero_style == 'image_right'}
          wrapper={(children) => (
            <>
              <div className='px-4 py-12 sm:py-20 sm:px-6 col-span-1 sm:col-span-4 lg:col-span-1 xl:pl-20 2xl:pl-40'>
                {children}
              </div>
              <div className="sm:h-full col-span-1 sm:col-span-3 lg:col-span-1">
                {image &&
                  <Image
                    src={image}
                    priority={true}
                    className="h-full max-h-[30vh] xs:max-h-[40vh] sm:max-h-none w-full object-cover"
                    width={800}
                    height={800}
                    alt={`hero section image`}
                  />
                }
              </div>
            </>
          )}
        >
          <ConditionalWrapper
            condition={hero_style != 'image_right'}
            wrapper={(children) => (
              <Container>
                {children}
              </Container>
            )}
          >
            <div className={classNames("flex flex-col h-full w-full relative z-10", alignment == 'center' && "sm:items-center text-center")}>
              {eyebrow && (
                <Eyebrow className={eyebrowColor}>
                  {eyebrow}
                </Eyebrow>
              )}
              {h1 && (
                <H1 className={classNames('mt-3 max-w-xl xl:max-w-2xl', headingColor)}>
                  {h1}
                </H1>
              )}
              {subtitle && (
                <P className={classNames('mt-4 2xl:mt-6 max-w-xl xl:max-w-2xl', textColor)}>
                  {subtitle}
                </P>
              )}
              {(cta_button && cta_button.url && cta_button.title) && (
                <Button
                  href={cta_button.url}
                  color={buttonColor}
                  icon="arrow-right"
                  trailingIcon={true}
                  className="mt-6 2xl:mt-8"
                >
                  {cta_button.title}
                </Button>
              )}
            </div>
          </ConditionalWrapper>
        </ConditionalWrapper>
      </div>
    </section>
  )
}
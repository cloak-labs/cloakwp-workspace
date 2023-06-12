import Image from 'next/future/image';
import classNames from '@/utils/classNames';
import { Button } from '@/components/Button';
import { Eyebrow, H1, P } from '@/components/Typography';

export const HeroSecondary = ({ data }) => {
  const { backgroundColor, eyebrow, h1, subtitle, cta_button, image } = data;

  // TODO: configure hero color options below based on project colors
  let bgColor = 'bg-blue-900',
    eyebrowColor = 'text-blue-200',
    headingColor = 'text-gray-300',
    textColor = 'text-blue-200',
    logoOpacity = 'opacity-10';

  switch (backgroundColor) {
    case 'blue-900':
      bgColor = 'bg-gray-100'
      eyebrowColor = 'text-blue-700'
      headingColor = 'text-blue-900'
      textColor = 'text-blue-800'
      logoOpacity = 'opacity-65'
      break;
    case 'navy':
      bgColor = 'bg-blue-800'
      eyebrowColor = 'text-blue-200'
      headingColor = 'text-gray-300'
      textColor = 'text-blue-500'
      logoOpacity = 'opacity-10'
      break;
  }

  return (
    <section id="hero" className={classNames("relative overflow-hidden", bgColor)}>
      <div className="relative z-10 grid grid-cols-1 items-center gap-4 sm:grid-cols-7 lg:grid-cols-2">
        <div className='px-4 py-12 sm:py-20 sm:px-6 col-span-1 sm:col-span-4 lg:col-span-1 xl:pl-20 2xl:pl-40'>
          <div className="max-w-xl relative z-10">
            {eyebrow && (
              <Eyebrow className={eyebrowColor}>
                {eyebrow}
              </Eyebrow>
            )}
            {h1 && (
              <H1 className={classNames('mt-3', headingColor)}>
                {h1}
              </H1>
            )}
            {subtitle && (
              <P className={classNames('mt-4 2xl:mt-6', textColor)}>
                {subtitle}
              </P>
            )}
            {(cta_button && cta_button.url && cta_button.title) && (
              <Button
                href={cta_button.url}
                color="gray"
                icon="chat-bubble-left-right"
                trailingIcon={true}
                className="mt-6 2xl:mt-8"
              >
                {cta_button.title}
              </Button>
            )}
          </div>
        </div>
        <div className="sm:h-full col-span-1 sm:col-span-3 lg:col-span-1">
          <Image
            src={image}
            className="h-full max-h-[30vh] xs:max-h-[37vh] sm:max-h-none w-full object-cover"
            width={800}
            height={800}
            alt={`hero section image`}
          />
        </div>
      </div>
    </section>
  )
}
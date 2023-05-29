import Image from 'next/future/image';
import classNames from '@/utils/classNames';
import { motion } from 'framer-motion';
import { motionItem, motionContainer } from '@/utils/motion';
import { Button } from '@/components/Button';
import { Eyebrow } from '@/components/Text';

export const HeroSecondary = ({ data }) => {
  const { secondary_background_color, eyebrow, h1, subtitle, cta_button, image = '/images/john_headshot.jpg' } = data;

  // TODO: configure hero color options below based on project colors
  let bgColor = 'bg-blue-900',
    eyebrowColor = 'text-blue-200',
    headingColor = 'text-gray-300',
    textColor = 'text-blue-200',
    logoOpacity = 'opacity-10';

  switch (secondary_background_color) {
    case 'gray':
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
          <motion.div
            className="max-w-xl relative z-10"
            variants={motionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {eyebrow && (
              <Eyebrow 
                className={eyebrowColor} 
                variants={motionItem}
              >
                {eyebrow}
              </Eyebrow>
            )}
            {h1 && (
              <motion.h1
                className={classNames('mt-3 2xl:mt-5', headingColor)}
                variants={motionItem}
              >
                {h1}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                className={classNames('mt-4 2xl:mt-6', textColor)}
                variants={motionItem}
              >
                {subtitle}
              </motion.p>
            )}
            {(cta_button && cta_button.url && cta_button.title) && (
              <Button
                href={cta_button.url}
                color="gray"
                icon="chat-bubble-left-right"
                trailingIcon={true}
                className="mt-6 2xl:mt-8"
                variants={motionItem}
              >
                {cta_button.title}
              </Button>
            )}
          </motion.div>
        </div>
        <div className="h-full col-span-1 sm:col-span-3 lg:col-span-1">
          <Image
            src={image}
            className="h-full max-h-[30vh] w-full scale-[1.02] object-cover xs:max-h-[35vh] sm:max-h-[86vh] lg:max-h-[80vh] xl:max-h-[80vh] 2xl:max-h-[70vh]"
            width={800}
            height={800}
            alt={`hero section image`}
          />
        </div>
      </div>
    </section>
  )
}
import { motion } from 'framer-motion';
import { motionItem, motionContainer } from '@/utils/motion';
import classNames from '@/utils/classNames';
import parse from 'html-react-parser';
import { Container } from '@/components/Layout';
import { Eyebrow } from '@/components/Typography';

export const HeroTertiary = ({ data }) => {
  const { tertiary_background_color, alignment, eyebrow, h1, subtitle} = data;

  // TODO: configure hero color options below based on project colors
  let bgColor = 'bg-blue-900',
    textColor = 'text-blue-200';

  if (tertiary_background_color === 'navy') {
    bgColor = 'bg-blue-900'
  }

  return (
    <section id="hero" className={classNames('relative overflow-hidden', bgColor)}>
      <Container>
        <div className={classNames('relative flex z-10 py-14 sm:py-10 md:py-16', alignment == 'center' && "justify-center sm:text-center")}>
          <motion.div
            className={classNames("flex flex-col w-full sm:w-5/6 md:w-3/4 xl:w-2/3", alignment == 'center' && "sm:items-center")}
            variants={motionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {eyebrow && (
              <Eyebrow
                className={textColor}
                variants={motionItem}
              >
                {eyebrow}
              </Eyebrow>
            )}
            {h1 && (
              <motion.h1
                variants={motionItem}
                className="text-white mb-6 mt-3"
              >
                {parse(h1)}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                variants={motionItem}
                className={classNames("max-w-lg", textColor)}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
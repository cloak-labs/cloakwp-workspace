import { motion } from 'framer-motion';
import { motionItem, motionContainer } from '@/utils/motion';
import classNames from "@/utils/classNames";

export function Testimonial({ testimonial, name, position, className, bgColor }) {

  let backgroundColor = 'bg-blue-800',
    primaryTextColor = 'text-gray-300',
    secondaryTextColor = 'text-blue-500',
    backgroundImage = 'url(/images/quote-left-solid.svg)';

  switch (bgColor) { // TODO: configure testimonial color options below based on project colors
    case 'blue-900':
      backgroundColor = 'bg-blue-900';
      primaryTextColor = 'text-gray-300';
      secondaryTextColor = 'text-blue-500';
      backgroundImage = 'url(/images/quote-left-solid.svg)';
      break;
    case 'blue-500':
      backgroundColor = 'bg-blue-500';
      primaryTextColor = 'text-blue-900';
      secondaryTextColor = 'text-blue-900';
      backgroundImage = 'url(/images/quote-left-solid-light.svg)';
      break;
    case 'gray-200':
      backgroundColor = 'bg-gray-200';
      primaryTextColor = 'text-blue-800';
      secondaryTextColor = 'text-blue-800';
      backgroundImage = 'url(/images/quote-left-solid-gray.svg)';
      break;
  }

  return (
    <motion.figure
      className={classNames(
        "rounded-lg px-2 max-w-3xl mx-auto",
        className,
        backgroundColor
      )}
      variants={motionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <blockquote
        className="bg-no-repeat px-2 py-5"
        style={{ backgroundImage: backgroundImage }}
      >
        <motion.span variants={motionItem} className={classNames("italic mb-5", primaryTextColor)}>
          {testimonial}
        </motion.span>
        {name &&
          <motion.figcaption
            variants={motionItem}
            className={classNames("mb-0 text-lg font-medium leading-none", secondaryTextColor)}
          >
            {name}
          </motion.figcaption>
        }
        {position &&
          <motion.figcaption
            variants={motionItem}
            className={classNames("text-sm font-medium", secondaryTextColor)}
          >
            {position}
          </motion.figcaption>
        }
      </blockquote>
    </motion.figure>
  )
}

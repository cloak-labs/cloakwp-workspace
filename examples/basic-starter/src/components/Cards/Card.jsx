import Image from 'next/future/image'
import classNames from "@/utils/classNames"
import { motion } from 'framer-motion'
import { motionItem, motionContainer } from '@/utils/motion'
import { HeroIcon } from '@/components/Icons'
import { Link } from '@/components/Link'

export function Card({ title, image, description, date, className, bgColor, href, cta }) {

  let backgroundColor = 'bg-blue-900',
    primaryTextColor = 'text-gray-100',
    secondaryTextColor = 'text-blue-200',
    iconColor = 'text-blue-100';

  switch (bgColor) { // TODO: configure card color options below based on project colors
    case 'blue-900':
      backgroundColor = 'bg-blue-900';
      primaryTextColor = 'text-gray-300';
      secondaryTextColor = 'text-blue-500';
      iconColor = 'text-blue-100';
      break;
    case 'blue-300':
      backgroundColor = 'bg-blue-300';
      primaryTextColor = 'text-blue-900';
      secondaryTextColor = 'text-blue-900';
      iconColor = 'text-blue-900';
      break;
    case 'gray-200':
      backgroundColor = 'bg-gray-200';
      primaryTextColor = 'text-blue-800';
      secondaryTextColor = 'text-blue-800';
      iconColor = 'text-blue-900';
      break;
  }

  return (
    <Link href={href}>
      <motion.article
        className={classNames(
          "rounded-lg overflow-hidden border border-blue-800 h-full relative",
          cta ? 'pb-16' : 'pb-6',
          className,
          backgroundColor
        )}
        variants={motionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className={classNames("flex flex-col h-full", !image && "justify-center")}>
          <div>
            {image &&
              <Image
                className="w-full aspect-[4/3] object-cover"
                width="320"
                height="240"
                src={image}
                alt={`featured image for ${title}`}
              />
            }
            <div className="px-4 pt-5">
              {title &&
                <motion.h3
                  variants={motionItem}
                  className={classNames("mb-4 text-3xl break-words", primaryTextColor)}
                >
                  {title}
                </motion.h3>
              }
              {date &&
                <motion.figcaption
                  variants={motionItem}
                  className={classNames("mb-3 text-sm sm:text-base", secondaryTextColor)}
                >
                  {date}
                </motion.figcaption>
              }
              {description && 
                <motion.span
                  variants={motionItem}
                  className={classNames("mb-4 text-lg leading-tight", secondaryTextColor)}
                >
                  {description}
                </motion.span>
              }
            </div>
          </div>
          {cta &&
            <div className="flex gap-2 px-4 pb-4 absolute bottom-0">
              <motion.p
                variants={motionItem}
                className={classNames("uppercase text-lg font-bold bg-no-repeat", secondaryTextColor)}
              >
                {cta}
              </motion.p>
              <HeroIcon
                icon="arrow-long-right"
                className={classNames("w-8 h-8", iconColor)}
              />
            </div>
          }
        </div>
      </motion.article>
    </Link>
  )
}
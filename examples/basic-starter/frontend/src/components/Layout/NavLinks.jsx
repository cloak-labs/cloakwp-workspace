import { useState } from 'react'
import { Link } from '@/components/Link'
import { AnimatePresence, motion } from 'framer-motion'

export function NavLinks({ links }) {
  let [hoveredIndex, setHoveredIndex] = useState(null)
  console.log({links})
  return links?.map(({title, url, id}, index) => (
    <Link
      key={id}
      href={url}
      className="relative -my-2 -mx-3 rounded-full px-3 py-1 text-gray-800 text-lg transition-colors delay-150 hover:text-gray-100 hover:delay-[0ms]"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 bg-gray-900 rounded-full"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{title}</span>
    </Link>
  ))
}

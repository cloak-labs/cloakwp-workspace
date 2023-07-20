import { forwardRef } from 'react'
import classNames from '@/utils/classNames'
import { Link } from '@/components/Link'
import { Spinner, HeroIcon } from '@/components/Icons'
import { motion } from 'framer-motion'

const baseStyles = {
  solid: 'py-2 px-4 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline: 'border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    'light-gray': 'relative overflow-hidden bg-gray-300 border-top border-gray-300 text-gray-700 before:absolute before:inset-0 active:before:bg-transparent hover:bg-gray-400 hover:text-gray-800 active:bg-gray-400 active:text-gray-700/80 before:transition-colors highlight-white-20',
    gray: 'relative overflow-hidden bg-gray-800 border-top border-gray-800 text-gray-100 before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-gray-700 active:text-gray-200/80 before:transition-colors highlight-white-20',
    white: 'bg-white text-blue-900 hover:bg-white/90 active:bg-white/90 active:text-blue-900/70',
    blue: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 active:text-white/80 highlight-white-10',
    black: 'bg-gray-950 text-gray-100 hover:bg-gray-800 active:bg-gray-900 active:text-white/80 highlight-white-10',
  },
  outline: {
    navy: 'border-blue-700 text-blue-800 hover:border-blue-900 active:bg-blue-100 active:text-blue-700/80',
  },
}

export const Button = forwardRef(function Button(
  {
    variant = 'solid',
    color = 'gray',
    className,
    href,
    icon,
    trailingIcon = false,
    loading = false,
    disabled = false,
    type = "button",
    form = undefined,
    children,
    ...props
  },
  ref
) {

  return (
    <Link
      ref={ref}
      href={href}
    >
      <motion.button
        type={type}
        ref={ref}
        form={form}
        className={classNames(
          baseStyles[variant],
          variantStyles[variant][color],
          'w-auto inline-flex tracking-wider items-center justify-center rounded-full uppercase disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-75',
          className,
        )}
        // {...(!href ? {className} : {className: 'inline-flex items-center justify-center uppercase disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-75'})}
        disabled={disabled}
        {...props}
      >
        {trailingIcon && <span className="w-full">{children}</span>}
        {(icon && !loading) && <HeroIcon icon={icon} outline={true} className={classNames("w-5 h-5", trailingIcon ? "ml-4" : "mr-4")} aria-hidden="true" />}
        {loading && <Spinner size="w-4 h-4" primary_color="fill-white" secondary_color="text-transparent" className={classNames(trailingIcon ? "ml-2" : "mr-2")} />}
        {!trailingIcon && <span className="w-full">{children}</span>}
      </motion.button>
    </Link>
  )
})

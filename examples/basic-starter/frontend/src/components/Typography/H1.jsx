import classNames from '@/utils/classNames'

export function H1 ({ children, className, ...props }) {
  return (
    <h1
      className={classNames(
        'font-sans font-semibold text-3xl leading-tight tracking-tight xs:text-4xl xs:leading-tight sm:text-5xl sm:leading-tightest xmd:text-6xl xmd:leading-none 2xl:text-7xl 2xl:leading-none',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

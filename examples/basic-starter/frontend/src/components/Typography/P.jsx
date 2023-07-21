import classNames from '@/utils/classNames'

export function P ({ children, className, ...props }) {
  return (
    <p
      className={classNames(
        'mb-2 text-base xl:text-lg 2xl:text-xl',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

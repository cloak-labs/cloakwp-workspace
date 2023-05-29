import classNames from '@/utils/classNames';

// Used heavily throughout site to maintain a consistent container width around boxed-width sections
// Note: two divs are required in scenarios where you want the container to have a full-width background color with boxed-width inner content
export function Container({ className, innerClassName, mobileFullWidth = false, children, ...props }) {
  return (
    <div
      className={classNames('px-4 sm:px-6 lg:px-9', className)}
      {...props}
    >
      <div className={classNames('mx-auto max-w-7xl lg:max-w-8xl', innerClassName)}>
          {children}
      </div>
    </div>
  )
}
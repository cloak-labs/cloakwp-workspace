import { classNames } from '../utils/classNames';

export default function Container({ className, innerClassName, children, ...props }) {
  const defaultInnerClassNames = 'px-4 sm:px-6 lg:px-9 mx-auto max-w-7xl lg:max-w-8xl'
  const hasBgColor = className?.includes('bg-') || false

  return (
    <div
      className={classNames(
        !hasBgColor && defaultInnerClassNames,
        !hasBgColor && innerClassName,
        className
      )}
      data-nextwp-container="true"
      {...props}
    >
      {hasBgColor ? (
        <div className={classNames(defaultInnerClassNames, innerClassName)}>
          {children}
        </div>
      ) : children
      }
    </div>
  )
}
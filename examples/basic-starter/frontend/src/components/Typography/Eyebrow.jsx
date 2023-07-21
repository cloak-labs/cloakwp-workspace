import classNames from "@/utils/classNames";

export function Eyebrow({className, children, ...props}) {
  return (
    <p
      className={classNames('mb-0 text-sm font-semibold tracking-widest text-blue-700 uppercase min-w-fit md:text-md lg:text-lg', className)}
      {...props}
    >
      {children}
    </p>
  )
}
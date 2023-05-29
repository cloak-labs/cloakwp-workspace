
import Link from 'next/link';

// A helpful wrapper around next/link that abstracts away the need to think about internal/external linking, and if no href is supplied, it will just render its children (removing need for ConditionalWrapper when using Links)
const CustomLink = ({
  href,
  ref,
  children,
  ...rest
}) => {
  if(!href) return <span ref={ref} {...rest}>{children}</span>

  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link ref={ref} href={href} {...rest}>
       {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a ref={ref} href={href} {...rest}>{children}</a>
  }

  if(!href.startsWith('/') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) href = `https://${href}`

  return <a target="_blank" rel="noopener noreferrer" ref={ref} href={href} {...rest}>{children}</a>
}

export default CustomLink
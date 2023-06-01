import NextLink from 'next/link'

const CustomLink = ({
  href,
  ref,
  children,
  openInNewTab = true,
  ...rest
}) => {
  if(!href) return <span ref={ref} {...rest}>{children}</span>

  const isInternalLink = href && href.startsWith('/') && !href.startsWith('/api/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink ref={ref} href={href} {...rest}>
        {children}
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return <a ref={ref} href={href} {...rest}>{children}</a>
  }

  if(!href.startsWith('/') && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) href = `https://${href}`

  return <a target={openInNewTab ? "_blank" : ""} rel="noopener noreferrer" ref={ref} href={href} {...rest}>{children}</a>
}

export default CustomLink